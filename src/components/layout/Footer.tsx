import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} Jiwo Kristi</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/jiwokristi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jiwokristi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
