import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Do Not Sell or Share My Information", description: "Your privacy choices at TravelBooking.online: how to opt out of the sale or sharing of your personal information.", path: "/do-not-sell-or-share" });

export default function Page() {
  return (
    <>
    <Crumbs name="Do Not Sell or Share My Information" path="/do-not-sell-or-share" />
    <Prose title="Do not sell or share my personal information" draft>
      <p>[Describe whether any personal data is sold or shared for advertising, and how to opt out. Email {site.email}.]</p>
    </Prose>
    </>
  );
}
