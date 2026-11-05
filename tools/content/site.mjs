// Single source of truth for business identity and contact details.
// Replace the placeholders before launch; every page reads from here.
export const site = {
  name: "TravelBooking.online",
  domain: "travelbooking.online",
  url: "https://travelbooking.online",
  // Toll-free line. If a call-tracking number is used, change both values here only.
  phoneDisplay: "(888) 259-4728",
  phoneTel: "+18882594728",
  email: "contact@travelbooking.online",
  // TODO: legal entity, registered address and any real seller-of-travel details.
  // Do not publish ARC / IATA / Seller of Travel numbers unless they are genuine.
  legalName: "TRAVELBOOKINGONLINE LLC",
  address: "29 Plaza Way Apt 4118, Plymouth, MA 02360-7899",
  hours: "Monday to Saturday, 7 AM – 9 PM Eastern Time",
  // Structured copies of address and hours for schema.org markup. Keep in step with the text above.
  addressParts: { street: "29 Plaza Way Apt 4118", city: "Plymouth", region: "MA", postalCode: "02360", country: "US" },
  hoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "21:00" },
  lastUpdated: "2026-11-05",
};

export const disclosure =
  "TravelBooking.online is an independent travel booking assistance service. We are not an airline and are not affiliated with or endorsed by any airline unless expressly stated. Airline bookings are subject to the applicable carrier's terms and conditions.";

export const nav = [
  { href: "/flight-booking", label: "Flights" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
];
