/**
 * Decorative sky behind the top of every page: a sun glow with soft rays
 * and the white aurora streaks from the Frutiger Aero mockup.
 */
export function SkyDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-175 overflow-hidden">
      {/* Sun rays: thin wedges around the sun, faded out with a radial mask */}
      <div className="absolute inset-0 bg-[repeating-conic-gradient(from_-8deg_at_82%_8%,var(--sun-ray)_0deg_3deg,transparent_3deg_13deg)] [mask-image:radial-gradient(circle_at_82%_8%,#000_0,rgba(0,0,0,.5)_22%,transparent_58%)]" />

      <svg viewBox="0 0 1440 700" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="sky-sun" cx="82%" cy="8%" r="45%">
            <stop offset="0" style={{ stopColor: "var(--sun-core)", stopOpacity: "var(--sun-core-a)" }} />
            <stop offset=".25" style={{ stopColor: "var(--sun-mid)", stopOpacity: "var(--sun-mid-a)" }} />
            <stop offset="1" style={{ stopColor: "var(--sun-core)", stopOpacity: 0 }} />
          </radialGradient>
          <linearGradient id="sky-streak" x1="0" x2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".5" style={{ stopColor: '#ffffff', stopOpacity: 'var(--streak-opacity)' }} />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1440" height="700" fill="url(#sky-sun)" />
        <path d="M-40 520 C 300 380, 700 640, 1480 360" stroke="url(#sky-streak)" strokeWidth="3" fill="none" />
        <path d="M-40 560 C 360 430, 760 660, 1480 410" stroke="url(#sky-streak)" strokeWidth="1.5" fill="none" />
        <path d="M-40 600 C 420 470, 820 690, 1480 460" stroke="url(#sky-streak)" strokeWidth="8" fill="none" opacity=".35" />
      </svg>
    </div>
  );
}
