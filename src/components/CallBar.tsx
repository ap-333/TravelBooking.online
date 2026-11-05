"use client";

import { site } from "@/lib/site";

export default function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(16,28,44,0.08)] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-sm font-semibold">Need booking assistance?</p>
          <p className="text-xs text-navy/70">Speak with our travel team</p>
        </div>
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "call_click", click_location: "mobile_call_bar" });
          }}
          className="rounded-xl bg-action px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-dark"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
