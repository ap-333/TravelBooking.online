/* TravelBooking.online - small vanilla script: consent, call tracking, scroll reveal, boarding-pass popup. */
(function () {
  "use strict";
  var d = document, w = window;
  w.dataLayer = w.dataLayer || [];
  var push = function (o) { w.dataLayer.push(o); };
  var store = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  // Consent: non-essential tracking (analytics, ads, profiling) runs only after the visitor opts in.
  var KEY = "tb_consent", gpc = !!(navigator.globalPrivacyControl);
  var ids = {};
  try {
    var q = new URLSearchParams(location.search);
    ["gclid", "wbraid", "gbraid"].forEach(function (k) { var v = q.get(k); if (v) ids[k] = v; });
  } catch (e) {}
  function gtag() { w.dataLayer.push(arguments); }
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  var gtmLoaded = false;
  function apply(c) {
    var a = c.a ? "granted" : "denied", m = c.m ? "granted" : "denied";
    gtag("consent", "update", { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m });
    if (c.m) Object.keys(ids).forEach(function (k) { store.set("tb_" + k, ids[k]); });
    var meta = d.querySelector("meta[name=tb-gtm]"), id = meta && meta.content;
    if (id && (c.a || c.m) && !gtmLoaded) {
      gtmLoaded = true;
      push({ "gtm.start": Date.now(), event: "gtm.js" });
      var s = d.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
      d.head.appendChild(s);
    }
  }
  var ck = d.getElementById("ck");
  function saved() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} apply(c); ck.hidden = true; push({ event: "consent_saved" }); }
  if (ck) {
    var opts = d.getElementById("ck-opts"), ca = d.getElementById("ck-a"), cm = d.getElementById("ck-m"), cc = d.getElementById("ck-c");
    if (gpc) { cm.disabled = true; cm.checked = false; cm.nextElementSibling.insertAdjacentHTML("beforeend", " Off because your browser sent a Global Privacy Control signal."); }
    var open = function () {
      var c = saved() || {};
      ca.checked = !!c.a; cm.checked = !gpc && !!c.m;
      ck.hidden = false;
    };
    ck.addEventListener("click", function (e) {
      var t = e.target.closest("[data-ck]"); if (!t) return;
      var k = t.getAttribute("data-ck");
      if (k === "accept") save({ a: true, m: !gpc });
      else if (k === "reject") save({ a: false, m: false });
      else if (opts.hidden) { opts.hidden = false; cc.textContent = "Save choices"; }
      else save({ a: ca.checked, m: !gpc && cm.checked });
    });
    d.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-ck-open]")) { opts.hidden = false; cc.textContent = "Save choices"; open(); }
    });
    var c0 = saved();
    if (c0) apply(c0); else open();
  }

  // Call click tracking
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='tel:']");
    if (a) push({ event: "call_click", click_location: a.getAttribute("data-loc") || "link" });
  });

  // Scroll reveal (content stays visible if JS or IntersectionObserver is missing)
  var rv = d.querySelectorAll(".rv");
  if ("IntersectionObserver" in w && rv.length) {
    d.documentElement.classList.add("js");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  }

  // Boarding-pass popup: once per session, 20 seconds after arrival, not on the contact page
  var pop = d.getElementById("pop");
  if (pop && !store.get("tb_pop") && location.pathname.indexOf("/contact-us") !== 0) {
    var prev;
    var close = function () { pop.classList.remove("on"); d.body.style.overflow = ""; d.removeEventListener("keydown", key); if (prev && prev.focus) prev.focus(); };
    var key = function (e) {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      var els = pop.querySelectorAll("a[href],button"), first = els[0], last = els[els.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    pop.addEventListener("click", function (e) { if (e.target === pop || e.target.hasAttribute("data-close")) close(); });
    setTimeout(function () {
      prev = d.activeElement;
      pop.classList.add("on"); d.body.style.overflow = "hidden"; store.set("tb_pop", "1");
      pop.querySelector(".x").focus();
      d.addEventListener("keydown", key);
      push({ event: "cta_popup_view" });
    }, 20000);
  }
})();
