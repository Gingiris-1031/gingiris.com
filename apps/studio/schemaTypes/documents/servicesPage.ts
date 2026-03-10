import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "page_title",
      title: "Page Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page_intro",
      title: "Page Intro",
      type: "localizedText",
    }),
    defineField({
      name: "show_qr_default",
      title: "Show QR by default",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "primary_cta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "faq_title",
      title: "FAQ Title",
      type: "localizedString",
    }),
    defineField({
      name: "faq_items",
      title: "FAQ Items",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
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
    prepare() {
      return {
        title: "Services Page",
      };
    },
  },
});
