import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-action">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">This flight isn&apos;t on the board.</h1>
      <p className="mt-4 text-lg text-navy/70">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="rounded-xl border border-navy/20 px-6 py-3.5 font-semibold transition-colors hover:bg-soft">Back to homepage</Link>
        <CallButton location="404" showNumber />
      </div>
    </div>
  );
}
