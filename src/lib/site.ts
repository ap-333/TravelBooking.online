// Single source of truth for business identity and contact details.
// Replace the placeholders before launch; every page reads from here.
export const site = {
  name: "TravelBooking.online",
  domain: "travelbooking.online",
  url: "https://travelbooking.online",
  // Toll-free line. If a call-tracking number is used, change both values here only.
  phoneDisplay: "(888) 259-4728",
  phoneTel: "+18882594728",
  email: "support@travelbooking.online",
  // TODO: legal entity, registered address and any real seller-of-travel details.
  // Do not publish ARC / IATA / Seller of Travel numbers unless they are genuine.
  legalName: "[Legal entity name]",
  address: "[Registered business address]",
  hours: "[Opening hours]",
  lastUpdated: "2026-11-01",
} as const;

export const disclosure =
  "TravelBooking.online is an independent travel booking assistance service. We are not an airline and are not affiliated with or endorsed by any airline unless expressly stated. Airline bookings are subject to the applicable carrier's terms and conditions.";

export const nav = [
  { href: "/flight-booking", label: "Flights" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
] as const;
