import Link from "next/link";

import CookieSettingsPanel from "@/components/CookieSettingsPanel";
import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { eyebrowClass } from "@/lib/site";

export const metadata = {
  title: "Cookie settings | Mappy Global Resources",
  description:
    "Review and change which cookies Mappy Global Resources may use on this device — necessary, preferences, statistics, and marketing."
};

export default function CookieSettingsPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <PageMotion>
        <main>
          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <p className={eyebrowClass}>Legal</p>
              <h1 className="mt-6 max-w-4xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] lg:text-6xl">
                Cookie settings.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#2c3272]">
                Choose which categories of cookies this site may use. Necessary cookies keep the site working and cannot
                be turned off; everything else is off until you allow it.
              </p>
            </div>
          </section>

          <section className="py-20 sm:py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <CookieSettingsPanel />

              <p className="mt-8 text-sm leading-7 text-[#2c3272]">
                Your choice is stored on this device only. For how we handle personal information more generally, see
                our{" "}
                <Link href="/privacy-policy" className="text-[#2c3272] underline underline-offset-4 hover:text-[#ed6929]">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </section>
        </main>
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
