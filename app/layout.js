import { Kumbh_Sans } from "next/font/google";

import CookieConsent from "@/components/CookieConsent";

import "./globals.css";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kumbh-sans",
  display: "swap"
});

export const metadata = {
  title: "Mappy Global Resources | Partnering in Your Critical and Niche Talent Needs",
  description:
    "Mappy Global Resources is a global recruitment agency delivering executive search, niche talent recruitment, RPO support, global expansion hiring, and M&A talent advisory across key international markets."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kumbhSans.variable}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
