import { useId } from "react";

// Boarding-pass mark with a "done" check. Notches are cut with a mask so it works on any background.
export function LogoMark({ className = "h-7 w-auto" }: { className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden viewBox="0 0 64 44" className={className}>
      <defs>
        <mask id={id}>
          <rect width="64" height="44" fill="#fff" />
          <circle cx="40" cy="0" r="5" fill="#000" />
          <circle cx="40" cy="44" r="5" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${id})`}><rect width="64" height="44" rx="7" fill="#246BFD" /></g>
      <path d="M8 27 14 33 24.5 20.5" fill="none" stroke="#fff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
      <path transform="translate(30.5 13.5) rotate(45) scale(.56) translate(-12 -12)" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" fill="#fff" />
      <path d="M40 10v24" stroke="#fff" strokeOpacity=".85" strokeWidth="1.4" strokeDasharray="2 3" />
      <g fill="#fff">
        <rect x="46" y="13" width="2" height="18" /><rect x="49.5" y="13" width="1.2" height="18" />
        <rect x="52.5" y="13" width="3" height="18" /><rect x="57" y="13" width="1.2" height="18" />
      </g>
    </svg>
  );
}

export default function Logo({ tone = "onDark" }: { tone?: "onDark" | "onLight" }) {
  return (
    <span className="flex items-center gap-2.5 font-heading text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span className={tone === "onDark" ? "text-white" : "text-navy"}>
        travelbooking<span className="text-[#4f8bff]">.online</span>
      </span>
    </span>
  );
}
