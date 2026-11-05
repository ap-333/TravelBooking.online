import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "About Us", description: "About TravelBooking.online, an independent travel booking assistance service.", path: "/about-us" });

export default function Page() {
  return (
    <>
    <Crumbs name="About Us" path="/about-us" />
    <Prose title="About us" intro="A capable booking desk for people who want travel plans handled.">
      <p>{site.name} is an independent travel booking assistance service. Our team helps customers understand their flight options and move bookings forward.</p>
      <p>{disclosure}</p>
      <p>Business details: {site.legalName}, {site.address}.</p>
    </Prose>
    </>
  );
}
