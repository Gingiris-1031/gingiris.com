import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";
import { singletonActions, singletonTypes } from "./schemaTypes/singletons";

export default defineConfig({
  name: "default",
  title: "Iris Personal Website CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "zx5w2j2k",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "staging",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  document: {
    newDocumentOptions: (previous, context) => {
      if (context.creationContext.type !== "global") {
        return previous;
      }
      return previous.filter((templateItem) => !singletonTypes.has(templateItem.templateId));
    },
    actions: (previous, context) => {
      if (!singletonTypes.has(context.schemaType)) {
        return previous;
      }
      return previous.filter(
        (actionItem) => actionItem.action && singletonActions.has(actionItem.action),
      );
    },
  },
  schema: {
    types: schemaTypes,
  },
});
