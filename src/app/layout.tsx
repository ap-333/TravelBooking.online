import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallBar from "@/components/CallBar";
import BoardingPassPopup from "@/components/BoardingPassPopup";
import JsonLd from "@/components/JsonLd";
import { GtmBody, GtmHead } from "@/components/Gtm";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap", preload: false });
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101C2C",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "Flight Booking Assistance | TravelBooking.online",
    template: "%s | TravelBooking.online",
  },
  description:
    "Independent flight booking assistance. Talk to a real person, review your options and get your booking moving.",
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_US", url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/symbol.svg`,
      email: site.email,
      contactPoint: [{ "@type": "ContactPoint", telephone: site.phoneTel, contactType: "customer service", areaServed: "US", availableLanguage: "English" }],
      description: "Independent travel booking assistance service. Not an airline.",
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": `${site.url}/#organization` }, inLanguage: "en-US" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col pb-20 md:pb-0">
        <GtmBody />
        <JsonLd data={orgSchema} />
        <GtmHead />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallBar />
        <BoardingPassPopup />
      </body>
    </html>
  );
}
