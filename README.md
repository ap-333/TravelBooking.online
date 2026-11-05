# TravelBooking.online

Plain HTML and CSS website, served by a small dependency-free C++ server.

```
web/        the site: generated .html pages + hand-written assets (assets/style.css, assets/app.js, fonts/, brand/)
tools/      page generator (Node, no packages) and the content it reads (tools/content/)
server/     tbserver: static file server + enquiry API in one C++17 file
data/       created at runtime; enquiries are appended to data/enquiries.jsonl
```

## Build and run

```bash
node tools/build.mjs          # regenerate the HTML pages in web/ (GTM_ID=GTM-XXXX to add Tag Manager)
make -C server                # compile the server
make -C server gzip           # pre-compress text files (the server sends the .gz automatically)
PORT=8080 ./server/tbserver   # run
```

`npm run build:site` does the first three steps. Node is only needed to regenerate pages; the running site needs just the compiled `tbserver` binary and the `web/` folder.

Server settings (environment variables): `PORT` (8080), `WEB_ROOT` (web), `DATA_DIR` (data), `BIND` (0.0.0.0), `TRUST_PROXY=1` when behind nginx/Cloudflare so rate limiting sees the real visitor IP.

The server speaks plain HTTP. Put it behind a TLS terminator (Cloudflare, nginx, Caddy) for HTTPS.

## What the server does

- Clean URLs (`/flight-booking` serves `flight-booking.html`), redirects for `.html` and trailing slashes, real 404 page.
- ETag / 304, long-lived caching for `/assets` and `/fonts`, gzip from pre-compressed files.
- Security headers on every response; blocks dotfiles and path traversal.
- `POST /api/enquiry`: validates name, phone and email, drops honeypot hits, rate-limits to 5 per IP per 10 minutes, appends a JSON line to `data/enquiries.jsonl`.
- Caps: 16 KB headers and body, 512 concurrent connections, 10 s read timeout.

## Editing

- Business details and the phone number: `tools/content/site.mjs`.
- Landing page copy: `tools/content/landing.mjs`. Home, About, Contact and policy page text: `tools/build.mjs`.
- Look and feel: `web/assets/style.css`.
- Re-run `node tools/build.mjs` (and `make -C server gzip`) after any change.

## Checks

```bash
./server/tbserver &                       # with pages built
node scripts/seo-audit.mjs http://localhost:8080   # per-page SEO, icons, manifest, robots, sitemap, llms/security.txt, links, redirects, headers, 404
node tools/make-icons.mjs                  # regenerate favicon.ico and PNG icons from web/icon.svg (macOS)
npm run check:launch                       # fails while placeholder text remains
```

## Before going live

1. Fill every placeholder `check:launch` reports: legal entity, address and hours in `tools/content/site.mjs`, and the bracketed text on the policy pages in `tools/build.mjs`. Have a lawyer review the policy pages.
2. Decide where enquiries go. Today they are only written to `data/enquiries.jsonl`; forward them to email or a CRM.
3. Add consent handling before enabling ad or analytics tags where required, then build with `GTM_ID=GTM-XXXXXXX`.
4. Deploy behind HTTPS, submit `/sitemap.xml` in Google Search Console and re-run the SEO audit on the live URL.

`src/` and the Next.js config are the earlier React version of this site. They are no longer used by the plain build and can be archived.
