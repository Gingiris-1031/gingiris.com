import type { SiteLocale } from "./locales";

export type ProjectLogo = {
  id: string;
  name: string;
  src: string;
  href?: string;
  fit?: "contain" | "cover";
  sourceKind?: "raw" | "reconstructed" | "composite";
};

export type ProjectGroup = {
  id: string;
  title: string;
  titleByLocale?: Partial<Record<SiteLocale, string>>;
  logos: ProjectLogo[];
};

const clientLogos: Array<Pick<ProjectLogo, "name" | "href"> & { number: number }> = [
  { number: 1, name: "Spark Lab", href: "https://www.sparklab.city/" },
  { number: 3, name: "Bonjour!", href: "https://bonjour.bio/" },
  { number: 4, name: "Nomofly", href: "https://nomofly.com/" },
  { number: 5, name: "PaperGen", href: "https://www.papergen.ai/" },
  { number: 6, name: "Trickle", href: "https://trickle.so/" },
  { number: 7, name: "KUSA", href: "https://kusa.pics/" },
  { number: 8, name: "EEZYCOLLAB", href: "https://www.eezycollab.com/" },
  { number: 9, name: "KIGLAND", href: "https://kig.land/" },
  { number: 10, name: "BUDDIE" },
  { number: 11, name: "Sheet0", href: "https://www.sheet0.com/" },
  { number: 12, name: "ALL TIME", href: "https://alltimelab.com/" },
  { number: 13, name: "Zopi", href: "https://zopia.ai/" },
  { number: 15, name: "Teable", href: "https://teable.ai/" },
  { number: 16, name: "MolyPix.AI", href: "https://molypix.ai/" },
  { number: 17, name: "TANKA", href: "https://www.tanka.ai/" },
  { number: 18, name: "BoomCut", href: "https://boomcutai.com/" },
  { number: 19, name: "Wegic", href: "https://wegic.ai/" },
  { number: 20, name: "KUSE", href: "https://www.kuse.ai/" },
  { number: 21, name: "观猹", href: "https://watcha.cn/" },
  { number: 22, name: "Medeo", href: "https://www.medeo.app/" },
  { number: 23, name: "memU", href: "https://memu.pro/" },
  { number: 24, name: "CAMEL-AI", href: "https://www.camel-ai.org/" },
  { number: 25, name: "Second Me", href: "https://home.second.me/" },
  { number: 26, name: "Leapility", href: "https://leapility.com/" },
  { number: 27, name: "ColaOS", href: "https://colaos.ai/" },
  { number: 28, name: "Junior", href: "https://junior.so/" },
  { number: 29, name: "ACE STUDIO", href: "https://acestudio.ai/" },
  { number: 30, name: "InsForge", href: "https://insforge.dev/" },
  { number: 31, name: "OpenAgents", href: "https://openagents.org/" },
  { number: 32, name: "商汤小浣熊", href: "https://xiaohuanxiong.com/" },
  { number: 33, name: "Acontext", href: "https://acontext.io/" },
  { number: 34, name: "TinyFish", href: "https://www.tinyfish.ai/" },
  { number: 35, name: "商汤科技", href: "https://www.sensetime.com/cn/" },
  { number: 36, name: "ring2.ai", href: "https://www.ring2.ai/" },
  { number: 37, name: "Datastrato", href: "https://datastrato.ai/" },
  { number: 38, name: "TestSprite", href: "https://www.testsprite.com/" },
  { number: 39, name: "Ancher", href: "https://ancher.ai/" },
  { number: 40, name: "OpenCreator", href: "https://opencreator.io/zh" },
  { number: 41, name: "Gradient", href: "https://gradient.network/" },
  { number: 42, name: "OrcaRouter", href: "https://www.orcarouter.ai/" },
  { number: 43, name: "ChatExcel", href: "https://www.chatexcel.com/" },
  { number: 44, name: "CoreSpeed", href: "https://corespeed.io/" },
  { number: 45, name: "Persom", href: "https://persom.ai/" },
  { number: 46, name: "Storyflow", href: "https://storyflow.so/" },
  { number: 47, name: "SpatialWalk", href: "https://spatialwalk.top/" },
  { number: 48, name: "Boltzbit", href: "https://boltzbit.com/" },
  { number: 49, name: "ElecNest", href: "https://www.elecnest.ai/" },
  { number: 50, name: "Creatly", href: "https://creatly.ai/" },
  { number: 51, name: "Hypit", href: "https://hypit.ai/" },
  { number: 52, name: "Synapuff" },
  { number: 53, name: "昆山杜克大学创新创业中心", href: "https://ine.dukekunshan.edu.cn/" },
  { number: 54, name: "TraceRoot", href: "https://traceroot.ai/" },
  { number: 55, name: "Actionbook", href: "https://actionbook.app/" },
  { number: 56, name: "万象有灵", href: "https://noonwake.com/#wanxiang" },
  { number: 57, name: "Questflow", href: "https://questflow.ai/" },
  { number: 58, name: "Astorie", href: "https://astorie.ai/" },
  { number: 59, name: "Eigent", href: "https://www.eigent.ai/" },
  { number: 60, name: "ListenHub", href: "https://listenhub.ai/" },
  { number: 61, name: "Narya.ai", href: "https://narya.ai/" },
  { number: 62, name: "Mizzen AI", href: "https://mizzen.top/" },
  { number: 63, name: "Einsia", href: "https://einsia.ai/" },
  { number: 64, name: "Verdent", href: "https://www.verdent.ai/" },
];

export const projectGroups: ProjectGroup[] = [
  {
    id: "selected-clients",
    title: "Selected Clients",
    titleByLocale: {
      zh: "部分服务企业名单",
      en: "Selected Clients",
    },
    logos: clientLogos.map(({ number, name, href }) => ({
      id: `client-${number}`,
      name,
      href,
      src: `/projects/clients/client-${number}.svg`,
      sourceKind: "raw",
    })),
  },
];
