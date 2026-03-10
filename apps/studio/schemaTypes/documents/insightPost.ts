import { defineArrayMember, defineField, defineType } from "sanity";

export const insightPost = defineType({
  name: "insightPost",
  title: "Insight Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localizedText",
    }),
    defineField({
      name: "cover_image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body_zh",
      title: "Body (ZH)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      zh: "title.zh",
      en: "title.en",
      publishedAt: "publishedAt",
      isPublished: "isPublished",
    },
    prepare(selection) {
      const title = selection.zh || selection.en || "Insight";
      const state = selection.isPublished ? "published" : "draft";
      const date = selection.publishedAt || "no date";
      return {
        title,
        subtitle: `${state} · ${date}`,
      };
    },
  },
});
