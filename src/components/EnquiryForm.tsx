"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "mt-1 w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base focus:border-action focus:outline-2 focus:outline-action/30";

export default function EnquiryForm({ source = "contact" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "enquiry_submit", source });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl bg-soft p-6">
        <p className="font-heading text-xl font-bold">Thanks, we have your enquiry.</p>
        <p className="mt-2 text-navy/75">A member of our team will contact you using the details you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="text-sm font-medium">Full name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-medium">Phone
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-medium sm:col-span-2">Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-medium">Travelling from
        <input name="origin" className={field} />
      </label>
      <label className="text-sm font-medium">Destination
        <input name="destination" className={field} />
      </label>
      <label className="text-sm font-medium">Preferred dates
        <input name="dates" className={field} placeholder="e.g. 12 to 20 March, flexible" />
      </label>
      <label className="text-sm font-medium">Passengers
        <input name="passengers" type="number" min={1} max={99} defaultValue={1} className={field} />
      </label>
      <label className="text-sm font-medium sm:col-span-2">Anything else we should know?
        <textarea name="notes" rows={4} className={field} />
      </label>
      <p className="text-xs text-navy/60 sm:col-span-2">
        Please do not enter payment card details here. We will never ask for them by form.
      </p>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-xl bg-action px-6 py-3.5 font-semibold text-white transition-colors hover:bg-action-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            Something went wrong. Please call us instead.
          </p>
        )}
      </div>
    </form>
  );
}
