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

// The tags are labels, not links. Hover and press both raise the same light-orange state.
const tagBase =
  "inline-flex cursor-default select-none items-center justify-center rounded-full border border-[#c8cde4] bg-white text-center font-medium text-[#2c3272] transition-all duration-200 hover:border-[#ed6929] hover:bg-[#fdf0e8] hover:text-[#ed6929] hover:shadow-[0_0_0_5px_rgba(237,105,41,0.12)] active:border-[#ed6929] active:bg-[#fdf0e8] active:text-[#ed6929] active:shadow-[0_0_0_5px_rgba(237,105,41,0.12)]";

const tagSizes = {
  sm: "px-7 py-4 text-[15px] sm:px-9 sm:py-5 sm:text-base",
  md: "px-8 py-5 text-base sm:px-11 sm:py-6 sm:text-lg",
  lg: "max-w-[20rem] border-2 px-9 py-6 text-lg font-semibold sm:px-12 sm:py-7 sm:text-xl"
};

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

          {/* Sector cloud */}
          <section className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <p className={`${eyebrowClass} text-center`}>Where we hire</p>

              <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {industryTags.map(({ name, size }) => (
                  <span key={name} className={`${tagBase} ${tagSizes[size]}`}>
                    {name}
                  </span>
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
