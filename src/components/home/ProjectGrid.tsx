"use client";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/home/ProjectCard";
import { useGsap } from "@/hooks/use-gsap";
import type { ProjectSummary } from "@/types/project";

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const containerRef = useGsap((gsap, ScrollTrigger) => {
    ScrollTrigger.batch("[data-project-card]", {
      onEnter: (elements) => {
        gsap.fromTo(elements, { y: 30, opacity: 0 }, {
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
  });

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
