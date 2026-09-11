"use client";

import { useEffect, useRef } from "react";

// A trailing-ring cursor: a dot that tracks the pointer exactly, and a ring
// that lags behind, inflates with pointer speed, and opens up over anything
// clickable. Fine pointers only — touch devices keep their native behaviour.
const RING_IDLE = 22;
const RING_HOVER = 48;
const MAX_INFLATE = 24;
const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor-target]';

export default function CustomCursor({ tone = "dark" }) {
  const wrapRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!wrap || !ring || !dot) return undefined;

    // No custom cursor on touch, or when the visitor asks for less motion.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const idleColor = tone === "light" ? "rgba(255,255,255,0.45)" : "rgba(44,50,114,0.38)";
    const accentColor = "rgba(237,105,41,0.95)";

    let pointerX = -200;
    let pointerY = -200;
    let ringX = -200;
    let ringY = -200;
    let lastX = -200;
    let lastY = -200;
    let velocity = 0;
    let hovering = false;
    let pressed = false;
    let visible = false;
    let raf = 0;

    const draw = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      velocity *= 0.9;

      const base = hovering ? RING_HOVER : RING_IDLE;
      const inflate = Math.min(velocity * (hovering ? 0.8 : 0.42), MAX_INFLATE);
      const size = Math.max(base + inflate - (pressed ? 7 : 0), 10);

      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate3d(${ringX - size / 2}px, ${ringY - size / 2}px, 0)`;
      ring.style.borderColor = hovering || pressed ? accentColor : idleColor;

      dot.style.transform = `translate3d(${pointerX - 3}px, ${pointerY - 3}px, 0) scale(${
        hovering ? 0.45 : 1
      })`;

      // Park the loop once everything has caught up; any new input kicks it off again.
      const settled =
        Math.abs(pointerX - ringX) < 0.15 && Math.abs(pointerY - ringY) < 0.15 && velocity < 0.15;

      raf = settled ? 0 : requestAnimationFrame(draw);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      if (lastX > -200) {
        velocity = Math.min(Math.hypot(event.clientX - lastX, event.clientY - lastY), 60);
      }

      lastX = pointerX = event.clientX;
      lastY = pointerY = event.clientY;

      const nowHovering = Boolean(event.target?.closest?.(HOVER_SELECTOR));
      if (nowHovering !== hovering) {
        hovering = nowHovering;
      }

      if (!visible) {
        visible = true;
        wrap.style.opacity = "1";
      }

      kick();
    };

    const onDown = () => {
      pressed = true;
      kick();
    };

    const onUp = () => {
      pressed = false;
      kick();
    };

    const onLeave = () => {
      visible = false;
      wrap.style.opacity = "0";
    };

    const onEnter = () => {
      visible = true;
      wrap.style.opacity = "1";
      kick();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("blur", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, [tone]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block"
    >
      <span
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border will-change-transform"
        style={{ borderColor: "transparent" }}
      />
      <span
        ref={dotRef}
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-[#ed6929] will-change-transform"
      />
    </div>
  );
}
