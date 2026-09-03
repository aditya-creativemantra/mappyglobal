import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { btnOutline, btnPrimary, eyebrowClass, servicePaths } from "@/lib/site";

export const metadata = {
  title: "Services | Mappy Global Resources",
  description:
    "Executive search, key and niche talent recruitment, RPO and staffing, global expansions, and M&A talent support from Mappy Global Resources."
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <main>
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className={eyebrowClass}>Services</p>
            <h1 className="mt-6 max-w-4xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-6xl lg:text-[4.25rem]">
              End-to-end recruitment at global scale.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5170]">
              From executive search to niche hiring, embedded recruitment support, expansions, and M&amp;A talent work
              — built around the roles your business cannot afford to get wrong.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className={btnPrimary}>
                Start a search
              </Link>
              <Link href="/industries" className={btnOutline}>
                See our industries
              </Link>
            </div>
          </div>
        </section>

        {/* Index */}
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
            <div className="grid grid-cols-2 gap-px border border-[#dcdfeb] bg-[#dcdfeb] md:grid-cols-3 xl:grid-cols-5">
              {servicePaths.map(({ title, slug, icon: Icon }) => (
                <a key={slug} href={`#${slug}`} className="group bg-white p-6 transition-colors hover:bg-[#fdf7f3]">
                  <Icon className="h-6 w-6 text-[#ed6929]" />
                  <p className="mt-4 text-[15px] font-semibold leading-snug text-[#2c3272] group-hover:text-[#ed6929]">
                    {title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Detail per service */}
        {servicePaths.map(({ title, slug, description, points, icon: Icon }, index) => (
          <section
            key={slug}
            id={slug}
            className={`scroll-mt-[84px] lg:scroll-mt-[112px] border-b border-[#dcdfeb] py-20 sm:py-24 ${
              index % 2 === 0 ? "bg-[#f4f5fc]" : "bg-white"
            }`}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
              <div>
                <Icon className="h-8 w-8 text-[#ed6929]" />
                <h2 className="mt-6 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.06] tracking-[-0.03em] text-[#2c3272] sm:text-5xl">
                  {title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#4a5170] sm:text-lg">{description}</p>
                <Link href="/contact" className={`${btnOutline} mt-9`}>
                  Enquire about this service
                </Link>
              </div>

              <div className="lg:pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">What it covers</p>
                <ul className="mt-6 divide-y divide-[#dcdfeb] border-y border-[#dcdfeb]">
                  {points.map((point) => (
                    <li key={point} className="py-5 text-[17px] leading-7 text-[#4a5170]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 border border-[#dcdfeb] bg-[#f4f5fc] p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
              <div>
                <p className={eyebrowClass}>Start the conversation</p>
                <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
                  Not sure which service fits?
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#4a5170] sm:text-lg">
                  Describe the role and the market. A consultant will come back with the approach that fits, within one
                  business day.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact" className={btnPrimary}>
                  Contact us
                </Link>
                <Link href="/why-mappy" className={btnOutline}>
                  Why Mappy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
