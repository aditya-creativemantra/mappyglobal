"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import CustomCursor from "@/components/CustomCursor";
import FluidBackdrop from "@/components/FluidBackdrop";
import { contactEmail, socialLinks } from "@/lib/site";

const HEADLINE = "LAUNCHING SOON";
const TAGLINE = "Every search begins with a story";

// Split into characters so the headline can type itself out letter by letter.
const headlineChars = HEADLINE.split("");

// Typewriter timing: seconds per character, and the beat before it starts.
const TYPE_SPEED = 0.085;
const TYPE_DELAY = 0.55;

export default function MaintenanceScreen() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        // Everything is authored hidden, so reveal it without motion.
        gsap.set("[data-fade], [data-char], [data-rule]", {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
          visibility: "visible"
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-logo]", { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.9 })
        .from("[data-tagline]", { autoAlpha: 0, y: 14, duration: 0.7 }, 0.25)
        .from("[data-rule]", { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, 0.85)
        .from("[data-meta] > *", { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.12 }, 1.05);

      // Typewriter: every character stays in the DOM (hidden) so the line never
      // reflows as it types, and a caret rides the character being typed.
      const chars = gsap.utils.toArray("[data-char]");
      const headline = root.querySelector("[data-headline]");
      const cursor = { index: 0 };

      gsap.set(chars, { visibility: "hidden" });
      headline?.classList.add("is-typing");

      const paintChars = (count) => {
        chars.forEach((char, index) => {
          char.style.visibility = index < count ? "visible" : "hidden";
          char.classList.toggle("is-caret", index === count - 1);
        });
      };

      gsap.to(cursor, {
        index: chars.length,
        duration: chars.length * TYPE_SPEED,
        ease: "none",
        delay: TYPE_DELAY,
        onUpdate: () => paintChars(Math.floor(cursor.index)),
        onComplete: () => {
          paintChars(chars.length);
          headline?.classList.remove("is-typing");
        }
      });

      // The progress rule fills, holds, and resets — a sense of work in progress.
      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0.04 },
        {
          scaleX: 1,
          duration: 4.5,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 0.6,
          transformOrigin: "left center",
          delay: 1.6
        }
      );

      // Ambient glows drift so the background never sits still.
      gsap.to("[data-glow-one]", {
        xPercent: 14,
        yPercent: -12,
        scale: 1.14,
        duration: 13,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to("[data-glow-two]", {
        xPercent: -16,
        yPercent: 10,
        scale: 1.2,
        duration: 17,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#1b2050] px-6 py-10 text-white sm:px-10 lg:px-16"
    >
      <CustomCursor tone="light" />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          data-glow-one
          className="absolute -left-[18%] -top-[24%] h-[34rem] w-[34rem] rounded-full bg-[#ed6929] opacity-[0.16] blur-[140px] sm:h-[46rem] sm:w-[46rem]"
        />
        <div
          data-glow-two
          className="absolute -bottom-[26%] -right-[16%] h-[32rem] w-[32rem] rounded-full bg-[#4f5bd5] opacity-[0.24] blur-[140px] sm:h-[44rem] sm:w-[44rem]"
        />
        <FluidBackdrop className="absolute inset-0 h-full w-full mix-blend-screen" />

        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)"
          }}
        />
      </div>

      {/* Logo */}
      <header className="relative flex justify-center">
        <Image
          data-logo
          src="/brand/mappy-logo-white.png"
          alt="Mappy Global Resources"
          width={1049}
          height={195}
          priority
          className="h-9 w-auto sm:h-11"
        />
      </header>

      {/* Centre block */}
      <main className="relative flex flex-1 flex-col items-center justify-center py-16 text-center">
        <p
          data-tagline
          data-fade
          className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#f0a179] sm:text-xs sm:tracking-[0.52em]"
        >
          {TAGLINE}
        </p>

        <h1
          data-headline
          aria-label={HEADLINE}
          className="relative mt-10 flex flex-wrap justify-center font-display text-[2.1rem] font-semibold leading-[1.1] tracking-[0.22em] text-white sm:text-[3.4rem] sm:tracking-[0.3em] lg:text-[4.6rem]"
        >
          {headlineChars.map((char, index) => (
            <span key={`${char}-${index}`} data-char className="typewriter-char inline-block">
              {char === " " ? "  " : char}
            </span>
          ))}
        </h1>

        {/* Progress rule */}
        <div
          data-rule
          data-fade
          className="mt-12 h-px w-full max-w-md origin-left bg-white/20 sm:max-w-lg"
          aria-hidden
        >
          <div data-progress className="h-px w-full origin-left bg-[#ed6929]" />
        </div>

        <div data-meta className="mt-12 flex flex-col items-center">
          <p data-fade className="max-w-md text-base leading-8 text-[#ffffff] sm:text-lg">
            Our new site is on its way. In the meantime, we are still hiring for the roles you cannot afford to get
            wrong — across India and the Middle East.
          </p>

          <a
            data-fade
            href={`mailto:${contactEmail}`}
            className="group mt-9 inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-[#ed6929] hover:bg-[#ed6929]"
          >
            {contactEmail}
          </a>

          <ul data-fade className="mt-10 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors duration-300 hover:border-[#ed6929] hover:text-[#ed6929]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="relative flex flex-col items-center gap-2 text-center text-[11px] uppercase tracking-[0.24em] text-white/40 sm:flex-row sm:justify-between">
        <p>Speed · Accuracy · Agility</p>
        <p>India · Middle East</p>
      </footer>
    </div>
  );
}
