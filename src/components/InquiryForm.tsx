"use client";

import { useState } from "react";
import { tours } from "@/data/tours";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm({
  defaultTour = "",
}: {
  defaultTour?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  // Web3Forms access key (set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local — see .env.example).
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    if (!accessKey) {
      setStatus("error");
      setError(
        "The enquiry form isn't fully set up yet. Please call or WhatsApp us in the meantime."
      );
      return;
    }

    // Honeypot: if a bot fills the hidden field, silently succeed without sending.
    if (data.botcheck) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New yatra enquiry from ${data.name || "website visitor"}`,
          from_name: "Divine Banaras Website",
          name: data.name,
          phone: data.phone,
          email: data.email,
          tour: data.tour || "General enquiry",
          travel_date: data.date,
          travellers: data.travellers,
          message: data.message,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        throw new Error(body.message || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-maroon">Dhanyavaad! 🙏</h3>
        <p className="mt-2 text-ink/70">
          Your enquiry has reached us. Our yatra team will get back to you very
          soon. For anything urgent, please call or WhatsApp us.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline mt-5"
          type="button"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Honeypot spam trap — hidden from humans, tempting to bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" name="name" required placeholder="Your name" />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          required
          type="tel"
          placeholder="+91…"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tour" className="text-sm font-medium text-ink/80">
            Tour of Interest
          </label>
          <select
            id="tour"
            name="tour"
            defaultValue={defaultTour}
            className="rounded-xl border border-maroon/15 bg-white px-4 py-3 text-sm outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/30"
          >
            <option value="">Not sure yet / general enquiry</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.title}>
                {t.title.split("—")[0].trim()} ({t.duration})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Travel Date (approx.)"
          name="date"
          type="date"
        />
        <Field
          label="No. of Travellers"
          name="travellers"
          type="number"
          placeholder="2"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what you're looking for — darshan preferences, special occasions, budget…"
          className="rounded-xl border border-maroon/15 bg-white px-4 py-3 text-sm outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/30"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="text-xs text-ink/50">
        We respect your privacy — your details are only used to plan your yatra.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink/80">
        {label}
        {required && <span className="text-saffron"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-maroon/15 bg-white px-4 py-3 text-sm outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/30"
      />
    </div>
  );
}
