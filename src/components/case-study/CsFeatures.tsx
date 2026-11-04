'use client';

import { useRef } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import type { ProjectFeature } from '@/types/project';

export function CsFeatures({ features }: { features: ProjectFeature[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set('[data-feature-card]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-feature-card]', {
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
      <span aria-hidden="true" className="bubble top-4 left-[1%] h-16 w-16 opacity-80 motion-safe:animate-[float_8s_ease-in-out_infinite_2s] max-xl:hidden" />
      <Container className="relative">
        <div className="mb-8 space-y-2">
          <p className="text-[13px] font-extrabold tracking-[0.14em] text-leaf uppercase">Features</p>
          <h2 className="text-h2 font-black tracking-[-0.02em]">What was built</h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <li key={feature.title} data-feature-card className="glass flex flex-col gap-3 rounded-3xl p-6">
              <h3 className="text-lg leading-snug font-black">{feature.title}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-text-secondary">{feature.description}</p>
              {feature.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {feature.tags.map((tag, i) => (
                    <Badge key={tag} variant="contained" color={i % 2 ? 'success' : 'subtle'} size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
