"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Animates a numeric value from 0 to {@link end} using GSAP, triggered on scroll.
 *
 * Skips the animation and sets the final value immediately when the user
 * prefers reduced motion.
 *
 * @param end - The target number to count up to.
 * @param duration - Animation duration in seconds (default `2`).
 * @returns `value` — the current animated number, and `ref` — a ref to attach
 *   to the element that acts as the ScrollTrigger target.
 */
export function useCounter(end: number, duration = 2) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) {
      setValue(end);
      return;
    }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => setValue(Math.round(obj.val)),
    });
  }, { scope: ref, dependencies: [end, duration, reducedMotion] });

  return { value, ref };
}
