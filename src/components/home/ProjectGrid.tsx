'use client';

import { Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { ProjectCard } from '@/components/home/ProjectCard';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

import type { ProjectSummary } from '@/types/project';

export const PROJECTS_PER_PAGE = 3;

/** Reads a page number from the URL, falling back to 1 and clamping to the valid range. */
function parsePage(raw: string | null, totalPages: number) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) return 1;
  return Math.min(n, totalPages);
}

type ProjectPageProps = {
  projects: ProjectSummary[];
  page: number;
  totalPages: number;
};

function ProjectPage({ projects, page, totalPages }: ProjectPageProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  const start = (page - 1) * PROJECTS_PER_PAGE;
  const visible = projects.slice(start, start + PROJECTS_PER_PAGE);

  const firstPage = useRef(page);

  // Re-runs per page so newly shown cards animate in too.
  useGSAP(
    () => {
      if (reducedMotion) return;
      // After a page change the cards are already in view (we scroll to #projects),
      // so animate them directly instead of waiting on a scroll trigger.
      if (page !== firstPage.current) {
        gsap.fromTo(
          '[data-project-card]',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        );
        return;
      }
      gsap.set('[data-project-card]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-project-card]', {
        onEnter: elements => {
          gsap.to(elements, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' });
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: listRef, dependencies: [page, reducedMotion], revertOnUpdate: true },
  );

  return (
    <>
      <div ref={listRef} className="grid gap-8">
        {visible.map(project => (
          <div key={project.slug} data-project-card>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <Pagination
        className="mt-10"
        label="Projects pages"
        page={page}
        totalPages={totalPages}
        hrefFor={p => ({ pathname, query: p > 1 ? { page: String(p) } : {}, hash: 'projects' })}
      />
    </>
  );
}

function PaginatedProjects({ projects, totalPages }: Omit<ProjectPageProps, 'page'>) {
  const searchParams = useSearchParams();
  const page = parsePage(searchParams.get('page'), totalPages);
  return <ProjectPage projects={projects} page={page} totalPages={totalPages} />;
}

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const count = projects.length;

  return (
    <section id="projects" className="relative scroll-mt-28 py-section">
      {/* Decorative bubbles; they sit behind the glass card, which blurs them */}
      <span aria-hidden="true" className="bubble top-52 right-[8%] h-9 w-9 motion-safe:animate-[float_7s_ease-in-out_infinite_1.5s] max-md:hidden" />
      <span aria-hidden="true" className="bubble top-62 right-[2.5%] h-22 w-22 motion-safe:animate-[float_9s_ease-in-out_infinite] max-md:hidden" />
      <span aria-hidden="true" className="bubble bottom-10 left-[3%] h-16 w-16 motion-safe:animate-[float_8s_ease-in-out_infinite_3s] max-md:hidden" />
      <Container className="relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">Selected work</p>
            <h2 className="text-h2 font-black tracking-[-0.02em]">My Projects</h2>
          </div>
          <Badge variant="contained" size="lg">
            {count} {count === 1 ? 'case study' : 'case studies'}
          </Badge>
        </div>

        {/* useSearchParams needs a Suspense boundary on a prerendered page; page 1 is the static fallback. */}
        <Suspense fallback={<ProjectPage projects={projects} page={1} totalPages={totalPages} />}>
          <PaginatedProjects projects={projects} totalPages={totalPages} />
        </Suspense>
      </Container>
    </section>
  );
}
