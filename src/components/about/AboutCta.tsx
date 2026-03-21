import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function AboutCta() {
  return (
    <section className="bg-bg-secondary py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-h2 font-bold">Let&apos;s build something.</h2>
          <p className="mb-8 text-lg text-text-secondary leading-relaxed">
            I&apos;m always interested in projects where good thinking leads to real impact. If you&apos;ve got
            something worth building, let&apos;s talk.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="mailto:priyadijiwo@gmail.com">Get in Touch</Button>
            <Button href="https://github.com/jiwokristi" variant="outlined" color="default">
              GitHub
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
