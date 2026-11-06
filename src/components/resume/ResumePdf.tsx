'use client';

import { Document, Font, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';
import { contact, displayUrl, headline, summary, experience, education, skills, projects, languages } from '@/data/resume';

// Never split words across lines: an ATS reads "Respon-sive" as two words and misses the keyword.
Font.registerHyphenationCallback(word => [word]);

/**
 * Inter, embedded, so the PDF looks the same in every viewer and matches the printed resume.
 * (The built-in Helvetica isn't embedded, so each viewer swapped in its own lookalike.)
 * In the browser react-pdf fetches the files from /public; when rendered in Node, it reads them from disk.
 */
const fontSrc = (file: string) =>
  typeof window === 'undefined' ? `${process.cwd()}/public/fonts/resume/${file}` : `/fonts/resume/${file}`;

Font.register({
  family: 'Inter',
  fonts: [
    { src: fontSrc('inter-400-normal.woff'), fontWeight: 400 },
    { src: fontSrc('inter-400-italic.woff'), fontWeight: 400, fontStyle: 'italic' },
    { src: fontSrc('inter-600-normal.woff'), fontWeight: 600 },
    { src: fontSrc('inter-700-normal.woff'), fontWeight: 700 },
  ],
});

const TEXT = '#111827';
const TEXT_SECONDARY = '#374151';
const TEXT_MUTED = '#6b7280';
const BORDER = '#d1d5db';

const styles = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 38,
    paddingHorizontal: 42,
    fontFamily: 'Inter',
    fontSize: 9,
    color: TEXT_SECONDARY,
    lineHeight: 1.45,
  },

  // Header
  name: {
    fontSize: 20,
    fontWeight: 700,
    color: TEXT,
    lineHeight: 1.15,
  },
  headline: {
    marginTop: 8,
    fontSize: 10.5,
    fontWeight: 600,
    color: TEXT_SECONDARY,
  },
  contactRow: {
    marginTop: 9,
    fontSize: 8.5,
  },
  linksRow: {
    marginTop: 1,
    fontSize: 8.5,
  },
  link: {
    color: TEXT_SECONDARY,
    textDecoration: 'underline',
  },

  // Section
  section: {
    marginTop: 13,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: TEXT,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: BORDER,
    marginBottom: 6,
  },

  // Experience entry
  entry: {
    marginTop: 9,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  company: {
    fontSize: 9.5,
    fontWeight: 700,
    color: TEXT,
  },
  role: {
    fontSize: 9.5,
  },
  period: {
    color: TEXT_MUTED,
    fontSize: 8.5,
    flexShrink: 0,
    marginLeft: 12,
  },
  context: {
    marginTop: 1,
    color: TEXT_MUTED,
  },
  bulletList: {
    marginTop: 3,
  },
  bulletItem: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bullet: {
    width: 10,
    paddingLeft: 2,
  },
  bulletText: {
    flex: 1,
  },

  // Education
  institution: {
    fontSize: 9.5,
    fontWeight: 700,
    color: TEXT,
  },
  credential: {
    fontStyle: 'italic',
  },

  // Skills
  skillsRow: {
    marginTop: 1.5,
  },
  skillsLabel: {
    fontWeight: 600,
    color: TEXT,
  },
});

export function ResumePdf() {
  return (
    <Document
      title={`${contact.name} - Resume`}
      author={contact.name}
      subject={headline}
      keywords={skills.flatMap(group => group.items).join(', ')}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.headline}>{headline}</Text>
          {/* Where and how to reach me, then the links on their own line */}
          <Text style={styles.contactRow}>
            {contact.location} ·{' '}
            <Link src={`mailto:${contact.email}`} style={styles.link}>
              {contact.email}
            </Link>
            {' · '}
            <Link src={`tel:${contact.phone.replace(/s/g, '')}`} style={styles.link}>
              {contact.phone}
            </Link>
          </Text>
          <Text style={styles.linksRow}>
            <Link src={contact.linkedin} style={styles.link}>
              {displayUrl(contact.linkedin)}
            </Link>
            {' · '}
            <Link src={contact.github} style={styles.link}>
              {displayUrl(contact.github)}
            </Link>
            {' · '}
            <Link src={contact.portfolio} style={styles.link}>
              {displayUrl(contact.portfolio)}
            </Link>
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map(group => (
            <Text key={group.label} style={styles.skillsRow}>
              <Text style={styles.skillsLabel}>{group.label}: </Text>
              {group.items.join(', ')}
            </Text>
          ))}
          <Text style={styles.skillsRow}>
            <Text style={styles.skillsLabel}>Languages: </Text>
            {languages.join(', ')}
          </Text>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experience.map((exp, idx) => (
            <View key={exp.company} style={idx > 0 ? styles.entry : undefined}>
              {/* Never leave a job title alone at the bottom of a page */}
              <View style={styles.entryRow} minPresenceAhead={36}>
                <Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.role}> · {exp.role}</Text>
                </Text>
                <Text style={styles.period}>
                  {exp.location ? `${exp.location} · ` : ''}
                  {exp.period}
                </Text>
              </View>
              {exp.context && <Text style={styles.context}>{exp.context}</Text>}
              {exp.highlights.length > 0 && (
                <View style={styles.bulletList}>
                  {exp.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletItem} wrap={false}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, idx) => (
              <View key={proj.name} style={idx > 0 ? styles.entry : undefined} wrap={false}>
                <View style={styles.entryRow}>
                  <Text>
                    <Text style={styles.company}>{proj.name}</Text>
                    {proj.url && (
                      <Text style={styles.role}>
                        {' · '}
                        <Link src={proj.url} style={styles.link}>
                          {displayUrl(proj.url)}
                        </Link>
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.period}>{proj.year}</Text>
                </View>
                <Text style={styles.context}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, idx) => (
            <View key={edu.institution} style={idx > 0 ? styles.entry : undefined}>
              <View style={styles.entryRow}>
                <Text style={styles.institution}>
                  {edu.institution}
                  {edu.location && <Text style={{ fontWeight: 400, color: TEXT_SECONDARY }}> — {edu.location}</Text>}
                </Text>
                <Text style={styles.period}>{edu.period}</Text>
              </View>
              <Text style={styles.credential}>{edu.credential}</Text>
              {edu.highlights && edu.highlights.length > 0 && (
                <View style={styles.bulletList}>
                  {edu.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletItem} wrap={false}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
