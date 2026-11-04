import Link from 'next/link';

import type { NavItem } from '@/data/navigation';

type NavCardProps = NavItem & {
  index: number;
  onClick: () => void;
};

/** One icon per destination; falls back to an arrow for anything new. */
function NavIcon({ href }: { href: string }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: '#ffffff', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  if (href.includes('projects'))
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  if (href.includes('about'))
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
      </svg>
    );
  if (href.includes('resume'))
    return (
      <svg {...common}>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h5" />
      </svg>
    );
  if (href.startsWith('mailto:'))
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function NavCard({ title, description, href, index, onClick }: NavCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-nav-card
      className="glass group flex items-center gap-4 rounded-[22px] p-[18px] opacity-0 transition-[filter] hover:brightness-105 md:gap-5 md:p-7"
    >
      <span
        aria-hidden="true"
        className={`${index % 2 ? 'orb-green' : 'orb'} flex h-11 w-11 shrink-0 items-center justify-center md:h-13 md:w-13`}
      >
        <NavIcon href={href} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-display text-xl font-black transition-colors group-hover:text-accent md:text-h3">{title}</span>
        <span className="text-sm text-text-secondary md:text-base">{description}</span>
      </span>
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
