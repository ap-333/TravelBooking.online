export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <span aria-hidden className="text-action transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-navy/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
