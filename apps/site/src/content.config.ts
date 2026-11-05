import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const insights = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/insights",
    generateId: ({ data }) => `${data.locale}/${data.slug}`,
  }),
  schema: z.object({
    locale: z.enum(["zh", "en"]),
    slug: z.string(),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    directAnswer: z.string(),
    author: z.string().default("Iris Wei"),
    evidenceNote: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
    faq: z.array(faqItem).min(3),
  }),
});

export const collections = { insights };
