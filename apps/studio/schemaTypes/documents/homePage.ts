import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero_badge",
      title: "Hero Badge",
      type: "localizedString",
    }),
    defineField({
      name: "hero_title",
      title: "Hero Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero_subtitle",
      title: "Hero Subtitle",
      type: "localizedText",
    }),
    defineField({
      name: "primary_cta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "secondary_cta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "intro_sections",
      title: "Intro Sections",
      type: "array",
      of: [defineArrayMember({ type: "localizedText" })],
    }),
    defineField({
      name: "featured_service_plans",
      title: "Featured Service Plans",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "servicePlan" }],
        }),
      ],
    }),
    defineField({
      name: "featured_insights",
      title: "Featured Insights",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "insightPost" }],
        }),
      ],
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
        title: "Home Page",
      };
    },
  },
});
