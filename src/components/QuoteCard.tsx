// Illustrative only. Numbers are an example of the format, not a live fare or our fee.
export default function QuoteCard({ className = "" }: { className?: string }) {
  const rows = [
    ["Airfare", "Set by the airline"],
    ["Taxes & carrier charges", "Itemised"],
    ["Assistance fee", "Stated up front"],
  ];
  return (
    <div className={`rounded-2xl border border-white/15 bg-white/[0.06] p-6 font-mono text-sm shadow-2xl backdrop-blur ${className}`}>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/60">
        <span>Example breakdown</span>
        <span>By phone</span>
      </div>
      <div className="mt-5 flex items-end justify-between border-b border-dashed border-white/20 pb-5">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-white/50">From</p>
          <p className="text-3xl font-bold tracking-widest text-white">AAA</p>
        </div>
        <span aria-hidden className="mx-3 mb-2 flex flex-1 items-center gap-2 text-action">
          <span className="h-px flex-1 border-t border-dashed border-white/30" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
          <span className="h-px flex-1 border-t border-dashed border-white/30" />
        </span>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-widest text-white/50">To</p>
          <p className="text-3xl font-bold tracking-widest text-white">BBB</p>
        </div>
      </div>
      <dl className="mt-5 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-white/80">
            <dt>{k}</dt>
            <dd className="text-white/55">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex justify-between border-t border-white/25 pt-4 text-base font-bold text-white">
        <span>Total you approve</span>
        <span className="text-action">One number</span>
      </div>
      <p className="mt-5 text-[11px] leading-relaxed text-white/45">
        An illustration of the format, not a live fare. We read you the full breakdown before anything is booked.
      </p>
    </div>
  );
}
