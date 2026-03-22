'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { NavMenu } from '@/components/navigation/NavMenu';
import { navItems } from '@/data/navigation';

export function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 z-[70] w-full border-b border-border/50',
        navOpen ? 'bg-bg' : 'bg-bg/80 backdrop-blur-md',
      )}
    >
      <Container className="relative z-[70] flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Jiwo Kristi
        </Link>
        <nav className="flex items-center gap-6">
          {/* Desktop inline links — hidden below md */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile overlay menu — hidden on md+ */}
          <div className="md:hidden">
            <NavMenu onOpenChange={setNavOpen} />
          </div>

          <div className="h-4 border-l border-border" />
          <ThemeSwitcher />
        </nav>
      </Container>
    </header>
  );
}
