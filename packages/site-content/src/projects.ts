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

const clientLogoNumbers = [
  1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30,
];

export const projectGroups: ProjectGroup[] = [
  {
    id: "selected-clients",
    title: "Selected Clients",
    titleByLocale: {
      zh: "部分服务企业名单",
      en: "Selected Clients",
    },
    logos: clientLogoNumbers.map((number) => ({
      id: `client-${number}`,
      name: `Client ${number}`,
      src: `/projects/clients/client-${number}.svg`,
      sourceKind: "raw",
    })),
  },
];
