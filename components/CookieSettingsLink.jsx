"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export default function CookieSettingsLink({ className }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
