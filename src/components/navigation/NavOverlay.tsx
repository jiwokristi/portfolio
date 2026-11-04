import { forwardRef } from 'react';

import { Hills } from '@/components/layout/Hills';
import { navItems } from '@/data/navigation';

import { NavCard } from './NavCard';

type NavOverlayProps = {
  onNavigate: () => void;
};

const footerLink =
  'inline-flex min-h-11 items-center px-2.5 text-sm font-extrabold text-white [text-shadow:0_1px_2px_rgba(0,50,0,.55)] hover:underline';

export const NavOverlay = forwardRef<HTMLDivElement, NavOverlayProps>(function NavOverlay({ onNavigate }, ref) {
  return (
    <div
      ref={ref}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="pointer-events-none invisible fixed top-0 left-0 z-60 h-dvh w-full overflow-y-auto bg-bg bg-[image:var(--sun),var(--sky)] bg-no-repeat"
    >
      <div className="relative flex min-h-full flex-col overflow-hidden">
        {/* Decorative bubbles in the open space below the cards */}
        <span aria-hidden="true" className="bubble right-3 bottom-56 h-[90px] w-[90px] motion-safe:animate-[float_9s_ease-in-out_infinite]" />
        <span aria-hidden="true" className="bubble bottom-40 left-6 h-9 w-9 motion-safe:animate-[float_7s_ease-in-out_infinite_1s]" />

        <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 content-start gap-3 px-4 pt-28 pb-10 md:grid-cols-2 md:gap-4 md:px-6 lg:px-8">
          {navItems.map((item, i) => (
            <NavCard key={item.href} {...item} index={i} onClick={onNavigate} />
          ))}
        </div>

        {/* Hills with the footer links, as on the rest of the site */}
        <div className="relative h-36 shrink-0">
          <Hills id="menu-hill" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <p className="text-[13px] font-bold text-white [text-shadow:0_1px_2px_rgba(0,50,0,.55)]">
              &copy; {new Date().getFullYear()} Jiwo Kristi
            </p>
            <div className="flex gap-1">
              <a href="https://github.com/jiwokristi" target="_blank" rel="noopener noreferrer" className={footerLink}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/jiwokristi/" target="_blank" rel="noopener noreferrer" className={footerLink}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
