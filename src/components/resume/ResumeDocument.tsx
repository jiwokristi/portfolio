'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { DownloadResumeButton } from './DownloadResumeButton';
import { contact, summary, experience, education, skills } from '@/data/resume';

export function ResumeDocument() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('[data-resume-section]', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <>
      <DownloadResumeButton />
      <div
        ref={containerRef}
        className="resume-document mx-auto w-full max-w-4xl px-6 pt-8 pb-16 md:pt-12 md:pb-20 lg:px-8"
      >
        {/* Header */}
        <header data-resume-section className="mb-4">
          <h1 className="text-xl font-bold text-accent md:text-h3">{contact.name}</h1>
          <p className="mt-1 text-sm text-text-secondary md:text-base">
            {contact.location} ·{' '}
            <a href={`mailto:${contact.email}`} className="underline hover:text-accent">
              {contact.email}
            </a>
            {' · '}
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="underline hover:text-accent">
              {contact.phone}
            </a>
            {' · '}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              LinkedIn
            </a>{' '}
            ·{' '}
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              GitHub
            </a>{' '}
            ·{' '}
            <a
              href={contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              Portfolio
            </a>
          </p>
        </header>

        {/* Summary */}
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-base font-bold text-accent md:text-lg">Summary</h2>
          <p className="text-sm text-text-secondary md:text-base">{summary}</p>
        </section>

        {/* Experience */}
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-base font-bold text-accent md:text-lg">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.company} className="resume-entry">
                <div className="resume-inline flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <p className="text-sm md:text-base">
                    <span className="font-bold">{exp.company}</span>
                    <span className="mx-1 text-text-muted">·</span>
                    <span className="text-text-secondary">{exp.role}</span>
                  </p>
                  <p className="text-sm text-text-muted md:shrink-0 md:text-base">
                    {exp?.location}
                    {exp.location && <span className="mx-1">·</span>}
                    {exp.period}
                  </p>
                </div>
                {exp.context && <p className="text-sm text-text-secondary md:text-base">{exp.context}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-text-secondary md:text-base">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-base font-bold text-accent md:text-lg">Education</h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.institution}>
                <div className="resume-inline flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <h3 className="text-sm font-semibold md:text-base">
                    {edu.institution}
                    {edu.location && <span className="font-normal text-text-secondary"> — {edu.location}</span>}
                  </h3>
                  <span className="text-sm text-text-muted md:shrink-0 md:text-base">{edu.period}</span>
                </div>
                <p className="text-sm italic text-text-secondary md:text-base">{edu.credential}</p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-text-secondary md:text-base">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        {/* DO NOT DELETE */}
        {/* <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-base font-bold text-accent md:text-lg">
            Projects & Achievements
          </h2>
          <div className="space-y-2">
            {projects.map(proj => (
              <div key={proj.name} className="text-sm md:text-base">
                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:text-accent"
                  >
                    {proj.name}
                  </a>
                ) : (
                  <span className="font-semibold">{proj.name}</span>
                )}
                <span className="ml-2 text-text-muted">{proj.year}</span>
                <span className="ml-2 text-text-secondary">— {proj.description}</span>
              </div>
            ))}
          </div>
        </section> */}

        {/* Skills */}
        <section data-resume-section className="mb-4">
          <p className="text-sm text-text-secondary md:text-base">
            <strong>Skills:</strong> {skills.join(' · ')}
          </p>
        </section>
      </div>

    </>
  );
}
