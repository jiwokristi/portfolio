'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, useGSAP } from '@/lib/gsap';

const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Ring length left empty between the one-second arcs, room for the round caps and a tick. */
const GAP = 38;
/** Visible length of each one-second arc. */
const ARC = CIRCUMFERENCE / 3 - GAP;

/** The statement in three short parts, one second of the ring each. */
const PARTS = [
  'You have three seconds for a visitor to decide.',
  'Whether to stay, whether to trust you, and whether they want what you offer.',
  'I build for those three seconds, and for everything that comes after.',
];

/** Rotation that starts arc `i` just after its gap (the arcs group is turned so 0° is 12 o'clock). */
const arcRotation = (i: number) => ((i * CIRCUMFERENCE) / 3 + GAP / 2) / CIRCUMFERENCE * 360;

/** Tick `i` sits in the gap where part `i`'s arc ends, measured clockwise from 12 o'clock. */
const tickPosition = (i: number) => {
  const a = (((i + 1) * 120 - 90) * Math.PI) / 180;
  return { x: 120 + RADIUS * Math.cos(a), y: 120 + RADIUS * Math.sin(a) };
};

/**
 * Karaoke-style word reveal, modelled on Sequent's newsletter section: words switch between dim and
 * lit with a short CSS transition, and the one or two words being "read" glow like backlit glass.
 *
 * Focus pull on top: the part being read is sharp, the next ones sit slightly blurred and smaller
 * (as if seen through water), and finished parts settle a little dimmer. Everything only applies
 * once the script marks the text with `data-karaoke`, so without JS or with reduced motion it's
 * always sharp and fully readable.
 */
const KARAOKE =
  '[&_.w]:transition-[opacity,color,text-shadow] [&_.w]:duration-[250ms] [&[data-karaoke]_.w]:opacity-[.16] [&[data-karaoke]_.w.on]:opacity-100 ' +
  '[&_.w.now]:text-[#1a86d6] [&_.w.now]:[text-shadow:0_0_18px_rgba(90,200,255,.55),0_1px_0_rgba(255,255,255,.7)] ' +
  'dark:[&_.w.now]:text-[#8fd8ff] dark:[&_.w.now]:[text-shadow:0_0_22px_rgba(90,200,255,.65)] ' +
  '[&>p]:origin-left [&>p]:transition-[filter,opacity,scale] [&>p]:duration-500 [&>p]:ease-out ' +
  '[&[data-karaoke]>p[data-state=next]]:blur-[4px] [&[data-karaoke]>p[data-state=next]]:scale-[.97] ' +
  '[&[data-karaoke]>p[data-state=done]]:opacity-60';

/**
 * A short scroll-driven moment: while the section is pinned, the statement lights up word by word
 * and each of its three parts fills one second of a glossy ring. When a part finishes, its glass
 * tick turns green and the bubble in the middle gives a soft pulse. The pinning is pure CSS
 * (`motion-safe:` sticky + height), so with reduced motion (or before JS) it's a static section
 * showing the finished state: full ring, lit ticks, sharp text.
 */
export function ThreeSeconds() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const parts = PARTS.map(p => p.split(' '));

  useGSAP(
    () => {
      // Check the media query directly too: the hook's first render can't know it yet.
      if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const section = ref.current;
      const text = textRef.current;
      if (!section || !text) return;
      const spans = Array.from(text.querySelectorAll('.w'));
      const paras = Array.from(text.querySelectorAll<HTMLElement>(':scope > p'));
      const arcs = Array.from(section.querySelectorAll<SVGCircleElement>('[data-arc]'));
      const ticks = Array.from(section.querySelectorAll<SVGGElement>('[data-tick]'));

      // Where each part starts in the flat list of words.
      const sizes = parts.map(w => w.length);
      const starts = sizes.map((_, i) => sizes.slice(0, i).reduce((a, b) => a + b, 0));
      // Matches the markup, which ships with every tick lit for the static fallback.
      const lit = [true, true, true];
      let first = true;

      const pulse = (i: number) => {
        gsap.fromTo(ticks[i], { scale: 1.7 }, { scale: 1, duration: 0.55, ease: 'back.out(3)', transformOrigin: '50% 50%', overwrite: true });
        gsap.fromTo(bubbleRef.current, { scale: 1 }, { scale: 1.05, duration: 0.16, ease: 'sine.out', yoyo: true, repeat: 1, overwrite: true });
        gsap.fromTo(pulseRef.current, { opacity: 0.9 }, { opacity: 0, duration: 0.7, ease: 'power2.out', overwrite: true });
      };

      const render = (p: number) => {
        // Same pacing as Sequent: words finish at ~89% of the scroll; the glow trails the last 1.5 words.
        const k = p * 1.12 * spans.length;
        const resting = p >= 0.98;
        spans.forEach((s, i) => {
          const on = i < k;
          s.classList.toggle('on', on);
          s.classList.toggle('now', on && i >= k - 1.5 && !resting);
        });

        let seconds = 0;
        sizes.forEach((size, i) => {
          const f = Math.min(1, Math.max(0, (k - starts[i]) / size));
          seconds += f;
          // A zero-length round-capped dash still draws a dot, so hide empty arcs outright.
          arcs[i].style.strokeDasharray = `${ARC * f} ${CIRCUMFERENCE}`;
          arcs[i].style.opacity = f > 0.001 ? '1' : '0';

          const done = f >= 1;
          if (done !== lit[i]) {
            lit[i] = done;
            ticks[i].toggleAttribute('data-lit', done);
            if (done && !first) pulse(i);
          }

          // Focus pull: the part being read is sharp, later ones wait out of focus, earlier ones dim.
          // Once the whole statement has landed, every part rests sharp and fully lit.
          paras[i].dataset.state = resting ? '' : f >= 1 ? 'done' : k >= starts[i] ? 'now' : 'next';
        });
        if (counterRef.current) counterRef.current.textContent = `${seconds.toFixed(1)} s`;
        first = false;
      };

      text.setAttribute('data-karaoke', '');
      render(0);
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        onUpdate: () => render(proxy.p),
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
      });

      // Back to the finished, fully readable state if this ever unmounts or motion gets reduced.
      return () => {
        text.removeAttribute('data-karaoke');
        render(1);
        spans.forEach(s => s.classList.remove('now'));
        paras.forEach(el => delete el.dataset.state);
      };
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section ref={ref} aria-label="Three seconds" className="relative motion-safe:h-[230vh]">
      <div className="flex items-center py-section motion-safe:sticky motion-safe:top-0 motion-safe:h-svh motion-safe:py-0">
        <Container className="grid items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14">
          {/* Glossy timer ring: three one-second arcs with a glass tick in each gap */}
          <div aria-hidden="true" className="relative mx-auto h-44 w-44 sm:h-56 sm:w-56">
            <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="three-seconds-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#59b8f0" />
                  <stop offset=".55" stopColor="#1b80d2" />
                  <stop offset="1" stopColor="#4fbf3c" />
                </linearGradient>
                <radialGradient id="three-seconds-tick" cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset=".5" stopColor="#e6f6ff" />
                  <stop offset="1" stopColor="#a9d8f5" />
                </radialGradient>
                <radialGradient id="three-seconds-tick-lit" cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#e9ffd9" />
                  <stop offset=".45" stopColor="#7fd65a" />
                  <stop offset="1" stopColor="#2f9a2b" />
                </radialGradient>
              </defs>

              <g transform="rotate(-90 120 120)">
                {PARTS.map((_, i) => (
                  <circle
                    key={`track-${i}`}
                    cx="120"
                    cy="120"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
                    transform={`rotate(${arcRotation(i)} 120 120)`}
                    opacity=".7"
                  />
                ))}
                {PARTS.map((_, i) => (
                  <circle
                    key={`arc-${i}`}
                    data-arc
                    cx="120"
                    cy="120"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#three-seconds-ring)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
                    transform={`rotate(${arcRotation(i)} 120 120)`}
                  />
                ))}
              </g>

              {PARTS.map((_, i) => {
                const { x, y } = tickPosition(i);
                return (
                  // Lit by default, so the static (reduced motion / no JS) ring reads as complete.
                  <g key={`tick-${i}`} data-tick data-lit="" className="group">
                    <circle
                      cx={x}
                      cy={y}
                      r="7.5"
                      fill="url(#three-seconds-tick)"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="drop-shadow-[0_1px_2px_rgba(10,80,150,.35)]"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="7.5"
                      fill="url(#three-seconds-tick-lit)"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="opacity-0 transition-opacity duration-300 group-data-lit:opacity-100"
                    />
                    <ellipse cx={x - 2} cy={y - 3} rx="3.2" ry="1.8" fill="#ffffff" opacity=".85" />
                  </g>
                );
              })}
            </svg>

            {/* Glass bubble in the middle of the ring */}
            <div
              ref={bubbleRef}
              className="absolute inset-[18%] flex items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,.98)_0,rgba(255,255,255,.7)_12%,rgba(200,238,255,.35)_45%,rgba(80,175,235,.4)_100%)] shadow-[inset_-12px_-16px_30px_rgba(20,110,190,.28),inset_10px_10px_22px_rgba(255,255,255,.6)] dark:border-white/25 dark:bg-[radial-gradient(circle_at_32%_24%,rgba(160,220,255,.35)_0,rgba(60,140,210,.3)_30%,rgba(8,40,74,.65)_100%)]"
            >
              {/* Soft glossy flash when a part completes */}
              <span
                ref={pulseRef}
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.9)_0,rgba(170,240,140,.45)_45%,transparent_72%)] opacity-0 shadow-[0_0_30px_rgba(110,210,90,.55)]"
              />
              <span ref={counterRef} className="relative font-display text-4xl font-black text-[#0b4f92] tabular-nums sm:text-5xl dark:text-[#bfe6ff]">
                3.0 s
              </span>
            </div>
          </div>

          <div
            ref={textRef}
            className={`flex max-w-[19em] flex-col gap-[0.6em] text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.18] font-black tracking-[-0.015em] text-pretty ${KARAOKE}`}
          >
            {parts.map((words, p) => (
              <p key={p}>
                {words.map((w, i) => (
                  <span key={i} data-word className="w">
                    {w}
                    {i < words.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
