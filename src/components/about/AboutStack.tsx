'use client';

import { useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { stackCategories } from '@/data/about';

export function AboutStack() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.set('[data-stack-group]', { y: 30, opacity: 0 });
      ScrollTrigger.batch('[data-stack-group]', {
        onEnter: elements => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-bg-secondary py-section">
      <Container>
        <h2 className="mb-12 text-center text-h2 font-bold">Tech Stack</h2>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {stackCategories.map(category => (
              <div key={category.label} data-stack-group>
                <p className="mb-3 font-mono text-sm text-text-muted">{category.label}</p>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(item => (
                    <Badge key={item} variant="outlined" size="lg">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
            {/* eslint-disable */}
            <p className="font-mono text-sm text-text-muted mb-3">// a note on tools</p>
            <p className="text-sm text-text-secondary leading-relaxed">
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
