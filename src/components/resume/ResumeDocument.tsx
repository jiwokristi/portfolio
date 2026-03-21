'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Button } from '@/components/ui/Button';
import { contact, experience, education, skills, projects } from '@/data/resume';

function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

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
      <div ref={containerRef} className="resume-document mx-auto w-full max-w-4xl px-6 pt-32 pb-20 lg:px-8">
        {/* Header */}
        <header data-resume-section className="mb-4">
          <h1 className="text-h3 font-bold text-accent">{contact.name}</h1>
          <p className="mt-1 text-text-secondary">
            {contact.location} · {contact.email} · {contact.phone} ·{' '}
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
            </a>
          </p>
        </header>

        {/* Experience */}
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-lg font-bold text-accent">Work Experience</h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.company} className="resume-entry">
                <div className="flex items-baseline justify-between gap-4">
                  <p>
                    <span className="font-bold">{exp.company}</span>
                    <span className="mx-1 text-text-muted">·</span>
                    <span className="text-text-secondary">{exp.role}</span>
                  </p>
                  <p className="shrink-0 text-text-muted">
                    {exp.location}
                    <span className="mx-1">·</span>
                    {exp.period}
                  </p>
                </div>
                {exp.context && <p className="text-text-secondary">{exp.context}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-text-secondary">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{renderBold(h)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-lg font-bold text-accent">
            Education and Certifications
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.institution}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">
                    {edu.institution}
                    {edu.location && <span className="font-normal text-text-secondary"> — {edu.location}</span>}
                  </h3>
                  <span className="shrink-0 text-text-muted">{edu.period}</span>
                </div>
                <p className="italic text-text-secondary">{edu.credential}</p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-text-secondary">
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
        <section data-resume-section className="mb-4">
          <h2 className="mb-2 border-b border-border pb-1 text-lg font-bold text-accent">Projects & Achievements</h2>
          <div className="space-y-2">
            {projects.map(proj => (
              <div key={proj.name}>
                {proj.url ? (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-accent">
                    {proj.name}
                  </a>
                ) : (
                  <span className="font-semibold">{proj.name}</span>
                )}
                <span className="ml-2 text-text-muted">{proj.year}</span>
                <span className="ml-2 text-text-secondary">— {renderBold(proj.description)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section data-resume-section className="mb-4">
          <p className="text-text-secondary">
            <strong>Skills:</strong> {skills.join(' · ')}
          </p>
        </section>
      </div>

      <Button className="fixed right-6 bottom-6 print:hidden" size="sm" onClick={() => window.print()}>
        Download PDF
      </Button>
    </>
  );
}
