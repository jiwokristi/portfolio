'use client';

import { Container } from '@/components/ui/Container';
import { useCounter } from '@/hooks/use-counter';
import type { MetricComparison, MetricStages, ProjectMetric } from '@/types/project';

const DEFAULT_STAGES: MetricStages = { before: 'Before', after: 'After' };

/** Fill styles per stage: grey (before), sky blue (interim), green (after). */
const FILL = {
  before: 'bg-[linear-gradient(180deg,#e2ecf2,#a7bccb)] dark:bg-[linear-gradient(180deg,#6f8aa0,#4a6378)]',
  interim: 'bg-[linear-gradient(180deg,#9fdcff_0%,#36a6ea_50%,#1a86d6_51%,#4cb4ee_100%)]',
  after: 'bg-[linear-gradient(180deg,#a6ee86_0%,#4fbf3c_50%,#2f9a27_51%,#5cc848_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.7)]',
} as const;

function MetricRow({ metric, stages }: { metric: ProjectMetric; stages: MetricStages }) {
  // Destructure the refs: reading `.ref` off the returned object during render trips react-hooks/refs.
  // Hooks can't be conditional, so the interim counter always runs (with 0 when there's no interim value).
  const { value: beforeValue, ref: beforeRef } = useCounter<HTMLSpanElement>(metric.before, 1.5);
  const { value: interimValue, ref: interimRef } = useCounter<HTMLSpanElement>(metric.interim ?? 0, 1.75);
  const { value: afterValue, ref: afterRef } = useCounter<HTMLSpanElement>(metric.after, 2);

  const hasInterim = metric.interim !== undefined;
  const unit = metric.unit ?? '';
  // Scores are out of 100; fall back to the largest value for anything that can exceed it.
  const scale = Math.max(100, metric.before, metric.interim ?? 0, metric.after);
  const pct = Math.round(((metric.after - metric.before) / Math.max(metric.before, 1)) * 100);
  const improved = pct > 0;

  // Layer the bar fills widest-first so every stage stays visible on the shared track.
  const fills = [
    { key: 'before', value: beforeValue, cls: FILL.before },
    ...(hasInterim ? [{ key: 'interim', value: interimValue, cls: FILL.interim }] : []),
    { key: 'after', value: afterValue, cls: FILL.after },
  ].sort((a, b) => b.value - a.value);

  const spoken = [
    `${stages.before} ${metric.before}${unit}`,
    ...(hasInterim ? [`${stages.interim ?? 'Interim'} ${metric.interim}${unit}`] : []),
    `${stages.after} ${metric.after}${unit}`,
  ].join(', ');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-black">{metric.label}</h3>
        <p className="flex items-center gap-2.5 font-display font-extrabold">
          <span className="sr-only">{spoken}</span>
          <span aria-hidden="true" className="flex items-baseline gap-2">
            <span ref={beforeRef} className="text-text-muted">
              {beforeValue}
              {unit}
            </span>
            <span className="text-text-muted">→</span>
            {hasInterim && (
              <>
                <span ref={interimRef} className="text-accent">
                  {interimValue}
                  {unit}
                </span>
                <span className="text-text-muted">→</span>
              </>
            )}
            <span ref={afterRef} className="text-2xl text-leaf">
              {afterValue}
              {unit}
            </span>
          </span>
          {pct !== 0 && (
            <span className={`${improved ? 'chip-green' : 'bg-error/15 text-error'} rounded-full px-2.5 py-0.5 text-xs`}>
              <span aria-hidden="true">{improved ? '↑' : '↓'} </span>
              <span className="sr-only">
                {improved ? 'up' : 'down'} from {stages.before.toLowerCase()} by{' '}
              </span>
              {Math.abs(pct)}%
            </span>
          )}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative h-4 overflow-hidden rounded-full border border-border bg-[linear-gradient(180deg,#d6ecf8,#f4fbff)] shadow-[inset_0_2px_4px_rgba(20,90,140,.18)] dark:bg-[linear-gradient(180deg,#06243f,#0b3152)]"
      >
        {fills.map(f => (
          <span
            key={f.key}
            className={`absolute inset-y-0 left-0 rounded-full ${f.cls}`}
            style={{ width: `${(f.value / scale) * 100}%` }}
          />
        ))}
      </div>

      {metric.description && <p className="text-sm text-text-secondary">{metric.description}</p>}
    </div>
  );
}

function Comparisons({ items, stages }: { items: MetricComparison[]; stages: MetricStages }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(c => (
        <div key={c.label} className="flex flex-col gap-1 rounded-2xl border border-border/80 bg-white/40 px-4 py-3 dark:bg-white/5">
          <dt className="text-xs font-extrabold tracking-[0.1em] text-text-muted uppercase">{c.label}</dt>
          <dd className="flex flex-wrap items-baseline gap-x-2 font-display font-extrabold">
            <span className="sr-only">
              {stages.before} {c.before}, {stages.after} {c.after}
            </span>
            <span aria-hidden="true" className="text-text-muted">
              {c.before}
            </span>
            <span aria-hidden="true" className="text-text-muted">
              →
            </span>
            <span aria-hidden="true" className="text-xl text-leaf">
              {c.after}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

type CsMetricsProps = {
  metrics: ProjectMetric[];
  stages?: MetricStages;
  comparisons?: MetricComparison[];
  notes?: string[];
};

export function CsMetrics({ metrics, stages = DEFAULT_STAGES, comparisons, notes }: CsMetricsProps) {
  const hasInterim = metrics.some(m => m.interim !== undefined);
  const legend = [
    { label: stages.before, cls: FILL.before },
    ...(hasInterim ? [{ label: stages.interim ?? 'Interim', cls: FILL.interim }] : []),
    { label: stages.after, cls: FILL.after },
  ];

  return (
    <section className="pb-section">
      <Container>
        <div className="mb-8 space-y-2">
          <p className="text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">Impact</p>
          <h2 className="text-h2 font-black tracking-[-0.02em]">Key Metrics</h2>
        </div>

        <div className="glass flex flex-col gap-8 rounded-[26px] p-7 md:p-9">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {metrics.map(metric => (
              <MetricRow key={metric.label} metric={metric} stages={stages} />
            ))}
          </div>

          <div aria-hidden="true" className="flex flex-wrap gap-5 text-sm font-bold text-text-muted">
            {legend.map(l => (
              <span key={l.label} className="inline-flex items-center gap-2">
                <span className={`h-2.5 w-6 rounded-full ${l.cls}`} />
                {l.label}
              </span>
            ))}
          </div>

          {comparisons && comparisons.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-border/70 pt-7">
              <h3 className="text-sm font-extrabold tracking-[0.12em] text-text-muted uppercase">
                {stages.before} → {stages.after}
              </h3>
              <Comparisons items={comparisons} stages={stages} />
            </div>
          )}

          {notes && notes.length > 0 && (
            <ul className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-text-muted">
              {notes.map(n => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
