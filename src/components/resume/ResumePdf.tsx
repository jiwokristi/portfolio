'use client';

import { Document, Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';
import { contact, summary, experience, education, skills } from '@/data/resume';

const TEXT = '#111827';
const TEXT_SECONDARY = '#374151';
const TEXT_MUTED = '#6b7280';
const BORDER = '#d1d5db';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: TEXT,
    lineHeight: 1.4,
  },

  // Header
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: TEXT,
  },
  contactRow: {
    marginTop: 10,
    fontSize: 9,
    color: TEXT_SECONDARY,
  },
  link: {
    color: TEXT_SECONDARY,
    textDecoration: 'underline',
  },

  // Section
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: TEXT,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginBottom: 6,
  },

  // Experience entry
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  company: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  role: {
    color: TEXT_SECONDARY,
    fontSize: 10,
  },
  period: {
    color: TEXT_MUTED,
    fontSize: 9,
    flexShrink: 0,
  },
  context: {
    color: TEXT_SECONDARY,
    marginTop: 1,
  },
  bulletList: {
    marginTop: 3,
    paddingLeft: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    color: TEXT_SECONDARY,
  },
  bulletText: {
    flex: 1,
    color: TEXT_SECONDARY,
  },

  // Education
  institution: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  credential: {
    color: TEXT_SECONDARY,
    fontStyle: 'italic',
  },

  // Skills
  skillsText: {
    color: TEXT_SECONDARY,
  },
  skillsLabel: {
    fontFamily: 'Helvetica-Bold',
  },

  // Spacing
  entrySpacing: {
    marginTop: 6,
  },
});

export function ResumePdf() {
  return (
    <Document title={`${contact.name} - Resume`} author={contact.name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.contactRow}>
            {contact.location} ·{' '}
            <Link src={`mailto:${contact.email}`} style={styles.link}>
              {contact.email}
            </Link>
            {' · '}
            <Link src={`tel:${contact.phone.replace(/\s/g, '')}`} style={styles.link}>
              {contact.phone}
            </Link>
            {' · '}
            <Link src={contact.linkedin} style={styles.link}>
              LinkedIn
            </Link>
            {' · '}
            <Link src={contact.github} style={styles.link}>
              GitHub
            </Link>
            {' · '}
            <Link src={contact.portfolio} style={styles.link}>
              Portfolio
            </Link>
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.skillsText}>{summary}</Text>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {experience.map((exp, idx) => (
            <View key={exp.company} style={idx > 0 ? styles.entrySpacing : undefined}>
              <View style={styles.entryRow}>
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
                    <View key={i} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, idx) => (
            <View key={edu.institution} style={idx > 0 ? styles.entrySpacing : undefined}>
              <View style={styles.entryRow}>
                <Text style={styles.institution}>
                  {edu.institution}
                  {edu.location && (
                    <Text style={{ fontFamily: 'Helvetica', color: TEXT_SECONDARY }}> — {edu.location}</Text>
                  )}
                </Text>
                <Text style={styles.period}>{edu.period}</Text>
              </View>
              <Text style={styles.credential}>{edu.credential}</Text>
              {edu.highlights && edu.highlights.length > 0 && (
                <View style={styles.bulletList}>
                  {edu.highlights.map((h, i) => (
                    <View key={i} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.skillsText}>
            <Text style={styles.skillsLabel}>Skills: </Text>
            {skills.join(' · ')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
