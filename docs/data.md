# Data Layer

## Type Definitions

All types are in `src/types/project.ts`.

### Core Types

```typescript
interface ProjectMetric {
  label: string;
  before: number;
  after: number;
  unit?: string;
  description?: string;
}

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

interface ProcessPhase {
  title: string;
  description: string;
  image?: ProjectImage;
  highlights?: string[];
}

interface ProjectFeature {
  title: string;
  description: string;
  image?: ProjectImage;
  tags?: string[];
}
```

### Project Types

```typescript
// Base metadata shared by summaries and full case studies
interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  role: string;
  timeline: string;
  year: number;
  techStack: string[];
  liveUrl?: string;
  featured: boolean;
  order: number;       // Controls sort order in grids
}

// Full case study with all sections
interface CaseStudy extends ProjectMeta {
  heroImage: ProjectImage;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  process: ProcessPhase[];
  features: ProjectFeature[];
  results: {
    summary: string;
    outcomes: string[];
    lessonsLearned?: string[];
  };
}

// Lightweight version for project grid cards
type ProjectSummary = ProjectMeta & {
  heroImage: ProjectImage;
  metrics: Pick<ProjectMetric, 'label' | 'after'>[];
};
```

### Resume Types

Defined in `src/data/resume.ts`:

```typescript
type ContactInfo = { name, phone, email, linkedin, github, location }
type Experience  = { company, location, role, period, context?, highlights[] }
type Education   = { institution, location, credential, period, highlights? }
type Project     = { name, year, description, url? }
```

## Data Files

| File | Exports | Description |
|---|---|---|
| `src/data/projects.ts` | `projects: ProjectSummary[]` | Summary data for the home page grid |
| `src/data/projects/apex-peptides.ts` | `apexSupps: CaseStudy` | Full case study for Apex Peptides |
| `src/data/about.ts` | `philosophyCards`, `evidenceMetrics`, `stackCategories`, `values` | All about page section data |
| `src/data/resume.ts` | `contact`, `experience`, `education`, `projects`, `skills`, `languages` | Resume content |

## Project Loaders

`src/lib/projects.ts` provides three functions:

```typescript
// Load a full case study by slug (async, uses dynamic imports)
async function getProject(slug: string): Promise<CaseStudy | null>

// Get all project summaries, sorted by order field
function getAllProjects(): ProjectSummary[]

// Get all slugs for generateStaticParams()
function getAllSlugs(): string[]
```

## Adding a New Project

1. **Create the data file** at `src/data/projects/your-project.ts`:
   ```typescript
   import type { CaseStudy } from '@/types/project';

   export const yourProject: CaseStudy = {
     slug: 'your-project',
     title: '...',
     // ... all CaseStudy fields
   };
   ```

2. **Register it in the loader** at `src/lib/projects.ts`:
   Add a case to the dynamic import map.

3. **Add a summary** to `src/data/projects.ts`:
   Add a `ProjectSummary` entry to the `projects` array.

4. **Add a hero image** to `public/images/projects/your-project/hero.jpg`.

The project will automatically appear in:
- The home page grid (via `getAllProjects()`)
- The sitemap (via `getAllSlugs()`)
- Case study navigation (prev/next links)

## Resume Data

Resume data is in `src/data/resume.ts`. Highlights support `**bold**` syntax which is parsed by `renderBold()` in `ResumeDocument.tsx`.

Current data:
- **Experience**: 4 roles (BRI, Enboq, Notes, BTN) with company context descriptions
- **Education**: 1 entry (Universitas Terbuka)
- **Projects**: 1 entry (Apex Peptides with live URL)
- **Skills**: 18 items displayed as inline dot-separated list
