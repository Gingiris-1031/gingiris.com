import catalogData from "./learning-catalog.json";

export type LearningCourse = {
  title: string;
  desc: string;
};

export type LearningDocumentLine = {
  text: string;
  level: number;
};

export type LearningDocument = {
  title: string;
  meta: string;
  lines: LearningDocumentLine[];
};

export type LearningCatalog = {
  courses: LearningCourse[];
  docs: LearningDocument[];
};

export type LearningTaskPack = {
  title: string;
  price: number;
  desc: string;
  ids: number[];
};

export type LearningCatalogGroup = {
  title: string;
  ids: number[];
};

export const DATA = catalogData satisfies LearningCatalog;
export const courses = DATA.courses;
export const docs = DATA.docs;

export const TASK_PACKS = [
  {
    title: "付费需求验证",
    price: 199,
    desc: "验证用户需求、分析竞品，探索定价与收费。",
    ids: [7, 8, 9, 17, 20],
  },
  {
    title: "出海起号获客",
    price: 329,
    desc: "从发布筹备到渠道执行，查阅产品发布与获客方法。",
    ids: [0, 1, 2, 3, 5, 6, 21, 12, 16, 10, 14],
  },
  {
    title: "2B 生意起步",
    price: 199,
    desc: "推进企业成交、项目交付与团队协作。",
    ids: [4, 18, 15, 11, 13],
  },
  {
    title: "OPC 起步指南",
    price: 49,
    desc: "把专业能力整理成可出售的服务。",
    ids: [19],
  },
] satisfies [LearningTaskPack, LearningTaskPack, LearningTaskPack, LearningTaskPack];

export const CATALOG_GROUPS: LearningCatalogGroup[] = TASK_PACKS.map(({ title, ids }) => ({
  title,
  ids,
}));
