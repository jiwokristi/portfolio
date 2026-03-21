"use client";

import { Container } from "@/components/ui/Container";
import { useCounter } from "@/hooks/use-counter";
import type { ProjectMetric } from "@/types/project";

function MetricCard({ metric }: { metric: ProjectMetric }) {
  const before = useCounter(metric.before, 1.5);
  const after = useCounter(metric.after, 2);

  return (
    <div ref={after.ref} className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-4 text-sm font-medium text-text-muted">{metric.label}</h3>
      <div className="mb-3 flex items-end gap-3">
        <span className="text-3xl font-bold text-accent">
          {after.value}
          {metric.unit ?? ""}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="mb-1 text-sm text-text-muted line-through">
            {before.value}
            {metric.unit ?? ""}
          </span>
          {(() => {
            const pct = Math.round(
              ((metric.after - metric.before) / Math.max(metric.before, 1)) * 100,
            );
            if (pct === 0) return null;
            const isPositive = pct > 0;
            return (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  isPositive
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(pct)}%
              </span>
            );
          })()}
        </div>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-bg">
        <div
          className="h-full rounded-full bg-accent transition-all duration-1000"
          style={{
            width: `${Math.min(100, (after.value / Math.max(metric.before, 1)) * 100)}%`,
          }}
        />
      </div>
      {metric.description && (
        <p className="text-sm text-text-muted">{metric.description}</p>
      )}
    </div>
  );
}

export function CsMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <section className="bg-bg-secondary py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">
          Key Metrics
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </Container>
    </section>
  );
}
