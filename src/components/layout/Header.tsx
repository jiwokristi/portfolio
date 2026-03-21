import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Jiwo Kristi
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/#projects" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
            Projects
          </Link>
          <Link href="/about" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
            About
          </Link>
          <Link href="/resume" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
            Resume
          </Link>
          <Link
            href="mailto:priyadijiwo@gmail.com"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Contact
          </Link>
          <div className="h-4 border-l border-border" />
          <ThemeSwitcher />
        </nav>
      </Container>
    </header>
  );
}
