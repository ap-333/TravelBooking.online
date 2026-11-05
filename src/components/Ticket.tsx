// Illustrative boarding-pass style card. Sample data only; no airline branding.
const bars = [3,1,2,1,4,1,1,3,2,1,3,1,2,4,1,2,1,3,1,1,4,2,1,3,1,2,1,4,1,2];

export default function Ticket({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-2xl bg-white font-mono text-navy shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${className}`}
      style={{
        WebkitMaskImage:
          "radial-gradient(circle 9px at 72% 0, transparent 98%, #000), radial-gradient(circle 9px at 72% 100%, transparent 98%, #000)",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
      role="img"
      aria-label="Illustration of an e-ticket"
    >
      <div className="flex-1 p-5">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/50">
          <span>E-ticket · Sample</span>
          <span className="rounded bg-action/10 px-2 py-0.5 text-action">Economy</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-navy/45">From</p>
            <p className="text-3xl font-bold tracking-wider">AAA</p>
          </div>
          <div className="mx-2 flex flex-1 items-center gap-1 text-action">
            <span className="h-px flex-1 border-t border-dashed border-navy/30" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" />
            </svg>
            <span className="h-px flex-1 border-t border-dashed border-navy/30" />
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-navy/45">To</p>
            <p className="text-3xl font-bold tracking-wider">BBB</p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-dashed border-navy/20 pt-3 text-[11px]">
          {[["Passenger", "SAMPLE/NAME"], ["Date", "-- --- ----"], ["Seat", "--"]].map(([k, v]) => (
            <div key={k}>
              <dt className="uppercase tracking-widest text-navy/45">{k}</dt>
              <dd className="mt-0.5 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative flex w-[28%] flex-col items-center justify-center gap-2 border-l-2 border-dashed border-navy/20 bg-soft p-3">
        <div className="flex h-14 items-stretch gap-[2px]" aria-hidden>
          {bars.map((w, i) => (
            <span key={i} className="bg-navy" style={{ width: w }} />
          ))}
        </div>
        <p className="text-[9px] uppercase tracking-widest text-navy/50">Not a real ticket</p>
      </div>
    </div>
  );
}
