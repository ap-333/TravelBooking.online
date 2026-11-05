import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Cancellation and Refund Policy", description: "Cancellation and refund rules for airline tickets and TravelBooking.online service fees.", path: "/cancellation-and-refund-policy" });

export default function Page() {
  return (
    <>
    <Crumbs name="Cancellation and Refund Policy" path="/cancellation-and-refund-policy" />
    <Prose title="Cancellation and refund policy" draft>
      <h2>Airline tickets</h2>
      <p>[Airline fare rules govern ticket refunds and changes. Explain how customers request them.]</p>
      <h2>Our service fee</h2>
      <p>[Service fee refund conditions.]</p>
      <h2>Who to contact</h2>
      <p>[Which issues go to the airline and which to us. Processing timelines.]</p>
    </Prose>
    </>
  );
}
