import { site } from '../data/site';
import { getPublishedPosts, routes } from '../utils/blog';
import { formatDate } from '../utils/formatters';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;
  const sortedPosts = await getPublishedPosts();

  const fullArticles = sortedPosts.length > 0
    ? sortedPosts
        .map((post) => {
          return `---
# ${post.data.title}
- URL: ${siteUrl}${routes.post(post.slug)}
- Author: ${post.data.author || site.name}
- Published: ${formatDate(post.data.pubDate)}
- Tags: ${post.data.tags.join(', ')}
- Description: ${post.data.description}

${post.body}
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
