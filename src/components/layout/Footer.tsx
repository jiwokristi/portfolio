import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

function Hills() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hill-back)" }} />
          <stop offset="1" style={{ stopColor: "var(--hill-back-end)" }} />
        </linearGradient>
        <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hill-front)" }} />
          <stop offset=".5" style={{ stopColor: "var(--hill-front-mid)" }} />
          <stop offset="1" style={{ stopColor: "var(--hill-front-end)" }} />
        </linearGradient>
      </defs>
      <path d="M0 90 C 300 20, 620 60, 900 50 C 1150 40, 1300 10, 1440 40 L1440 220 L0 220 Z" fill="url(#hill-back)" />
      <path d="M0 130 C 260 70, 560 120, 860 100 C 1120 84, 1300 70, 1440 96 L1440 220 L0 220 Z" fill="url(#hill-front)" />
      <path
        d="M0 132 C 260 72, 560 122, 860 102 C 1120 86, 1300 72, 1440 98"
        stroke="#ffffff"
        strokeOpacity=".6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-12 h-56">
      <Hills />
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
