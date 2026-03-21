"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { philosophyCards } from "@/data/about";

export function AboutPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set("[data-philosophy-card]", { y: 30, opacity: 0 });
      ScrollTrigger.batch("[data-philosophy-card]", {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        start: "top 85%",
        once: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-bg-secondary py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">How I Think</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophyCards.map((card) => (
            <div
              key={card.title}
              data-philosophy-card
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <p className="mb-3 font-mono text-sm text-text-muted transition-colors group-hover:text-accent">
                {card.label}
              </p>
              <h3 className="mb-2 text-h3 font-semibold">{card.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
