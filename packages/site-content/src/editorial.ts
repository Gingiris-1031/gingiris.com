import type { SiteLocale } from "./locales";

export type InsightItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export type LinkCollectionItem = {
  title: string;
  description?: string;
  href: string;
};

export type LinkCollection = {
  title: string;
  items: LinkCollectionItem[];
};

export type EditorialLocaleContent = {
  insightsTitle: string;
  insightsSubtitle: string;
  linksTitle: string;
  linksSubtitle: string;
};

export const editorialContentByLocale: Record<SiteLocale, EditorialLocaleContent> = {
  zh: {
    insightsTitle: "干货内容",
    insightsSubtitle: "围绕 Product Hunt、开源增长、出海冷启动和转化复盘整理成长期内容。",
    linksTitle: "链接导航",
    linksSubtitle: "项目、播客、视频和长期可回看的资源入口。",
  },
  en: {
    insightsTitle: "Insights",
    insightsSubtitle: "Long-form notes on Product Hunt, open-source growth, global launch, and conversion retrospectives.",
    linksTitle: "Links",
    linksSubtitle: "Projects, podcasts, videos, and long-tail resource entry points.",
  },
};

export const insightItemsByLocale: Record<SiteLocale, InsightItem[]> = {
  zh: [
    {
      slug: "product-hunt-launch",
      category: "Product Hunt",
      title: "Product Hunt 打榜经验分享",
      excerpt: "如何准备预热、首日节奏、社群协同和榜单后的持续承接。",
      publishedAt: "2026-03-10",
    },
    {
      slug: "competitor-research-framework",
      category: "Research",
      title: "竞品调研框架文档",
      excerpt: "把竞品、用户任务、叙事位置和转化路径放进同一张研究表里。",
      publishedAt: "2026-03-10",
    },
    {
      slug: "open-source-ops",
      category: "Open Source",
      title: "开源出海运营经验分享",
      excerpt: "社区内容、stars、GitHub 入口和全球用户反馈如何一起工作。",
      publishedAt: "2026-03-10",
    },
    {
      slug: "open-source-launch-retro",
      category: "Launch",
      title: "开源 launch 的相关复盘",
      excerpt: "冷启动前后的节奏拆分、团队分工和叙事统一方法。",
      publishedAt: "2026-03-10",
    },
    {
      slug: "conversion-retro",
      category: "Conversion",
      title: "关于转化的相关复盘",
      excerpt: "从入口、预期管理到付费动作，哪些地方最容易损耗信任。",
      publishedAt: "2026-03-10",
    },
    {
      slug: "global-zero-to-one",
      category: "Global Growth",
      title: "出海 0-1 的文字复盘",
      excerpt: "出海早期到底先做产品、内容、社群还是叙事，这里给出阶段判断。",
      publishedAt: "2026-03-10",
    },
  ],
  en: [
    {
      slug: "product-hunt-launch",
      category: "Product Hunt",
      title: "Product Hunt launch notes",
      excerpt: "How to sequence pre-launch warmup, day-one rhythm, community collaboration, and post-launch capture.",
      publishedAt: "2026-03-10",
    },
    {
      slug: "competitor-research-framework",
      category: "Research",
      title: "Competitor research framework",
      excerpt: "A research sheet that puts competitors, jobs-to-be-done, narrative position, and conversion path in one place.",
      publishedAt: "2026-03-10",
    },
    {
      slug: "open-source-ops",
      category: "Open Source",
      title: "Open-source global ops notes",
      excerpt: "How community content, stars, GitHub entry points, and global feedback loops work as one system.",
      publishedAt: "2026-03-10",
    },
    {
      slug: "open-source-launch-retro",
      category: "Launch",
      title: "Open-source launch retrospective",
      excerpt: "How to split cold-start sequencing, team roles, and narrative alignment before and after launch.",
      publishedAt: "2026-03-10",
    },
    {
      slug: "conversion-retro",
      category: "Conversion",
      title: "Conversion retrospectives",
      excerpt: "Where trust usually leaks between entry points, expectation setting, and payment actions.",
      publishedAt: "2026-03-10",
    },
    {
      slug: "global-zero-to-one",
      category: "Global Growth",
      title: "0-1 global launch notes",
      excerpt: "What to prioritize first in early global growth: product, content, community, or narrative.",
      publishedAt: "2026-03-10",
    },
  ],
};

export const linkCollectionsByLocale: Record<SiteLocale, LinkCollection[]> = {
  zh: [
    {
      title: "了解我 & 我的项目",
      items: [
        {
          title: "AFFiNE Github",
          description: "The Next-Gen Knowledge Base",
          href: "https://github.com/toeverything/AFFiNE",
        },
        {
          title: "了解自己的小工具",
          description: "VipaLabs AI",
          href: "/zh/links",
        },
      ],
    },
    {
      title: "播客访谈",
      items: [
        { title: "Ep.1 出海运营 / 创业经历", href: "/zh/links" },
        { title: "Ep.4 开源产品发布方法论", href: "/zh/links" },
        { title: "Ep.8 用户运营 / 商业化认知", href: "/zh/links" },
      ],
    },
    {
      title: "视频分享 & 资源",
      items: [
        { title: "互联网大厂裸辞，创业血泪史", description: "Bilibili 对谈", href: "/zh/links" },
        { title: "1000 万美金融资经验 SOP", description: "小红书", href: "/zh/links" },
        { title: "Iris 软件出海实战分享", description: "百度网盘资料", href: "/zh/links" },
      ],
    },
  ],
  en: [
    {
      title: "Know Me & My Work",
      items: [
        {
          title: "AFFiNE Github",
          description: "The Next-Gen Knowledge Base",
          href: "https://github.com/toeverything/AFFiNE",
        },
        {
          title: "Self-awareness Tool",
          description: "VipaLabs AI",
          href: "/en/links",
        },
      ],
    },
    {
      title: "Podcast Interviews",
      items: [
        { title: "Ep.1 Global ops & founder story", href: "/en/links" },
        { title: "Ep.4 OSS launch methodology", href: "/en/links" },
        { title: "Ep.8 User ops & monetization", href: "/en/links" },
      ],
    },
    {
      title: "Video & Resources",
      items: [
        { title: "From big tech exit to startup", description: "Bilibili interview", href: "/en/links" },
        { title: "$10M fundraising SOP", description: "Xiaohongshu", href: "/en/links" },
        { title: "Global software growth playbook", description: "Baidu Netdisk", href: "/en/links" },
      ],
    },
  ],
};
