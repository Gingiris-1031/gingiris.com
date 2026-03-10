import { defineField, defineType } from "sanity";

export const linkItem = defineType({
  name: "linkItem",
  title: "Link Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Social", value: "social" },
          { title: "Resource", value: "resource" },
          { title: "Contact", value: "contact" },
          { title: "Payment", value: "payment" },
        ],
      },
      initialValue: "resource",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sort_order",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      zh: "title.zh",
      en: "title.en",
      href: "href",
      kind: "kind",
    },
    prepare(selection) {
      const title = selection.zh || selection.en || selection.href || "Link Item";
      return {
        title,
        subtitle: selection.kind ? `${selection.kind} · ${selection.href || ""}` : selection.href,
      };
    },
  },
});
