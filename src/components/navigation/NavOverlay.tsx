import { forwardRef } from 'react';
import { navItems } from '@/data/navigation';
import { NavCard } from './NavCard';

type NavOverlayProps = {
  onNavigate: () => void;
};

export const NavOverlay = forwardRef<HTMLDivElement, NavOverlayProps>(function NavOverlay({ onNavigate }, ref) {
  return (
    <div
      ref={ref}
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="pointer-events-none invisible fixed inset-0 -z-10 flex items-center justify-center pt-24 pb-8 bg-bg"
    >
      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:px-8">
        {navItems.map((item, i) => (
          <NavCard key={item.href} {...item} index={i} onClick={onNavigate} />
        ))}
      </div>
    </div>
  );
});
