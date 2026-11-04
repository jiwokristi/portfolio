import { forwardRef } from 'react';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  menuRef: React.RefObject<HTMLSpanElement | null>;
  closeRef: React.RefObject<HTMLSpanElement | null>;
};

/**
 * Round glossy menu button. NavMenu's timeline swaps the two icon layers
 * (hamburger out, ✕ in) the same way it used to swap the "Menu"/"Close" labels.
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { isOpen, onClick, menuRef, closeRef },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="nav-overlay"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="gloss-aqua relative h-11 w-11 cursor-pointer overflow-hidden rounded-full transition-[filter] hover:brightness-110"
    >
      <span ref={menuRef} aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </span>
      <span ref={closeRef} aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </span>
    </button>
  );
});
