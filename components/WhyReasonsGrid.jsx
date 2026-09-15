"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Send } from "@/components/icons";
import { eyebrowClass, whyMappyReasons } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const headingWords = "Six reasons clients keep coming back.".split(" ");

// One frame per reason — hovering a row crossfades the pinned photo to its pair.
const reasonImages = [
  { src: "/whymappy.webp", alt: "Consultants working a shortlist against the clock" },
  { src: "/blogone.webp", alt: "Consultation meeting for a leadership search" },
  { src: "/images/mappy-leadership.png", alt: "Leadership discussion in a premium office" },
  { src: "/blogthree.jpg", alt: "Senior leadership conversation in a premium office" },
  { src: "/blogfour.jpg", alt: "Consultative hiring discussion across sectors" },
  { src: "/images/mappy-consultation.png", alt: "Consultative hiring discussion with business stakeholders" }
];

export default function WhyReasonsGrid() {
  const rootRef = useRef(null);
  const [activeReason, setActiveReason] = useState(0);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const timelines = [];

    const ctx = gsap.context(() => {
      // Left column: heading words rise out of their masks, then the image
      // composition assembles — photo first, accent slab last.
      timelines.push(
        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-reason-head]", start: "top 85%", once: true },
            defaults: { ease: "power3.out" }
          })
          .from("[data-reason-eyebrow]", { y: 14, opacity: 0, duration: 0.5 })
          .from("[data-reason-word]", { yPercent: 115, duration: 0.85, stagger: 0.05, ease: "power4.out" }, 0.08)
          .from("[data-reason-photo]", { scale: 1.12, rotate: 0, opacity: 0, duration: 1, ease: "power3.out" }, 0.35)
          .from("[data-reason-slab]", { scaleX: 0, duration: 0.7, ease: "power3.inOut" }, 0.6)
      );

      // Right column intro: copy, then the round call to action.
      timelines.push(
        gsap
          .timeline({
            scrollTrigger: { trigger: "[data-reason-intro]", start: "top 88%", once: true },
            defaults: { ease: "power3.out" }
          })
          .from("[data-reason-lede]", { y: 20, opacity: 0, duration: 0.7 })
          .from("[data-reason-cta]", { scale: 0.7, opacity: 0, duration: 0.7, ease: "back.out(1.7)" }, 0.15)
      );

      // Rows: the rule draws, then number, title and copy cascade in.
      gsap.utils.toArray("[data-reason-row]").forEach((row) => {
        timelines.push(
          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: "top 90%", once: true },
              defaults: { ease: "power3.out" }
            })
            .from(row.querySelector("[data-reason-rule]"), { scaleX: 0, duration: 0.75, ease: "power3.inOut" })
            .from(row.querySelector("[data-reason-digits]"), { yPercent: 115, duration: 0.6, ease: "power4.out" }, 0.12)
            .from(row.querySelector("[data-reason-title]"), { y: 22, opacity: 0, duration: 0.65 }, 0.16)
            .from(row.querySelector("[data-reason-copy]"), { y: 16, opacity: 0, duration: 0.6 }, 0.24)
        );
      });

      media.add("(min-width: 1024px)", () => {
        // The badge ring keeps turning while the column is pinned.
        gsap.to("[data-reason-ring]", {
          rotate: 140,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 }
        });
      });
    }, rootRef);

    // Reveals are measured from element offsets, so a layout shift after mount
    // (fonts swapping in, the photo landing) can leave a trigger that never
    // fires. Anything still transparent well inside the viewport is jumped to
    // its finished state rather than left blank.
    const safety = window.setTimeout(() => {
      timelines.forEach((timeline) => {
        const targets = timeline.getChildren().flatMap((tween) => tween.targets());

        const stranded = targets.some((target) => {
          if (!target?.getBoundingClientRect) return false;

          const rect = target.getBoundingClientRect();

          if (rect.top > window.innerHeight * 0.8 || rect.bottom < 0) return false;

          return Number(window.getComputedStyle(target).opacity) < 0.05;
        });

        if (stranded) {
          timeline.progress(1);
        }
      });
    }, 2600);

    return () => {
      window.clearTimeout(safety);
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="reasons"
      data-no-motion
      className="border-b border-[#dcdfeb] bg-[#f4f5fc] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-20">
          {/* Left: heading and the tilted photo composition */}
          <div data-reason-head className="lg:sticky lg:top-[112px] lg:self-start">
            <p data-reason-eyebrow className={eyebrowClass}>
              What sets us apart
            </p>

            <h2 className="mt-6 font-display text-[1.75rem] font-semibold tracking-[-0.035em] text-[#2c3272] sm:text-[2.1rem] lg:text-[2.4rem] leading-[2.5rem]">
              {headingWords.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-reason-word className="inline-block">
                    {word}
                    {index < headingWords.length - 1 ? " " : null}
                  </span>
                </span>
              ))}
            </h2>

            <div data-reason-visual data-no-parallax className="relative mt-14 hidden max-w-sm lg:block">
              <div
                data-reason-photo
                className="relative rotate-3 overflow-hidden shadow-[0_34px_70px_rgba(15,23,42,0.22)]"
              >
                <div className="relative h-[20rem] w-full xl:h-[24rem]">
                  {reasonImages.map(({ src, alt }, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 24rem, 100vw"
                      className={`object-cover transition-all duration-700 ease-out ${
                        index === activeReason ? "scale-100 opacity-100" : "scale-105 opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <span
                data-reason-slab
                aria-hidden
                className="absolute -bottom-8 -left-8 h-16 w-56 origin-left -rotate-12 bg-[#ed6929]"
              />
            </div>
          </div>

          {/* Right: intro, call to action, and the numbered list */}
          <div>
            <div data-reason-intro className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-12">
              <p data-reason-lede className="max-w-xl text-base leading-8 text-[#2c3272]/75 sm:text-lg">
                Mappy runs every mandate on the same operating standard — speed, market intelligence, and{" "}
                <span className="font-semibold text-[#2c3272]">accountability past the shortlist</span>, from the first
                brief to the signed offer.
              </p>

              <Link
                data-reason-cta
                href="/contact"
                className="group relative inline-flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-[#ed6929] text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-500 hover:bg-[#2c3272] sm:h-40 sm:w-40"
              >
                <span
                  data-reason-ring
                  aria-hidden
                  className="pointer-events-none absolute inset-[-12px] rounded-full border border-dashed border-[#2c3272]/25"
                />
                <span className="flex items-center gap-2">
                  Let&apos;s talk
                  <Send className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            <div className="mt-14">
              {whyMappyReasons.map(({ title, description }, index) => (
                <article
                  key={title}
                  data-reason-row
                  onMouseEnter={() => setActiveReason(index)}
                  className="group relative transition-colors duration-500 hover:bg-white"
                >
                  <span
                    data-reason-rule
                    aria-hidden
                    className="absolute inset-x-0 top-0 block h-px origin-left bg-[#2c3272]/20"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 block h-px origin-left scale-x-0 bg-[#ed6929] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />

                  <div className="grid items-start gap-x-8 gap-y-5 p-[50px] sm:grid-cols-[2.5rem_minmax(0,1fr)] lg:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-x-10">
                    <span
                      data-reason-number
                      aria-hidden
                      className="block overflow-hidden font-display text-xl font-semibold leading-none tracking-[-0.02em] text-[#2c3272]/35 transition-colors duration-500 group-hover:text-[#ed6929]"
                    >
                      <span data-reason-digits className="block">
                        {index + 1}
                      </span>
                    </span>

                    <h3
                      data-reason-title
                      className="font-display text-[1.7rem] font-semibold tracking-[-0.035em] text-[#2c3272] transition-transform duration-500 group-hover:translate-x-1.5 sm:-mt-[0.34em] sm:text-[2rem] lg:mt-[calc(-0.34em-(2.5rem-1em)/2)] lg:text-[2.2rem] leading-[2.5rem]"
                    >
                      {title}
                    </h3>

                    <p
                      data-reason-copy
                      className="text-sm leading-7 text-[#2c3272]/70 sm:col-start-2 lg:col-start-3 lg:-mt-[0.4em] lg:text-[15px]"
                    >
                      {description}
                    </p>
                  </div>
                </article>
              ))}

              <span aria-hidden className="block h-px w-full bg-[#2c3272]/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
