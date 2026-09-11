"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll-driven reveals for the standard page sections. Targets are found by
// structure so pages do not need to be annotated one element at a time.
export default function PageMotion({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const blocks = new Set();

      gsap.utils.toArray("section, footer").forEach((section) => {
        if (section.hasAttribute("data-no-motion")) {
          return;
        }

        // Heading block: eyebrow, title, copy, buttons.
        const heading = section.querySelector("h1, h2");
        const block = heading?.parentElement;

        if (block && !blocks.has(block)) {
          blocks.add(block);
          const items = Array.from(block.children).filter((child) => child.nodeType === 1);

          if (items.length) {
            gsap.from(items, {
              y: 26,
              autoAlpha: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 82%", once: true }
            });
          }
        }

        // Card grids, divided lists, and link columns.
        section.querySelectorAll("[class*='grid-cols'], [class*='divide-y'], [class*='divide-x']").forEach((group) => {
          if (blocks.has(group)) {
            return;
          }

          blocks.add(group);
          const items = Array.from(group.children).filter((child) => child.nodeType === 1);

          // Skip wrappers whose children are themselves sections — those get
          // their own heading reveal and would otherwise animate twice.
          if (items.length < 2 || items.some((item) => item.tagName === "SECTION")) {
            return;
          }

          gsap.from(items, {
            y: 28,
            autoAlpha: 0,
            duration: 0.68,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 86%", once: true }
          });
        });

        // Section imagery fades in; the transform is left to the parallax below.
        section.querySelectorAll("img").forEach((image) => {
          gsap.from(image, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: image, start: "top 90%", once: true }
          });
        });
      });
      media.add("(min-width: 1024px)", () => {
        gsap.utils.toArray("section img").forEach((image) => {
          const frame = image.parentElement;

          // Cards that scale their own image on hover keep that behaviour.
          if (!frame || image.className.includes("group-hover:scale")) {
            return;
          }

          if (image.closest("[data-no-parallax]")) {
            return;
          }

          frame.style.overflow = "hidden";

          gsap.fromTo(
            image,
            { yPercent: -6, scale: 1.14 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1 }
            }
          );
        });
      });
    }, rootRef);

    // Reveals are positioned from element offsets, so anything that shifts the
    // layout after mount (web fonts swapping in, images landing) can leave a
    // trigger measured against stale positions and never fire it.
    const refreshNow = () => ScrollTrigger.refresh();
    const refresh = window.setTimeout(refreshNow, 240);

    window.addEventListener("load", refreshNow);

    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshNow).catch(() => {});
    }

    // Safety net: content must never stay invisible. Reveals fire at "top 82-86%",
    // so anything still hidden once its top is well above that line had a trigger
    // that never ran — drop the hidden state rather than leave a blank section.
    // The threshold sits clear of the trigger point so real reveals still play.
    let sweepQueued = false;

    const sweep = () => {
      sweepQueued = false;
      const limit = window.innerHeight * 0.6;

      root.querySelectorAll('[style*="visibility: hidden"]').forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < limit && rect.bottom > 0) {
          element.style.visibility = "";
          element.style.opacity = "";
          element.style.transform = "";
        }
      });
    };

    const queueSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };

    const safety = window.setTimeout(sweep, 2500);
    window.addEventListener("scroll", queueSweep, { passive: true });

    return () => {
      window.clearTimeout(refresh);
      window.clearTimeout(safety);
      window.removeEventListener("load", refreshNow);
      window.removeEventListener("scroll", queueSweep);
      media.revert();
      ctx.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
