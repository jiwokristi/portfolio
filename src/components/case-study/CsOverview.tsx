import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CaseStudy } from "@/types/project";

type CsOverviewProps = Pick<
  CaseStudy,
  "problem" | "solution" | "role" | "timeline" | "year" | "techStack" | "liveUrl"
>;

export function CsOverview({
  problem,
  solution,
  role,
  timeline,
  year,
  techStack,
  liveUrl,
}: CsOverviewProps) {
  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-4 text-h2 font-bold">The Problem</h2>
              <p className="text-text-secondary leading-relaxed">{problem}</p>
            </div>
            <div>
              <h2 className="mb-4 text-h2 font-bold">The Solution</h2>
              <p className="text-text-secondary leading-relaxed">{solution}</p>
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-border bg-surface p-6 h-fit lg:sticky lg:top-24">
            <div>
              <h3 className="mb-1 text-sm font-medium text-text-muted">Role</h3>
              <p className="text-text-primary">{role}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-text-muted">Timeline</h3>
              <p className="text-text-primary">{timeline}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-text-muted">Year</h3>
              <p className="text-text-primary">{year}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-text-muted">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
            {liveUrl && (
              <Button href={liveUrl} className="w-full">
                View Live Site
              </Button>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
