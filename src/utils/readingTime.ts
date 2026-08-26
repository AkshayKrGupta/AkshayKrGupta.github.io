/**
 * Calculate estimated reading time for markdown/MDX content.
 * Average reading speed: 200 words per minute.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  
  // Clean markdown syntax, HTML tags, and code blocks
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[#*`_~\[\]()>-]/g, '') // remove markdown symbols
    .trim();

  const words = cleanContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  return `${minutes} min read`;
}
