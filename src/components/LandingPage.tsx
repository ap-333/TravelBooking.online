import CallButton from "./CallButton";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import Crumbs from "./Crumbs";
import Section from "./Section";
import Hero from "./Hero";
import { BagTrio, Suitcase, Backpack } from "./Bags";
import EnquiryForm from "./EnquiryForm";
import Link from "next/link";
import { commonFaqs, type Landing } from "@/lib/landing";
import { disclosure, site } from "@/lib/site";

export default function LandingPage({ page }: { page: Landing }) {
  const faqs = [...page.faqs, ...commonFaqs];
  return (
    <>
      <Crumbs name={page.eyebrow} path={page.path} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.eyebrow,
          description: page.seoDescription,
          url: `${site.url}${page.path}`,
          serviceType: "Flight booking assistance",
          areaServed: "US",
          provider: { "@id": `${site.url}/#organization` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Hero eyebrow={page.eyebrow} title={page.h1} intro={page.intro} cta={page.cta} location={`${page.path}_hero`} />

      <Section eyebrow="How we help" title="How we help" decor={<Suitcase className="h-32 w-auto -rotate-6" />}>
        <div className="grid gap-5 md:grid-cols-3">
          {page.help.map((h) => (
            <div key={h.title} className="rounded-2xl bg-soft p-6">
              <h3 className="text-lg font-bold">{h.title}</h3>
              <p className="mt-2 text-navy/75">{h.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft" eyebrow="Before you dial" title="Have this ready when you call" decor={<Backpack className="h-28 w-auto rotate-3" />}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.askUs.map((q) => (
            <li key={q} className="rounded-xl bg-white p-4 shadow-sm">{q}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Transparency" title="Booking and payment, explained">
        <div className="max-w-3xl space-y-3 text-navy/80">
          <p>{disclosure}</p>
          <p>
            Before you proceed we explain the fare, conditions, who issues the ticket, how payment works and any assistance fee. See{" "}
            <Link href="/service-fees" className="text-action underline">service fees</Link>,{" "}
            <Link href="/booking-policy" className="text-action underline">booking policy</Link> and{" "}
            <Link href="/cancellation-and-refund-policy" className="text-action underline">cancellations and refunds</Link>.
          </p>
        </div>
      </Section>

      <Section tone="soft" eyebrow="FAQ" title="Common questions">
        <div className="max-w-3xl"><Faq items={faqs} /></div>
      </Section>

      <Section title="Prefer to send details first?" intro="Leave your trip details and we'll get back to you.">
        <div className="max-w-2xl"><EnquiryForm source={page.path} /></div>
      </Section>

      <section className="hero-bg text-white">
        <div aria-hidden className="absolute bottom-0 right-6 hidden opacity-90 lg:block"><BagTrio tone="dark" /></div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold md:text-4xl">Let&apos;s get your next trip moving.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">Speak with {site.name} and get help with your booking.</p>
          <div className="mt-6"><CallButton label="Call Our Travel Assistance Team" location={`${page.path}_footer`} showNumber className="shadow-[0_4px_0_#1a54cc]" /></div>
        </div>
      </section>
    </>
  );
}
