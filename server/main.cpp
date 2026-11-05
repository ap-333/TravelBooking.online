// tbserver: small dependency-free HTTP/1.1 server for the static TravelBooking.online site.
//  - serves ./web with clean URLs (/flight-booking -> flight-booking.html), ETag, caching and pre-compressed .gz
//  - POST /api/enquiry validates the enquiry form and appends it to data/enquiries.jsonl
//  - sets security headers, rate-limits the form, caps connections and request sizes
// Build: make -C server        Run: ./server/tbserver   (env: PORT, WEB_ROOT, DATA_DIR, TRUST_PROXY)
#include <arpa/inet.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <unistd.h>

#include <algorithm>
#include <atomic>
#include <chrono>
#include <csignal>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <fstream>
#include <iostream>
#include <map>
#include <mutex>
#include <sstream>
#include <string>
#include <thread>
#include <unordered_map>
#include <vector>

namespace {

constexpr size_t kMaxHeader = 16 * 1024;
constexpr size_t kMaxBody = 16 * 1024;
constexpr int kMaxConns = 512;
constexpr int kMaxKeepAlive = 100;
constexpr int kRecvTimeoutSec = 10;
constexpr int kRateLimit = 5;            // enquiries per IP per window
constexpr int kRateWindowSec = 600;

std::string g_root, g_data, g_realRoot;
bool g_trustProxy = false;
std::atomic<bool> g_stop{false};
std::atomic<int> g_conns{0};
std::mutex g_logMu, g_fileMu, g_rateMu;
int g_listen = -1;

struct Request {
  std::string method, target, path, query, version, body;
  std::map<std::string, std::string> h;
  std::string header(const std::string& k) const { auto i = h.find(k); return i == h.end() ? "" : i->second; }
};

std::string lower(std::string s) { for (auto& c : s) c = (char)tolower((unsigned char)c); return s; }
std::string trim(const std::string& s) {
  size_t a = s.find_first_not_of(" \t"), b = s.find_last_not_of(" \t\r");
  return a == std::string::npos ? "" : s.substr(a, b - a + 1);
}
bool endsWith(const std::string& s, const std::string& x) { return s.size() >= x.size() && s.compare(s.size() - x.size(), x.size(), x) == 0; }
bool startsWith(const std::string& s, const std::string& x) { return s.compare(0, x.size(), x) == 0; }

std::string getenvOr(const char* k, const char* d) { const char* v = getenv(k); return v && *v ? v : d; }

std::string httpDate(time_t t) {
  char b[64]; struct tm g; gmtime_r(&t, &g);
  strftime(b, sizeof b, "%a, %d %b %Y %H:%M:%S GMT", &g);
  return b;
}
std::string isoNow() {
  char b[64]; time_t t = time(nullptr); struct tm g; gmtime_r(&t, &g);
  strftime(b, sizeof b, "%Y-%m-%dT%H:%M:%SZ", &g);
  return b;
}

const char* statusText(int c) {
  switch (c) {
    case 200: return "OK"; case 301: return "Moved Permanently"; case 304: return "Not Modified";
    case 400: return "Bad Request"; case 404: return "Not Found"; case 405: return "Method Not Allowed";
    case 413: return "Payload Too Large"; case 415: return "Unsupported Media Type";
    case 422: return "Unprocessable Entity"; case 429: return "Too Many Requests";
    case 431: return "Request Header Fields Too Large"; case 500: return "Internal Server Error";
    default: return "OK";
  }
}

std::string mimeFor(const std::string& p) {
  static const std::map<std::string, std::string> m = {
    {".html", "text/html; charset=utf-8"}, {".css", "text/css; charset=utf-8"},
    {".js", "text/javascript; charset=utf-8"}, {".json", "application/json"},
    {".webmanifest", "application/manifest+json"}, {".svg", "image/svg+xml"},
    {".png", "image/png"}, {".jpg", "image/jpeg"}, {".jpeg", "image/jpeg"}, {".webp", "image/webp"},
    {".ico", "image/x-icon"}, {".woff2", "font/woff2"}, {".txt", "text/plain; charset=utf-8"},
    {".xml", "application/xml; charset=utf-8"}};
  size_t d = p.rfind('.');
  if (d == std::string::npos) return "application/octet-stream";
  auto it = m.find(lower(p.substr(d)));
  return it == m.end() ? "application/octet-stream" : it->second;
}
bool compressible(const std::string& mime) {
  return startsWith(mime, "text/") || mime.find("json") != std::string::npos ||
         mime.find("xml") != std::string::npos || mime.find("svg") != std::string::npos ||
         mime.find("manifest") != std::string::npos;
}

struct Response {
  int status = 200;
  std::vector<std::pair<std::string, std::string>> headers;
  std::string body;
  bool headOnly = false;
  void set(const std::string& k, const std::string& v) { headers.emplace_back(k, v); }
};

bool sendAll(int fd, const char* d, size_t n) {
  while (n) {
    ssize_t w = send(fd, d, n, 0);
    if (w <= 0) return false;
    d += w; n -= (size_t)w;
  }
  return true;
}

void securityHeaders(Response& r) {
  r.set("X-Content-Type-Options", "nosniff");
  r.set("X-Frame-Options", "SAMEORIGIN");
  r.set("Referrer-Policy", "strict-origin-when-cross-origin");
  r.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  r.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  r.set("Cross-Origin-Opener-Policy", "same-origin");
}

bool writeResponse(int fd, Response& r, bool keepAlive) {
  std::ostringstream o;
  o << "HTTP/1.1 " << r.status << ' ' << statusText(r.status) << "\r\n";
  o << "Date: " << httpDate(time(nullptr)) << "\r\nServer: tbserver\r\n";
  o << "Content-Length: " << r.body.size() << "\r\n";
  o << "Connection: " << (keepAlive ? "keep-alive" : "close") << "\r\n";
  for (auto& h : r.headers) o << h.first << ": " << h.second << "\r\n";
  o << "\r\n";
  std::string head = o.str();
  if (!sendAll(fd, head.data(), head.size())) return false;
  if (r.headOnly || r.body.empty()) return true;
  return sendAll(fd, r.body.data(), r.body.size());
}

Response simple(int status, const std::string& body, const std::string& type = "text/plain; charset=utf-8") {
  Response r; r.status = status; r.body = body; r.set("Content-Type", type); r.set("Cache-Control", "no-store");
  securityHeaders(r);
  return r;
}
Response json(int status, bool ok) {
  return simple(status, ok ? "{\"ok\":true}" : "{\"ok\":false}", "application/json");
}

bool readFile(const std::string& p, std::string& out, struct stat& st) {
  if (stat(p.c_str(), &st) != 0 || !S_ISREG(st.st_mode)) return false;
  std::ifstream f(p, std::ios::binary);
  if (!f) return false;
  std::ostringstream ss; ss << f.rdbuf(); out = ss.str();
  return true;
}

std::string percentDecode(const std::string& s, bool& ok) {
  std::string o; ok = true;
  for (size_t i = 0; i < s.size(); i++) {
    if (s[i] == '%') {
      if (i + 2 >= s.size()) { ok = false; return o; }
      auto hex = [](char c) { return isdigit((unsigned char)c) ? c - '0' : (tolower((unsigned char)c) - 'a' + 10); };
      if (!isxdigit((unsigned char)s[i + 1]) || !isxdigit((unsigned char)s[i + 2])) { ok = false; return o; }
      o += (char)(hex(s[i + 1]) * 16 + hex(s[i + 2])); i += 2;
    } else o += s[i];
  }
  return o;
}

// Resolve a request path to a real file under the web root, or "" if none.
std::string resolve(const std::string& path) {
  if (path.empty() || path[0] != '/' || path.find('\0') != std::string::npos || path.find('\\') != std::string::npos) return "";
  std::stringstream ss(path); std::string seg;
  while (std::getline(ss, seg, '/')) if (!seg.empty() && seg[0] == '.' && seg != ".well-known") return "";  // no dotfiles or .. (security.txt lives in .well-known)
  std::vector<std::string> cands;
  if (path == "/") cands.push_back(g_root + "/index.html");
  else { cands.push_back(g_root + path); cands.push_back(g_root + path + ".html"); cands.push_back(g_root + path + "/index.html"); }
  for (auto& c : cands) {
    struct stat st;
    if (stat(c.c_str(), &st) != 0 || !S_ISREG(st.st_mode)) continue;
    char rp[4096];
    if (!realpath(c.c_str(), rp)) continue;
    std::string r = rp;
    if (r == g_realRoot || startsWith(r, g_realRoot + "/")) return c;
  }
  return "";
}

Response serveFile(const Request& q, const std::string& file, int status) {
  std::string mime = mimeFor(file), data; struct stat st;
  Response r; r.status = status;
  bool gz = false;
  if (compressible(mime) && lower(q.header("accept-encoding")).find("gzip") != std::string::npos) {
    struct stat gst;
    if (stat((file + ".gz").c_str(), &gst) == 0 && readFile(file + ".gz", data, st)) gz = true;
  }
  if (!gz && !readFile(file, data, st)) return simple(500, "read error");
  char tag[96]; snprintf(tag, sizeof tag, "W/\"%llx-%llx%s\"", (unsigned long long)st.st_size, (unsigned long long)st.st_mtime, gz ? "-gz" : "");
  r.set("Content-Type", mime);
  r.set("ETag", tag);
  r.set("Last-Modified", httpDate(st.st_mtime));
  r.set("Vary", "Accept-Encoding");
  if (gz) r.set("Content-Encoding", "gzip");
  bool html = endsWith(file, ".html");
  if (status == 404) r.set("Cache-Control", "no-store");
  else if (html || endsWith(file, ".xml") || endsWith(file, ".txt") || endsWith(file, ".webmanifest")) r.set("Cache-Control", "no-cache");
  else if (startsWith(file, g_root + "/assets/") || startsWith(file, g_root + "/fonts/")) r.set("Cache-Control", "public, max-age=31536000, immutable");
  else r.set("Cache-Control", "public, max-age=86400");
  securityHeaders(r);
  if (status == 200 && q.header("if-none-match") == tag) { r.status = 304; return r; }
  r.body = std::move(data);
  return r;
}

/* ---------- enquiry API ---------- */
struct Json { std::map<std::string, std::string> kv; bool ok = false; };

void appendUtf8(std::string& o, unsigned cp) {
  if (cp < 0x80) o += (char)cp;
  else if (cp < 0x800) { o += (char)(0xC0 | (cp >> 6)); o += (char)(0x80 | (cp & 0x3F)); }
  else if (cp < 0x10000) { o += (char)(0xE0 | (cp >> 12)); o += (char)(0x80 | ((cp >> 6) & 0x3F)); o += (char)(0x80 | (cp & 0x3F)); }
  else { o += (char)(0xF0 | (cp >> 18)); o += (char)(0x80 | ((cp >> 12) & 0x3F)); o += (char)(0x80 | ((cp >> 6) & 0x3F)); o += (char)(0x80 | (cp & 0x3F)); }
}

// Parses a flat JSON object whose values are strings, numbers, booleans or null.
Json parseFlatJson(const std::string& s) {
  Json j; size_t i = 0;
  auto ws = [&] { while (i < s.size() && isspace((unsigned char)s[i])) i++; };
  auto str = [&](std::string& out) -> bool {
    if (i >= s.size() || s[i] != '"') return false;
    i++; out.clear();
    while (i < s.size()) {
      unsigned char c = (unsigned char)s[i++];
      if (c == '"') return true;
      if (c < 0x20) return false;
      if (c != '\\') { out += (char)c; continue; }
      if (i >= s.size()) return false;
      char e = s[i++];
      switch (e) {
        case '"': out += '"'; break; case '\\': out += '\\'; break; case '/': out += '/'; break;
        case 'b': out += '\b'; break; case 'f': out += '\f'; break; case 'n': out += '\n'; break;
        case 'r': out += '\r'; break; case 't': out += '\t'; break;
        case 'u': {
          auto h4 = [&](unsigned& v) { if (i + 4 > s.size()) return false; v = 0; for (int k = 0; k < 4; k++) { char h = s[i++]; if (!isxdigit((unsigned char)h)) return false; v = v * 16 + (isdigit((unsigned char)h) ? h - '0' : tolower(h) - 'a' + 10); } return true; };
          unsigned cp; if (!h4(cp)) return false;
          if (cp >= 0xD800 && cp < 0xDC00 && i + 1 < s.size() && s[i] == '\\' && s[i + 1] == 'u') { i += 2; unsigned lo; if (!h4(lo)) return false; cp = 0x10000 + ((cp - 0xD800) << 10) + (lo - 0xDC00); }
          appendUtf8(out, cp); break; }
        default: return false;
      }
    }
    return false;
  };
  ws(); if (i >= s.size() || s[i] != '{') return j; i++; ws();
  if (i < s.size() && s[i] == '}') { j.ok = true; return j; }
  while (i < s.size()) {
    std::string k, v; ws();
    if (!str(k)) return j; ws();
    if (i >= s.size() || s[i] != ':') return j; i++; ws();
    if (i < s.size() && s[i] == '"') { if (!str(v)) return j; }
    else { size_t a = i; while (i < s.size() && s[i] != ',' && s[i] != '}' && !isspace((unsigned char)s[i])) i++; v = s.substr(a, i - a); if (v.empty() || v[0] == '{' || v[0] == '[') return j; }
    if (j.kv.size() < 40) j.kv[k] = v;
    ws();
    if (i < s.size() && s[i] == ',') { i++; continue; }
    if (i < s.size() && s[i] == '}') { j.ok = true; return j; }
    return j;
  }
  return j;
}

std::string jsonEscape(const std::string& s) {
  std::string o;
  for (unsigned char c : s) {
    switch (c) {
      case '"': o += "\\\""; break; case '\\': o += "\\\\"; break; case '\n': o += "\\n"; break;
      case '\r': o += "\\r"; break; case '\t': o += "\\t"; break;
      default: if (c < 0x20) { char b[8]; snprintf(b, sizeof b, "\\u%04x", c); o += b; } else o += (char)c;
    }
  }
  return o;
}

bool rateLimited(const std::string& ip) {
  static std::unordered_map<std::string, std::vector<time_t>> hits;
  std::lock_guard<std::mutex> g(g_rateMu);
  time_t now = time(nullptr);
  if (hits.size() > 5000) hits.clear();
  auto& v = hits[ip];
  v.erase(std::remove_if(v.begin(), v.end(), [&](time_t t) { return now - t > kRateWindowSec; }), v.end());
  if ((int)v.size() >= kRateLimit) return true;
  v.push_back(now);
  return false;
}

bool validEmail(const std::string& e) {
  size_t at = e.find('@');
  if (at == std::string::npos || at == 0 || e.find('@', at + 1) != std::string::npos) return false;
  size_t dot = e.find('.', at);
  if (dot == std::string::npos || dot + 2 > e.size()) return false;
  for (unsigned char c : e) if (isspace(c) || c < 0x20) return false;
  return true;
}
bool validPhone(const std::string& p) {
  int digits = 0;
  for (unsigned char c : p) { if (isdigit(c)) digits++; else if (!strchr("+-() .", c)) return false; }
  return digits >= 7 && digits <= 15;
}

Response handleEnquiry(const Request& q, const std::string& ip) {
  if (q.method != "POST") { Response r = simple(405, "Method Not Allowed"); r.set("Allow", "POST"); return r; }
  if (lower(q.header("content-type")).find("application/json") == std::string::npos) return json(415, false);
  if (q.body.size() > kMaxBody) return json(413, false);
  Json j = parseFlatJson(q.body);
  if (!j.ok) return json(400, false);
  if (!j.kv["website"].empty()) return json(200, true);  // honeypot: look successful, store nothing
  if (rateLimited(ip)) { Response r = json(429, false); r.set("Retry-After", std::to_string(kRateWindowSec)); return r; }

  static const std::vector<std::pair<std::string, size_t>> fields = {
    {"name", 120}, {"phone", 40}, {"email", 160}, {"origin", 120}, {"destination", 120},
    {"dates", 160}, {"passengers", 4}, {"notes", 2000}, {"source", 80}};
  std::string line = "{\"received\":\"" + isoNow() + "\"";
  for (auto& f : fields) {
    std::string v = trim(j.kv[f.first]);
    if (v.size() > f.second) return json(422, false);
    line += ",\"" + f.first + "\":\"" + jsonEscape(v) + "\"";
  }
  if (trim(j.kv["name"]).empty() || !validEmail(trim(j.kv["email"])) || !validPhone(trim(j.kv["phone"]))) return json(422, false);
  line += "}\n";
  {
    std::lock_guard<std::mutex> g(g_fileMu);
    std::ofstream f(g_data + "/enquiries.jsonl", std::ios::app);
    if (!f) return json(500, false);
    f << line; f.flush();
  }
  { std::lock_guard<std::mutex> g(g_logMu); std::cout << isoNow() << " enquiry stored" << std::endl; }
  return json(200, true);
}

/* ---------- request handling ---------- */
Response route(const Request& q, const std::string& ip) {
  bool ok; std::string path = percentDecode(q.path, ok);
  if (!ok) return simple(400, "Bad Request");
  if (path == "/api/enquiry") return handleEnquiry(q, ip);
  if (startsWith(path, "/api/") ) { std::string f = resolve("/404"); return f.empty() ? simple(404, "Not Found") : serveFile(q, f, 404); }
  if (q.method != "GET" && q.method != "HEAD") { Response r = simple(405, "Method Not Allowed"); r.set("Allow", "GET, HEAD, POST"); return r; }
  if (path.size() > 1 && path.back() == '/') {
    Response r = simple(301, ""); r.set("Location", path.substr(0, path.find_last_not_of('/') + 1) + (q.query.empty() ? "" : "?" + q.query));
    return r;
  }
  if (endsWith(path, ".html") || endsWith(path, "/index")) {  // one URL per page
    std::string base = endsWith(path, ".html") ? path.substr(0, path.size() - 5) : path.substr(0, path.size() - 6);
    if (base == "/index" || base.empty()) base = "/";
    Response r = simple(301, ""); r.set("Location", base); return r;
  }
  std::string f = resolve(path);
  if (f.empty()) { std::string nf = resolve("/404"); return nf.empty() ? simple(404, "Not Found") : serveFile(q, nf, 404); }
  return serveFile(q, f, 200);
}

bool readRequest(int fd, std::string& buf, Request& q, int& err) {
  err = 0;
  size_t end;
  while ((end = buf.find("\r\n\r\n")) == std::string::npos) {
    if (buf.size() > kMaxHeader) { err = 431; return false; }
    char tmp[4096]; ssize_t n = recv(fd, tmp, sizeof tmp, 0);
    if (n <= 0) return false;
    buf.append(tmp, (size_t)n);
  }
  std::string head = buf.substr(0, end);
  buf.erase(0, end + 4);
  std::istringstream is(head); std::string line;
  if (!std::getline(is, line)) { err = 400; return false; }
  std::istringstream rl(line);
  if (!(rl >> q.method >> q.target >> q.version) || !startsWith(q.version, "HTTP/1.")) { err = 400; return false; }
  while (std::getline(is, line)) {
    size_t c = line.find(':');
    if (c == std::string::npos) continue;
    q.h[lower(trim(line.substr(0, c)))] = trim(line.substr(c + 1));
  }
  size_t qm = q.target.find('?');
  q.path = q.target.substr(0, qm);
  q.query = qm == std::string::npos ? "" : q.target.substr(qm + 1);
  if (q.path.empty() || q.path[0] != '/') { err = 400; return false; }
  if (!q.header("transfer-encoding").empty()) { err = 400; return false; }
  size_t len = 0;
  if (!q.header("content-length").empty()) {
    char* e; unsigned long long v = strtoull(q.header("content-length").c_str(), &e, 10);
    if (*e || v > kMaxBody) { err = 413; return false; }
    len = (size_t)v;
  }
  while (buf.size() < len) {
    char tmp[4096]; ssize_t n = recv(fd, tmp, sizeof tmp, 0);
    if (n <= 0) return false;
    buf.append(tmp, (size_t)n);
  }
  q.body = buf.substr(0, len); buf.erase(0, len);
  return true;
}

void handleConn(int fd, std::string peer) {
  struct timeval tv{kRecvTimeoutSec, 0};
  setsockopt(fd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof tv);
  int one = 1; setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, &one, sizeof one);
  std::string buf;
  for (int served = 0; served < kMaxKeepAlive && !g_stop; served++) {
    Request q; int err;
    if (!readRequest(fd, buf, q, err)) {
      if (err) { Response r = simple(err, statusText(err)); writeResponse(fd, r, false); }
      break;
    }
    std::string ip = peer;
    if (g_trustProxy && !q.header("x-forwarded-for").empty()) { std::string x = q.header("x-forwarded-for"); ip = trim(x.substr(0, x.find(','))); }
    Response r = route(q, ip);
    r.headOnly = q.method == "HEAD";
    bool keep = lower(q.header("connection")) != "close" && q.version == "HTTP/1.1";
    { std::lock_guard<std::mutex> g(g_logMu); std::cout << ip << ' ' << q.method << ' ' << q.target << ' ' << r.status << ' ' << r.body.size() << '\n'; }
    if (!writeResponse(fd, r, keep) || !keep) break;
  }
  close(fd);
  g_conns--;
}

void onSignal(int) { g_stop = true; if (g_listen >= 0) close(g_listen); }

}  // namespace

int main() {
  signal(SIGPIPE, SIG_IGN);
  signal(SIGINT, onSignal); signal(SIGTERM, onSignal);
  g_root = getenvOr("WEB_ROOT", "web");
  g_data = getenvOr("DATA_DIR", "data");
  g_trustProxy = getenvOr("TRUST_PROXY", "0") == "1";
  int port = atoi(getenvOr("PORT", "8080").c_str());
  while (g_root.size() > 1 && g_root.back() == '/') g_root.pop_back();
  char rp[4096];
  if (!realpath(g_root.c_str(), rp)) { std::cerr << "WEB_ROOT not found: " << g_root << "\n"; return 1; }
  g_realRoot = rp;
  mkdir(g_data.c_str(), 0750);

  g_listen = socket(AF_INET, SOCK_STREAM, 0);
  int one = 1; setsockopt(g_listen, SOL_SOCKET, SO_REUSEADDR, &one, sizeof one);
  sockaddr_in a{}; a.sin_family = AF_INET; a.sin_port = htons((uint16_t)port);
  inet_pton(AF_INET, getenvOr("BIND", "0.0.0.0").c_str(), &a.sin_addr);
  if (bind(g_listen, (sockaddr*)&a, sizeof a) != 0 || listen(g_listen, 256) != 0) { perror("bind/listen"); return 1; }
  std::cout << "tbserver listening on :" << port << "  root=" << g_realRoot << "  data=" << g_data << std::endl;

  while (!g_stop) {
    sockaddr_in c{}; socklen_t cl = sizeof c;
    int fd = accept(g_listen, (sockaddr*)&c, &cl);
    if (fd < 0) { if (g_stop) break; continue; }
    if (g_conns >= kMaxConns) { close(fd); continue; }
    char ip[64]; inet_ntop(AF_INET, &c.sin_addr, ip, sizeof ip);
    g_conns++;
    std::thread(handleConn, fd, std::string(ip)).detach();
  }
  std::cout << "shutting down" << std::endl;
  return 0;
}
