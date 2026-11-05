// Decorative travel-bag illustrations. `tone` picks colours that read on light or dark backgrounds.
type Tone = "light" | "dark";
const pal = (tone: Tone) =>
  tone === "dark"
    ? { body: "#246BFD", dark: "#1a54cc", line: "#ffffff", trim: "#101C2C", tag: "#ffffff", strap: "#6c9bff" }
    : { body: "#101C2C", dark: "#0b1522", line: "#246BFD", trim: "#246BFD", tag: "#F4F6F8", strap: "#246BFD" };

type P = { tone?: Tone; className?: string };

export function Suitcase({ tone = "light", className = "" }: P) {
  const c = pal(tone);
  return (
    <svg aria-hidden viewBox="0 0 120 150" className={className} fill="none">
      <path d="M44 34V18a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v16" stroke={c.dark} strokeWidth="6" strokeLinecap="round" />
      <rect x="14" y="34" width="92" height="94" rx="14" fill={c.body} />
      <rect x="14" y="34" width="92" height="94" rx="14" fill="url(#none)" />
      {[38, 52, 68, 82].map((x) => (
        <path key={x} d={`M${x} 46v70`} stroke={c.line} strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="14" y="62" width="92" height="8" fill={c.trim} fillOpacity="0.55" />
      <rect x="52" y="58" width="16" height="16" rx="4" fill={c.tag} />
      <circle cx="30" cy="136" r="6" fill={c.dark} />
      <circle cx="90" cy="136" r="6" fill={c.dark} />
      <path d="M104 52c10 4 12 16 8 26" stroke={c.strap} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="104" y="76" width="16" height="22" rx="3" fill={c.tag} stroke={c.strap} strokeWidth="2" />
      <circle cx="112" cy="82" r="2" fill={c.strap} />
    </svg>
  );
}

export function Backpack({ tone = "light", className = "" }: P) {
  const c = pal(tone);
  return (
    <svg aria-hidden viewBox="0 0 120 140" className={className} fill="none">
      <path d="M46 24c0-9 6-14 14-14s14 5 14 14" stroke={c.dark} strokeWidth="6" strokeLinecap="round" />
      <path d="M22 62c0-22 16-38 38-38s38 16 38 38v58a10 10 0 0 1-10 10H32a10 10 0 0 1-10-10z" fill={c.body} />
      <rect x="36" y="82" width="48" height="34" rx="9" fill={c.dark} />
      <path d="M44 96h32" stroke={c.line} strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 52h40" stroke={c.line} strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 70c-8 4-10 22-6 40" stroke={c.strap} strokeWidth="5" strokeLinecap="round" />
      <path d="M94 70c8 4 10 22 6 40" stroke={c.strap} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Duffel({ tone = "light", className = "" }: P) {
  const c = pal(tone);
  return (
    <svg aria-hidden viewBox="0 0 160 100" className={className} fill="none">
      <path d="M42 36c4-22 72-22 76 0" stroke={c.strap} strokeWidth="6" strokeLinecap="round" />
      <path d="M10 48c0-10 8-16 18-16h104c10 0 18 6 18 16v28c0 10-8 16-18 16H28c-10 0-18-6-18-16z" fill={c.body} />
      <path d="M10 56h140" stroke={c.dark} strokeOpacity="0.6" strokeWidth="3" />
      <rect x="62" y="46" width="36" height="8" rx="4" fill={c.tag} />
      <path d="M30 40v50M130 40v50" stroke={c.line} strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="64" width="56" height="18" rx="6" fill={c.dark} />
    </svg>
  );
}

export function Carryon({ tone = "light", className = "" }: P) {
  const c = pal(tone);
  return (
    <svg aria-hidden viewBox="0 0 100 150" className={className} fill="none">
      <path d="M38 30V10M62 30V10M34 10h32" stroke={c.dark} strokeWidth="6" strokeLinecap="round" />
      <rect x="12" y="30" width="76" height="100" rx="12" fill={c.body} />
      <rect x="22" y="42" width="56" height="30" rx="7" fill={c.dark} />
      <path d="M26 92h48M26 104h30" stroke={c.line} strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="138" r="5" fill={c.dark} />
      <circle cx="74" cy="138" r="5" fill={c.dark} />
    </svg>
  );
}

export function BagTrio({ tone = "light", className = "" }: P) {
  return (
    <div aria-hidden className={`flex items-end gap-2 ${className}`}>
      <Suitcase tone={tone} className="h-28 w-auto" />
      <Backpack tone={tone} className="-ml-3 h-20 w-auto" />
      <Carryon tone={tone} className="-ml-2 h-24 w-auto" />
    </div>
  );
}
