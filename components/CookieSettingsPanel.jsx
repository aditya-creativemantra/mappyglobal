"use client";

import { useEffect, useState } from "react";

import CookieToggle from "@/components/CookieToggle";
import { allConsent, cookieCategories, defaultConsent, readConsent, writeConsent } from "@/lib/cookie-consent";

export default function CookieSettingsPanel() {
  const [choices, setChoices] = useState(defaultConsent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setChoices(readConsent() || defaultConsent);
  }, []);

  const persist = (categories) => {
    writeConsent(categories);
    setChoices(categories);
    setSaved(true);
  };

  return (
    <div className="border border-[#dcdfeb] bg-white">
      <div className="grid grid-cols-2 divide-x divide-y divide-[#dcdfeb] border-b border-[#dcdfeb] sm:grid-cols-4 sm:divide-y-0">
        {cookieCategories.map((category) => (
          <CookieToggle
            key={category.id}
            id={`settings-${category.id}`}
            label={category.label}
            checked={category.required || choices[category.id]}
            disabled={category.required}
            onChange={(value) => {
              setSaved(false);
              setChoices((current) => ({ ...current, [category.id]: value }));
            }}
          />
        ))}
      </div>

      <div className="divide-y divide-[#dcdfeb]">
        {cookieCategories.map((category) => (
          <div key={category.id} className="px-6 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-base font-semibold text-[#2c3272]">{category.label}</h2>
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

      <div className="flex flex-col flex-wrap items-stretch gap-3 border-t border-[#dcdfeb] p-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => persist(defaultConsent)}
          className="border border-[#2c3272] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:bg-[#2c3272] hover:text-white"
        >
          Deny all
        </button>
        <button
          type="button"
          onClick={() => persist(choices)}
          className="border border-[#2c3272] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:bg-[#2c3272] hover:text-white"
        >
          Save selection
        </button>
        <button
          type="button"
          onClick={() => persist(allConsent)}
          className="border border-[#ed6929] bg-[#ed6929] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#d85f21] hover:bg-[#d85f21]"
        >
          Allow all
        </button>

        {saved ? (
          <p role="status" className="text-sm text-[#2c3272]">
            Your cookie preferences have been saved on this device.
          </p>
        ) : null}
      </div>
    </div>
  );
}
