import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ProjectSummary } from "@/types/project";

type CsNavigationProps = {
  prev: ProjectSummary | null;
  next: ProjectSummary | null;
};

export function CsNavigation({ prev, next }: CsNavigationProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="flex items-center justify-between">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-sm text-text-muted transition-colors group-hover:text-accent">
                &larr; Previous
              </span>
              <span className="font-medium transition-colors group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-1"
            >
              <span className="text-sm text-text-muted transition-colors group-hover:text-accent">
                Next &rarr;
              </span>
              <span className="font-medium transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </section>
  );
}
