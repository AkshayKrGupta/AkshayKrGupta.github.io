# Akshay K Gupta — Portfolio & Technical Articles

[![Built with Astro](https://img.shields.io/badge/Astro-7.3-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?style=flat&logo=github&logoColor=white)](https://akshaykrgupta.github.io/)

A modern, high-performance personal portfolio and technical publishing platform for **Akshay K Gupta** (Solutions Architect). Built with **Astro 7**, **TypeScript**, and **MDX**, designed around a **Bento Grid × Swiss Typography × Subtle Neumorphism** visual aesthetic.

🌐 **Live Site**: [https://akshaykrgupta.github.io/](https://akshaykrgupta.github.io/)

---

## Key Highlights

- ⚡ **Zero Client Runtime Bloat**: 100% static HTML/CSS with sub-second page loads (< 2.5 kB client JS).
- 🎨 **Swiss Bento Aesthetic**: Asymmetrical grid cards, fluid typographic hierarchy (`clamp()`), and subtle neumorphic tactile controls.
- 🌓 **Dual Theme**: Seamless Light (`#f1f0ec`) and Dark (`#0d0e11`) mode with `localStorage` persistence and zero FOUC.
- 📝 **MDX Technical Articles**: Built-in Shiki syntax highlighting (`github-dark-dimmed`), one-click code copy, reading time, sticky desktop TOC, callouts, and Mermaid diagrams.
- 🤖 **AEO, GEO & LLM Ready**: Automated JSON-LD structured data (`Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`), native `/llms.txt`, `/llms-full.txt`, and full-text `/rss.xml`.
- 🚀 **GitHub Pages CI/CD**: Automated zero-downtime deployment via GitHub Actions.

---

## Tech Stack

| Component | Technology |
|---|---|
| **Static Site Generator** | [Astro 7](https://astro.build/) (Static Output, Vite 8, Rolldown) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Content & Publishing** | MDX (`@astrojs/mdx`) with Astro Content Layer & Zod Schemas |
| **Styling** | Vanilla CSS Design Tokens (Swiss + Bento + Neumorphism) |
| **Syntax Highlighting** | [Shiki](https://shiki.style/) |
| **Search & Feeds** | `@astrojs/sitemap`, `@astrojs/rss`, `llms.txt` |
| **Deployment** | GitHub Actions & GitHub Pages |

---

## Project Structure

```
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD
├── public/                     # Static assets (favicon, avatar, CNAME)
├── src/
│   ├── components/
│   │   ├── bento/              # Bento Grid card components
│   │   ├── blog/               # Article header, footer, TOC, related posts
│   │   ├── common/             # Header, Footer, ThemeToggle, Badge
│   │   ├── mdx/                # Callout, Figure, Mermaid, YouTube embeds
│   │   └── seo/                # SEOHead & JSON-LD Structured Data
│   ├── content/
│   │   └── blog/               # Markdown/MDX technical articles
│   ├── content.config.ts       # Astro Content Layer glob loader & Zod schemas
│   ├── data/                   # Central data models (site, experience, projects, navigation, now)
│   ├── layouts/                # BaseLayout & BlogPostLayout
│   ├── pages/                  # Static routes (/, /blog/, /now/, /rss.xml, /llms.txt)
│   ├── styles/                 # Global CSS design tokens & Swiss typography
│   └── utils/                  # Reading time & formatting helpers
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js `v18.14.1+` (Recommended: `v20+` or `v22+`)
- npm `v9+`

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com/AkshayKrGupta/AkshayPortfolio.git
cd AkshayPortfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Build & Preview
```bash
# Compile static output to /dist
npm run build

# Preview static build locally
npm run preview
```

---

## Publishing a New Article

To publish a new technical article:

1. Create a new folder or file in `src/content/blog/`:
   ```bash
   mkdir -p src/content/blog/my-new-article
   touch src/content/blog/my-new-article/index.md
   ```
2. Add frontmatter metadata:
   ```yaml
   ---
   title: "My New Technical Article"
   description: "A concise, answer-first summary of the article."
   pubDate: 2026-08-25
   author: "Akshay K Gupta"
   tags:
     - enterprise-architecture
     - distributed-systems
   draft: false
   featured: true
   ---

   Your article content here in Markdown/MDX...
   ```
3. Commit and push to `main` — GitHub Actions will automatically build and publish the live site.

---

## License

- **Source Code**: Licensed under the [MIT License](LICENSE).
- **Articles & Content**: Copyright © 2026 Akshay K Gupta. All rights reserved.
