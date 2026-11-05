import Link from "next/link";
import { disclosure, site } from "@/lib/site";
import Logo from "./Logo";

const services = [
  ["/flight-booking", "Flight booking"],
  ["/last-minute-flights", "Last-minute flights"],
  ["/international-flights", "International flights"],
  ["/domestic-flights", "Domestic flights"],
  ["/group-bookings", "Group bookings"],
  ["/multi-city-flights", "Multi-city flights"],
];
const company = [
  ["/how-it-works", "How it works"],
  ["/about-us", "About us"],
  ["/contact-us", "Contact us"],
  ["/service-fees", "Service fees"],
];
const legal = [
  ["/privacy-policy", "Privacy policy"],
  ["/terms-and-conditions", "Terms and conditions"],
  ["/booking-policy", "Booking policy"],
  ["/cancellation-and-refund-policy", "Cancellations and refunds"],
  ["/disclaimer", "Disclaimer"],
  ["/do-not-sell-or-share", "Do not sell or share"],
];

function Col({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-bold text-white">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="text-white/70 transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-white/70">Real people. Practical options. Bookings made easier.</p>
            <a href={`tel:${site.phoneTel}`} className="mt-4 inline-block text-sm font-semibold">
              {site.phoneDisplay}
            </a>
          </div>
          <Col title="Services" links={services} />
          <Col title="Company" links={company} />
          <Col title="Legal" links={legal} />
        </div>
        <p className="mt-10 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/60">
          {disclosure}
        </p>
        <p className="mt-3 text-xs text-white/50">
          © {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
