import { site } from '../data/site';
import { getPublishedPosts, routes } from '../utils/blog';
import { formatDate } from '../utils/formatters';

function sanitizeMdxForLlm(content: string): string {
  if (!content) return '';

  return content
    // Remove JS/MDX import statements
    .replace(/^import\s+.*?;\s*$/gm, '')
    // Convert <Figure ... caption="..." ... /> to clean markdown diagram quote
    .replace(/<Figure[\s\S]*?caption=["'](.*?)["'][\s\S]*?\/>/g, '\n> **Architecture Diagram**: $1\n')
    // Remove standalone <Figure ... /> tags without caption
    .replace(/<Figure[\s\S]*?\/>/g, '')
    // Convert <Callout type="..." title="..."> to Markdown blockquote
    .replace(/<Callout(?:\s+type=["'](.*?)["'])?(?:\s+title=["'](.*?)["'])?[\s\S]*?>/g, (_, type, title) => {
      const header = title || (type ? type.toUpperCase() : 'NOTE');
      return `\n> **[${header}]**:\n>`;
    })
    .replace(/<\/Callout>/g, '\n')
    // Convert <Mermaid> to markdown code block
    .replace(/<Mermaid\s+code=\{`([\s\S]*?)`\}\s*\/>/g, '\n```mermaid\n$1\n```\n')
    .replace(/<Mermaid[\s\S]*?\/>/g, '')
    // Convert YouTubeVideo to markdown link
    .replace(/<YouTubeVideo\s+id=["'](.*?)["'](?:\s+title=["'](.*?)["'])?[\s\S]*?\/>/g, (_, id, title) => {
      return `\n> **Video Reference**: ${title || 'YouTube Video'} (https://www.youtube.com/watch?v=${id})\n`;
    })
    // Strip other JSX tags if any
    .replace(/<ImageGallery[\s\S]*?\/>/g, '')
    // Clean up excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;
  const sortedPosts = await getPublishedPosts();

  const fullArticles = sortedPosts.length > 0
    ? sortedPosts
        .map((post) => {
          const cleanBody = sanitizeMdxForLlm(post.body);
          return `---
# ${post.data.title}
- URL: ${siteUrl}${routes.post(post.slug)}
- Author: ${post.data.author || site.name}
- Published: ${formatDate(post.data.pubDate)}
- Tags: ${post.data.tags.join(', ')}
- Description: ${post.data.description}

${cleanBody}
`;
        })
        .join('\n\n========================================\n\n')
    : 'No full-text articles published yet.';

  const content = `# Full Technical Corpus: ${site.name}

> ${site.tagline}
> URL: ${siteUrl}

${fullArticles}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
