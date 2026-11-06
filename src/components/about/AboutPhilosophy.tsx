'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { philosophyCards } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** One icon per card, in data order: purpose (compass), foundations (layers), detail (sparkle). */
const ICONS = [
  <g key="p">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </g>,
  <path key="f" d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  <path key="d" d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />,
];

/** Sticky offset from the top for each stacked card: under the fixed header, then a 24px step. */
const stickyTop = (i: number) => 112 + i * 24;

/**
 * Philosophy as sticky stacking glass cards (md+ with motion allowed): each card pins, the next
 * slides over it, and the one beneath settles back slightly. On phones or with reduced motion it's
 * a plain list with a simple reveal.
 */
export function AboutPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.set('[data-philosophy-card]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-philosophy-card]', {
        onEnter: elements => {
          gsap.to(elements, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
        },
        start: 'top 85%',
        once: true,
      });

      // Settle each card back as the next one slides over it (stacking layout is md+ only).
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-philosophy-inner]');
        cards.slice(0, -1).forEach((card, i) => {
          // Scale and dim rather than fade: a faded card turns see-through and shows the one beneath.
          // Explicit start values: GSAP would otherwise read `filter: none` as brightness(0).
          gsap.fromTo(card, { scale: 1, filter: 'brightness(1) saturate(1)' }, {
            scale: 0.94,
            filter: 'brightness(0.9) saturate(0.85)',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1].parentElement,
              start: 'top 80%',
              end: `top ${stickyTop(i + 1)}px`,
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section ref={containerRef} className="pb-section">
      <Container>
        <SectionHeading eyebrow="Philosophy" title="How I Think" />
        <ol className="flex flex-col gap-5 md:motion-safe:gap-[28vh] md:motion-safe:pb-[10vh]">
          {philosophyCards.map((card, i) => {
            const leaf = i % 2 === 1;
            return (
              <li
                key={card.title}
                data-philosophy-card
                className="md:motion-safe:sticky"
                style={{ top: stickyTop(i) }}
              >
                <article
                  data-philosophy-inner
                  className="glass grid origin-top gap-5 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,.97)_0%,rgba(243,250,255,.93)_100%)]! p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:p-11 dark:bg-[linear-gradient(180deg,rgba(18,66,110,.97)_0%,rgba(9,44,80,.95)_100%)]!"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`${leaf ? 'orb-green' : 'orb'} flex h-12 w-12 shrink-0 items-center justify-center`}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          {ICONS[i % ICONS.length]}
                        </svg>
                      </span>
                      <p className={`text-xs font-extrabold tracking-[0.12em] uppercase ${leaf ? 'text-leaf' : 'text-accent'}`}>
                        <span className="sr-only">{i + 1}. </span>
                        {card.label}
                      </p>
                    </div>
                    <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-black">{card.title}</h3>
                  </div>
                  <p className="self-center text-base leading-relaxed text-text-secondary md:text-lg">{card.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
