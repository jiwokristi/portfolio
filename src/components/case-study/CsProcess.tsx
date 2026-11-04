'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';
import type { ProcessPhase } from '@/types/project';

export function CsProcess({ process }: { process: ProcessPhase[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>('[data-process-item]').forEach(el => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pb-section">
      <Container>
        <div className="mb-8 space-y-2">
          <p className="text-[13px] font-extrabold tracking-[0.14em] text-accent uppercase">Process</p>
          <h2 className="text-h2 font-black tracking-[-0.02em]">
            {process.length === 4 ? 'Four stages' : 'How it came together'}
          </h2>
        </div>

        <ol className="relative space-y-10 lg:space-y-12">
          {/* Glowing rail joining the numbered orbs */}
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[21px] w-0.5 rounded-full bg-[linear-gradient(180deg,#59b8f0,#4fbf3c)] opacity-60 md:left-[27px]"
          />
          {process.map((phase, i) => (
            <li key={phase.title} data-process-item className="relative flex gap-4 md:gap-6">
              <span
                aria-hidden="true"
                className={`${i % 2 ? 'orb-green' : 'orb'} relative flex h-11 w-11 shrink-0 items-center justify-center font-display text-lg font-black text-white [text-shadow:0_1px_2px_rgba(0,40,90,.6)] md:h-14 md:w-14 md:text-xl`}
              >
                {i + 1}
              </span>
              {/* Summary as plain text on the sky; the details get their own glass card */}
              <article className="grid min-w-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
                <div className="space-y-3 pt-1.5 md:pt-3">
                  <h3 className="text-h3 font-black">
                    <span className="sr-only">Stage {i + 1}: </span>
                    {phase.title}
                  </h3>
                  <p className="leading-relaxed text-text-secondary">{phase.description}</p>
                </div>
                {phase.highlights && phase.highlights.length > 0 && (
                  <div className="glass rounded-3xl p-6">
                    <p className="mb-3.5 text-xs font-extrabold tracking-[0.12em] text-text-muted uppercase">Key actions</p>
                    <ul className="space-y-2.5">
                      {phase.highlights.map(h => (
                        <li key={h} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-text-secondary">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,#ffffff_0,#9fdcff_30%,#1a86d6_100%)] shadow-[0_2px_4px_rgba(11,98,180,.35)]"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
