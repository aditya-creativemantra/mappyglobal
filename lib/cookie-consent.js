export const CONSENT_STORAGE_KEY = "mappy-cookie-consent";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "mappy:open-cookie-settings";

export const cookieCategories = [
  {
    id: "necessary",
    label: "Necessary",
    required: true,
    summary: "Required for the site to work.",
    detail:
      "These cookies keep the site functioning — serving pages, remembering your cookie choice, and protecting forms from abuse. They cannot be switched off.",
    examples: ["Session and security", "Your cookie preferences", "Form submission protection"]
  },
  {
    id: "preferences",
    label: "Preferences",
    required: false,
    summary: "Remember choices you make on the site.",
    detail:
      "These cookies let the site remember settings that change how it looks or behaves for you, such as a region or language choice.",
    examples: ["Region selection", "Display preferences"]
  },
  {
    id: "statistics",
    label: "Statistics",
    required: false,
    summary: "Help us understand how the site is used.",
    detail:
      "These cookies collect anonymous information about which pages are visited and how visitors move through the site, so we can improve it.",
    examples: ["Pages viewed", "Time on page", "Referring source"]
  },
  {
    id: "marketing",
    label: "Marketing",
    required: false,
    summary: "Used to measure and target campaigns.",
    detail:
      "These cookies are used to measure the performance of our campaigns and to show relevant content on other platforms.",
    examples: ["Campaign attribution", "Audience measurement"]
  }
];

export const defaultConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false
};

export const allConsent = {
  necessary: true,
  preferences: true,
  statistics: true,
  marketing: true
};

export function readConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    if (parsed?.version !== CONSENT_VERSION) {
      return null;
    }

    return { ...defaultConsent, ...parsed.categories };
  } catch {
    return null;
  }
}

export function writeConsent(categories) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    categories: { ...categories, necessary: true }
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the choice
    // simply is not remembered in that case.
  }
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
  }
}
