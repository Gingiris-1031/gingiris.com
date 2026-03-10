import { defineField, defineType } from "sanity";

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "zh",
      title: "Chinese (ZH)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "English (EN)",
      type: "text",
      rows: 4,
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
