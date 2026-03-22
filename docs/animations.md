# Animation System

## Setup

GSAP and ScrollTrigger are configured in `src/lib/gsap.ts`:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
```

All components import from `@/lib/gsap` rather than directly from GSAP packages.

## Animation Patterns

### 1. Batch Fade-In Stagger

Used by: ProjectGrid, AboutPhilosophy, AboutStack, CsFeatures

Elements animate in groups as they enter the viewport. Good for grids and lists.

```typescript
gsap.set('[data-card]', { y: 30, opacity: 0 });
ScrollTrigger.batch('[data-card]', {
  onEnter: elements =>
    gsap.to(elements, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
  start: 'top 85%',
  once: true,
});
```

### 2. Staggered Text Animation

Used by: AboutHero, CsHero

Sequential text reveal for hero sections.

```typescript
gsap.fromTo(
  '[data-hero-text]',
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
);
```

### 3. Parallax Effect

Used by: CsHero (desktop only)

Image moves slower than scroll for depth effect.

```typescript
gsap.to('[data-hero-image]', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### 4. Per-Element Scroll Triggers

Used by: CsProcess, AboutValues

Each element has its own trigger point, useful for timeline/sequential layouts.

```typescript
gsap.utils.toArray('[data-process-item]').forEach((el, i) => {
  gsap.fromTo(
    el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
});
```

### 5. Counter Animation

Used by: AboutEvidence, CsMetrics (via `useCounter` hook)

Animated number counting triggered by scroll.

```typescript
gsap.to(obj, {
  val: end,
  duration,
  ease: 'power2.out',
  scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
  onUpdate: () => setValue(Math.round(obj.val)),
});
```

## Hooks

### `useCounter` (`src/hooks/use-counter.ts`)

Animates a number from 0 to a target value when the element scrolls into view.

```typescript
const { value, ref } = useCounter(98, 2); // count to 98 over 2 seconds
```

Returns a `ref` to attach to the trigger element and the current animated `value`. Skips animation and sets final value immediately if reduced motion is preferred.

### `useReducedMotion` (`src/hooks/use-reduced-motion.ts`)

Detects the user's `prefers-reduced-motion` setting.

```typescript
const prefersReducedMotion = useReducedMotion();
```

Returns `true` if the user prefers reduced motion. Listens for dynamic changes via `matchMedia`. All animated components check this and skip GSAP entirely when `true`.

## Component Pattern

All animated components follow this pattern:

```typescript
'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      // GSAP animations here, scoped to containerRef
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return <div ref={containerRef}>...</div>;
}
```

Key conventions:
- Always use `useGSAP` with `scope` for automatic cleanup
- Always check `useReducedMotion()` before animating
- Use `data-*` attributes on elements as animation selectors
- Set `once: true` on ScrollTriggers for single-fire animations
