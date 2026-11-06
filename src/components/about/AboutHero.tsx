'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '[data-hero-text]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative flex items-center overflow-hidden py-20 lg:min-h-[70vh] lg:py-24">
      {/* Bubble cluster in the empty space right of the copy (wide screens only) */}
      <span aria-hidden="true" className="bubble top-[22%] right-[8%] h-32 w-32 motion-safe:animate-[float_9s_ease-in-out_infinite] max-lg:hidden" />
      <span aria-hidden="true" className="bubble top-[14%] right-[20%] h-12 w-12 motion-safe:animate-[float_7s_ease-in-out_infinite_1s] max-lg:hidden" />
      <span aria-hidden="true" className="bubble top-[52%] right-[5%] h-8 w-8 motion-safe:animate-[float_6s_ease-in-out_infinite_2s] max-lg:hidden" />

      <Container className="relative">
        <div className="max-w-3xl space-y-6">
          <p
            data-hero-text
            className="chip-green inline-flex min-h-8 items-center rounded-full px-4 text-xs font-extrabold tracking-[0.12em] uppercase"
          >
            About me
          </p>
          <h1
            data-hero-text
            className="text-display leading-none font-black tracking-[-0.03em] [text-shadow:0_2px_0_rgba(255,255,255,.6)] max-lg:text-h1 dark:text-shadow-none"
          >
            The details
            <br />
            <span className="text-accent">are the work.</span>
          </h1>
          <p data-hero-text className="max-w-lg text-lg leading-relaxed text-text-secondary">
            I&apos;m a frontend developer who sometimes goes full stack. If you&apos;re looking for someone to build the
            part of your product people see and touch, I start with why it exists, build it on foundations that can
            grow, and care about the details that make someone stay, trust the brand, and come back.
          </p>
          <div data-hero-text className="flex flex-wrap gap-3.5 pt-2">
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
