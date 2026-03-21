'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '[data-hero-text]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="flex min-h-[80vh] items-center py-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          {/* eslint-disable */}
          <p data-hero-text className="font-mono text-sm text-accent">
            // about
          </p>
          <h1 data-hero-text className="text-display font-bold leading-[1.05] tracking-tight max-lg:text-h1">
            I build things
            <br />
            that work.
          </h1>
          <p data-hero-text className="max-w-lg text-lg text-text-secondary leading-relaxed">
            For users, for businesses, for the long term. I start before I have all the answers and figure it out along
            the way.
          </p>
          <div data-hero-text className="flex gap-4 pt-2">
            <Button href="/#projects">View Projects</Button>
            <Button href="mailto:priyadijiwo@gmail.com" variant="outlined" color="default">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
