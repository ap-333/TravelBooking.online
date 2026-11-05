import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Booking Policy", description: "How flight bookings, payments and ticketing work with TravelBooking.online, including who issues your ticket.", path: "/booking-policy" });

export default function Page() {
  return (
    <>
    <Crumbs name="Booking Policy" path="/booking-policy" />
    <Prose title="Booking policy" draft>
      <ul>
        <li>[Do customers pay the airline directly, or does {site.name} process payment?]</li>
        <li>[Who issues the ticket: airline or authorized ticketing partner?]</li>
        <li>[Passenger name and document requirements.]</li>
        <li>[Payment provider handling card data. Card details are never collected through site forms.]</li>
      </ul>
      <p>{disclosure}</p>
    </Prose>
    </>
  );
}
