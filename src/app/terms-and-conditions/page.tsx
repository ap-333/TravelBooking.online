import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Terms and Conditions", description: "Terms for using TravelBooking.online and its booking assistance service.", path: "/terms-and-conditions" });

export default function Page() {
  return (
    <>
    <Crumbs name="Terms and Conditions" path="/terms-and-conditions" />
    <Prose title="Terms and conditions" draft>
      <p>[Scope of service, customer responsibilities, limitation of liability, governing law.]</p>
      <p>{disclosure}</p>
    </Prose>
    </>
  );
}
