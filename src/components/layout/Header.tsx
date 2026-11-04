'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { NavMenu, type NavMenuHandle } from '@/components/navigation/NavMenu';

import { navItems } from '@/data/navigation';

function LogoMark() {
  return (
    <span className="orb flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4v10a4 4 0 0 1-4 4" />
        <path d="M14 4v16" />
        <path d="M20 4l-6 8 6 8" />
      </svg>
    </span>
  );
}

export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const navMenuRef = useRef<NavMenuHandle>(null);

  return (
    <header className="fixed top-0 z-70 w-full pt-4">
      <Container className="relative z-70">
        <div className="glass flex h-16 items-center justify-between rounded-full pr-2 pl-3 sm:pl-4">
          <Link
            href="/"
            onClick={() => {
              if (navOpen) navMenuRef.current?.close();
            }}
            className="flex items-center gap-3 rounded-full font-display text-lg font-black tracking-tight"
          >
            <LogoMark />
            Jiwo Kristi
          </Link>
          <nav className="flex items-center gap-2">
            {/* Desktop inline links — hidden below md */}
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2.5 text-[0.95rem] font-bold text-text-primary transition-colors hover:bg-white/60 dark:hover:bg-white/10"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Mobile overlay menu — hidden on md+ */}
            <div className="flex items-center md:hidden">
              <NavMenu ref={navMenuRef} onOpenChange={setNavOpen} />
            </div>

            <ThemeSwitcher />
          </nav>
        </div>
      </Container>
    </header>
  );
}
