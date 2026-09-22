import { site } from '../data/site';
import { getPublishedPosts, routes } from '../utils/blog';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;
  const sortedPosts = await getPublishedPosts();

  const articlesList = sortedPosts.length > 0
    ? sortedPosts.map((post) => `- [${post.data.title}](${siteUrl}${routes.post(post.slug)}): ${post.data.description}`).join('\n')
    : 'Articles in preparation. Stay tuned!';

  const content = `# ${site.name} — Technical Publications & Architecture Portfolio

> ${site.tagline}

## Author & Identity
${site.name} (${site.shortName}) is a ${site.jobTitle} specializing in enterprise-scale systems, distributed computing, Model Context Protocol (MCP), and AI adoption in regulated industries.

- Role: ${site.jobTitle}
- Canonical Website: ${siteUrl}${routes.home}
- Architecture Notes: ${siteUrl}${routes.blog}
- Current Focus (/now): ${siteUrl}${routes.now}
- GitHub: ${site.social.github}
- LinkedIn: ${site.social.linkedin}
- RSS Feed: ${siteUrl}${routes.rss}
- Complete Corpus: ${siteUrl}${routes.llmsFull}

## Published Architecture Notes
${articlesList}

## Core Expertise & Entity Knowledge
${site.expertise.map((item) => `- ${item.name}${item.sameAs ? ` (${item.sameAs})` : ''}`).join('\n')}

## Active Projects & Software Systems
- [Karvics](https://karvics.com): Zero-Knowledge client-side privacy & developer utility suite (Web Crypto, AES-256-GCM, PWA).
- [TwinPixCleaner](https://github.com/AkshayKrGupta/TwinPixCleaner): Open-source native macOS photo deduplication utility using Apple Vision AI and SHA-256 matching.
- [NanoPress](https://github.com/AkshayKrGupta/NanoPress): Open-source native macOS multi-threaded batch media and PDF compression utility using Swift Concurrency.

## Full Technical Corpus
- [Full Text Markdown Corpus](${siteUrl}${routes.llmsFull}): Complete text of all published architecture notes in a single, clean markdown corpus for deep retrieval-augmented generation (RAG) and LLM analysis.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
