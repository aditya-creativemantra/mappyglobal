"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GlobalReach from "@/components/GlobalReach";
import { ArrowRight, Sparkles } from "@/components/icons";
import {
  btnOutline,
  btnPrimary,
  eyebrowClass,
  heroSignals,
  insightCards,
  servicePaths,
  specialtyGroups,
  tickerItems
} from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function SectionHeading({ eyebrow, title, description, className = "" }) {
  return (
    <div className={className} data-section-heading>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className="mt-5 max-w-4xl font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#4a5170] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export default function MappyHomepage() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

      heroTimeline
        .from("[data-hero-eyebrow]", { y: 18, autoAlpha: 0, duration: 0.6 })
        .from("[data-hero-title]", { y: 28, autoAlpha: 0, duration: 0.8 }, 0.1)
        .from("[data-hero-copy]", { y: 20, autoAlpha: 0, duration: 0.7 }, 0.22)
        .from("[data-hero-actions]", { y: 20, autoAlpha: 0, duration: 0.7 }, 0.32)
        .from("[data-hero-visual]", { autoAlpha: 0, duration: 0.9 }, 0.2)
        .from("[data-hero-signal]", { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.42);

      gsap.utils.toArray("[data-section]").forEach((section) => {
        const heading = section.querySelector("[data-section-heading]");
        const groups = section.querySelectorAll("[data-reveal-group]");
        const panels = section.querySelectorAll("[data-reveal-panel]");

        if (heading) {
          gsap.from(heading, {
            y: 28,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true }
          });
        }

        panels.forEach((panel) => {
          gsap.from(panel, {
            y: 22,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 85%", once: true }
          });
        });

        groups.forEach((group) => {
          const items = Array.from(group.children).filter((child) => child.nodeType === 1);

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            y: 24,
            autoAlpha: 0,
            duration: 0.68,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 84%", once: true }
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="top" className="bg-[#f4f5fc]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-[#dcdfeb] bg-white">
          <div className="grid lg:grid-cols-2">
            <div
              data-hero-visual
              className="relative order-1 min-h-[380px] sm:min-h-[460px] lg:order-2 lg:min-h-[680px]"
            >
              <Image
                src="/images/mappy-hero-team.png"
                alt="Mappy Global Resources team in a client meeting"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[58%_center]"
              />
            </div>

            <div className="order-2 bg-[#e3e6f5] px-6 py-16 sm:px-12 lg:order-1 lg:flex lg:items-center lg:px-16 lg:py-24">
              <div className="w-full max-w-xl">
                <p data-hero-eyebrow className={eyebrowClass}>
                  Global recruitment agency
                </p>

                <h1
                  data-hero-title
                  className="mt-6 font-display text-[2.15rem] font-semibold sm:text-[2.9rem] leading-[1.02] tracking-[-0.035em] text-[#2c3272] sm:text-6xl"
                >
                  Connecting exceptional talent with the world&apos;s best employers.
                </h1>

                <p data-hero-copy className="mt-7 text-lg leading-8 text-[#4a5170]">
                  Speed, accuracy, and agility at every stage of the talent journey, with consultants across India and
                  the Middle East finding leaders and specialist talent that move the needle.
                </p>

                <div data-hero-actions className="mt-9 flex flex-wrap gap-4">
                  <Link href="/contact" className={btnPrimary}>
                    Hire expert talent
                  </Link>
                  <Link href="/services" className={btnOutline}>
                    Explore services
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-[#ed6929] py-4">
            <div className="ticker-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? "true" : undefined}>
                  {tickerItems.map((item) => (
                    <span key={item} className="flex items-center">
                      <span className="px-8 text-sm font-bold uppercase tracking-[0.18em] text-white">{item}</span>
                      <Sparkles className="h-4 w-4 shrink-0 text-white/70" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#dcdfeb]">
            <div className="mx-auto grid max-w-7xl divide-y divide-[#dcdfeb] px-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-8">
              {heroSignals.map(({ title, description, icon: Icon }) => (
                <div key={title} data-hero-signal className="flex gap-4 py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-[#ed6929]" />
                  <div>
                    <p className="text-base font-semibold text-[#2c3272]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#4a5170]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section data-section className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Services"
                title="End-to-end recruitment at global scale."
                description="Five ways Mappy supports hiring — from retained leadership search to embedded recruitment teams and transaction support."
                className="max-w-3xl"
              />
              <Link href="/services" className={`${btnOutline} shrink-0`}>
                All services
              </Link>
            </div>

            <div data-reveal-group className="mt-16 grid gap-px border border-[#dcdfeb] bg-[#dcdfeb] md:grid-cols-2 xl:grid-cols-3">
              {servicePaths.map(({ title, slug, description, icon: Icon }) => (
                <article key={slug} className="group bg-white p-8 transition-colors hover:bg-[#fdf7f3]">
                  <Icon className="h-7 w-7 text-[#ed6929]" />
                  <h3 className="mt-6 text-2xl font-semibold leading-tight text-[#2c3272]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4a5170]">{description}</p>
                  <Link
                    href={`/services#${slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2c3272] transition-colors group-hover:text-[#ed6929]"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Industries overview */}
        <section data-section className="border-b border-[#dcdfeb] bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Industries"
                title="Industry expertise across every vertical."
                description="Fifteen-plus sectors and growing. Wherever talent is critical, Mappy brings the context, access, and search discipline to deliver."
                className="max-w-3xl"
              />
              <Link href="/industries" className={`${btnOutline} shrink-0`}>
                All industries
              </Link>
            </div>

            <div data-reveal-group className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {specialtyGroups.map(({ title, slug, roles, icon: Icon }) => (
                <Link key={slug} href={`/industries#${slug}`} className="group border-t-2 border-[#2c3272] pt-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#ed6929]" />
                    <h3 className="text-xl font-semibold text-[#2c3272] transition-colors group-hover:text-[#ed6929]">
                      {title}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {roles.map((role) => (
                      <li key={role} className="text-[15px] leading-6 text-[#4a5170]">
                        {role}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Mappy overview */}
        <section data-section className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Why Mappy?"
                title="What global hiring looks like from where we sit."
                description="Consultants across India and the Middle East, working the same mandates from both ends of the market."
                className="max-w-3xl"
              />
              <Link href="/why-mappy" className={`${btnOutline} shrink-0`}>
                Why Mappy
              </Link>
            </div>

            <div data-reveal-group className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
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
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-[#2c3272]">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#4a5170]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GlobalReach />

        {/* Contact CTA */}
        <section data-section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 border border-[#dcdfeb] bg-[#f4f5fc] p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:p-16">
              <div data-section-heading>
                <p className={eyebrowClass}>Start the conversation</p>
                <h2 className="mt-5 font-display text-[1.9rem] font-semibold sm:text-4xl leading-[1.04] tracking-[-0.03em] text-[#2c3272] sm:text-[3.25rem]">
                  Need an expert hiring partner?
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-[#4a5170] sm:text-lg">
                  Tell us about the role, the market, and the timeline. A consultant close to your market will come
                  back to you within one business day.
                </p>
              </div>

              <div data-reveal-panel className="flex flex-wrap gap-4 lg:justify-end">
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

      <SiteFooter />
    </div>
  );
}
