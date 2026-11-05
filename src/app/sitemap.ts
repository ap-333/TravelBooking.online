import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const paths = [
  "", "/flight-booking", "/last-minute-flights", "/international-flights", "/domestic-flights",
  "/group-bookings", "/multi-city-flights", "/how-it-works", "/about-us", "/contact-us",
  "/service-fees", "/booking-policy", "/cancellation-and-refund-policy", "/privacy-policy",
  "/terms-and-conditions", "/disclaimer", "/do-not-sell-or-share",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: site.lastUpdated, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
