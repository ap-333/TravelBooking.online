import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { landings } from "@/lib/landing";
import { pageMeta } from "@/lib/seo";

const page = landings["domestic-flights"];

export const metadata: Metadata = pageMeta({ title: page.seoTitle, description: page.seoDescription, path: page.path });

export default function Page() {
  return <LandingPage page={page} />;
}
