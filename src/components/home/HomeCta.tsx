import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HomeCta() {
  return (
    <section className="pb-section">
      <Container>
        <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,#0a5aa6_0%,#1584d8_45%,#23a35a_100%)] px-8 py-12 shadow-[0_24px_50px_rgba(10,80,150,.3),inset_0_1px_0_rgba(255,255,255,.6)] md:px-12 md:py-14 dark:border-white/25">
          {/* Gloss highlight + bubble */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,.04))]" />
          <span aria-hidden="true" className="bubble -top-12 right-[26%] h-36 w-36 opacity-70 motion-safe:animate-[float_10s_ease-in-out_infinite]" />

          <div className="relative max-w-xl space-y-2.5">
            <h2 className="text-[clamp(1.9rem,3.2vw,2.5rem)] leading-tight font-black text-white [text-shadow:0_2px_4px_rgba(0,40,80,.35)]">
              Start a conversation
            </h2>
            <p className="text-[17px] leading-relaxed text-white">
              Have a project that needs to be fast, clear and accessible? Let&apos;s talk.
            </p>
          </div>
          <Button href="mailto:priyadijiwo@gmail.com" variant="outlined" color="default" className="relative">
            priyadijiwo@gmail.com
          </Button>
        </div>
      </Container>
    </section>
  );
}
