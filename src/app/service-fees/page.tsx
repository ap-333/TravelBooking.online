import type { Metadata } from "next";
import Prose from "@/components/Prose";
import CallButton from "@/components/CallButton";
import EnquiryForm from "@/components/EnquiryForm";
import { disclosure, site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Crumbs from "@/components/Crumbs";
void CallButton; void EnquiryForm; void disclosure; void site;

export const metadata: Metadata = pageMeta({ title: "Service Fees", description: "How TravelBooking.online assistance fees and commissions work, explained clearly before you decide to proceed with a booking.", path: "/service-fees" });

export default function Page() {
  return (
    <>
    <Crumbs name="Service Fees" path="/service-fees" />
    <Prose title="Service fees" draft intro="Clear pricing, explained before you proceed.">
      <p>[State exactly: whether an assistance fee applies, the amount or how it is calculated, when it is charged and whether it is refundable.]</p>
      <p>[State whether commissions may be earned from eligible completed bookings.]</p>
      <p>We explain the fare, conditions and any fee before you decide to proceed.</p>
    </Prose>
    </>
  );
}
