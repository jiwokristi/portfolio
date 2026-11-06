'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { values } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

export function AboutValues() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>('[data-value-item]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: (i % 2) * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pb-section">
      <Container>
        <SectionHeading eyebrow="Values" title="How I Work" tone="leaf" />
        <ol className="grid gap-5 md:grid-cols-2">
          {values.map((value, i) => (
            <li key={value.title} data-value-item className="glass flex items-start gap-5 rounded-3xl p-6 md:p-7">
              <span
                aria-hidden="true"
                className={`${i % 2 ? 'orb-green' : 'orb'} flex h-12 w-12 shrink-0 items-center justify-center font-display text-base font-black text-white [text-shadow:0_1px_2px_rgba(0,40,90,.6)]`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="space-y-2">
                <p className={`text-xs font-extrabold tracking-[0.12em] uppercase ${i % 2 ? 'text-leaf' : 'text-accent'}`}>
                  {value.eyebrow}
                </p>
                <h3 className="text-xl leading-snug font-black">{value.title}</h3>
                <p className="text-[15px] leading-relaxed text-text-secondary">{value.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
