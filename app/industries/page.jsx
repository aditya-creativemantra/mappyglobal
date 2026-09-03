import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import { btnOutline, btnPrimary, eyebrowClass, specialtyGroups } from "@/lib/site";

export const metadata = {
  title: "Industries | Mappy Global Resources",
  description:
    "Sector coverage across FMCG and consumer, pharma and life sciences, technology and IT, BFSI and fintech, manufacturing and infrastructure, telecom, logistics, and digital media."
};

export default function IndustriesPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <PageMotion>
        <main>
          <section className="border-b border-[#dcdfeb] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <p className={eyebrowClass}>Industries</p>
              <h1 className="mt-6 max-w-4xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] lg:text-[4.25rem]">
                Industry expertise across every vertical.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#2c3272]">
                Fifteen-plus sectors and growing. Wherever talent is critical, Mappy brings the context, access, and
                search discipline to deliver.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className={btnPrimary}>
                  Discuss your sector
                </Link>
                <Link href="/services" className={btnOutline}>
                  See our services
                </Link>
              </div>
            </div>
          </section>

          {/* Sectors */}
          <section className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-px border border-[#dcdfeb] bg-[#dcdfeb] md:grid-cols-2 xl:grid-cols-3">
                {specialtyGroups.map(({ title, slug, roles, icon: Icon }) => (
                  <article key={slug} id={slug} className="scroll-mt-[84px] lg:scroll-mt-[112px] bg-white p-8">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f6cdb6] bg-white shadow-[0_10px_26px_rgba(237,105,41,0.22)] transition-shadow duration-300">
                    <Icon className="h-7 w-7 text-[#ed6929]" />
                  </span>
                    <h2 className="mt-6 text-2xl font-semibold leading-tight text-[#2c3272]">{title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#2c3272]">
                      Specialist recruitment support shaped around live market context and priority roles.
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-[#e5e7f1] pt-5">
                      {roles.map((role) => (
                        <li key={role} className="text-[15px] leading-6 text-[#2c3272]">
                          {role}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors hover:text-[#ed6929]"
                    >
                      Hire in this sector
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-10 border border-[#dcdfeb] bg-[#f4f5fc] p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
                <div>
                  <p className={eyebrowClass}>Start the conversation</p>
                  <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] lg:text-[3.25rem]">
                    Hiring in a sector not listed here?
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-[#2c3272] sm:text-lg">
                    Sector coverage keeps expanding with client demand. Tell us the market and we will tell you what we
                    can access.
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
      </PageMotion>

      <SiteFooter />
    </div>
  );
}
