"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/home/ProjectCard";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProjectSummary } from "@/types/project";

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.set("[data-project-card]", { y: 30, opacity: 0 });
    ScrollTrigger.batch("[data-project-card]", {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
      start: "top 85%",
      once: true,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="py-section">
      <Container>
        <h2 className="mb-12 text-h2 font-bold">
          Selected Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} data-project-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
