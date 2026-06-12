import type { SiteLocale } from "./locales";

export type SiteFrameContent = {
  brand: string;
  nav: {
    home: string;
    services: string;
    insights: string;
    links: string;
    auth: string;
  };
  footer: {
    title: string;
    subtitle: string;
    contact?: string;
  };
};

export const siteFrameByLocale: Record<SiteLocale, SiteFrameContent> = {
  zh: {
    brand: "Iris 生姜",
    nav: {
      home: "主页",
      services: "服务",
      insights: "干货",
      links: "链接",
      auth: "登录",
    },
    footer: {
      title: "感谢来访",
      subtitle: "长期关注出海、开源增长、创始人叙事与运营系统。",
    },
  },
  en: {
    brand: "Iris Wei",
    nav: {
      home: "Home",
      services: "Services",
      insights: "Insights",
      links: "Links",
      auth: "Sign in",
    },
    footer: {
      title: "Thanks for stopping by",
      subtitle: "Focused on global growth, open-source operations, founder narrative, and operating systems.",
    },
  },
};
