import type { ReactNode } from "react";

export default function Prose({ title, intro, children, draft = false }: { title: string; intro?: string; children: ReactNode; draft?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
      <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
      {intro && <p className="mt-4 text-lg text-navy/75">{intro}</p>}
      {draft && (
        <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Draft placeholder. Have this page reviewed by a qualified lawyer and complete the bracketed details before launch.
        </p>
      )}
      <div className="mt-8 space-y-4 leading-relaxed text-navy/85 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-action [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
