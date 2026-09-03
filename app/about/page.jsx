import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import GlobalReach from "@/components/GlobalReach";
import { approachCards, btnOutline, btnPrimary, eyebrowClass } from "@/lib/site";

export const metadata = {
  title: "About us | Mappy Global Resources",
  description:
    "Mappy Global Resources is a global recruitment agency built on speed, accuracy, and agility — with consultants across India and the Middle East delivering executive search, niche hiring, and RPO support."
};

const whatWeDo = [
  {
    title: "Executive search",
    description: "Retained leadership and CxO mandates for clients hiring in competitive international markets."
  },
  {
    title: "Key and niche talent",
    description: "Focused hiring across functional, operational, and technology roles where standard searches fall short."
  },
  {
    title: "RPO, staffing and pooling",
    description: "Embedded recruitment support that works as an extension of an internal hiring team."
  },
  {
    title: "Global expansions and M&A",
    description: "Talent mapping and assessment for new market entries and high-stakes transactions."
  }
];

const capabilities = [
  {
    title: "Structured market mapping",
    description: "Searches start with a sharper view of the market, the adjacencies, and the target talent universe."
  },
  {
    title: "Deeper shortlist calibration",
    description: "Candidates are reviewed for fit, motivation, compensation logic, and stakeholder alignment."
  },
  {
    title: "Cross-border hiring rhythm",
    description: "Teams stay aligned across time zones with tighter communication and faster decision loops."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-[#f4f5fc]">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <p className={eyebrowClass}>About us</p>
            <h1 className="mt-6 max-w-4xl font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-6xl lg:text-[4.25rem]">
              Partnering in your critical and niche talent needs.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4a5170]">
              Mappy Global Resources is a global recruitment agency built around the roles businesses cannot afford to
              get wrong — leadership mandates, specialist hires, and the teams behind new market entries.
            </p>
          </div>
        </section>

        {/* Who we are */}
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:px-8 lg:py-24">
            <div>
              <p className={eyebrowClass}>Who we are</p>
              <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-5xl">
                A young, nimble team with senior search discipline.
              </h2>
              <div className="mt-7 space-y-6 text-base leading-8 text-[#4a5170]">
                <p>
                  Consultants sit close to the markets they recruit in, which means sharper candidate mapping, better
                  outreach, and hiring advice grounded in what is actually happening on the ground.
                </p>
                <p>
                  Clients retain Mappy for the mandates that carry weight: leadership and CxO roles, confidential
                  searches, and specialist hiring across functional, operational, and technology domains.
                </p>
                <p>
                  The operating mindset is simple — speed, accuracy, and agility across client relationships,
                  assignment execution, and candidate engagement.
                </p>
              </div>
            </div>

            <div>
              <Image
                src="/images/mappy-consultation.png"
                alt="Consultative hiring discussion with business stakeholders"
                width={1792}
                height={1024}
                className="h-[340px] w-full object-cover object-[54%_center] sm:h-[460px]"
              />
            </div>
          </div>
        </section>

        {/* What we do */}
        <section id="what-we-do" className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className={eyebrowClass}>What we do</p>
            <h2 className="mt-5 max-w-3xl font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
              Recruitment built around critical roles.
            </h2>

            <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
              {whatWeDo.map(({ title, description }) => (
                <div key={title} className="border-t-2 border-[#2c3272] pt-6">
                  <h3 className="text-xl font-semibold text-[#2c3272]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4a5170]">{description}</p>
                </div>
              ))}
            </div>

            <Link href="/services" className={`${btnOutline} mt-12`}>
              See all services
            </Link>
          </div>
        </section>

        {/* How we work */}
        <section id="approach" className="border-b border-[#dcdfeb] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className={eyebrowClass}>How we work</p>
            <h2 className="mt-5 max-w-3xl font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
              Speed, precision, reach, and partnership.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#4a5170] sm:text-lg">
              Mappy&apos;s approach is designed to move quickly without losing shortlist quality, context, or
              stakeholder confidence.
            </p>

            <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
              {approachCards.map((item) => (
                <div key={item.number} className="border-t border-[#dcdfeb] pt-6">
                  <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#ed6929]">{item.number}</p>
                  <h3 className="mt-5 text-xl font-semibold leading-snug text-[#2c3272]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4a5170]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:px-8">
            <div>
              <Image
                src="/images/mappy-leadership.png"
                alt="Leadership discussion in a premium office"
                width={1668}
                height={960}
                className="h-[340px] w-full object-cover object-[58%_center] sm:h-[440px]"
              />
            </div>

            <div>
              <p className={eyebrowClass}>Experience that delivers</p>
              <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-5xl">
                Structured hiring support from brief to onboarding.
              </h2>

              <div className="mt-10 divide-y divide-[#dcdfeb] border-y border-[#dcdfeb]">
                {capabilities.map(({ title, description }) => (
                  <div key={title} className="py-6">
                    <h3 className="text-lg font-semibold text-[#2c3272]">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#4a5170]">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GlobalReach />

        {/* CTA */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 border border-[#dcdfeb] bg-[#f4f5fc] p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
              <div>
                <p className={eyebrowClass}>Start the conversation</p>
                <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
                  Work with a partner who knows your market.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#4a5170] sm:text-lg">
                  Tell us about the role, the market, and the timeline. A consultant close to your market will come
                  back to you within one business day.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact" className={btnPrimary}>
                  Contact us
                </Link>
                <Link href="/industries" className={btnOutline}>
                  Our industries
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
