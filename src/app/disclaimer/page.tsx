import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Disclaimer", description: "Important disclosures about TravelBooking.online, an independent travel booking assistance service that is not an airline.", path: "/disclaimer" });

export default function Page() {
  return (
    <>
    <Crumbs name="Disclaimer" path="/disclaimer" />
    <Prose title="Disclaimer">
      <p>{disclosure}</p>
      <p>Fares and availability change quickly and are not guaranteed until a booking is confirmed. Passengers are responsible for passport, visa and entry requirements.</p>
    </Prose>
    </>
  );
}
