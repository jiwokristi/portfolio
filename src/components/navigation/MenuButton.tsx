import { forwardRef } from 'react';

type MenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  menuRef: React.RefObject<HTMLSpanElement | null>;
  closeRef: React.RefObject<HTMLSpanElement | null>;
};

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { isOpen, onClick, menuRef, closeRef },
  ref,
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="nav-overlay"
      className="gloss-aqua relative h-11 w-20 cursor-pointer overflow-hidden rounded-full font-display text-sm font-extrabold transition-[filter] hover:brightness-110"
    >
      <span ref={menuRef} className="absolute inset-0 flex items-center justify-center">
        Menu
      </span>
      <span ref={closeRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        Close
      </span>
    </button>
  );
});
