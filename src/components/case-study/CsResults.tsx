import { Container } from '@/components/ui/Container';
import type { CaseStudy } from '@/types/project';

type CsResultsProps = CaseStudy['results'];

function CheckOrb() {
  return (
    <span aria-hidden="true" className="orb-green mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export function CsResults({ summary, outcomes, lessonsLearned }: CsResultsProps) {
  return (
    <section className="pb-section">
      <Container className="space-y-6">
        {/* Outcomes on the glossy blue-to-green panel */}
        <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,#0a5aa6_0%,#1584d8_50%,#23a35a_100%)] p-7 shadow-[0_24px_50px_rgba(10,80,150,.3),inset_0_1px_0_rgba(255,255,255,.6)] md:p-11 dark:border-white/25">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-[linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,.04))]" />
          <div className="relative space-y-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-h2 font-black text-white [text-shadow:0_2px_4px_rgba(0,40,80,.35)]">Results</h2>
              <p className="text-lg leading-relaxed text-white">{summary}</p>
            </div>
            <ul className="grid gap-3.5 md:grid-cols-2">
              {outcomes.map(outcome => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 rounded-2xl border border-white/35 bg-[rgba(0,40,90,.32)] p-4 text-[15px] leading-relaxed text-white"
                >
                  <CheckOrb />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {lessonsLearned && lessonsLearned.length > 0 && (
          <div className="glass rounded-3xl p-7 md:p-9">
            <h3 className="mb-5 text-h3 font-black">Lessons learned</h3>
            <ul className="grid gap-x-10 gap-y-3.5 md:grid-cols-2">
              {lessonsLearned.map(lesson => (
                <li key={lesson} className="flex items-start gap-3 leading-relaxed text-text-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,#ffffff_0,#9fdcff_30%,#1a86d6_100%)] shadow-[0_2px_4px_rgba(11,98,180,.35)]"
                  />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
