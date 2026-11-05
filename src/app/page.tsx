import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import QuoteCard from "@/components/QuoteCard";
import TripBoard from "@/components/TripBoard";
import FlightPaths from "@/components/FlightPaths";
import Ticket from "@/components/Ticket";
import { Backpack, BagTrio, Carryon, Duffel, Suitcase } from "@/components/Bags";
import Section from "@/components/Section";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "TravelBooking.online: Independent Flight Booking Help",
  description: "Talk to a real person about your flight. Independent booking assistance with the fare, conditions and fees explained before you decide.",
  path: "/",
  absoluteTitle: true,
});

const services = [
  { href: "/flight-booking", tag: "01", title: "Flight bookings", text: "Domestic and international. Tell us the trip, we'll help sort the booking." },
  { href: "/last-minute-flights", tag: "02", title: "Last-minute flights", text: "Time-sensitive travel? We help review what's available." },
  { href: "/international-flights", tag: "03", title: "International travel", text: "Routes, connections and conditions explained clearly." },
  { href: "/group-bookings", tag: "04", title: "Group & multi-city", text: "Multiple travellers or multiple stops, handled in one conversation." },
];

const steps = [
  ["1", "Tell us what you need", "Call with your route, dates, passenger numbers and preferences. We read the details back so nothing is missed."],
  ["2", "We help you explore options", "We review suitable available options with you and explain the trade-offs between price, timing and fare conditions."],
  ["3", "Review the full picture", "Fare, taxes, conditions and any assistance fee are explained before you decide anything."],
  ["4", "Get your booking done", "If you're happy to proceed, the booking is completed through an authorized booking channel."],
];

const call = [
  ["We tell you who we are", "We open by making clear we're an independent service, not an airline."],
  ["We take your trip details", "Route, dates, passengers, preferences. Then we read it back."],
  ["We walk through real options", "Practical choices across price and timing, with no pressure."],
  ["We explain the cost and conditions", "The fare, what's included and any fee, before you decide."],
  ["You decide, in your own time", "Take the details away and think it over if you want to."],
];

const why = [
  ["A person, not a phone tree", "Talk to someone who can take ownership of your booking requirement."],
  ["Clear before you proceed", "You hear the fare, conditions and any fee before anything is booked."],
  ["Complicated itineraries welcome", "Multi-city, groups and awkward connections are easier talked through."],
  ["Independent, and upfront about it", "We say plainly what we are and who issues your ticket."],
  ["Practical options, not hype", "We don't promise the cheapest fare anywhere. We help you find something that works."],
  ["Follow-through", "We do what we say we'll do, and tell you plainly what we can't."],
];

const situations = [
  ["Need to fly soon?", "/last-minute-flights"],
  ["Planning an international trip?", "/international-flights"],
  ["Travelling with family or a group?", "/group-bookings"],
  ["Need multiple destinations?", "/multi-city-flights"],
  ["Not sure which flight works best?", "/flight-booking"],
  ["Flying within the US?", "/domestic-flights"],
];

const faqs = [
  { q: "Can I speak to someone about booking a flight?", a: "Yes. Call us, tell us where you're going and when, and we'll help you review your options." },
  { q: "Do you help with international flights?", a: "Yes. We help you review international options and explain the fare, conditions and booking process." },
  { q: "Can you help with last-minute bookings?", a: "We can help you review what's available at short notice. Availability and fares change quickly and can't be guaranteed." },
  { q: "Do you charge booking assistance fees?", a: "Any fee is explained before you proceed and listed on our Service Fees page." },
  { q: "How do I pay for my flight?", a: "We explain how payment works and who receives it before you decide to proceed." },
  { q: "Who issues my flight ticket?", a: "The airline or an authorized ticketing partner. We tell you which applies to your booking." },
  { q: "Can I change or cancel my booking?", a: "That depends on the airline's fare rules and our policies. See our Cancellation and Refund Policy." },
  { q: "Are you affiliated with any airline?", a: "No. We are an independent service, not affiliated with or endorsed by any airline unless expressly stated." },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Independent travel booking assistance"
        title={<>Your travel plans.<br />Let&apos;s get them <span className="text-[#6c9bff]">done.</span></>}
        intro="Booking a flight, planning an international trip or sorting out a last-minute journey? Call and talk it through with a real person who'll help you work through your options."
        cta="Talk to a Travel Specialist"
        location="home_hero"
        secondary={
          <Link href="/how-it-works" className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10">
            How it works
          </Link>
        }
      />

      <Section tone="soft" eyebrow="What we help with" title="What do you need to get done?" decor={<Suitcase className="h-36 w-auto -rotate-6" />}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-action hover:shadow-xl">
              <span className="font-mono text-xs text-action">{s.tag}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-navy/70">{s.text}</p>
              <span className="mt-5 text-sm font-semibold text-action transition-transform group-hover:translate-x-1">Get help →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="dark" eyebrow="Before you pay" title="Know what you're agreeing to, before you agree." decor={<Suitcase tone="dark" className="h-28 w-auto rotate-6" />}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-white/75">
            <p>Travel pricing can be confusing. On the call we break it down: the airfare, taxes and carrier charges, and any assistance fee, so you can see how the total is made up.</p>
            <ul className="space-y-3 text-base">
              {["The total is explained in full before payment", "Any assistance fee is stated up front, never added after", "If a fare changes during the call, we stop and tell you", "Nothing is booked until you say yes"].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-action">✓</span>{t}</li>
              ))}
            </ul>
            <CallButton location="home_pricing" showNumber className="shadow-[0_4px_0_#1a54cc]" />
          </div>
          <QuoteCard />
        </div>
      </Section>

      <Section eyebrow="Simple 4-step process" title="No complicated processes. Just a clear way forward." decor={<Carryon className="h-36 w-auto rotate-6" />}>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, d]) => (
            <li key={n} className="relative rounded-2xl border border-navy/10 p-6">
              <span className="font-heading text-6xl font-extrabold text-action/15">{n}</span>
              <h3 className="mt-2 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-navy/70">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft" eyebrow="Before you dial" title="What happens when you call." decor={<Duffel className="h-20 w-auto -rotate-3" />}>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
          <TripBoard />
          <ol className="space-y-3">
            {call.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm text-white">{i + 1}</span>
                <div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-navy/70">{d}</p></div>
              </li>
            ))}
          </ol>
          </div>
          <aside className="h-fit rounded-2xl bg-navy p-7 text-white lg:sticky lg:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">Have these ready</p>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>Where you&apos;re flying from and to</li>
              <li>Your travel dates (and flexibility)</li>
              <li>Number of passengers</li>
              <li>Each passenger&apos;s name as on their ID</li>
            </ul>
            <CallButton label="Call now" location="home_call_card" showNumber className="mt-6 w-full shadow-[0_4px_0_#1a54cc]" />
          </aside>
        </div>
      </Section>

      <Section tone="soft" eyebrow="Transparent pricing" title="What you pay, and why." decor={<Ticket className="w-72 rotate-3 opacity-90" />}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-4 text-lg text-navy/80">
            <li className="flex gap-3"><span className="text-action">✓</span>The total is explained in full before payment</li>
            <li className="flex gap-3"><span className="text-action">✓</span>Any assistance fee is stated up front</li>
            <li className="flex gap-3"><span className="text-action">✓</span>If the fare changes mid-call, we stop and re-explain</li>
          </ul>
          <dl className="divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white">
            {[
              ["Airfare", "Set by the airline, based on availability", "Quoted per search"],
              ["Government taxes & airport fees", "Mandatory charges set by governments and airports", "Itemised"],
              ["Carrier-imposed charges", "Surcharges and airline fees where applicable", "Itemised"],
              ["Assistance fee", "Our fee for search and booking assistance", "Stated up front"],
            ].map(([k, d, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 p-5">
                <div><dt className="font-bold">{k}</dt><dd className="mt-1 text-sm text-navy/65">{d}</dd></div>
                <span className="shrink-0 font-mono text-xs text-action">{v}</span>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section eyebrow="Why talk to us" title="Sometimes, it's easier to just talk to someone." decor={<Backpack className="h-32 w-auto -rotate-3" />}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-soft p-6">
              <h3 className="text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-navy/70">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft" eyebrow="Your situation" title="Whatever the travel situation, let's figure out the next step." decor={<Duffel className="h-24 w-auto rotate-3" />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map(([t, href]) => (
            <Link key={t} href={href} className="flex items-center justify-between rounded-2xl bg-white p-6 font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
              {t} <span className="text-action">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Common questions" title="Questions, answered.">
        <div className="max-w-3xl"><Faq items={faqs} /></div>
      </Section>

      <section className="hero-bg text-white">
        <FlightPaths />
        <div aria-hidden className="absolute bottom-0 left-6 hidden opacity-90 lg:block"><BagTrio tone="dark" /></div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl font-extrabold md:text-5xl">Let&apos;s get your next trip moving.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">Have a destination in mind? Speak with our team and get help with your booking.</p>
          <div className="mt-8"><CallButton label="Call Our Travel Assistance Team" location="home_footer" showNumber className="shadow-[0_4px_0_#1a54cc]" /></div>
        </div>
      </section>
    </>
  );
}
