'use client';

import { Container } from '@/components/ui/Container';
import { useCounter } from '@/hooks/use-counter';
import type { ProjectMetric } from '@/types/project';

function MetricRow({ metric }: { metric: ProjectMetric }) {
  // Destructure the refs: reading `.ref` off the returned object during render trips react-hooks/refs.
  const { value: afterValue, ref: afterRef } = useCounter<HTMLSpanElement>(metric.after, 2);
  const { value: beforeValue, ref: beforeRef } = useCounter<HTMLSpanElement>(metric.before, 1.5);

  const unit = metric.unit ?? '';
  // Scores are out of 100; fall back to the larger value for anything that can exceed it.
  const scale = Math.max(100, metric.before, metric.after);
  const pct = Math.round(((metric.after - metric.before) / Math.max(metric.before, 1)) * 100);
  const improved = pct > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-black">{metric.label}</h3>
        <p className="flex items-center gap-2.5 font-display font-extrabold">
          <span className="sr-only">
            From {metric.before}
            {unit} to {metric.after}
            {unit}
          </span>
          <span aria-hidden="true" className="flex items-baseline gap-2">
            <span ref={beforeRef} className="text-text-muted">
              {beforeValue}
              {unit}
            </span>
            <span className="text-text-muted">→</span>
            <span ref={afterRef} className="text-2xl text-leaf">
              {afterValue}
              {unit}
            </span>
          </span>
          {pct !== 0 && (
            <span className={`${improved ? 'chip-green' : 'bg-error/15 text-error'} rounded-full px-2.5 py-0.5 text-xs`}>
              <span aria-hidden="true">{improved ? '↑' : '↓'} </span>
              <span className="sr-only">{improved ? 'up' : 'down'} </span>
              {Math.abs(pct)}%
            </span>
          )}
        </p>
      </div>

      {/* Before (grey) under after (green), both on the same 0–scale track */}
      <div
        aria-hidden="true"
        className="relative h-4 overflow-hidden rounded-full border border-border bg-[linear-gradient(180deg,#d6ecf8,#f4fbff)] shadow-[inset_0_2px_4px_rgba(20,90,140,.18)] dark:bg-[linear-gradient(180deg,#06243f,#0b3152)]"
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(180deg,#a6ee86_0%,#4fbf3c_50%,#2f9a27_51%,#5cc848_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.7)]"
          style={{ width: `${(afterValue / scale) * 100}%` }}
        />
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(180deg,#e2ecf2,#a7bccb)] dark:bg-[linear-gradient(180deg,#6f8aa0,#4a6378)]"
          style={{ width: `${(beforeValue / scale) * 100}%` }}
        />
      </div>

      {metric.description && <p className="text-sm text-text-secondary">{metric.description}</p>}
    </div>
  );
}

export function CsMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <section className="pb-section">
      <Container>
        <div className="mb-8 space-y-2">
          <p className="text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">Impact</p>
          <h2 className="text-h2 font-black tracking-[-0.02em]">Key Metrics</h2>
        </div>

        <div className="glass rounded-[26px] p-7 md:p-9">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {metrics.map(metric => (
              <MetricRow key={metric.label} metric={metric} />
            ))}
          </div>

          <div aria-hidden="true" className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-6 rounded-full bg-[linear-gradient(180deg,#e2ecf2,#a7bccb)]" />
              Before
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-6 rounded-full bg-[linear-gradient(180deg,#a6ee86,#2f9a27)]" />
              After
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
