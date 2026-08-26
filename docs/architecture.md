# System Architecture & Developer Guide

> **Repository**: `AkshayPortfolio`  
> **Author**: Akshay K Gupta  
> **Role**: Solutions Architect  
> **Live URL**: [https://akshaykrgupta.github.io/](https://akshaykrgupta.github.io/)  
> **Primary Technology Stack**: Astro 5 (Static Engine), TypeScript, MDX, Vanilla CSS Design Tokens, GitHub Pages CI/CD

---

## 1. Architectural Philosophy & Principles

This website is engineered as a **100% static, high-performance portfolio and technical publishing engine**. It operates under five foundational architecture tenets:

1. **Zero Client Runtime Bloat**: No frontend UI frameworks (React, Vue, Svelte) are loaded at runtime for static content. Total client JavaScript across the entire site is `< 2.5 kB` (vanilla JS for theme toggling, clipboard copy, and scroll progress).
2. **Strict Separation of Concerns**:
   - **Content & Identity Data**: Isolated in typed TypeScript modules (`src/data/`) and MDX content collections (`src/content/blog/`).
   - **Visual Presentation**: Encapsulated in reusable Astro components (`src/components/`) and global CSS design tokens (`src/styles/global.css`).
   - **Business Logic & Queries**: Centralized in utility modules (`src/utils/blog.ts`).
3. **Swiss Typographic Style × Bento Grid × Subtle Neumorphism**:
   - Asymmetric Bento Grid cards with responsive column spanning.
   - Strict typographic hierarchy using fluid `clamp()` formulas.
   - Tactile, soft neumorphic surfaces with accessible contrast in both Light (`#f6f5f1` / `#ffffff`) and Dark (`#15171c` / `#1c1f26`) themes.
4. **Answer Engine (AEO) & Generative Engine (GEO) Native**:
   - Built-in machine-readable endpoints (`/llms.txt`, `/llms-full.txt`) adhering to standard AI context ingestion specs.
   - Comprehensive JSON-LD structured schemas (`Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`) with `speakable` selectors and `about` entity extraction.
5. **Zero-Maintenance Immutable Hosting**:
   - Statically built to `/dist` and deployed automatically to GitHub Pages using GitHub Actions.

---

## 2. Codebase Anatomy & Directory Structure

```
AkshayPortfolio/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD to GitHub Pages
├── docs/
│   └── architecture.md         # This architectural specification
├── public/                     # Static assets served at root
│   ├── favicon.svg             # Monogram "AG" vector favicon
│   └── profile.svg             # Default vector profile avatar
├── src/
│   ├── components/
│   │   ├── bento/              # Bento grid cards (Hero, About, Experience, Projects, etc.)
│   │   │   ├── BentoCard.astro
│   │   │   ├── BentoGrid.astro
│   │   │   ├── HeroCard.astro
│   │   │   ├── AboutCard.astro
│   │   │   ├── ExperienceCard.astro
│   │   │   ├── ProjectsCard.astro
│   │   │   ├── LatestPostsCard.astro
│   │   │   └── SocialsCard.astro
│   │   ├── blog/               # Article & publication components
│   │   │   ├── ArticleCard.astro       # Unified card (standard & compact variants)
│   │   │   ├── PostHeader.astro        # Title, metadata, copy link & share actions
│   │   │   ├── PostFooter.astro        # Author bio & prev/next article pagination
│   │   │   ├── TableOfContents.astro   # Dual mobile accordion & desktop sticky sidebar
│   │   │   └── RelatedPosts.astro      # Tag-matched article recommendations
│   │   ├── common/             # Global layout elements
│   │   │   ├── Header.astro            # Sticky header with "AG" badge & mobile drawer
│   │   │   ├── Footer.astro            # Semantic footer with social & discrete RSS link
│   │   │   ├── ThemeToggle.astro       # Neumorphic light/dark mode toggle
│   │   │   ├── Badge.astro             # Tag/pill badge
│   │   │   └── Icon.astro              # Centralized SVG icon component
│   │   ├── mdx/                # Rich MDX editorial components
│   │   │   ├── Callout.astro           # Info, Tip, Warning, Important callouts
│   │   │   ├── Figure.astro            # Responsive image with caption
│   │   │   ├── Mermaid.astro           # Dynamic architecture diagrams
│   │   │   ├── YouTubeVideo.astro      # Responsive video embed
│   │   │   └── ImageGallery.astro      # Multi-image grid
│   │   └── seo/                # Discovery & search metadata
│   │       ├── SEOHead.astro           # OpenGraph, Twitter, canonical, preconnect
│   │       └── JsonLd.astro            # Schema.org JSON-LD structured data
│   ├── content/
│   │   ├── blog/               # Markdown/MDX articles
│   │   └── config.ts           # Strict Zod schema for blog collections
│   ├── data/                   # Single Source of Truth data models
│   │   ├── site.ts             # Author name, bio, social channels, blog metadata
│   │   ├── experience.ts       # Career milestones & achievements
│   │   ├── projects.ts         # Featured software projects & live URLs
│   │   ├── navigation.ts       # Main & footer navigation links
│   │   └── now.ts              # /now page current focus items
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root HTML wrapper with theme script & skip-link
│   │   └── BlogPostLayout.astro# Editorial layout with progress bar & TOC
│   ├── pages/                  # File-based static routing
│   │   ├── index.astro         # Homepage (Bento Grid)
│   │   ├── now.astro           # /now page
│   │   ├── 404.astro           # Custom 404 page
│   │   ├── blog/
│   │   │   ├── index.astro     # /blog/ archive & topic filter
│   │   │   ├── [...slug].astro # /blog/[slug]/ dynamic article route
│   │   │   └── tags/[tag].astro# /blog/tags/[tag]/ topic archive
│   │   ├── llms.txt.ts         # /llms.txt AI search context endpoint
│   │   ├── llms-full.txt.ts    # /llms-full.txt full corpus context endpoint
│   │   ├── rss.xml.ts          # /rss.xml RSS 2.0 feed
│   │   └── robots.txt.ts       # /robots.txt AI crawler rules & sitemap index
│   ├── styles/
│   │   └── global.css          # Design tokens, fluid typography & reset
│   └── utils/
│       ├── blog.ts             # Centralized blog query functions & routes dictionary
│       ├── formatters.ts       # Date and string formatting
│       └── readingTime.ts      # Reading time estimator
├── astro.config.mjs            # Astro configuration (MDX, Sitemap, HTML compression)
├── tsconfig.json               # TypeScript path aliases (@/*)
├── package.json
└── README.md
```

---

## 3. Design System & CSS Token Architecture

All visual styles are centralized in [`src/styles/global.css`](../src/styles/global.css).

### A. Color Palettes
* **Light Theme (`data-theme='light'` or default)**:
  - Canvas: `#f6f5f1` (warm Swiss paper)
  - Card Surfaces: `#ffffff` (crisp white)
  - Borders: `#e3e1d8`
  - Accent: `#1e4bd8` (Cobalt Royal Blue)
* **Dark Theme (`data-theme='dark'`)**:
  - Canvas: `#15171c` (deep slate-charcoal)
  - Card Surfaces: `#1c1f26` (soft charcoal)
  - Borders: `#303642`
  - Accent: `#58a6ff` (vibrant blue)
  - Luminous Elevation: `rgba(88, 166, 255, 0.15)` on hover.

### B. Fluid Typography Scale
Typography scales dynamically with viewport width using CSS `clamp()`:
```css
--text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
--text-sm: clamp(0.8125rem, 0.78rem + 0.2vw, 0.875rem);
--text-base: clamp(0.9375rem, 0.9rem + 0.25vw, 1.0625rem);
--text-lg: clamp(1.0625rem, 1.02rem + 0.35vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.18rem + 0.55vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.38rem + 0.85vw, 1.875rem);
--text-3xl: clamp(1.875rem, 1.68rem + 1.25vw, 2.375rem);
--text-4xl: clamp(2.25rem, 1.95rem + 1.75vw, 3.125rem);
--text-display: clamp(2.75rem, 2.25rem + 2.75vw, 4.5rem);
```

### C. Bento Grid Spans
The homepage Bento grid collapses responsively:
* `< 640px` (Mobile): `grid-template-columns: 1fr`
* `640px - 1023px` (Tablet): `grid-template-columns: repeat(2, 1fr)`
* `≥ 1024px` (Desktop): `grid-template-columns: repeat(12, 1fr)` with classes `.col-span-12`, `.col-span-8`, `.col-span-7`, `.col-span-5`, `.col-span-4`.

---

## 4. How-To Developer Guide

### A. How to Author a New Technical Article
1. Create a folder inside `src/content/blog/` named after your desired URL slug:
   ```bash
   mkdir -p src/content/blog/my-architecture-deep-dive
   touch src/content/blog/my-architecture-deep-dive/index.md
   ```
2. Include the frontmatter header:
   ```markdown
   ---
   title: "Designing Fault-Tolerant Event-Driven Architectures"
   description: "A practical guide to idempotency keys, dead-letter queues, and outbox patterns in financial transaction systems."
   pubDate: 2026-08-25
   author: "Akshay K Gupta"
   tags:
     - enterprise-architecture
     - distributed-systems
     - fintech
   draft: false
   featured: true
   ---

   Start your article here with an immediate, declarative answer summary...
   ```
3. To use rich MDX components inside `.mdx` files:
   ```mdx
   import Callout from '../../../components/mdx/Callout.astro';
   import Mermaid from '../../../components/mdx/Mermaid.astro';

   <Callout type="tip" title="Production Rule">
     Always enforce idempotency tokens at the API gateway layer before publishing to message queues.
   </Callout>

   <Mermaid code={`
   graph LR
     Client[Client Request] --> Gateway[API Gateway]
     Gateway --> Outbox[(Transactional Outbox)]
     Outbox --> Kafka[Kafka Topic]
   `} />
   ```

### B. How to Update Personal Bio, Socials, or Availability
Edit [`src/data/site.ts`](../src/data/site.ts):
```typescript
export const site: SiteConfig = {
  name: 'Akshay K Gupta',
  shortName: 'Akshay Gupta',
  title: 'Solutions Architect',
  tagline: '...',
  status: {
    available: true,
    text: 'Collaborations on open-source, Mentoring & Architecture Consulting',
  },
  social: {
    github: 'https://github.com/AkshayKrGupta',
    linkedin: 'https://www.linkedin.com/in/akshay-kr-gupta/',
  },
  // ...
};
```

### C. How to Add or Update Projects
Edit [`src/data/projects.ts`](../src/data/projects.ts):
```typescript
export const projects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Karvics — Zero-Knowledge Privacy & Developer Suite',
    description: 'A privacy-first suite of client-side web tools...',
    status: 'Active',
    technologies: ['TypeScript', 'Web Crypto API', 'PWA', 'Wasm', 'Tailwind/CSS'],
    liveUrl: 'https://karvics.com',
    githubUrl: 'https://github.com/AkshayKrGupta/karvics-feedback',
    featured: true,
    metrics: '100% client-side zero-knowledge execution'
  },
  // ...
];
```

### D. How to Query Blog Posts (Clean Code API)
Always import from [`src/utils/blog.ts`](../src/utils/blog.ts):
```typescript
import { getPublishedPosts, getAllUniqueTags, getPostsByTag, routes } from '../utils/blog';

// Get all published posts (sorted by date, drafts excluded in production)
const posts = await getPublishedPosts();

// Get unique tags sorted by usage
const tags = await getAllUniqueTags();

// Generate clean paths
const url = routes.post(post.slug);
const tagUrl = routes.tag('architecture');
```

---

## 5. SEO, AEO & LLM Discoverability Architecture

The site automatically generates all discovery assets on every `npm run build`:
* **JSON-LD Schema**: [`src/components/seo/JsonLd.astro`](../src/components/seo/JsonLd.astro) produces `WebSite`, `Person`, `BlogPosting`, and `BreadcrumbList` schemas with `speakable` selectors.
* **`llms.txt`**: [`src/pages/llms.txt.ts`](../src/pages/llms.txt.ts) builds a clean markdown summary index of the author and published articles for LLM agents.
* **`llms-full.txt`**: [`src/pages/llms-full.txt.ts`](../src/pages/llms-full.txt.ts) provides full article content bundled for LLM context ingestion.
* **`robots.txt`**: [`src/pages/robots.txt.ts`](../src/pages/robots.txt.ts) allows AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
* **`rss.xml`**: [`src/pages/rss.xml.ts`](../src/pages/rss.xml.ts) generates valid RSS 2.0 feeds.
* **Sitemap**: Auto-generated via `@astrojs/sitemap`.

---

## 6. Build, Testing & Deployment

### Local Development
```bash
npm run dev      # Starts Astro development server
npm run build    # Compiles static HTML output into /dist
npm run preview  # Previews production /dist build locally
```

### CI/CD Deployment (GitHub Pages)
The repository contains [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml). When commits are pushed to `main`, GitHub Actions runs:
1. `npm ci` (verifies dependency lockfile)
2. `npm run build` (outputs static HTML)
3. `actions/deploy-pages@v4` (publishes zero-downtime static bundle to GitHub Pages)
