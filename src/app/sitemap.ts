import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jiwokristi.dev';

  const projectUrls = getAllSlugs().map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/resume`, lastModified: new Date() },
    ...projectUrls,
  ];
}
