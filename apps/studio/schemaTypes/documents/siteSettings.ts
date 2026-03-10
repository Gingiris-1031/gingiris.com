import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "site_name",
      title: "Site Name",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "site_tagline",
      title: "Site Tagline",
      type: "localizedText",
    }),
    defineField({
      name: "default_locale",
      title: "Default Locale",
      type: "string",
      options: {
        list: [
          { title: "Chinese (zh)", value: "zh" },
          { title: "English (en)", value: "en" },
        ],
      },
      initialValue: "zh",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "social_links",
      title: "Social Links",
      type: "array",
      of: [defineArrayMember({ type: "externalLink" })],
    }),
    defineField({
      name: "seo_title",
      title: "SEO Title",
      type: "localizedString",
    }),
    defineField({
      name: "seo_description",
      title: "SEO Description",
      type: "localizedText",
    }),
  ],
  preview: {
    select: {
      zh: "site_name.zh",
      en: "site_name.en",
    },
    prepare(selection) {
      return {
        title: selection.zh || selection.en || "Site Settings",
      };
    },
  },
});
