import { site } from '../data/site';
import { getPublishedPosts, getAllUniqueTags, routes } from '../utils/blog';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;
  const posts = await getPublishedPosts();
  const tags = await getAllUniqueTags();

  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: `${siteUrl}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/blog/`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${siteUrl}/now/`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
  ];

  const postPages = posts.map((post) => {
    const postDate = (post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0];
    return {
      loc: `${siteUrl}${routes.post(post.slug)}`,
      lastmod: postDate,
      changefreq: 'monthly',
      priority: '0.8',
    };
  });

  const tagPages = tags.map((tag) => ({
    loc: `${siteUrl}${routes.tag(tag)}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const discoveryPages = [
    { loc: `${siteUrl}/llms.txt`, lastmod: today, changefreq: 'weekly', priority: '0.7' },
    { loc: `${siteUrl}/llms-full.txt`, lastmod: today, changefreq: 'weekly', priority: '0.7' },
    { loc: `${siteUrl}/rss.xml`, lastmod: today, changefreq: 'daily', priority: '0.8' },
  ];

  const allUrls = [...staticPages, ...postPages, ...tagPages, ...discoveryPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
