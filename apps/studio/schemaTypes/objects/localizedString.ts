import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "zh",
      title: "Chinese (ZH)",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "en",
      title: "English (EN)",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: {
      zh: "zh",
      en: "en",
    },
    prepare(selection) {
      const zh = selection.zh || "";
      const en = selection.en || "";
      return {
        title: zh || en || "(empty)",
        subtitle: en && zh ? en : undefined,
      };
    },
  },
});
