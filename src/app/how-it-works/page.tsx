import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "How It Works", description: "How TravelBooking.online helps you review options and complete a flight booking.", path: "/how-it-works" });

export default function Page() {
  return (
    <>
    <Crumbs name="How It Works" path="/how-it-works" />
    <Prose title="How it works" intro="A clear way forward in three steps.">
      <h2>1. Tell us what you need</h2>
      <p>Call us with your route, dates, passenger numbers and preferences.</p>
      <h2>2. Explore your options</h2>
      <p>We help you review suitable available options and explain the fare, conditions and any assistance fee.</p>
      <h2>3. Get your booking done</h2>
      <p>If you decide to proceed, the booking is completed through an authorized booking channel. We explain who issues the ticket and how payment works first.</p>
      <p>{disclosure}</p>
      <CallButton location="how_it_works" showNumber />
    </Prose>
    </>
  );
}
