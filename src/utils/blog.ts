import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Route generator for centralized URL management
 */
export const routes = {
  home: '/',
  about: '/#about',
  experience: '/#experience',
  projects: '/#projects',
  blog: '/blog/',
  now: '/now/',
  rss: '/rss.xml',
  llms: '/llms.txt',
  llmsFull: '/llms-full.txt',
  post: (slug: string) => `/blog/${slug}/`,
  tag: (tag: string) => `/blog/tags/${tag}/`,
};

/**
 * Fetch all published blog posts sorted by publication date descending
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Extract all unique tags across published posts, sorted by usage frequency and alphabetically
 */
export async function getAllUniqueTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.keys()).sort((a, b) => {
    const countDiff = (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0);
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });
}

/**
 * Get posts filtered by a specific tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * Find related posts based on overlapping tags, excluding the current post
 */
export async function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  limit = 2
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();

  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const matchCount = post.data.tags.filter((t) => currentTags.includes(t)).length;
      return { post, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}
