import Link from 'next/link';

import type { NavItem } from '@/data/navigation';

type NavCardProps = NavItem & {
  index: number;
  onClick: () => void;
};

export function NavCard({ title, description, href, index, onClick }: NavCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-nav-card
      className="glass group flex items-center gap-5 rounded-3xl p-6 opacity-0 transition-[filter] hover:brightness-105 md:p-8"
    >
      <span
        className={`${index % 2 ? 'orb-green' : 'orb'} flex h-12 w-12 shrink-0 items-center justify-center font-display text-base font-black text-white [text-shadow:0_1px_2px_rgba(0,40,90,.6)]`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <span className="block font-display text-h3 font-black transition-colors group-hover:text-accent md:text-h2">{title}</span>
        <p className="mt-2 text-text-secondary">{description}</p>
      </div>
    </Link>
  );
}
