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
      className="relative h-4 w-12 cursor-pointer overflow-hidden text-sm text-text-secondary transition-colors hover:text-text-primary"
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
