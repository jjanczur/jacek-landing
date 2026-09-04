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
  'case-studies': defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      client: z.string(),
      relationship: z.enum([
        'client',
        'independent',
        'employer',
        'own-company',
        'research-partner',
      ]),
      via: z.string().optional(),
      sector: z.string(),
      period: z.string(),
      status: z
        .enum(['production', 'mvp', 'poc', 'prototype', 'research'])
        .optional(),
      role: z.string(),
      // A public write-up of the engagement, where one exists. Rendered by
      // CaseFacts.astro; the client may only be named when this is set.
      sourceUrl: z.string().url().optional(),
      mandate: z.string(),
      skim: z.string(),
      category: z.enum([
        'company-building',
        'enterprise-ai',
        'ai-products',
        'scale-and-regulated',
      ]),
      summary: z.string(),
      keyDecisions: z.array(z.string()).max(3),
      outcomes: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
          evidence: z.enum([
            'measured',
            'customer-estimate',
            'projected',
            'qualitative',
            'benchmark',
          ]),
          // MO-8: only values that parse as a number animate. '~1 day',
          // '20-30%' and '5 h -> 1 h' do not, and must not be given a countTo.
          countTo: z.number().optional(),
          prefix: z.string().optional(),
          suffix: z.string().optional(),
          decimals: z.number().optional(),
        }),
      ),
      stakeholders: z.array(z.string()).default([]),
      constraints: z.array(z.string()).default([]),
      reuse: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      angle: z.enum(['turnaround', 'builder']).optional(),
      hasDetail: z.boolean().default(true),
      featured: z.boolean().default(false),
      order: z.number(),
      lang: z.enum(['en', 'pl', 'de']).default('en'),
      // GR-3: the delivery shape every case already states in prose.
      delivery: z
        .array(
          z.object({
            at: z.string(),
            label: z.string(),
            note: z.string().optional(),
          }),
        )
        .max(4)
        .optional(),
    }),
  }),
};
