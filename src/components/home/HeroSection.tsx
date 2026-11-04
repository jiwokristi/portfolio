import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroOrb } from '@/components/home/HeroOrb';

export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden py-16 lg:min-h-[78vh] lg:pt-24 lg:pb-40">
      {/* lg:pb-40 leaves room for the bubbles below the buttons and their shadow */}
      {/* Kept ≥32px below the hero's top edge: the float animation lifts them 14px and the shadow needs room too */}
      <span aria-hidden="true" className="bubble left-[48%] top-19 h-16 w-16 motion-safe:animate-[float_8s_ease-in-out_infinite_.5s] max-lg:hidden" />
      <span aria-hidden="true" className="bubble left-[53%] top-8 h-7 w-7 motion-safe:animate-[float_6s_ease-in-out_infinite_2s] max-lg:hidden" />

      <Container className="relative flex flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_520px] space-y-6">
          <p className="chip-green inline-flex min-h-8 items-center rounded-full px-4 text-xs font-extrabold uppercase tracking-[0.12em]">
            Full-stack Engineer
          </p>
          <h1 className="text-display font-black leading-[1.02] tracking-[-0.025em] [text-shadow:0_2px_0_rgba(255,255,255,.6)] max-lg:text-[2.7rem] dark:text-shadow-none">
            Crafting digital
            <br />
            experiences that
            <br />
            <span className="text-accent">perform.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
            I design and build high-performance websites and web applications with a focus on user experience,
            accessibility, scalability, and measurable results.
          </p>
          <div className="relative flex flex-wrap gap-3.5 pt-2">
            {/* Decorative bubbles anchored below the buttons, so they never sit behind copy */}
            <span aria-hidden="true" className="bubble top-full left-0 mt-4 h-20 w-20 motion-safe:animate-[float_9s_ease-in-out_infinite] max-lg:hidden" />
            <span aria-hidden="true" className="bubble top-full left-24 mt-2 h-9 w-9 motion-safe:animate-[float_7s_ease-in-out_infinite_1s] max-lg:hidden" />
            <Button href="#projects">
              View Projects
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button href="mailto:priyadijiwo@gmail.com" variant="outlined" color="default">
              Get in Touch
            </Button>
          </div>
        </div>

        <HeroOrb />
      </Container>
    </section>
  );
}
