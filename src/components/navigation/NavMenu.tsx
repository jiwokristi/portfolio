'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { MenuButton } from './MenuButton';
import { NavOverlay } from './NavOverlay';

type NavMenuProps = {
  onOpenChange?: (open: boolean) => void;
};

export function NavMenu({ onOpenChange }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLSpanElement>(null);
  const closeTextRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  useFocusTrap(overlayRef, isOpen);

  // Build timeline once
  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(overlayRef.current, { pointerEvents: 'none', visibility: 'hidden' });
        document.body.style.overflow = '';
        onOpenChangeRef.current?.(false);
      },
    });

    // Overlay slides up
    tl.set(overlayRef.current, { pointerEvents: 'auto', visibility: 'visible' }, 0);
    tl.fromTo(overlayRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'power4.inOut' }, 0);

    // Menu text slides up and fades out
    tl.to(menuTextRef.current, { y: -20, opacity: 0, duration: 0.35, ease: 'power3.in' }, 0);

    // Close text slides up and fades in
    tl.fromTo(closeTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.1);

    // Nav cards stagger in
    tl.fromTo('[data-nav-card]', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 0.3);

    timelineRef.current = tl;
  }, { dependencies: [prefersReducedMotion] });

  const open = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
    document.body.style.overflow = 'hidden';

    if (prefersReducedMotion) {
      if (overlayRef.current) {
        overlayRef.current.style.visibility = 'visible';
        overlayRef.current.style.transform = 'translateY(0)';
      }
      if (menuTextRef.current) {
        menuTextRef.current.style.opacity = '0';
      }
      if (closeTextRef.current) {
        closeTextRef.current.style.opacity = '1';
      }
      gsap.set('[data-nav-card]', { opacity: 1, y: 0 });
    } else {
      timelineRef.current?.restart();
    }
  }, [prefersReducedMotion, onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);

    if (prefersReducedMotion) {
      onOpenChange?.(false);
      document.body.style.overflow = '';
      if (overlayRef.current) {
        overlayRef.current.style.visibility = 'hidden';
        overlayRef.current.style.transform = '';
      }
      if (menuTextRef.current) {
        menuTextRef.current.style.opacity = '1';
      }
      if (closeTextRef.current) {
        closeTextRef.current.style.opacity = '0';
      }
    } else {
      // scroll + onOpenChange deferred to onReverseComplete
      timelineRef.current?.reverse();
    }
  }, [prefersReducedMotion, onOpenChange]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  // Close on route change
  useEffect(() => {
    if (isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <MenuButton ref={buttonRef} isOpen={isOpen} onClick={toggle} menuRef={menuTextRef} closeRef={closeTextRef} />
      <NavOverlay ref={overlayRef} onNavigate={close} />
    </>
  );
}
