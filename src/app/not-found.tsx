import type { Metadata } from 'next';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16">
      {/* Decorative bubbles, kept to the sides so they never sit behind the copy */}
      <span aria-hidden="true" className="bubble top-[22%] left-[12%] h-[70px] w-[70px] motion-safe:animate-[float_8s_ease-in-out_infinite] max-md:hidden" />
      <span aria-hidden="true" className="bubble top-[12%] left-[20%] h-[34px] w-[34px] motion-safe:animate-[float_6s_ease-in-out_infinite_1s] max-md:hidden" />
      <span aria-hidden="true" className="bubble top-[52%] right-[10%] h-[100px] w-[100px] motion-safe:animate-[float_9s_ease-in-out_infinite_2s] max-md:hidden" />
      <span aria-hidden="true" className="bubble top-[40%] right-[18%] h-[26px] w-[26px] motion-safe:animate-[float_7s_ease-in-out_infinite_.5s] max-md:hidden" />

      <Container className="relative flex flex-col items-center gap-5 text-center">
        <h1 className="flex flex-col items-center gap-6">
          {/* "404" inside a glossy glass bubble */}
          <span className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,.98)_0,rgba(255,255,255,.7)_10%,rgba(200,238,255,.35)_40%,rgba(80,175,235,.45)_100%)] shadow-[inset_-20px_-26px_50px_rgba(20,110,190,.3),inset_14px_14px_30px_rgba(255,255,255,.6),0_30px_50px_rgba(10,90,160,.22)] sm:h-70 sm:w-70 dark:border-white/25 dark:bg-[radial-gradient(circle_at_32%_24%,rgba(160,220,255,.35)_0,rgba(60,140,210,.3)_25%,rgba(20,80,140,.35)_60%,rgba(8,40,74,.6)_100%)] dark:shadow-[inset_-20px_-26px_50px_rgba(0,0,0,.35),inset_14px_14px_30px_rgba(160,220,255,.15),0_30px_50px_rgba(0,0,0,.35)]">
            <span className="font-display text-[5.25rem] leading-none font-black tracking-[-0.04em] text-[#0b4f92] [text-shadow:0_3px_0_rgba(255,255,255,.7)] sm:text-[6.5rem] dark:text-[#bfe6ff] dark:text-shadow-none">
              404
            </span>
          </span>
          <span className="sr-only"> — </span>
          <span className="text-[clamp(1.8rem,3vw,2.4rem)] font-black">Page not found</span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button href="/" className="mt-1">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
