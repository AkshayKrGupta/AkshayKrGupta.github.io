import { site } from '../data/site';

export async function GET(context: any) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : site.url;

  const robotsTxt = `User-agent: *
Allow: /

# Dedicated AI Answer Engines & Search Retrieval Crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Discovery & Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# LLM & AI Agent Context
# llms.txt: ${siteUrl}/llms.txt
# llms-full.txt: ${siteUrl}/llms-full.txt
`;

  return new Response(robotsTxt.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
