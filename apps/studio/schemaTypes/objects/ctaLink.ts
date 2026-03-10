import { defineField, defineType } from "sanity";

export const ctaLink = defineType({
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isExternal",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      zh: "label.zh",
      en: "label.en",
      href: "href",
    },
    prepare(selection) {
      const zh = selection.zh || "";
      const en = selection.en || "";
      const href = selection.href || "";
      return {
        title: zh || en || href || "CTA",
        subtitle: href || undefined,
      };
    },
  },
});
