import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import PageMotion from "@/components/PageMotion";
import SiteHeader from "@/components/SiteHeader";
import WhyReasonsGrid from "@/components/WhyReasonsGrid";
import { BadgeCheck, Compass, Globe2, Handshake, Target } from "@/components/icons";
import { btnOutline, btnPrimary, eyebrowClass, insightCards } from "@/lib/site";

export const metadata = {
  title: "Why Mappy? | Mappy Global Resources",
  description:
    "Why organisations choose Mappy Global Resources: speed, accuracy and agility, international assignment expertise, end-to-end partnership, and local market judgment across India and the Middle East."
};

const deliverySteps = [
  {
    title: "Understand",
    description:
      "We start with the brief behind the brief — the role, the team around it, and what a successful hire has to change."
  },
  {
    title: "Map",
    description:
      "We map the full talent universe: target companies, adjacent industries, and the people nobody has approached yet."
  },
  {
    title: "Assess",
    description:
      "Candidates are tested on capability, motivation, and compensation logic before they reach your inbox."
  },
  {
    title: "Shortlist",
    description:
      "A calibrated shortlist with the reasoning behind every name, so stakeholders can decide quickly."
  },
  {
    title: "Close",
    description:
      "We stay in it through offer, notice period, and onboarding — until the hire is in the seat."
  }
];

const topSignals = [
  { label: "Stakeholder alignment", icon: BadgeCheck },
  { label: "Global execution", icon: Globe2 }
];

const partnershipSignals = [
  { label: "Market mapping", icon: Target },
  { label: "Client collaboration", icon: Handshake },
  { label: "Search precision", icon: Compass }
];

export default function WhyMappyPage() {
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
                  src="/images/mappy-leadership.png"
                  alt="Leadership discussion in a premium office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[58%_center]"
                />
              </div>

              <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-20">
                <div className="w-full max-w-xl">
                  <p className={eyebrowClass}>Why Mappy?</p>
                  <h1 className="mt-6 font-display text-[2.15rem] font-semibold tracking-[-0.035em] text-[#2c3272] sm:text-[2.9rem] lg:text-[3.4rem] leading-[2.5rem]">
                    Global delivery with local market judgment.
                  </h1>
                  <p className="mt-7 text-lg leading-8 text-[#2c3272]">
                    Mappy operates with a clear obsession for speed, accuracy, and agility across client relationships,
                    assignment execution, and candidate engagement.
                  </p>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link href="/contact" className={btnPrimary}>
                      Start a search
                    </Link>
                    <Link href="/services" className={btnOutline}>
                      Explore services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reasons */}
          <WhyReasonsGrid />

          {/* Proof */}
          <section id="proof" className="border-b border-[#dcdfeb] bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className={eyebrowClass}>What global hiring looks like from where we sit</p>
              <h2 className="mt-5 max-w-3xl font-display text-[1.9rem] font-semibold sm:text-4xl tracking-[-0.03em] text-[#2c3272] lg:text-[3.25rem] leading-[2.5rem]">
                Consultants working the same mandates from both ends of the market.
              </h2>

              <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {insightCards.map((item) => (
                  <article key={item.title} className="group flex h-full flex-col bg-white">
                    <div className="overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={1792}
                        height={1024}
                        className={`h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.imageClassName}`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between border-x border-b border-[#dcdfeb] p-7">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ed6929]">{item.eyebrow}</p>
                        <h3 className="mt-4 text-xl font-semibold text-[#2c3272] leading-[2.5rem]">{item.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[#2c3272]">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Delivery model */}
          <section id="delivery" className="border-b border-[#dcdfeb]">
            <div className="grid lg:grid-cols-2">
              <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-24">
                <div className="w-full max-w-xl">
                  <p className={eyebrowClass}>How delivery works</p>
                  <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl tracking-[-0.03em] text-[#2c3272] lg:text-5xl leading-[2.5rem]">
                    Search discipline, applied the same way every time.
                  </h2>

                  <ol className="mt-10">
                    {deliverySteps.map(({ title, description }, index) => (
                      <li key={title} className="flex gap-5 sm:gap-6">
                        <div className="flex flex-col items-center">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#2c3272]/25 bg-white font-display text-sm font-semibold tracking-[-0.02em] text-[#ed6929]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {index < deliverySteps.length - 1 ? (
                            <span aria-hidden className="mt-2 w-px flex-1 bg-[#2c3272]/20" />
                          ) : null}
                        </div>
                        <div className={index < deliverySteps.length - 1 ? "pb-8" : ""}>
                          <h3 className="text-lg font-semibold leading-10 text-[#2c3272] leading-[2.5rem]">{title}</h3>
                          <p className="mt-2 text-sm leading-7 text-[#2c3272]">{description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <Link href="/contact" className={`${btnPrimary} mt-10`}>
                    Start a search
                  </Link>
                </div>
              </div>

              <div data-no-parallax className="relative order-1 flex lg:order-2">
                <Image
                  src="/images/mappy-consultation.png"
                  alt="Consultative hiring discussion with business stakeholders"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[54%_center]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,27,72,0.12)_0%,rgba(18,27,72,0.5)_52%,rgba(18,27,72,0.88)_100%)]" />

                <div className="relative flex min-h-[520px] w-full flex-col justify-between gap-10 lg:min-h-[720px]">
                  <div className="flex flex-wrap gap-3 p-5 pb-0 sm:justify-end sm:p-8 sm:pb-0">
                    {topSignals.map(({ label, icon: Icon }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#2c3272] shadow-[0_10px_24px_rgba(15,23,42,0.18)] sm:px-4 sm:text-sm"
                      >
                        <Icon className="h-4 w-4 text-[#ed6929]" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-white/25 bg-white/10 p-6 backdrop-blur-xl sm:p-9">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb48c]">Client partnership</p>
                    <h3 className="mt-4 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-white sm:text-[2.15rem] leading-[2.5rem]">
                      Search conversations grounded in market context, stakeholder alignment, and global execution.
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                      Early alignment on the brief, market map, and delivery rhythm keeps critical searches sharper from
                      the first conversation.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
                      {partnershipSignals.map(({ label, icon: Icon }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#2c3272] shadow-[0_10px_24px_rgba(15,23,42,0.18)] sm:px-4 sm:text-sm"
                        >
                          <Icon className="h-4 w-4 text-[#ed6929]" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid gap-10 border border-[#dcdfeb] bg-[#f4f5fc] p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
                <div>
                  <p className={eyebrowClass}>Start the conversation</p>
                  <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl tracking-[-0.03em] text-[#2c3272] lg:text-[3.25rem] leading-[2.5rem]">
                    Put the difference to work on your next hire.
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-[#2c3272] sm:text-lg">
                    Tell us about the role, the market, and the timeline. A consultant close to your market will come
                    back to you within one business day.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 lg:justify-end">
                  <Link href="/contact" className={btnPrimary}>
                    Contact us
                  </Link>
                  <Link href="/about" className={btnOutline}>
                    About us
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
