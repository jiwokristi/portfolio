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
      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface/50 p-8 opacity-0 transition-colors hover:border-accent/30 md:p-10"
    >
      <span className="font-mono text-sm text-text-muted">{String(index + 1).padStart(2, '0')}</span>
      <div className="mt-auto">
        <span className="block text-h2 font-bold transition-colors group-hover:text-accent md:text-h1">{title}</span>
        <p className="mt-2 text-text-secondary">{description}</p>
      </div>
    </Link>
  );
}
