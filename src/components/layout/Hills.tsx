/**
 * Grassy Aero hills, stretched to fill their positioned parent.
 * `id` prefixes the gradient ids so several hills can share a page (footer + mobile menu).
 */
export function Hills({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--hill-back)' }} />
          <stop offset="1" style={{ stopColor: 'var(--hill-back-end)' }} />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--hill-front)' }} />
          <stop offset=".5" style={{ stopColor: 'var(--hill-front-mid)' }} />
          <stop offset="1" style={{ stopColor: 'var(--hill-front-end)' }} />
        </linearGradient>
      </defs>
      <path d="M0 90 C 300 20, 620 60, 900 50 C 1150 40, 1300 10, 1440 40 L1440 220 L0 220 Z" fill={`url(#${id}-back)`} />
      <path d="M0 130 C 260 70, 560 120, 860 100 C 1120 84, 1300 70, 1440 96 L1440 220 L0 220 Z" fill={`url(#${id}-front)`} />
      <path d="M0 132 C 260 72, 560 122, 860 102 C 1120 86, 1300 72, 1440 98" stroke="#ffffff" strokeOpacity=".6" strokeWidth="2" fill="none" />
    </svg>
  );
}
