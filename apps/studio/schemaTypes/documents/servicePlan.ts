import { defineArrayMember, defineField, defineType } from "sanity";

export const servicePlan = defineType({
  name: "servicePlan",
  title: "Service Plan",
  type: "document",
  fields: [
    defineField({
      name: "plan_key",
      title: "Plan Key",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9][a-z0-9-_]{1,63}$/, {
            name: "plan_key",
            invert: false,
          }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "plan_key",
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Plan Name",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "CNY", value: "CNY" },
          { title: "USD", value: "USD" },
        ],
      },
      initialValue: "CNY",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration_label",
      title: "Duration Label",
      type: "localizedString",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "serviceFeature" })],
    }),
    defineField({
      name: "cta",
      title: "Plan CTA",
      type: "ctaLink",
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
    defineField({
      name: "qr_enabled",
      title: "Includes QR",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      key: "plan_key",
      zh: "name.zh",
      en: "name.en",
      price: "price",
      currency: "currency",
    },
    prepare(selection) {
      const title = selection.zh || selection.en || selection.key || "Service Plan";
      const subtitle =
        selection.price && selection.currency
          ? `${selection.currency} ${selection.price}`
          : selection.key || undefined;
      return {
        title,
        subtitle,
      };
    },
  },
});
