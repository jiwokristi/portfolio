import { Container } from '@/components/ui/Container';
import type { CaseStudy } from '@/types/project';

type CsOverviewProps = Pick<CaseStudy, 'problem' | 'solution'>;

function OverviewCard({ label, tone, children }: { label: string; tone: 'problem' | 'solution'; children: string }) {
  return (
    <article className="glass flex flex-col gap-4 rounded-3xl p-7 md:p-9">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`${tone === 'solution' ? 'orb-green' : 'orb'} flex h-10 w-10 shrink-0 items-center justify-center`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            {tone === 'solution' ? <path d="M5 13l4 4L19 7" /> : <path d="M12 8v5M12 16.5v.5" />}
          </svg>
        </span>
        <h2 className="text-h3 font-black">{label}</h2>
      </div>
      <p className="leading-relaxed text-text-secondary">{children}</p>
    </article>
  );
}

export function CsOverview({ problem, solution }: CsOverviewProps) {
  return (
    <section className="pb-section">
      <Container className="grid gap-6 lg:grid-cols-2">
        <OverviewCard label="The Problem" tone="problem">
          {problem}
        </OverviewCard>
        <OverviewCard label="The Solution" tone="solution">
          {solution}
        </OverviewCard>
      </Container>
    </section>
  );
}
