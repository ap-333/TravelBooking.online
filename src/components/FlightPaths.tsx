// Decorative background art: curved route lines with waypoints and a small aircraft.
export default function FlightPaths({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 500"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="fp" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#246BFD" stopOpacity="0" />
          <stop offset="0.6" stopColor="#6c9bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M-20 430 C 180 380, 300 120, 560 90 S 780 60, 840 20" stroke="url(#fp)" strokeWidth="1.5" strokeDasharray="3 7" />
      <path d="M100 500 C 260 420, 420 300, 560 250 S 740 190, 830 120" stroke="url(#fp)" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
      <path d="M300 520 C 420 430, 560 380, 700 330 S 800 280, 840 250" stroke="url(#fp)" strokeWidth="1" strokeDasharray="2 8" opacity="0.4" />
      {[[560, 90], [560, 250], [700, 330]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" fill="#246BFD" opacity="0.18" />
          <circle cx={x} cy={y} r="3.5" fill="#6c9bff" />
        </g>
      ))}
      <g className="hidden sm:inline" transform="translate(700 44) rotate(-18) scale(1.6)" fill="#fff" opacity="0.9">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" />
      </g>
    </svg>
  );
}
