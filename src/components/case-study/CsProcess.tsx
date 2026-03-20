"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProcessPhase } from "@/types/project";

export function CsProcess({ process }: { process: ProcessPhase[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.utils.toArray<HTMLElement>("[data-process-item]").forEach((el, i) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">
          Process
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {process.map((phase, i) => (
              <div
                key={phase.title}
                data-process-item
                className={`relative grid gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={`space-y-4 ${i % 2 === 1 ? "lg:col-start-2 lg:text-left lg:direction-ltr" : "lg:text-right lg:direction-ltr"}`}>
                  <div className="flex items-center gap-3 lg:justify-end"
                    style={i % 2 === 1 ? { justifyContent: "flex-start" } : undefined}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-h3 font-semibold">
                      {phase.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className={`${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1 lg:direction-ltr" : "lg:direction-ltr"}`}>
                  {phase.highlights && (
                    <ul className="space-y-2 rounded-2xl border border-border bg-surface p-6">
                      {phase.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
