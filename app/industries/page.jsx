import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { btnOutline, btnPrimary, eyebrowClass, industryTags } from "@/lib/site";

export const metadata = {
  title: "Industries | Mappy Global Resources",
  description:
    "Sector coverage across FMCG and FMCD, engineering and manufacturing, auto and farm equipment, technology, fintech, energy, construction, e-commerce, real estate, QSR, and chemicals."
};

// Sector cards are labels, not links. The orange panel sits as a small tab on
// the right edge and expands leftwards to flood the card on hover and press —
// the same state on every card, per the content brief.
const cardBase =
  "group relative flex h-full cursor-default select-none flex-col overflow-hidden rounded-[20px] border border-[#dcdfeb] bg-white p-8 transition-colors duration-300 hover:border-[#ed6929] active:border-[#ed6929] sm:p-9";

// 23x76 tab, rounded on its left side, growing to fill the whole card.
const fillBase =
  "absolute right-0 top-[calc(50%-38px)] h-[76px] w-[23px] rounded-l-[15px] bg-[#ed6929] transition-all duration-300 ease-out";
const fillHover =
  "group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rounded-none group-active:top-0 group-active:h-full group-active:w-full group-active:rounded-none";

export default function IndustriesPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <PageMotion>
        <main>
          {/* Banner */}
          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="relative order-1 min-h-[320px] overflow-hidden sm:min-h-[420px] lg:order-2 lg:min-h-[560px]">
                <Image
                  src="/whymappy.webp"
                  alt="Mappy consultants reviewing sector hiring data"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[58%_center]"
                />
              </div>

              <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-20">
                <div className="w-full max-w-xl">
                  <p className={eyebrowClass}>Industries</p>
                  <h1 className="mt-6 font-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-[2.9rem] lg:text-[3.4rem]">
                    Industry expertise across every vertical.
                  </h1>
                  <p className="mt-7 text-lg leading-8 text-[#2c3272]">
                    Wherever talent is critical, Mappy brings the context, access, and search discipline to deliver —
                    across the sectors below and the ones our clients take us into next.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link href="/contact" className={btnPrimary}>
                      Discuss your sector
                    </Link>
                    <Link href="/services" className={btnOutline}>
                      See our services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sector coverage */}
          <section className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className={`${eyebrowClass} text-center`}>Where we hire</p>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {industryTags.map(({ name, segments }) => (
                  <div key={name} className={cardBase}>
                    <span aria-hidden className={`${fillBase} ${fillHover}`} />

                    {/* Content rides above the expanding fill. */}
                    <div className="relative z-10">
                      <h3 className="font-display text-[1.35rem] font-bold uppercase leading-[1.25] tracking-[-0.01em] text-[#2c3272] transition-colors duration-300 group-hover:text-white group-active:text-white sm:text-[1.5rem]">
                        {name}
                      </h3>

                      <div className="mt-8 flex items-start gap-3.5">
                        {/* Space is reserved so the list never shifts on hover. */}
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>

                        <ul className="space-y-2">
                          {segments.map((segment) => (
                            <li
                              key={segment}
                              className="text-[15px] leading-6 text-[#3d4468] transition-colors duration-300 group-hover:text-white group-active:text-white sm:text-base"
                            >
                              {segment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
