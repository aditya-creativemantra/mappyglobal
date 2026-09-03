"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import CookieToggle from "@/components/CookieToggle";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  allConsent,
  cookieCategories,
  defaultConsent,
  readConsent,
  writeConsent
} from "@/lib/cookie-consent";

const tabs = ["Consent", "Details", "About"];

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("Consent");
  const [choices, setChoices] = useState(defaultConsent);

  useEffect(() => {
    const stored = readConsent();

    if (stored) {
      setChoices(stored);
    } else {
      setOpen(true);
    }

    const onOpen = () => {
      setChoices(readConsent() || defaultConsent);
      setTab("Consent");
      setOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  const save = useCallback((categories) => {
    writeConsent(categories);
    setChoices(categories);
    setOpen(false);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#16204a]/50 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-[#dcdfeb] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between border-b border-[#dcdfeb] px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2c3272]">Cookie preferences</p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => save(choices)}
            className="text-2xl leading-none text-[#6c7290] transition-colors hover:text-[#2c3272]"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-3 border-b border-[#dcdfeb]">
          {tabs.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTab(name)}
              className={`border-b-2 py-4 text-sm font-semibold transition-colors ${
                tab === name
                  ? "border-[#ed6929] text-[#ed6929]"
                  : "border-transparent text-[#2c3272] hover:text-[#ed6929]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {tab === "Consent" ? (
          <div>
            <div className="px-6 py-7 sm:px-8">
              <h2 className="text-lg font-semibold text-[#2c3272]">This website uses cookies</h2>
              <p className="mt-4 text-sm leading-7 text-[#2c3272]">
                Cookies are small data files placed on your device when you visit a website. We use them to keep the
                site working as you expect and, with your permission, to understand how it is used. You can choose
                which categories to allow, and change your choice at any time from the cookie settings link in our
                footer. More detail is in our{" "}
                <Link href="/privacy-policy" className="text-[#2c3272] underline underline-offset-4 hover:text-[#ed6929]">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-[#dcdfeb] border-y border-[#dcdfeb] sm:grid-cols-4 sm:divide-y-0">
              {cookieCategories.map((category) => (
                <CookieToggle
                  key={category.id}
                  id={`consent-${category.id}`}
                  label={category.label}
                  checked={category.required || choices[category.id]}
                  disabled={category.required}
                  onChange={(value) => setChoices((current) => ({ ...current, [category.id]: value }))}
                />
              ))}
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
              <button
                type="button"
                onClick={() => save(choices)}
                className="border border-[#2c3272] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:bg-[#2c3272] hover:text-white"
              >
                Allow selection
              </button>
              <button
                type="button"
                onClick={() => save(allConsent)}
                className="border border-[#ed6929] bg-[#ed6929] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#d85f21] hover:bg-[#d85f21]"
              >
                Allow all
              </button>
            </div>
          </div>
        ) : null}

        {tab === "Details" ? (
          <div className="divide-y divide-[#dcdfeb]">
            {cookieCategories.map((category) => (
              <div key={category.id} className="px-6 py-6 sm:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-[#2c3272]">{category.label}</h3>
                  <span className="border border-[#dcdfeb] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6c7290]">
                    {category.required ? "Always on" : choices[category.id] ? "Allowed" : "Not allowed"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#2c3272]">{category.detail}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.examples.map((example) => (
                    <li key={example} className="border border-[#dcdfeb] px-3 py-1.5 text-xs text-[#2c3272]">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "About" ? (
          <div className="space-y-5 px-6 py-7 text-sm leading-7 text-[#2c3272] sm:px-8">
            <p>
              Cookies are small text files that websites place on your device. They can be read back on later visits,
              which lets a site remember things like your preferences, or measure how the site is being used.
            </p>
            <p>
              Mappy Global Resources uses only the cookies necessary to run this website. If we introduce statistics
              or marketing cookies in future, they will be switched off until you allow them here.
            </p>
            <p>
              Your choice is stored on this device only. You can change or withdraw it at any time using the cookie
              settings link in the footer, and you can clear stored cookies through your browser settings.
            </p>
            <p>
              For how we handle personal information more generally, see our{" "}
              <Link href="/privacy-policy" className="text-[#2c3272] underline underline-offset-4 hover:text-[#ed6929]">
                privacy policy
              </Link>
              .
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
