'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

import type { ProjectSummary } from '@/types/project';

type ProjectCardProps = {
  project: ProjectSummary;
};

/**
 * Full-width project card drawn as a glossy Aero window.
 *
 * The whole card navigates via a "stretched" title link (its ::after covers the card).
 * The description block sits above that layer, so reading, selecting or expanding the
 * description can never trigger navigation by accident.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const descId = useId();
  const descRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  // Show "See more" only when the 2-line clamp actually hides text. Re-checks on resize.
  useEffect(() => {
    const el = descRef.current;
    if (!el || expanded) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  const canPreview = Boolean(project.previewVideo) && !reducedMotion;

  function startPreview() {
    if (!canPreview) return;
    setPreviewing(true);
    videoRef.current?.play().catch(() => {});
  }

  function stopPreview() {
    setPreviewing(false);
    videoRef.current?.pause();
  }

  return (
    <article
      className="glass group relative overflow-hidden rounded-[22px] transition-[filter] card-hover:brightness-[1.03]"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      {/* Caption bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/90 bg-[linear-gradient(180deg,rgba(190,232,255,.9)_0%,rgba(140,208,245,.75)_50%,rgba(110,192,238,.75)_51%,rgba(160,218,248,.85)_100%)] px-4 py-2.5 dark:border-white/20 dark:bg-[linear-gradient(180deg,rgba(60,130,190,.6)_0%,rgba(30,90,150,.5)_50%,rgba(20,70,125,.5)_51%,rgba(40,105,165,.55)_100%)]">
        <span className="truncate text-[13px] font-extrabold text-[#0a3a63] dark:text-[#eaf7ff]">
          {project.slug} — Case study
        </span>
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-4.5 w-6.5 rounded-[5px] border border-[#8cc6e6] bg-[linear-gradient(180deg,#f3fbff,#c9e8f8)]" />
          <span className="h-4.5 w-6.5 rounded-[5px] border border-[#8cc6e6] bg-[linear-gradient(180deg,#f3fbff,#c9e8f8)]" />
          <span className="h-4.5 w-10 rounded-[5px] border border-[#9a2410] bg-[linear-gradient(180deg,#ff9a86_0%,#e0442a_50%,#c22d16_51%,#e3583c_100%)]" />
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Media: hero image, preview video plays in place on hover */}
        <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-95 lg:w-[48%] lg:shrink-0">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            width={project.heroImage.width}
            height={project.heroImage.height}
            className="h-full w-full object-cover transition-transform duration-500 card-hover:scale-105"
          />
          {canPreview && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewing ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,0)_45%)]" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-6 md:p-8">
          <Badge className="self-start">{project.category}</Badge>
          <h3 className="text-2xl leading-tight font-black md:text-[1.75rem]">
            <Link
              href={`/projects/${project.slug}`}
              data-card-link
              className="transition-colors card-hover:text-accent after:absolute after:inset-0 after:rounded-[22px] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            >
              {project.title}
            </Link>
          </h3>

          {/* Above the stretched link: clicks here never navigate */}
          {/* Padding gives a no-navigate buffer around "See more"; negative margins keep the visual spacing. */}
          <div className="relative z-10 -mx-3 -my-2 cursor-auto rounded-xl px-3 pt-2 pb-4">
            <p
              ref={descRef}
              id={descId}
              className={`text-[15px] leading-relaxed text-text-secondary ${expanded ? '' : 'line-clamp-2'}`}
            >
              {project.description}
            </p>
            {(clamped || expanded) && (
              <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                aria-expanded={expanded}
                aria-controls={descId}
                className="mt-1 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-1 font-display text-sm font-extrabold text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-accent"
              >
                {expanded ? 'See less' : 'See more'}
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {project.metrics.map((m, i) => {
              const leaf = i === project.metrics.length - 1;
              return (
                <div
                  key={m.label}
                  className={`${leaf ? 'chip-green' : 'chip'} flex flex-col items-center justify-center gap-1 rounded-2xl px-1.5 py-3 text-center`}
                >
                  <span className={`font-display text-[22px] leading-none font-black ${leaf ? 'text-leaf' : 'text-accent'}`}>{m.after}</span>
                  {/* Same two-line slot for every label, so values line up across tiles and content stays centred */}
                  <span className="flex min-h-[2lh] items-center text-[11px] leading-tight font-bold">{m.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map(tech => (
              <Badge key={tech} variant="contained" color="subtle" size="sm">
                {tech}
              </Badge>
            ))}
          </div>

          <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-1 font-display text-[15px] font-extrabold text-accent">
            Read the case study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform card-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
