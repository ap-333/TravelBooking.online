// Decorative "departure board" showing the details we ask for on a call. Not flight data.
const rows = [
  ["FROM", "Where you're leaving"],
  ["TO", "Where you're going"],
  ["DATES", "Outbound and return"],
  ["PAX", "How many travellers"],
  ["NAMES", "As shown on each ID"],
];

export default function TripBoard({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-[#0b1522] text-white shadow-xl ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
        <span>Your trip details</span>
        <span className="flex items-center gap-2 text-[#6c9bff]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6c9bff] motion-reduce:animate-none" /> Ready to review
        </span>
      </div>
      <dl className="divide-y divide-white/10 font-mono text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 px-5 py-3.5">
            <dt className="text-[#6c9bff]">{k}</dt>
            <dd className="text-white/85">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
