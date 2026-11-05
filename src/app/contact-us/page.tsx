import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Contact Us", description: "Call or send an enquiry to the TravelBooking.online travel assistance team.", path: "/contact-us" });

export default function Page() {
  return (
    <>
    <Crumbs name="Contact Us" path="/contact-us" />
    <Prose title="Contact us" intro="The quickest way to get moving is to call.">
      <CallButton location="contact" showNumber />
      <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />Hours: {site.hours}<br />{site.legalName}, {site.address}</p>
      <h2>Send an enquiry</h2>
      <EnquiryForm source="/contact-us" />
    </Prose>
    </>
  );
}
