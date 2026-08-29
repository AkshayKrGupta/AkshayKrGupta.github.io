import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Akshay K Gupta'),
      tags: z.array(z.string()).default([]),
      keywords: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      canonicalUrl: z.string().url().optional(),
      series: z.string().optional(),
      faqs: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
