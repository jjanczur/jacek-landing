import { z, defineCollection } from 'astro:content';

const lang = z.enum(['en', 'pl', 'de']);

export const collections = {
  talks: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      event: z.string().optional(),
      date: z.string().optional(),
      youtubeId: z.string().optional(),
      videoUrl: z.string().url().optional(),
      description: z.string().optional(),
      lang,
    }),
  }),
  notes: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      type: z.string().optional(),
      link: z.string().url().optional(),
      summary: z.string().optional(),
      lang,
    }),
  }),
};
