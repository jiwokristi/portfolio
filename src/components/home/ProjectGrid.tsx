'use client';

import { useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/home/ProjectCard';
import { ProjectPreview } from '@/components/home/ProjectPreview';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ProjectSummary } from '@/types/project';

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set('[data-project-card]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-project-card]', {
        onEnter: elements => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="projects" className="py-section">
      <Container>
        <h2 className="mb-12 text-h2 font-bold">My Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map(project => (
            <div key={project.slug} data-project-card>
              <ProjectCard
                project={project}
                onMouseEnter={() => {
                  if (!reducedMotion && project.previewVideo) setActiveVideo(project.previewVideo);
                }}
                onMouseMove={(e) => setCursor({ x: e.clientX + 20, y: e.clientY - 100 })}
                onMouseLeave={() => setActiveVideo(null)}
              />
            </div>
          ))}
        </div>
      </Container>
      {!reducedMotion && (
        <ProjectPreview videoSrc={activeVideo} cursorX={cursor.x} cursorY={cursor.y} />
      )}
    </section>
  );
}
