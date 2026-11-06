'use client';

import { useRef } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

/** What the page promises, one idea per floating card. */
const IDEAS = [
  {
    title: 'First 3 seconds',
    label: 'Where visitors decide',
    green: false,
    pos: 'left-0 top-10',
    depth: 90,
    icon: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9.5 2.5h5" />
      </>
    ),
  },
  {
    title: 'Trust',
    label: 'Earned in the details',
    green: true,
    pos: 'right-0 top-[11rem]',
    depth: 55,
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6zM8.5 12l2.5 2.5 4.5-5" />,
  },
  {
    title: 'Built to grow',
    label: 'Foundations first',
    green: true,
    pos: 'left-8 bottom-12',
    depth: 120,
    icon: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  },
];

/**
 * Decorative glossy globe with floating idea cards. On scroll the globe and each card drift at
 * different speeds for a gentle sense of depth (skipped when the visitor prefers reduced motion).
 * Purely decorative: the hero copy carries the message, so the block is hidden from assistive tech.
 */
export function HeroOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Drive the drift from the hero section itself, from page top until the hero has scrolled away.
      const scroll = { trigger: ref.current?.closest('section') ?? ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('[data-orb-globe]', { y: -50, scale: 0.96, ease: 'none', scrollTrigger: scroll });
      gsap.utils.toArray<HTMLElement>('[data-orb-card]').forEach(el => {
        gsap.to(el, { y: -Number(el.dataset.depth ?? 60), ease: 'none', scrollTrigger: scroll });
      });
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <div ref={ref} aria-hidden="true" className="relative h-[460px] min-w-0 flex-[1_1_400px] max-sm:hidden">
      {/* Globe */}
      <div data-orb-globe className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[radial-gradient(circle_at_34%_26%,#ffffff_0,#e8f8ff_10%,#8fd6fa_34%,#2a9de6_62%,#0a5fae_100%)] shadow-[inset_-24px_-30px_60px_rgba(0,50,110,.35),inset_18px_18px_40px_rgba(255,255,255,.55),0_40px_60px_rgba(10,90,160,.28)] dark:brightness-[.7] dark:saturate-[.85]">
          <div className="absolute -bottom-[12%] -left-[10%] h-[52%] w-[120%] rounded-t-[50%] bg-[linear-gradient(180deg,#8be06a_0%,#3fae34_55%,#1f7a22_100%)] shadow-[inset_0_10px_20px_rgba(255,255,255,.45)]" />
          <div className="absolute top-[6%] left-[14%] h-[30%] w-[56%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,0))]" />
        </div>
        <div className="absolute bottom-6 left-1/2 h-6 w-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(10,70,130,.25),transparent_70%)]" />
      </div>

      {IDEAS.map((idea, i) => (
        // Outer element takes the scroll parallax, inner one the idle float, so the transforms don't fight.
        <div key={idea.title} data-orb-card data-depth={idea.depth} className={`absolute ${idea.pos}`}>
          <div
            className="glass flex items-center gap-3 rounded-[20px] px-[18px] py-3.5 motion-safe:animate-[float_8s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <span className={`${idea.green ? 'orb-green' : 'orb'} flex h-9 w-9 items-center justify-center`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {idea.icon}
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="font-display text-lg leading-tight font-black">{idea.title}</span>
              <span className="text-xs font-bold text-text-muted">{idea.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
