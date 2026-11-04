import { useId } from 'react';

/**
 * Site logo: a glossy Frutiger Aero bubble with a jelly "JK" monogram.
 * Original artwork for this site.
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const sphere = `logo-sphere-${uid}`;
  const glow = `logo-glow-${uid}`;
  const shine = `logo-shine-${uid}`;
  const letter = `logo-letter-${uid}`;

  return (
    <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        {/* Glass sphere: pale aqua top-left to deep sky blue */}
        <radialGradient id={sphere} cx=".35" cy=".28" r=".8">
          <stop offset="0" stopColor="#d9f7ff" />
          <stop offset=".35" stopColor="#5cc8f4" />
          <stop offset=".75" stopColor="#1683d6" />
          <stop offset="1" stopColor="#0b5fae" />
        </radialGradient>
        {/* Light pooling inside the bottom of the bubble */}
        <radialGradient id={glow} cx=".5" cy=".92" r=".55">
          <stop offset="0" stopColor="#9ff8ff" stopOpacity=".95" />
          <stop offset="1" stopColor="#9ff8ff" stopOpacity="0" />
        </radialGradient>
        {/* Top gloss */}
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Jelly letters: bright white fading to ice blue */}
        <linearGradient id={letter} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cdf1ff" />
        </linearGradient>
      </defs>

      {/* Sphere with a thin bright rim */}
      <circle cx="24" cy="24" r="22.5" fill={`url(#${sphere})`} />
      <circle cx="24" cy="24" r="22.5" fill={`url(#${glow})`} />
      <circle cx="24" cy="24" r="22" fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth="1.1" />

      {/* Monogram: soft drop shadow, then the jelly letters with a blue edge */}
      <text
        x="24"
        y="31.6"
        textAnchor="middle"
        fontFamily="'Nunito Variable', Nunito, 'Segoe UI', sans-serif"
        fontWeight="900"
        fontSize="21"
        letterSpacing="-1"
        fill="#063a70"
        fillOpacity=".45"
        transform="translate(0.6 1.4)"
      >
        JK
      </text>
      <text
        x="24"
        y="31.6"
        textAnchor="middle"
        fontFamily="'Nunito Variable', Nunito, 'Segoe UI', sans-serif"
        fontWeight="900"
        fontSize="21"
        letterSpacing="-1"
        fill={`url(#${letter})`}
        stroke="#0a5aa6"
        strokeWidth=".7"
        paintOrder="stroke"
      >
        JK
      </text>

      {/* Gloss sweep across the top of the bubble, over the letters */}
      <ellipse cx="21" cy="12.5" rx="14" ry="7.5" fill={`url(#${shine})`} opacity=".85" />
    </svg>
  );
}
