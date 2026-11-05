import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TravelBooking.online",
    short_name: "TravelBooking",
    description: "Independent flight booking assistance.",
    start_url: "/",
    display: "browser",
    background_color: "#101C2C",
    theme_color: "#101C2C",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
