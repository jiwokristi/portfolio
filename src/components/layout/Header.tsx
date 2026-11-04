'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { NavMenu, type NavMenuHandle } from '@/components/navigation/NavMenu';

import { navItems } from '@/data/navigation';

import { LogoMark } from './LogoMark';

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

            <ThemeSwitcher />

            {/* Mobile overlay menu — hidden on md+; last so the hamburger sits on the outer edge */}
            <div className="flex items-center md:hidden">
              <NavMenu ref={navMenuRef} onOpenChange={setNavOpen} />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
