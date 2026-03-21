"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { values } from "@/data/about";

export function AboutValues() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>("[data-value-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">How I Work</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {values.map((value, i) => (
            <div key={value.title} data-value-item>
              <p className="mb-2 font-mono text-sm text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-h3 font-semibold">{value.title}</h3>
              <p className="text-text-secondary leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
