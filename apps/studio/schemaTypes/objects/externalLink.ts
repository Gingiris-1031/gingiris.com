import { defineField, defineType } from "sanity";

export const externalLink = defineType({
  name: "externalLink",
  title: "External Link",
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
  ],
  preview: {
    select: {
      zh: "label.zh",
      en: "label.en",
      href: "href",
    },
    prepare(selection) {
      return {
        title: selection.zh || selection.en || selection.href || "Link",
        subtitle: selection.href || undefined,
      };
    },
  },
});
