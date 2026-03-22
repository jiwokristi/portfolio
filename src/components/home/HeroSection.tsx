import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="flex min-h-[80vh] items-center py-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Full-stack Engineer</p>
          <h1 className="text-display font-bold leading-[1.05] tracking-tight max-lg:text-[2.7rem]">
            Crafting digital
            <br />
            experiences that
            <br />
            <span className="text-accent">perform.</span>
          </h1>
          <p className="max-w-lg text-lg text-text-secondary leading-relaxed">
            I design and build high-performance websites and web applications with a focus on user experience,
            accessibility, scalability, and measurable results.
          </p>
          <div className="flex gap-4 pt-2">
            <Button href="#projects">View Projects</Button>
            <Button href="mailto:priyadijiwo@gmail.com" variant="outlined" color="default">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
