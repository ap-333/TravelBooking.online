"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const DELAY_MS = 20_000;
const KEY = "tbo_cta_seen";
const bars = [3,1,2,1,4,1,1,3,2,1,3,1,2,4,1,2,1,3,1,1,4,2,1,3,1,2,1,4];

function seen() {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
}
function markSeen() {
  try { sessionStorage.setItem(KEY, "1"); } catch {}
}

export default function BoardingPassPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const skip = pathname === "/contact-us";

  useEffect(() => {
    if (skip || seen()) return;
    const id = window.setTimeout(() => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      markSeen();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cta_popup_view" });
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [skip]);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href],button");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#050b14]/70 p-4 sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bp-title"
        className="bp-in relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white text-navy shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:flex"
      >
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-navy/70 transition hover:bg-navy/10 hover:text-navy"
        >
          ✕
        </button>

        <div className="flex-1 p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/50">
            <span>Boarding pass</span>
            <span className="rounded bg-action/10 px-2 py-0.5 text-action">Priority</span>
          </div>

          <h2 id="bp-title" className="mt-4 pr-8 text-2xl font-extrabold leading-tight sm:text-3xl">
            Still working out your flight?
          </h2>
          <p className="mt-2 text-navy/70">
            Talk it through with a real person. We&apos;ll help you review your options and explain the fare, conditions and fees before you decide.
          </p>

          <div className="mt-5 flex items-center justify-between border-y border-dashed border-navy/20 py-4 font-mono">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-navy/45">From</p>
              <p className="text-xl font-bold sm:text-2xl">YOUR PLANS</p>
            </div>
            <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="mx-2 shrink-0 text-action" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" />
            </svg>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-navy/45">To</p>
              <p className="text-xl font-bold text-action sm:text-2xl">BOOKED</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-3 font-mono text-[11px]">
            {[["Passenger", "You"], ["Gate", "Call us"], ["Boarding", "Now"]].map(([k, v]) => (
              <div key={k}>
                <dt className="uppercase tracking-widest text-navy/45">{k}</dt>
                <dd className="mt-0.5 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex flex-col items-stretch justify-center gap-3 border-t-2 border-dashed border-navy/20 bg-soft p-6 sm:w-60 sm:border-l-2 sm:border-t-0">
          <span aria-hidden className="absolute -top-2.5 left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-[#050b14]/70 sm:block sm:left-0 sm:-translate-x-[calc(50%+1px)]" />
          <div className="mx-auto flex h-10 items-stretch gap-[2px]" aria-hidden>
            {bars.map((w, i) => <span key={i} className="bg-navy" style={{ width: w }} />)}
          </div>
          <a
            href={`tel:${site.phoneTel}`}
            onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "call_click", click_location: "boarding_pass_popup" }); }}
            className="rounded-xl bg-action px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_3px_0_#1a54cc] transition hover:-translate-y-px hover:bg-[#3a7bff]"
          >
            Call {site.phoneDisplay}
          </a>
          <Link href="/contact-us" onClick={close} className="text-center text-sm font-semibold text-navy/70 underline-offset-4 hover:underline">
            Or send an enquiry
          </Link>
          <button onClick={close} className="text-center text-xs text-navy/50 hover:text-navy">No thanks</button>
        </div>
      </div>
    </div>
  );
}
