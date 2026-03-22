import { Container } from "@/components/ui/Container";
import type { CaseStudy } from "@/types/project";

type CsResultsProps = CaseStudy["results"];

export function CsResults({ summary, outcomes, lessonsLearned }: CsResultsProps) {
  return (
    <section className="py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">
          Results
        </h2>

        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-center text-lg text-text-secondary leading-relaxed">
            {summary}
          </p>

          <div className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="mb-4 text-h3 font-semibold">
              Outcomes
            </h3>
            <ul className="space-y-3">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-text-secondary">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          {lessonsLearned && lessonsLearned.length > 0 && (
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
              <h3 className="mb-4 text-h3 font-semibold">
                Lessons Learned
              </h3>
              <ul className="space-y-3">
                {lessonsLearned.map((lesson) => (
                  <li key={lesson} className="flex items-start gap-3 text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
