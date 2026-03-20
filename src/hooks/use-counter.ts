"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function useCounter(end: number, duration = 2) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setValue(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let ctx: ReturnType<typeof import("gsap").default.context>;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const obj = { val: 0 };
      ctx = gsap.context(() => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => setValue(Math.round(obj.val)),
        });
      }, el);
    })();

    return () => {
      ctx?.revert();
    };
  }, [end, duration, reducedMotion]);

  return { value, ref };
}
