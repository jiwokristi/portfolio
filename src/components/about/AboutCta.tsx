import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function AboutCta() {
  return (
    <section className="pb-section">
      <Container>
        <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,#0a5aa6_0%,#1584d8_45%,#23a35a_100%)] px-7 py-14 text-center shadow-[0_24px_50px_rgba(10,80,150,.3),inset_0_1px_0_rgba(255,255,255,.6)] md:px-12 md:py-16 dark:border-white/25">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.04))]" />
          <span aria-hidden="true" className="bubble -top-10 left-[8%] h-28 w-28 opacity-70 motion-safe:animate-[float_10s_ease-in-out_infinite] max-md:hidden" />
          <span aria-hidden="true" className="bubble right-[10%] bottom-5 h-14 w-14 opacity-70 motion-safe:animate-[float_8s_ease-in-out_infinite_1.5s] max-md:hidden" />

          <h2 className="relative text-[clamp(2rem,3.4vw,2.7rem)] leading-tight font-black text-white [text-shadow:0_2px_4px_rgba(0,40,80,.35)]">
            Let&apos;s build something.
          </h2>
          <p className="relative max-w-xl text-[17px] leading-relaxed text-white">
            I&apos;m always interested in projects where good thinking leads to real impact. If you&apos;ve got something
            worth building, let&apos;s talk.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3.5 pt-2">
            <Button href="mailto:priyadijiwo@gmail.com" variant="outlined" color="default">
              Get in Touch
            </Button>
            <Button
              href="https://github.com/jiwokristi"
              newTab
              variant="ghost"
              color="default"
              className="border border-white/70 px-6 text-white hover:bg-white/15 hover:text-white"
            >
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
