import { defineField, defineType } from "sanity";

export const serviceFeature = defineType({
  name: "serviceFeature",
  title: "Service Feature",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      zh: "text.zh",
      en: "text.en",
    },
    prepare(selection) {
      return {
        title: selection.zh || selection.en || "Feature",
      };
    },
  },
});
