import type { SiteLocale } from "./locales";

export type ProjectLogo = {
  id: string;
  name: string;
  src: string;
  fit?: "contain" | "cover";
  sourceKind?: "raw" | "reconstructed" | "composite";
};

export type ProjectGroup = {
  id: string;
  title: string;
  titleByLocale?: Partial<Record<SiteLocale, string>>;
  logos: ProjectLogo[];
};

export const projectGroups: ProjectGroup[] = [
  {
    id: "open-source-launch",
    title: "OpenSource Launch",
    titleByLocale: {
      zh: "开源发布",
      en: "OpenSource Launch",
    },
    logos: [
      {
        id: "second-me",
        name: "Second Me",
        src: "/figma-assets/tiles/card1-second-me.png",
        sourceKind: "reconstructed",
      },
      {
        id: "memu",
        name: "memu",
        src: "/figma-assets/tiles/card1-memu.png",
        sourceKind: "reconstructed",
      },
      {
        id: "openagents",
        name: "OpenAgents",
        src: "/figma-assets/tiles/card1-third-mark.png",
        sourceKind: "reconstructed",
      },
      {
        id: "datastrato",
        name: "Datastrato",
        src: "/figma-assets/tiles/card1-datastrato.png",
        sourceKind: "reconstructed",
      },
      {
        id: "ten-framework",
        name: "TEN-framework",
        src: "/figma-assets/tiles/card1-ten-frameworl.png",
        sourceKind: "reconstructed",
      },
      {
        id: "buddie",
        name: "BUDDIE",
        src: "/figma-assets/tiles/card1-buddle-camel.png",
        sourceKind: "reconstructed",
      },
      {
        id: "acemusic",
        name: "ACEMusic",
        src: "/figma-assets/tiles/card1-acemusic.png",
        sourceKind: "reconstructed",
      },
      {
        id: "acontext",
        name: "Acontext",
        src: "/figma-assets/tiles/card1-acontext.png",
        sourceKind: "reconstructed",
      },
    ],
  },
  {
    id: "startup-coach",
    title: "Startup Coach",
    titleByLocale: {
      zh: "创业陪跑",
      en: "Startup Coach",
    },
    logos: [
      {
        id: "bonjour",
        name: "Bonjour!",
        src: "/figma-assets/tiles/card2-bonjor.png",
        sourceKind: "reconstructed",
      },
      {
        id: "spark-lab",
        name: "Spark Lab",
        src: "/figma-assets/tiles/card2-sparklab.png",
        sourceKind: "reconstructed",
      },
      {
        id: "wanwushi",
        name: "万物时",
        src: "/figma-assets/tiles/card2-wanwushi.png",
        sourceKind: "reconstructed",
      },
      {
        id: "kigland-kigurumi",
        name: "KIGLAND KIGURUMI",
        src: "/figma-assets/tiles/card2-datastrato-2.png",
        sourceKind: "reconstructed",
      },
      {
        id: "kusa",
        name: "KUSA",
        src: "/figma-assets/tiles/card2-kusa.png",
        sourceKind: "reconstructed",
      },
      {
        id: "eezycollab",
        name: "EEZYCOLLAB",
        src: "/figma-assets/tiles/card2-eezycollb.png",
        sourceKind: "reconstructed",
      },
      {
        id: "nomofly",
        name: "Nomofly",
        src: "/figma-assets/tiles/card2-nomofly.png",
        sourceKind: "reconstructed",
      },
      {
        id: "papergen",
        name: "PaperGen",
        src: "/figma-assets/tiles/card2-papergen.png",
        sourceKind: "reconstructed",
      },
    ],
  },
  {
    id: "product-hunt-coach",
    title: "Product Hunt Coach",
    titleByLocale: {
      zh: "Product Hunt 辅导",
      en: "Product Hunt Coach",
    },
    logos: [
      {
        id: "wegic",
        name: "Wegic",
        src: "/figma-assets/raw/imgWegic1-071b7719-a224-4ee9-95ee-e23afe4b3518.png",
        sourceKind: "raw",
      },
      {
        id: "ai-editor",
        name: "AI Editor",
        src: "/figma-assets/raw/imgAiEditor1-dc4b5ba9-b32f-4339-885d-09e986172ae3.png",
        sourceKind: "raw",
      },
      {
        id: "teable",
        name: "Teable",
        src: "/figma-assets/raw/imgTeable1-94eea58b-421a-41bb-b4e8-d6e3c893465d.png",
        sourceKind: "raw",
      },
    ],
  },
];
