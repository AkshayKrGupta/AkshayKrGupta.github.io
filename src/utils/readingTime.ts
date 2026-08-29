/**
 * Calculate estimated reading time for markdown/MDX content.
 * Average reading speed: 200 words per minute.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  
  const words = getWordCount(content);
  const minutes = Math.max(1, Math.ceil(words / 200));
  
  return `${minutes} min read`;
}

/**
 * Calculate exact word count for markdown/MDX content, stripping tags and code.
 */
export function getWordCount(content: string): number {
  if (!content) return 0;
  
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[#*`_~\[\]()>-]/g, '') // remove markdown symbols
    .trim();

  return cleanContent.split(/\s+/).filter(Boolean).length;
}
