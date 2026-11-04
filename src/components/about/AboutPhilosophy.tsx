'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { philosophyCards } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** One icon per card, in data order: approach, decisions, outcomes. */
const ICONS = [
  <path key="a" d="M5 19c4-1 7-4 9-9l4-4M14 4h4v4" />,
  <path key="d" d="M5 12h14" />,
  <g key="o">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </g>,
];

export function AboutPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set('[data-philosophy-card]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-philosophy-card]', {
        onEnter: elements => {
          gsap.to(elements, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pb-section">
      <Container>
        <SectionHeading eyebrow="Philosophy" title="How I Think" />
        <ul className="grid gap-5 md:grid-cols-3">
          {philosophyCards.map((card, i) => (
            <li key={card.title} data-philosophy-card className="glass flex flex-col gap-3.5 rounded-3xl p-7">
              <span
                aria-hidden="true"
                className={`${i % 2 ? 'orb-green' : 'orb'} flex h-11 w-11 items-center justify-center`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[i % ICONS.length]}
                </svg>
              </span>
              <p className={`text-xs font-extrabold tracking-[0.12em] uppercase ${i % 2 ? 'text-leaf' : 'text-accent'}`}>
                {card.label}
              </p>
              <h3 className="text-xl leading-snug font-black">{card.title}</h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">{card.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
