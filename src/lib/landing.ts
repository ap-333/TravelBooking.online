import type { FaqItem } from "@/components/Faq";

export type Landing = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  cta: string;
  help: { title: string; text: string }[];
  askUs: string[];
  faqs: FaqItem[];
};

export const commonFaqs: FaqItem[] = [
  {
    q: "Do you charge booking assistance fees?",
    a: "Any assistance fee is explained on the call before you decide to proceed, and set out on our Service Fees page. You will see the fare, conditions and any fee before anything is booked.",
  },
  {
    q: "Who issues my flight ticket?",
    a: "Tickets are issued by the airline or an authorized ticketing partner. We explain which applies to your booking before you proceed.",
  },
  {
    q: "Are you affiliated with any airline?",
    a: "No. We are an independent booking assistance service and are not affiliated with or endorsed by any airline unless expressly stated.",
  },
];

export const landings: Record<string, Landing> = {
  "flight-booking": {
    path: "/flight-booking",
    seoTitle: "Flight Booking Assistance by Phone",
    seoDescription:
      "Need help booking a flight? Speak with an independent travel specialist who can review your options and explain the fare, conditions and booking process.",
    eyebrow: "Flight booking assistance",
    h1: "Need Help Booking a Flight? Let's Get It Done.",
    intro:
      "Tell us where you're going and when. We'll help you review suitable options and explain the fare, conditions and booking process before you proceed.",
    cta: "Call for Flight Booking Assistance",
    help: [
      { title: "Talk it through", text: "Describe your trip to a real person instead of filtering results alone." },
      { title: "Review your options", text: "We help you compare suitable available flights for your dates and needs." },
      { title: "Clear before you proceed", text: "We explain the fare, conditions and any fee before anything is booked." },
    ],
    askUs: [
      "Where are you travelling from, and to?",
      "What are your preferred dates, and are they flexible?",
      "How many passengers are travelling?",
      "Any special booking requirements?",
    ],
    faqs: [
      { q: "Can I speak to someone about booking a flight?", a: "Yes. Call us, tell us what you need, and we'll help you review your options and move your booking forward." },
      { q: "How do I pay for my flight?", a: "We explain the payment method and who receives your payment before you proceed. We never ask for card details through our website forms." },
      { q: "Can I change or cancel my booking?", a: "That depends on the fare rules of the airline. We explain the conditions up front. See our Cancellation and Refund Policy for who to contact." },
    ],
  },
  "last-minute-flights": {
    path: "/last-minute-flights",
    seoTitle: "Last-Minute Flight Booking Help",
    seoDescription:
      "Need to fly soon? Speak with our team for help reviewing last-minute flight options and understanding the fare and conditions.",
    eyebrow: "Last-minute flights",
    h1: "Need to Book a Flight Soon? Let's Get It Sorted.",
    intro:
      "Looking for available flights on short notice? Speak with our team for assistance reviewing your booking options.",
    cta: "Call for Flight Booking Assistance",
    help: [
      { title: "Fast conversation", text: "Share your route and dates and we start working through options with you." },
      { title: "Short-notice options", text: "We help review what is available. Availability and fares vary and are not guaranteed." },
      { title: "No surprises", text: "Fare, conditions and any fee are explained before you decide." },
    ],
    askUs: [
      "When do you need to travel?",
      "Where from and to?",
      "How many travellers?",
      "Is there any flexibility on dates or airports?",
    ],
    faqs: [
      { q: "Can you help with last-minute bookings?", a: "We can help you review available options for short-notice travel. Availability and pricing depend on the airlines and change quickly, so we can't promise a particular fare or flight." },
      { q: "How quickly can I get a ticket?", a: "Timing depends on the airline and the booking channel. We explain the process and expected timings on the call." },
    ],
  },
  "international-flights": {
    path: "/international-flights",
    seoTitle: "International Flight Booking Help",
    seoDescription:
      "Planning an international trip? Get help reviewing international flight options, fares and conditions from an independent booking team.",
    eyebrow: "International flights",
    h1: "Booking an International Flight? Talk It Through With Us.",
    intro:
      "International fares, connections and conditions can be confusing. We help you understand your options before you proceed.",
    cta: "Call for International Booking Help",
    help: [
      { title: "Routes and connections", text: "We help you weigh direct and connecting options for your journey." },
      { title: "Understand the conditions", text: "Baggage, change and cancellation conditions explained before you commit." },
      { title: "Names and documents", text: "We tell you what passenger details are needed to complete the booking." },
    ],
    askUs: [
      "Departure city and destination country?",
      "Preferred dates and trip length?",
      "Number of passengers?",
      "One-way, return or open-jaw?",
    ],
    faqs: [
      { q: "Do you help with international flights?", a: "Yes. We help you review international flight options and explain the fare, conditions and booking process." },
      { q: "Do you handle visas or passports?", a: "No. You are responsible for passport, visa and entry requirements. Check official government sources for your destination." },
    ],
  },
  "domestic-flights": {
    path: "/domestic-flights",
    seoTitle: "Domestic Flight Booking Assistance",
    seoDescription:
      "Need help booking a US domestic flight? Speak with a travel specialist to review options and understand fare conditions.",
    eyebrow: "US domestic flights",
    h1: "Need a Domestic Flight? Let's Sort the Booking.",
    intro:
      "Flying within the United States? Tell us your route and dates and we'll help you review suitable options.",
    cta: "Call for Domestic Flight Help",
    help: [
      { title: "Straight to the point", text: "A quick call to cover your route, dates and preferences." },
      { title: "Compare sensibly", text: "We help you weigh price, timing and fare conditions." },
      { title: "Clear next step", text: "You know the fare, conditions and process before you proceed." },
    ],
    askUs: ["Where from and to?", "Travel dates?", "How many passengers?", "Any baggage or timing needs?"],
    faqs: [
      { q: "Can I book a domestic flight by phone?", a: "Yes. Call us, share your trip details and we'll help you review options and move the booking forward." },
    ],
  },
  "group-bookings": {
    path: "/group-bookings",
    seoTitle: "Group Flight Booking Assistance",
    seoDescription:
      "Travelling with a group? Get help reviewing group flight options and booking conditions for multiple passengers.",
    eyebrow: "Group bookings",
    h1: "Booking Flights for a Group? Let's Get Everyone Sorted.",
    intro:
      "Multiple passengers add complexity. Speak with our team about your group's route, dates and requirements.",
    cta: "Call About a Group Booking",
    help: [
      { title: "One conversation", text: "Share your group size and plans and we'll explain the options." },
      { title: "Conditions explained", text: "Group fare rules, deadlines and name requirements differ by airline." },
      { title: "Clear process", text: "We outline the steps and what you'll need from each traveller." },
    ],
    askUs: ["How many travellers?", "Route and dates?", "Is everyone departing from the same place?", "Any deadlines for deposits or names?"],
    faqs: [
      { q: "How many passengers count as a group?", a: "Airlines define groups differently. Call us with your numbers and we'll explain what applies to your trip." },
    ],
  },
  "multi-city-flights": {
    path: "/multi-city-flights",
    seoTitle: "Multi-City Flight Booking Assistance",
    seoDescription:
      "Planning a trip with several stops? Get help reviewing multi-city flight itineraries and booking options.",
    eyebrow: "Multi-city flights",
    h1: "Multiple Destinations? We'll Help You Piece It Together.",
    intro:
      "Complex itineraries are easier to talk through than to click through. Tell us your stops and we'll help review the options.",
    cta: "Call About a Multi-City Trip",
    help: [
      { title: "Map the route", text: "We help you order stops sensibly for time and cost." },
      { title: "Compare structures", text: "Multi-city, open-jaw or separate tickets, with the trade-offs explained." },
      { title: "Clear conditions", text: "We explain how changes and cancellations work across the whole itinerary." },
    ],
    askUs: ["Which cities, in what order?", "Dates for each leg?", "Number of passengers?", "How flexible is the route?"],
    faqs: [
      { q: "Can you help with complicated itineraries?", a: "Yes. We help you review multi-stop options and explain how the fare and conditions apply." },
    ],
  },
};
