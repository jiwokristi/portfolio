import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import type { ProjectSummary } from '@/types/project';

type CsNavigationProps = {
  prev: ProjectSummary | null;
  next: ProjectSummary | null;
};

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
    </svg>
  );
}

function SiblingLink({ project, dir }: { project: ProjectSummary; dir: 'prev' | 'next' }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`glass group flex min-w-0 flex-1 flex-col gap-1 rounded-3xl p-5 transition-[filter] hover:brightness-105 ${dir === 'next' ? 'items-end text-right' : ''}`}
    >
      <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-text-muted transition-colors group-hover:text-accent">
        {dir === 'prev' && <Arrow dir="left" />}
        {dir === 'prev' ? 'Previous project' : 'Next project'}
        {dir === 'next' && <Arrow dir="right" />}
      </span>
      <span className="font-display font-black transition-colors group-hover:text-accent">{project.title}</span>
    </Link>
  );
}

export function CsNavigation({ prev, next }: CsNavigationProps) {
  return (
    <nav aria-label="More projects" className="pb-section">
      <Container className="space-y-6">
        {(prev || next) && (
          <div className="flex flex-col gap-4 sm:flex-row">
            {prev && <SiblingLink project={prev} dir="prev" />}
            {next && <SiblingLink project={next} dir="next" />}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3.5">
          <Button href="/#projects" variant="outlined" color="default">
            <Arrow dir="left" />
            Back to projects
          </Button>
          <Button href="mailto:priyadijiwo@gmail.com">Start a conversation</Button>
        </div>
      </Container>
    </nav>
  );
}
