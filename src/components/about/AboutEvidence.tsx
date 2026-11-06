'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { evidenceMetrics } from '@/data/about';
import { useCounter } from '@/hooks/use-counter';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

/** A Lighthouse score inside a glossy glass bubble, counting up when scrolled into view. */
function MetricGauge({ label, before, after, leaf }: { label: string; before: number; after: number; leaf: boolean }) {
  const { value, ref } = useCounter(after);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div
        className={`flex h-32 w-32 flex-col items-center justify-center rounded-full border border-white/90 shadow-[inset_-10px_-14px_26px_rgba(20,110,190,.28),inset_8px_8px_18px_rgba(255,255,255,.7),0_14px_28px_rgba(18,92,146,.2)] sm:h-36 sm:w-36 dark:border-white/25 dark:shadow-[inset_-10px_-14px_26px_rgba(0,0,0,.35),inset_6px_6px_14px_rgba(160,220,255,.18),0_14px_28px_rgba(0,0,0,.35)] ${
          leaf
            ? 'bg-[radial-gradient(circle_at_34%_24%,#ffffff_0,#f2ffea_18%,#c8f0b4_55%,#7fd266_100%)] dark:bg-[radial-gradient(circle_at_34%_24%,#3f7a44_0,#24552a_45%,#123a18_100%)]'
            : 'bg-[radial-gradient(circle_at_34%_24%,#ffffff_0,#eaf8ff_18%,#bfe6fb_55%,#7cc6ef_100%)] dark:bg-[radial-gradient(circle_at_34%_24%,#2c6a9c_0,#174a75_45%,#0b2c4a_100%)]'
        }`}
      >
        <span className="sr-only">
          {label}: {after}, up from {before}
        </span>
        <span
          aria-hidden="true"
          className={`font-display text-[2.6rem] leading-none font-black ${leaf ? 'text-[#1a5e1e] dark:text-[#b9f5a6]' : 'text-[#0b4f92] dark:text-[#bfe6ff]'}`}
        >
          {value}
        </span>
        <span
          aria-hidden="true"
          className={`mt-1 text-xs font-bold ${leaf ? 'text-[#2c552c] dark:text-[#d6ffcb]' : 'text-[#24506f] dark:text-[#d8efff]'}`}
        >
          from {before}
        </span>
      </div>
      <p aria-hidden="true" className="text-sm font-extrabold">
        {label}
      </p>
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
          scrollTrigger: { trigger: '[data-evidence-text]', start: 'top 85%', once: true },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pb-section">
      <Container>
        <div className="glass grid items-center gap-10 rounded-[30px] p-7 md:p-11 lg:grid-cols-2">
          <div data-evidence-text className="space-y-5">
            <p className="text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">Results</p>
            <h2 className="text-h2 font-black tracking-[-0.02em]">What I&apos;ve Built</h2>
            <p className="leading-relaxed text-text-secondary">
              Sequent is my concept redesign of a slow research-peptides store. I restructured the catalog, built a
              scroll-story homepage, then audited and tuned the front end until it weighed 380 KB instead of the
              original&apos;s 13 MB. It&apos;s a front end without a backend, so the scores compare front ends, not
              finished stores. The real win is a site that feels fast and makes sense to visitors.
            </p>
            <Button href="/projects/sequent" variant="ghost" color="accent">
              Read the full case study
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          </div>
          <figure className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-8">
              {evidenceMetrics.map((metric, i) => (
                <MetricGauge
                  key={metric.label}
                  label={metric.label}
                  before={metric.before}
                  after={metric.after}
                  leaf={i === evidenceMetrics.length - 1}
                />
              ))}
            </div>
            <figcaption className="max-w-xs text-center text-[13px] leading-relaxed text-text-muted">
              Lighthouse, homepage: the original store (“from”) and Sequent, measured side by side.
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
