"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const serviceOptions = [
  "Executive search",
  "Key and niche talent recruitment",
  "RPO, staffing and pooling",
  "Global expansions",
  "Mergers and acquisitions",
  "Not sure yet — advise me"
];

const fieldClass =
  "h-12 w-full border border-[#dcdfeb] bg-white px-4 text-sm text-[#2c3272] outline-none transition-colors placeholder:text-slate-400 focus:border-[#ed6929] focus:ring-2 focus:ring-[#ed6929]/20";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2c3272]";

const emptyForm = {
  name: "",
  email: "",
  contact: "",
  industry: "",
  location: "",
  service: ""
};

export default function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }

      router.push("/thank-you");
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className={labelClass} htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={update("name")}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2">
          <label className={labelClass} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={update("email")}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2">
          <label className={labelClass} htmlFor="contact-number">
            Contact number
          </label>
          <input
            id="contact-number"
            name="contact"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 00000 00000"
            value={values.contact}
            onChange={update("contact")}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2">
          <label className={labelClass} htmlFor="contact-industry">
            Which industry
          </label>
          <input
            id="contact-industry"
            name="industry"
            type="text"
            required
            placeholder="e.g. Pharma, technology, FMCG"
            value={values.industry}
            onChange={update("industry")}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className={labelClass} htmlFor="contact-location">
            Location
          </label>
          <input
            id="contact-location"
            name="location"
            type="text"
            required
            placeholder="City and country"
            value={values.location}
            onChange={update("location")}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className={labelClass} htmlFor="contact-service">
            What service or help do you need?
          </label>
          <select
            id="contact-service"
            name="service"
            required
            value={values.service}
            onChange={update("service")}
            className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232c3272' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:18px_18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <p role="alert" className="border border-[#f3c9b6] bg-[#fdeee7] px-4 py-3 text-sm text-[#b8431a]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center bg-[#ed6929] px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d85f21] disabled:cursor-not-allowed disabled:opacity-70 sm:justify-self-start"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-xs leading-6 text-slate-500">
        We use these details only to respond to your enquiry.
      </p>
    </form>
  );
}
