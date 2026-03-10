import type { SiteLocale } from "./locales";
import type { PaymentChannelHint } from "./services";

export type HomeStatCard = {
  value: string;
  title: string;
  subtitle: string;
};

export type HomeLinkItem = {
  title: string;
  subtitle?: string;
  href: string;
  icon: "github" | "tool" | "article" | "podcast" | "video" | "heart" | "download";
  highlighted?: boolean;
};

export type HomePriceItem = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  href: string;
  checkoutPlanCode: string;
  preferredChannel?: PaymentChannelHint;
};

export type HomeSectionGroup = {
  title: string;
  items: HomeLinkItem[];
};

export type HomeLocaleContent = {
  name: string;
  rolePrefix: string;
  roleStrong: string;
  baseTag: string;
  focusTag: string;
  introLines: string[];
  stats: HomeStatCard[];
  projectTitle: string;
  sections: HomeSectionGroup[];
  consultTitle: string;
  consultHint: string;
  consultItems: HomePriceItem[];
  footerTitle: string;
  footerSubTitle: string;
};

export const homeContentByLocale: Record<SiteLocale, HomeLocaleContent> = {
  zh: {
    name: "生姜 Iris",
    rolePrefix: "增长顾问",
    roleStrong: "| Startup Coach｜ Ex-AFFiNE Co-founder & COO",
    baseTag: "Base 昆山",
    focusTag: "出海 / 开源 / 运营咨询",
    introLines: [
      "AFFiNE 联合创始人，带团队穿过从冷启动、融资到全球增长的关键阶段。",
      "从爱丁堡大学 PhD 退学创业后，持续在开源、出海与创始人运营一线工作。",
      "现在主要做开源增长、全球发布、创始人叙事与运营系统咨询。",
    ],
    stats: [
      { value: "$10M+", title: "累计融资", subtitle: "AFFiNE" },
      { value: "4年", title: "创业历程", subtitle: "从种子轮到 Pre-A" },
      { value: "U30", title: "福布斯亚洲", subtitle: "30U30" },
      { value: "40+", title: "辅导项目", subtitle: "累计辅导项目数" },
      { value: "30+", title: "PH 日榜第一", subtitle: "辅导过的项目" },
      { value: "6K+", title: "首周 Stars", subtitle: "开源项目冷启动成绩" },
      { value: "10+", title: "日常辅导项目数", subtitle: "出海/开源运营" },
      { value: "100+", title: "国家/地区", subtitle: "触达过用户所在" },
    ],
    projectTitle: "辅导过的项目",
    sections: [
      {
        title: "了解我 & 我的项目",
        items: [
          {
            title: "AFFiNE Github",
            subtitle: "The Next-Gen Knowledge Base",
            href: "https://github.com/toeverything/AFFiNE",
            icon: "github",
          },
          {
            title: "了解自己的小工具",
            subtitle: "VipaLabs AI",
            href: "/zh/links",
            icon: "tool",
          },
        ],
      },
      {
        title: "出海 & 运营干货",
        items: [
          { title: "Product Hunt打榜经验分享", href: "/zh/insights/product-hunt-launch", icon: "article" },
          { title: "竞品调研框架文档", href: "/zh/insights/competitor-research-framework", icon: "article" },
          { title: "开源出海运营经验分享", href: "/zh/insights/open-source-ops", icon: "article" },
          { title: "开源launch的相关复盘", href: "/zh/insights/open-source-launch-retro", icon: "article" },
          { title: "关于转化的相关复盘", href: "/zh/insights/conversion-retro", icon: "article" },
          { title: "出海0-1的文字复盘", href: "/zh/insights/global-zero-to-one", icon: "article" },
          {
            title: "软件出海0-1全球化增长实战",
            subtitle: "付费资料领取",
            href: "/zh/services",
            icon: "article",
            highlighted: true,
          },
        ],
      },
      {
        title: "播客访谈",
        items: [
          { title: "Ep.1 出海运营/创业经历", href: "/zh/links", icon: "podcast" },
          { title: "Ep.2 第一段创业踩过的坑", href: "/zh/links", icon: "podcast" },
          { title: "Ep.3 出海产品冷启动运营指南", href: "/zh/links", icon: "podcast" },
          { title: "Ep.4 开源产品发布方法论", href: "/zh/links", icon: "podcast" },
          { title: "Ep.5 出海+运营+创业的tips", href: "/zh/links", icon: "podcast" },
          { title: "Ep.6 大厂经历/超级个体", href: "/zh/links", icon: "podcast" },
          { title: "Ep.7 投融资相关tips", href: "/zh/links", icon: "podcast" },
          { title: "Ep.8 用户运营/商业化认知 (强推!)", href: "/zh/links", icon: "podcast", highlighted: true },
          { title: "Ep.9 英国系统性压迫", href: "/zh/links", icon: "podcast" },
          { title: "Ep.10 关于善良的“既得利益者”", href: "/zh/links", icon: "podcast" },
          { title: "Ep.11 60min听完4年创业故事", href: "/zh/links", icon: "podcast" },
          { title: "Ep.12 女性创业需要关注的困境和机会", href: "/zh/links", icon: "podcast" },
        ],
      },
      {
        title: "视频分享 & 资源",
        items: [
          {
            title: "互联网大厂裸辞，创业血泪史",
            subtitle: "Bilibili 对谈生姜Iris",
            href: "/zh/links",
            icon: "video",
          },
          {
            title: "1000万美金融资经验SOP",
            subtitle: "小红书",
            href: "/zh/links",
            icon: "video",
          },
          {
            title: "Iris软件出海实战分享",
            subtitle: "百度网盘 (提取码: v75t)",
            href: "/zh/links",
            icon: "download",
          },
        ],
      },
      {
        title: "个人成长 & 亲密关系",
        items: [
          { title: "你可以爱一个人，但仍然和ta说再见", href: "/zh/links", icon: "heart" },
          { title: "个人成长 / 女性力量", href: "/zh/links", icon: "heart" },
        ],
      },
    ],
    consultTitle: "咨询服务",
    consultHint: "精力有限，不提供免费咨询，敬请谅解。",
    consultItems: [
      {
        id: "session-30",
        title: "单次咨询 (30分钟)",
        price: "800 RMB",
        href: "/zh/services",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
      },
      {
        id: "session-60",
        title: "单次咨询 (60分钟)",
        price: "1500 RMB",
        href: "/zh/services",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
      },
      {
        id: "growth-pack",
        title: "出海0-1资料包",
        subtitle: "包含方法论和初始工具包",
        price: "99 RMB",
        href: "/zh/services",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
      },
      {
        id: "retainer",
        title: "企业陪跑咨询",
        subtitle: "每月累计咨询时长不超过5小时",
        price: "7000 RMB/月",
        href: "/zh/services",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    footerTitle: "感谢来访",
    footerSubTitle: "公众号: 云宝的桃花坞",
  },
  en: {
    name: "Iris Jiang",
    rolePrefix: "Growth Advisor",
    roleStrong: "| Startup Coach | Ex-AFFiNE Co-founder & COO",
    baseTag: "Base Kunshan",
    focusTag: "Global / Open Source / Ops Consulting",
    introLines: [
      "Co-founder of AFFiNE (60k star open-source Notion/Miro alternative).",
      "Former Edinburgh PhD. RTE Community Advisor. DKU Startup Mentor.",
      "Focused on open-source growth, global launch and operations coaching.",
    ],
    stats: [
      { value: "$10M+", title: "Total Funding", subtitle: "AFFiNE" },
      { value: "4 yrs", title: "Founder Journey", subtitle: "Seed to Pre-A" },
      { value: "U30", title: "Forbes Asia", subtitle: "30 Under 30" },
      { value: "40+", title: "Coached Projects", subtitle: "Total engagements" },
      { value: "30+", title: "PH #1", subtitle: "Projects coached" },
      { value: "6K+", title: "Week-1 Stars", subtitle: "Open-source launch" },
      { value: "10+", title: "Active Projects", subtitle: "Global + OSS ops" },
      { value: "100+", title: "Countries/Regions", subtitle: "Users reached" },
    ],
    projectTitle: "Projects I Coached",
    sections: [
      {
        title: "Know Me & My Work",
        items: [
          {
            title: "AFFiNE Github",
            subtitle: "The Next-Gen Knowledge Base",
            href: "https://github.com/toeverything/AFFiNE",
            icon: "github",
          },
          {
            title: "Self-awareness Tool",
            subtitle: "VipaLabs AI",
            href: "/en/links",
            icon: "tool",
          },
        ],
      },
      {
        title: "Global Growth Insights",
        items: [
          { title: "Product Hunt launch notes", href: "/en/insights/product-hunt-launch", icon: "article" },
          { title: "Competitor research framework", href: "/en/insights/competitor-research-framework", icon: "article" },
          { title: "Open-source global ops notes", href: "/en/insights/open-source-ops", icon: "article" },
          { title: "Open-source launch retrospective", href: "/en/insights/open-source-launch-retro", icon: "article" },
          { title: "Conversion-focused retrospectives", href: "/en/insights/conversion-retro", icon: "article" },
          { title: "0-1 global launch notes", href: "/en/insights/global-zero-to-one", icon: "article" },
          {
            title: "0-1 Global Growth Playbook",
            subtitle: "Paid material",
            href: "/en/services",
            icon: "article",
            highlighted: true,
          },
        ],
      },
      {
        title: "Podcast Interviews",
        items: [
          { title: "Ep.1 Global ops & founder story", href: "/en/links", icon: "podcast" },
          { title: "Ep.2 Mistakes in my first startup", href: "/en/links", icon: "podcast" },
          { title: "Ep.3 Cold-start guide for global products", href: "/en/links", icon: "podcast" },
          { title: "Ep.4 OSS launch methodology", href: "/en/links", icon: "podcast" },
          { title: "Ep.5 Startup + growth tips", href: "/en/links", icon: "podcast" },
          { title: "Ep.6 Big-tech to solo path", href: "/en/links", icon: "podcast" },
          { title: "Ep.7 Fundraising insights", href: "/en/links", icon: "podcast" },
          { title: "Ep.8 User ops & monetization (Recommended)", href: "/en/links", icon: "podcast", highlighted: true },
          { title: "Ep.9 Structural pressure in UK", href: "/en/links", icon: "podcast" },
          { title: "Ep.10 Kindness & privilege", href: "/en/links", icon: "podcast" },
          { title: "Ep.11 4-year startup story in 60 min", href: "/en/links", icon: "podcast" },
          { title: "Ep.12 Women founder opportunities", href: "/en/links", icon: "podcast" },
        ],
      },
      {
        title: "Video & Resources",
        items: [
          { title: "From big tech exit to startup", subtitle: "Bilibili interview", href: "/en/links", icon: "video" },
          { title: "$10M fundraising SOP", subtitle: "Xiaohongshu", href: "/en/links", icon: "video" },
          { title: "Global software growth playbook", subtitle: "Baidu Netdisk", href: "/en/links", icon: "download" },
        ],
      },
      {
        title: "Personal Growth & Relationship",
        items: [
          { title: "Love someone and still say goodbye", href: "/en/links", icon: "heart" },
          { title: "Growth / Women power", href: "/en/links", icon: "heart" },
        ],
      },
    ],
    consultTitle: "Consulting",
    consultHint: "Limited capacity. Free consulting is unavailable.",
    consultItems: [
      {
        id: "session-30",
        title: "One-off consulting (30 min)",
        price: "800 RMB",
        href: "/en/services",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
      },
      {
        id: "session-60",
        title: "One-off consulting (60 min)",
        price: "1500 RMB",
        href: "/en/services",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
      },
      {
        id: "growth-pack",
        title: "0-1 Global Launch Pack",
        subtitle: "Frameworks + starter toolkit",
        price: "99 RMB",
        href: "/en/services",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
      },
      {
        id: "retainer",
        title: "Company Coaching",
        subtitle: "Up to 5 consulting hours per month",
        price: "7000 RMB/mo",
        href: "/en/services",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    footerTitle: "Great to meet you",
    footerSubTitle: "WeChat: 云宝的桃花坞",
  },
};
