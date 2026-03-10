import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      zh: "question.zh",
      en: "question.en",
    },
    prepare(selection) {
      return {
        title: selection.zh || selection.en || "FAQ",
      };
    },
  },
});
