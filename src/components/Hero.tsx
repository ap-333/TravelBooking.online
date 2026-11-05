import type { ReactNode } from "react";
import CallButton from "./CallButton";
import FlightPaths from "./FlightPaths";
import QuoteCard from "./QuoteCard";
import Ticket from "./Ticket";

export default function Hero({
  eyebrow,
  title,
  intro,
  cta,
  location,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  cta: string;
  location: string;
  secondary?: ReactNode;
}) {
  return (
    <section className="hero-bg text-white">
      <FlightPaths className="opacity-70 lg:opacity-100" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-action" /> {eyebrow}
          </p>
          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.04] sm:text-6xl lg:text-[4.2rem]">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{intro}</p>

          <div className="mt-7 flex max-w-xl items-start gap-3 rounded-lg border-l-2 border-action bg-white/5 px-4 py-3 text-sm text-white/75">
            <span aria-hidden className="mt-0.5 text-action">ⓘ</span>
            Independent service. Not an airline and not affiliated with any airline. We help you review options and book through an authorized channel.
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CallButton label={cta} location={location} showNumber className="shadow-[0_4px_0_#1a54cc] hover:-translate-y-px" />
            {secondary}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-dashed border-white/15 pt-6 text-sm font-medium text-white/85">
            {["Real people, not a phone tree", "Fare and fees explained first", "Nothing booked until you say yes"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-action" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pb-24">
          <QuoteCard className="hidden lg:block lg:w-[88%] lg:ml-auto" />
          <Ticket className="w-full -rotate-2 lg:absolute lg:bottom-0 lg:left-0 lg:w-[86%]" />
        </div>
      </div>
    </section>
  );
}
