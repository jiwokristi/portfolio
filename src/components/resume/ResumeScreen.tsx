'use client';

import { useRef } from 'react';

import { contact, education, experience, headline, languages, projects, skills, summary } from '@/data/resume';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

import { gsap, useGSAP } from '@/lib/gsap';

/** Skills shown as green chips; everything else is blue (frontend and tooling). */
const BACKEND_SKILLS = new Set(['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'System Design', 'REST APIs']);

/** "Mar 2026 - Present" → "Mar 2026 – Present" for display. */
const period = (p: string) => p.replace(' - ', ' – ');

const chip = 'chip inline-flex min-h-8 items-center rounded-full px-3 text-[13px] font-bold';

function SectionTitle({ children, leaf = false }: { children: React.ReactNode; leaf?: boolean }) {
  return (
    <h2 className="flex items-center gap-2.5 border-b-2 border-border pb-2.5 font-display text-[15px] font-black tracking-[0.12em] text-accent uppercase">
      <span aria-hidden="true" className={`${leaf ? 'orb-green' : 'orb'} h-6.5 w-6.5 shrink-0`} />
      {children}
    </h2>
  );
}

/**
 * The on-screen resume, following the Frutiger Aero mock. Never printed: print uses ResumePrint,
 * which keeps the legacy layout.
 */
export function ResumeScreen() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-resume-section]', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

  return (
    <div className="relative px-6 print:hidden">
      {/* Decorative bubbles beside the sheet (wide screens only) */}
      <span aria-hidden="true" className="bubble top-40 left-[5%] hidden h-27.5 w-27.5 motion-safe:animate-[float_9s_ease-in-out_infinite] xl:block" />
      <span aria-hidden="true" className="bubble top-24 left-[12%] hidden h-10.5 w-10.5 motion-safe:animate-[float_7s_ease-in-out_infinite_1s] xl:block" />
      <span aria-hidden="true" className="bubble top-[38%] right-[5%] hidden h-22 w-22 motion-safe:animate-[float_8s_ease-in-out_infinite_2s] xl:block" />
      <span aria-hidden="true" className="bubble top-[78%] left-[4%] hidden h-15 w-15 motion-safe:animate-[float_8s_ease-in-out_infinite_3s] xl:block" />

      <article
        ref={containerRef}
        className="glass relative mx-auto mt-6 mb-24 flex max-w-225 flex-col gap-9 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,.94)_0%,rgba(255,255,255,.82)_100%)]! px-[clamp(1.5rem,5vw,3.5rem)] py-[clamp(1.75rem,5vw,3.5rem)] dark:bg-[linear-gradient(180deg,rgba(16,62,104,.92)_0%,rgba(8,40,74,.86)_100%)]!"
      >
        {/* Header */}
        <header data-resume-section className="flex flex-col gap-3.5">
          <h1 className="text-[clamp(2.2rem,4vw,3rem)] leading-tight font-black tracking-[-0.02em]">{contact.name}</h1>
          <p className="font-display text-lg font-extrabold text-accent">{headline}</p>
          <ul className="flex flex-wrap gap-2">
            <li className={chip}>{contact.location}</li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${chip} hover:text-accent`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={`${chip} hover:text-accent`}>
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} {...external} className={`${chip} hover:text-accent`}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} {...external} className={`${chip} hover:text-accent`}>
                GitHub
              </a>
            </li>
            <li>
              <a href={contact.portfolio} {...external} className={`${chip} hover:text-accent`}>
                Portfolio
              </a>
            </li>
          </ul>
        </header>

        {/* Summary */}
        <section data-resume-section className="flex flex-col gap-3.5">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-[15px] leading-[1.7] text-text-secondary">{summary}</p>
        </section>

        {/* Experience */}
        <section data-resume-section className="flex flex-col gap-5.5">
          <SectionTitle>Experience</SectionTitle>
          <ol className="flex flex-col gap-5.5">
            {experience.map(exp => (
              <li key={exp.company} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-1.25 h-3.5 w-3.5 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,#ffffff_0,#9fdcff_30%,#1a86d6_100%)] shadow-[0_2px_4px_rgba(11,98,180,.35)]"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg leading-snug font-black">
                      {exp.role} · {exp.company}
                    </h3>
                    <span className="text-sm font-bold text-text-muted">{period(exp.period)}</span>
                  </div>
                  {exp.location && <span className="text-sm font-bold text-text-muted">{exp.location}</span>}
                  {exp.context && <p className="text-sm leading-relaxed text-text-secondary italic">{exp.context}</p>}
                  {exp.highlights.length > 0 && (
                    <ul className="flex list-disc flex-col gap-1.5 pl-4.5 text-sm leading-relaxed text-text-secondary">
                      {exp.highlights.map(h => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects (screen only; the printed resume leaves them out) */}
        {projects.length > 0 && (
          <section data-resume-section className="flex flex-col gap-3.5">
            <SectionTitle leaf>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.name} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-black">
                    {proj.url ? (
                      <a href={proj.url} {...external} className="text-text-primary underline-offset-4 hover:text-accent hover:underline">
                        {proj.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      proj.name
                    )}
                  </h3>
                  <span className="text-sm font-bold text-text-muted">{proj.year}</span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        <section data-resume-section className="flex flex-col gap-3.5">
          <SectionTitle leaf>Skills</SectionTitle>
          <ul className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <li key={skill} className={`${BACKEND_SKILLS.has(skill) ? 'chip-green' : 'chip'} inline-flex min-h-8 items-center rounded-full px-3 text-[13px] font-bold`}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Education + Languages side by side */}
        <div data-resume-section className="grid gap-8 sm:grid-cols-2">
          <section className="flex flex-col gap-3.5">
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.institution} className="flex flex-col gap-1">
                <h3 className="text-base font-black">
                  {edu.institution}
                  {edu.location && <span className="font-normal text-text-secondary"> — {edu.location}</span>}
                </h3>
                <span className="text-sm text-text-secondary">{edu.credential}</span>
                <span className="text-sm font-bold text-text-muted">{period(edu.period)}</span>
              </div>
            ))}
          </section>
          <section className="flex flex-col gap-3.5">
            <SectionTitle>Languages</SectionTitle>
            <ul className="flex flex-wrap gap-1.5">
              {languages.map(lang => (
                <li key={lang} className={chip}>
                  {lang}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
