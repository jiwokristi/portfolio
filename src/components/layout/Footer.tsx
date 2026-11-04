import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

import { Hills } from './Hills';

export function Footer() {
  return (
    <footer className="relative mt-12 h-56">
      <Hills id="footer-hill" />
      <Container className="absolute inset-x-0 bottom-7 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm font-bold text-white [text-shadow:0_1px_2px_rgba(0,50,0,.55)]">
          &copy; {new Date().getFullYear()} Jiwo Kristi
        </p>
        <div className="flex items-center gap-2.5">
          <Button href="https://github.com/jiwokristi" newTab color="default" size="sm" className="min-h-11">
            GitHub
          </Button>
          <Button href="https://www.linkedin.com/in/jiwokristi/" newTab color="default" size="sm" className="min-h-11">
            LinkedIn
          </Button>
        </div>
      </Container>
    </footer>
  );
}
