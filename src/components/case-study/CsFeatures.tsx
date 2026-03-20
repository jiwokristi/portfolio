"use client";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { useGsap } from "@/hooks/use-gsap";
import type { ProjectFeature } from "@/types/project";

export function CsFeatures({ features }: { features: ProjectFeature[] }) {
  const containerRef = useGsap((gsap, ScrollTrigger) => {
    ScrollTrigger.batch("[data-feature-card]", {
      onEnter: (elements) => {
        gsap.fromTo(elements, { y: 30, opacity: 0 }, {
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
  });

  return (
    <section ref={containerRef} className="bg-bg-secondary py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">
          Key Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              data-feature-card
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <h3 className="mb-2 text-h3 font-semibold transition-colors group-hover:text-accent">
                {feature.title}
              </h3>
              <p className="mb-4 text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
              {feature.tags && (
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <Badge key={tag} className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
