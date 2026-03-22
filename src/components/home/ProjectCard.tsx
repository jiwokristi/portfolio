import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { ProjectSummary } from '@/types/project';

type ProjectCardProps = {
  project: ProjectSummary;
  showImage?: boolean;
  onMouseEnter?: () => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
};

export function ProjectCard({ project, showImage, onMouseEnter, onMouseMove, onMouseLeave }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/30"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={`relative aspect-video overflow-hidden ${showImage ? '' : 'lg:hidden'}`}>
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          width={project.heroImage.width}
          height={project.heroImage.height}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <Badge className="mb-4">{project.category}</Badge>
        <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mb-8 text-sm text-text-secondary line-clamp-2">{project.description}</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.metrics.map(m => (
            <div key={m.label} className="flex flex-col">
              <span className="text-sm font-bold text-accent">{m.after}</span>
              <span className="text-xs text-text-muted">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="contained" color="subtle" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
