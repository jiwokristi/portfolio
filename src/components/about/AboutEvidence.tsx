'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCounter } from '@/hooks/use-counter';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { evidenceMetrics } from '@/data/about';

function MetricCounter({ label, before, after }: { label: string; before: number; after: number }) {
  const { value, ref } = useCounter(after);

  return (
    <div ref={ref} className="text-center">
      <p className="text-display font-bold tracking-tight text-accent max-lg:text-h1">{value}</p>
      <p className="mt-1 text-sm font-medium text-text-primary">{label}</p>
      <p className="text-xs text-text-muted">from {before}</p>
    </div>
  );
}

export function AboutEvidence() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '[data-evidence-text]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-evidence-text]',
            start: 'top 85%',
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div data-evidence-text className="flex flex-col justify-center space-y-6">
            {/* eslint-disable */}
            <p className="font-mono text-sm text-accent">// outcomes</p>
            <h2 className="text-h2 font-bold">What I&apos;ve Shipped</h2>
            <p className="text-text-secondary leading-relaxed">
              I redesigned the Apex Peptides e-commerce platform from scratch — restructured the information
              architecture, built a purposeful animation system, and optimized every layer of the frontend. The
              Lighthouse scores tell the story, but the real win is a site that feels fast and makes sense to users.
            </p>
            <div className="pt-2">
              <Button href="/projects/apex-peptides" variant="ghost" color="accent">
                Read the full case study &rarr;
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 content-center">
            {evidenceMetrics.map(metric => (
              <MetricCounter key={metric.label} label={metric.label} before={metric.before} after={metric.after} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
