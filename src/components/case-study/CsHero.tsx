"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { useGsap } from "@/hooks/use-gsap";
import type { CaseStudy } from "@/types/project";

type CsHeroProps = Pick<CaseStudy, "title" | "subtitle" | "category" | "heroImage" | "metrics">;

export function CsHero({ title, subtitle, category, heroImage, metrics }: CsHeroProps) {
  const containerRef = useGsap((gsap, ScrollTrigger) => {
    const isMobile = window.innerWidth < 768;

    gsap.fromTo("[data-hero-text]", { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    if (!isMobile) {
      gsap.to("[data-hero-image]", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-image]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  return (
    <section ref={containerRef} className="relative min-h-screen">
      <Container className="pb-12 pt-24 lg:pt-32">
        <div className="mb-8 flex flex-col gap-6">
          <Badge data-hero-text>{category}</Badge>
          <h1
            data-hero-text
            className="max-w-4xl text-display font-bold leading-[1.05] tracking-tight max-lg:text-h1"
          >
            {title}
          </h1>
          <p
            data-hero-text
            className="max-w-2xl text-h3 text-text-secondary max-lg:text-body"
          >
            {subtitle}
          </p>
        </div>

        <div data-hero-text className="mb-12 flex flex-wrap gap-8">
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-2xl font-bold text-accent">
                {m.after}
                {m.unit ?? ""}
              </span>
              <span className="text-sm text-text-muted">{m.label}</span>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative aspect-video w-full overflow-hidden" data-hero-image>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </section>
  );
}
