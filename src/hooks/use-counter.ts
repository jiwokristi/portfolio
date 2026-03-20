"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "./use-reduced-motion";

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
