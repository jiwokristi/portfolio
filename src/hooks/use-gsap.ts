"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type GsapCallback = (
  gsap: typeof import("gsap").default,
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger,
  ctx: ReturnType<typeof import("gsap").default.context>
) => void;

export function useGsap(callback: GsapCallback, deps: React.DependencyList = []) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let ctx: ReturnType<typeof import("gsap").default.context>;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        callback(gsap, ScrollTrigger, ctx);
      }, containerRef);
    })();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);

  return containerRef;
}
