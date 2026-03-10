import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Services Page")
        .id("servicesPage")
        .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
      S.divider(),
      S.documentTypeListItem("servicePlan").title("Service Plans"),
      S.documentTypeListItem("insightPost").title("Insights"),
      S.documentTypeListItem("linkItem").title("Links"),
    ]);
