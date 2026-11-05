import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  title,
  intro,
  eyebrow,
  children,
  tone = "white",
  decor,
}: {
  title?: string;
  intro?: string;
  eyebrow?: string;
  children: ReactNode;
  tone?: "white" | "soft" | "dark";
  decor?: ReactNode;
}) {
  const dark = tone === "dark";
  const bg = tone === "soft" ? "bg-soft" : dark ? "dark-bg text-white" : "bg-white";
  return (
    <section className={`${bg} cv-auto relative overflow-hidden`}>
      {decor && <div aria-hidden className="pointer-events-none absolute right-4 top-10 hidden opacity-90 md:block lg:right-12">{decor}</div>}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {eyebrow && (
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${dark ? "text-white/60" : "text-action"}`}>{eyebrow}</p>
        )}
        {title && <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h2>}
        {intro && <p className={`mt-4 max-w-2xl text-lg ${dark ? "text-white/70" : "text-navy/70"}`}>{intro}</p>}
        <Reveal className={title ? "mt-12" : ""}>{children}</Reveal>
      </div>
    </section>
  );
}
