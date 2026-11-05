import Link from "next/link";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1522] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="TravelBooking.online home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${site.phoneTel}`}
          className="whitespace-nowrap rounded-xl bg-action px-3 py-2 text-sm font-semibold text-white shadow-[0_3px_0_#1a54cc] transition hover:-translate-y-px hover:bg-[#3a7bff] sm:px-4"
        >
          {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
