import { site } from '../data/site';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;

  const robotsTxt = `User-agent: *
Allow: /

# AI Crawlers & Answer Engines
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Discovery
Sitemap: ${siteUrl}/sitemap-index.xml
# LLM Context: ${siteUrl}/llms.txt
# LLM Full Corpus: ${siteUrl}/llms-full.txt
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
