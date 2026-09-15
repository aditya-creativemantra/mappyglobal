import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { ArrowRight } from "@/components/icons";
import { btnOutline, btnPrimary, eyebrowClass, servicePaths } from "@/lib/site";

export const metadata = {
  title: "Services | Mappy Global Resources",
  description:
    "Permanent hiring, RPO, contract staffing, and retained executive search from Mappy Global Resources — across India and the Middle East."
};

export default function ServicesPage() {
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
                  src="/images/mappy-consultation.png"
                  alt="Mappy consultants in a client hiring discussion"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[58%_center]"
                />
              </div>

              <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-20">
                <div className="w-full max-w-xl">
                  <p className={eyebrowClass}>Services</p>
                  <h1 className="mt-6 font-display text-[2.15rem] font-semibold tracking-[-0.035em] text-[#2c3272] sm:text-[2.9rem] lg:text-[3.4rem] leading-[2.5rem]">
                    End-to-end recruitment at global scale.
                  </h1>
                  <p className="mt-7 text-lg leading-8 text-[#2c3272]">
                    From permanent and contract placements to embedded recruitment teams and retained leadership search
                    — built around the roles your business cannot afford to get wrong.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link href="/contact" className={btnPrimary}>
                      Start a conversation
                    </Link>
                    <Link href="/industries" className={btnOutline}>
                      See our industries
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* One card per service, linked from the Services menu */}
          {servicePaths.map(({ title, slug, category, headline, intro, image, imageAlt, types, typesLabel }, index) => (
            <section
              key={slug}
              id={slug}
              className={`scroll-mt-[88px] border-b border-[#dcdfeb] py-16 sm:py-20 lg:scroll-mt-[112px] ${
                index % 2 === 0 ? "bg-[#f4f5fc]" : "bg-white"
              }`}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Alternate the image side: left on odd cards, right on even ones. */}
                <div
                  className={`grid overflow-hidden border border-[#dcdfeb] bg-white ${
                    index % 2 === 1
                      ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
                      : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                  }`}
                >
                  <div
                    className={`relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className={`bg-[#f7f8fd] px-6 py-12 sm:px-12 sm:py-14 lg:flex lg:items-center lg:px-16 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="w-full max-w-xl">
                      <p className={eyebrowClass}>{category}</p>

                      <h2 className="mt-5 font-display text-[1.9rem] font-semibold tracking-[-0.03em] text-[#2c3272] sm:text-4xl lg:text-[2.75rem] leading-[2.5rem]">
                        {title}
                      </h2>

                      <p className="mt-6 text-lg font-semibold leading-8 text-[#2c3272]">{headline}</p>

                      <p className="mt-4 text-base leading-8 text-[#2c3272]">{intro}</p>

                      {types ? (
                        <div className="mt-7 border-t border-[#dcdfeb] pt-6">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2c3272]">{typesLabel}</p>
                          <ul className="mt-4 flex flex-wrap gap-3">
                            {types.map((type) => (
                              <li
                                key={type}
                                className="border border-[#dcdfeb] bg-white px-4 py-2 text-sm font-medium text-[#2c3272]"
                              >
                                {type}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Link href="/contact" className={btnPrimary}>
                          Let&rsquo;s talk
                        </Link>
                        <Link
                          href="/contact"
                          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:text-[#ed6929]"
                        >
                          Start a search
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </main>
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
