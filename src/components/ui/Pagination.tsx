import Link, { type LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Builds the link for a page number; keeps pages as real, shareable URLs. */
  hrefFor: (page: number) => LinkProps['href'];
  label: string;
  className?: string;
};

const item =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 font-display text-sm font-extrabold transition-[filter] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  );
}

/** Glossy page navigation. Renders nothing when everything fits on one page. */
export function Pagination({ page, totalPages, hrefFor, label, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav aria-label={label} className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
      {prev ? (
        <Link href={hrefFor(prev)} className={cn(item, 'gloss-light hover:brightness-105')} aria-label="Previous page">
          <Chevron dir="left" />
          <span className="max-sm:hidden">Previous</span>
        </Link>
      ) : (
        <span className={cn(item, 'gloss-light opacity-50')} aria-hidden="true">
          <Chevron dir="left" />
          <span className="max-sm:hidden">Previous</span>
        </span>
      )}

      <ol className="flex flex-wrap items-center gap-2">
        {pages.map(p => (
          <li key={p}>
            <Link
              href={hrefFor(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(item, p === page ? 'gloss-aqua' : 'gloss-light hover:brightness-105')}
            >
              {p}
            </Link>
          </li>
        ))}
      </ol>

      {next ? (
        <Link href={hrefFor(next)} className={cn(item, 'gloss-light hover:brightness-105')} aria-label="Next page">
          <span className="max-sm:hidden">Next</span>
          <Chevron dir="right" />
        </Link>
      ) : (
        <span className={cn(item, 'gloss-light opacity-50')} aria-hidden="true">
          <span className="max-sm:hidden">Next</span>
          <Chevron dir="right" />
        </span>
      )}
    </nav>
  );
}
