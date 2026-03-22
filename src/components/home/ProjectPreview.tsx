'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

type ProjectPreviewProps = {
  videoSrc: string | null;
  cursorX: number;
  cursorY: number;
};

export function ProjectPreview({ videoSrc, cursorX, cursorY }: ProjectPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    xTo.current = gsap.quickTo(containerRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    yTo.current = gsap.quickTo(containerRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    xTo.current?.(cursorX);
    yTo.current?.(cursorY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (videoSrc) {
      gsap.to(containerRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' });
      videoRef.current?.play();
    } else {
      gsap.to(containerRef.current, { scale: 0.8, opacity: 0, duration: 0.2, ease: 'power3.in' });
      videoRef.current?.pause();
    }
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[240px] w-[384px] overflow-hidden rounded-xl shadow-2xl opacity-0 lg:block"
      style={{ transform: 'scale(0.8)' }}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
