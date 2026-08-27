import rss from '@astrojs/rss';
import { site } from '../data/site';
import { getPublishedPosts, routes } from '../utils/blog';

export async function GET(context: any) {
  const sortedPosts = await getPublishedPosts();

  return rss({
    title: `${site.name} — ${site.blog.name}`,
    description: site.blog.description,
    site: context.site || site.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: routes.post(post.slug),
      categories: post.data.tags,
      author: post.data.author || site.name,
    })),
    customData: `<language>en-us</language>`,
  });
}
