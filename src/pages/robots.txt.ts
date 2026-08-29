import { site } from '../data/site';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;

  const robotsTxt = `User-agent: *
Allow: /

# Discovery & Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# LLM & AI Agent Context
# ${siteUrl}/llms.txt
# ${siteUrl}/llms-full.txt
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
