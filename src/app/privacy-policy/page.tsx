import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "How TravelBooking.online collects, uses and protects your personal information.", path: "/privacy-policy" });

export default function Page() {
  return (
    <>
    <Crumbs name="Privacy Policy" path="/privacy-policy" />
    <Prose title="Privacy policy" draft>
      <p>[Categories collected: names, contact details, dates of birth, travel details, call recordings, analytics data.]</p>
      <p>[Purposes, sharing with airlines and partners, retention, security, and US state privacy rights such as CCPA/CPRA.]</p>
      <p>Contact: {site.email}</p>
    </Prose>
    </>
  );
}
