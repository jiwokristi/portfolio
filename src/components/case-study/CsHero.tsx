'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';
import type { CaseStudy, ProjectMetric } from '@/types/project';

type CsHeroProps = Pick<
  CaseStudy,
  'title' | 'subtitle' | 'category' | 'heroImage' | 'role' | 'timeline' | 'year' | 'techStack' | 'liveUrl'
> & {
  /** Up to three metrics float around the hero image as glass stat cards. */
  metrics?: ProjectMetric[];
};

/** Where each floating stat sits around the frame, and how far it drifts on scroll (px). */
const STAT_SLOTS = [
  { pos: '-left-5 top-[14%]', drift: 70, leaf: true },
  { pos: '-right-5 top-[44%]', drift: 40, leaf: false },
  { pos: 'left-[16%] -bottom-7', drift: 95, leaf: true },
];

function StatIcon({ leaf }: { leaf: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={leaf ? 3 : 2.6} strokeLinecap="round" strokeLinejoin="round">
      {leaf ? <path d="M5 13l4 4L19 7" /> : <path d="M13 2L4 14h7l-1 8 9-12h-7z" />}
    </svg>
  );
}

function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4">
      <dt className="text-xs font-extrabold tracking-[0.1em] text-text-muted uppercase">{label}</dt>
      <dd className="font-display text-base font-extrabold">{value}</dd>
    </div>
  );
}

export function CsHero({
  title,
  subtitle,
  category,
  heroImage,
  role,
  timeline,
  year,
  techStack,
  liveUrl,
  metrics = [],
}: CsHeroProps) {
  const stats = metrics.slice(0, STAT_SLOTS.length);
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        '[data-hero-text]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      );

      // Gentle parallax inside the frame; the image is scaled up so no edge is ever exposed.
      if (window.innerWidth >= 768) {
        gsap.fromTo(
          '[data-hero-image]',
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: '[data-hero-frame]', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );

        // Floating stats drift at different speeds for a little depth.
        gsap.utils.toArray<HTMLElement>('[data-float-stat]').forEach(el => {
          const drift = Number(el.dataset.drift ?? 50);
          gsap.fromTo(
            el,
            { y: drift },
            {
              y: -drift,
              ease: 'none',
              scrollTrigger: { trigger: '[data-hero-frame]', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          );
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Decorative bubbles in the empty space right of the title (desktop only) */}
      <span aria-hidden="true" className="bubble top-24 right-[6%] h-24 w-24 motion-safe:animate-[float_9s_ease-in-out_infinite] max-xl:hidden" />
      <span aria-hidden="true" className="bubble top-52 right-[14%] h-10 w-10 motion-safe:animate-[float_7s_ease-in-out_infinite_1.5s] max-xl:hidden" />

      <Container className="relative space-y-6 pt-12 pb-12 lg:pt-16">
        <Link
          href="/#projects"
          data-hero-text
          className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-extrabold text-text-primary transition-colors hover:text-accent"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          All projects
        </Link>

        <div data-hero-text className="flex flex-wrap gap-2">
          <Badge>{category}</Badge>
          <Badge variant="contained" color="success">
            {year}
          </Badge>
        </div>

        <h1
          data-hero-text
          className="max-w-4xl text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.05] font-black tracking-[-0.025em] [text-shadow:0_2px_0_rgba(255,255,255,.6)] dark:text-shadow-none"
        >
          {title}
        </h1>
        <p data-hero-text className="max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          {subtitle}
        </p>

        {/* Project facts */}
        <div data-hero-text className="glass overflow-hidden rounded-[22px]">
          <dl className="grid grid-cols-1 divide-y divide-border/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <MetaItem label="Role" value={role} />
            <MetaItem label="Timeline" value={timeline} />
            <MetaItem label="Year" value={year} />
          </dl>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 px-5 py-4">
            <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
              {techStack.map(tech => (
                <li key={tech}>
                  <Badge variant="contained" color="subtle" size="sm">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
            {liveUrl && (
              <Button href={liveUrl} newTab>
                Visit live site
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </Button>
            )}
          </div>
        </div>
      </Container>

      {/* Hero image in a glass frame */}
      <Container className="relative pb-section">
        <div className="relative">
          {/* Floating stat cards (wide screens only; the same numbers are in Key Metrics below) */}
          {stats.map((m, i) => {
            const slot = STAT_SLOTS[i];
            return (
              <div
                key={m.label}
                data-float-stat
                data-drift={slot.drift}
                aria-hidden="true"
                className={`absolute z-10 hidden lg:block ${slot.pos}`}
              >
                <div
                  className="glass flex items-center gap-3 rounded-[20px] px-[18px] py-3.5 motion-safe:animate-[float_8s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 1.3}s` }}
                >
                  <span className={`${slot.leaf ? 'orb-green' : 'orb'} flex h-9 w-9 items-center justify-center`}>
                    <StatIcon leaf={slot.leaf} />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-2xl font-black">
                      {m.before} → {m.after}
                    </span>
                    <span className="text-xs font-bold text-text-muted">{m.label}</span>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="glass rounded-[26px] p-2.5">
          <div data-hero-frame className="relative aspect-video overflow-hidden rounded-[18px]">
            <Image
              data-hero-image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              className="h-full w-full scale-[1.14] object-cover"
              priority
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.26)_0%,rgba(255,255,255,0)_40%)]" />
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
