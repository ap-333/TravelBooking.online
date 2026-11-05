"use client";

import { site } from "@/lib/site";

type Props = {
  label?: string;
  variant?: "primary" | "light" | "outline";
  location: string;
  className?: string;
  showNumber?: boolean;
};

const styles = {
  primary: "bg-action text-white hover:bg-action-dark",
  light: "bg-white text-navy hover:bg-soft",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-soft",
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function CallButton({
  label = "Talk to a Travel Specialist",
  variant = "primary",
  location,
  className = "",
  showNumber = false,
}: Props) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      onClick={() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "call_click", click_location: location });
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${styles[variant]} ${className}`}
    >
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </svg>
      <span>{label}</span>
      {showNumber && <span className="whitespace-nowrap font-bold">{site.phoneDisplay}</span>}
    </a>
  );
}
