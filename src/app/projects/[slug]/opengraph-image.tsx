import { ImageResponse } from 'next/og';
import { getProject } from '@/lib/projects';

export const runtime = 'edge';
export const alt = 'Project preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 60,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        fontFamily: 'system-ui',
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: '#3b82f6',
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        {project?.category ?? 'Project'}
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: '#fafafa',
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        {project?.title ?? 'Case Study'}
      </div>
      <div
        style={{
          fontSize: 24,
          color: '#a0a0a0',
        }}
      >
        {project?.subtitle ?? ''}
      </div>
    </div>,
    { ...size },
  );
}
