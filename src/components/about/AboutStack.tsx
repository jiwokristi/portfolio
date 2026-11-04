'use client';

import { useRef } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { stackCategories } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** Icons in data order: frontend (window), backend (database), tools (wrench). */
const ICONS = [
  <g key="f">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
  </g>,
  <g key="b">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </g>,
  <path key="t" d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />,
];

export function AboutStack() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set('[data-stack-group]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-stack-group]', {
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
    <section ref={containerRef} className="relative pb-section">
      <span aria-hidden="true" className="bubble top-6 right-[2%] h-14 w-14 motion-safe:animate-[float_8s_ease-in-out_infinite_1s] max-xl:hidden" />
      <Container className="relative">
        <SectionHeading eyebrow="Stack" title="Tech Stack" />
        <div className="grid gap-5 md:grid-cols-3">
          {stackCategories.map((category, i) => {
            const leaf = i % 2 === 1;
            return (
              <div key={category.label} data-stack-group className="glass flex flex-col gap-4 rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className={`${leaf ? 'orb-green' : 'orb'} flex h-11 w-11 items-center justify-center`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[i % ICONS.length]}
                    </svg>
                  </span>
                  <h3 className={`text-sm font-extrabold tracking-[0.12em] uppercase ${leaf ? 'text-leaf' : 'text-accent'}`}>
                    {category.label}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {category.items.map(item => (
                    <li key={item}>
                      <Badge variant="contained" color={leaf ? 'success' : 'subtle'}>
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* The note on tools spans the row under the three categories */}
          <aside data-stack-group className="glass flex flex-col gap-3 rounded-3xl p-6 md:col-span-3 md:flex-row md:items-start md:gap-6">
            <p className="shrink-0 text-xs font-extrabold tracking-[0.12em] text-text-muted uppercase md:w-36 md:pt-1">
              A note on tools
            </p>
            <p className="leading-relaxed text-text-secondary">
              Tools change. Frameworks come and go. The skill that actually matters is picking up new ones fast and
              knowing when to use what. I&apos;m not married to any stack — I care about choosing the right tool for the
              problem.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
