import type { SiteLocale } from "./locales";
import { externalResourceHrefs } from "./editorial";
import type { PaymentChannelHint } from "./services";

export type HomeStatCard = {
  value: string;
  title: string;
  subtitle: string;
};

export type HomeLinkItem = {
  title: string;
  subtitle?: string;
  href?: string;
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

export type HomeCourseBenefit = {
  title: string;
  desc: string;
};

export type HomeCourseSection = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: HomeCourseBenefit[];
  ctaLabel: string;
  wechatId: string;
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
  courseSection: HomeCourseSection;
  consultTitle: string;
  consultHint: string;
  consultItems: HomePriceItem[];
};

export const homeContentByLocale: Record<SiteLocale, HomeLocaleContent> = {
  zh: {
    name: "生姜 Iris",
    rolePrefix: "增长顾问",
    roleStrong: "| 创业陪跑｜前 AFFiNE 联合创始人兼 COO",
    baseTag: "常驻昆山",
    focusTag: "出海 / 开源 / 运营咨询",
    introLines: [
      "AFFiNE 联合创始人，带团队穿过从冷启动、融资到全球增长的关键阶段。",
      "从爱丁堡大学博士阶段退学创业后，持续在开源、出海与创始人运营一线工作。",
      "现在主要做开源增长、全球发布、创始人叙事与运营系统咨询。",
    ],
    stats: [
      { value: "$10M+", title: "累计融资", subtitle: "AFFiNE" },
      { value: "4年", title: "创业历程", subtitle: "从种子轮到 Pre-A" },
      { value: "U30", title: "福布斯亚洲", subtitle: "30U30" },
      { value: "40+", title: "辅导项目", subtitle: "累计辅导项目数" },
      { value: "30+", title: "PH 日榜第一", subtitle: "辅导过的项目" },
      { value: "6K+", title: "首周 GitHub 星标", subtitle: "开源项目冷启动成绩" },
      { value: "10+", title: "日常辅导项目数", subtitle: "出海/开源运营" },
      { value: "100+", title: "国家/地区", subtitle: "触达过用户所在" },
    ],
    projectTitle: "辅导过的项目",
    sections: [
      {
        title: "了解我与我的项目",
        items: [
          {
            title: "AFFiNE GitHub",
            subtitle: "下一代知识库",
            href: externalResourceHrefs.affineGithub,
            icon: "github",
          },
          {
            title: "了解自己的小工具",
            subtitle: "VipaLabs AI",
            href: externalResourceHrefs.vipaLabs,
            icon: "tool",
          },
          {
            title: "Openclaw 开源 Skills",
            subtitle: "查看 3 个开源 Skills",
            href: externalResourceHrefs.gingirisLaunchRepo,
            icon: "tool",
          },
        ],
      },
      {
        title: "出海 & 运营干货",
        items: [
          { title: "Product Hunt 打榜经验分享", href: externalResourceHrefs.productHuntLaunch, icon: "article" },
          { title: "竞品调研框架文档", href: externalResourceHrefs.competitorResearchFramework, icon: "article" },
          { title: "开源出海运营经验分享", href: externalResourceHrefs.openSourceOps, icon: "article" },
          { title: "开源发布相关复盘", href: externalResourceHrefs.openSourceLaunchRetro, icon: "article" },
          { title: "关于转化的相关复盘", href: externalResourceHrefs.conversionRetro, icon: "article" },
          { title: "出海 0-1 的文字复盘", href: externalResourceHrefs.globalZeroToOne, icon: "article" },
          {
            title: "软件出海0-1全球化增长实战",
            subtitle: "99 RMB 资料包",
            href: externalResourceHrefs.wechatShop,
            icon: "article",
            highlighted: true,
          },
        ],
      },
      {
        title: "播客访谈",
        items: [
          { title: "第 1 期 出海运营与创业经历", href: externalResourceHrefs.podcastOpsFounder, icon: "podcast" },
          { title: "第 2 期 第一段创业踩过的坑", href: externalResourceHrefs.podcastFirstStartupMistakes, icon: "podcast" },
          { title: "第 3 期 出海产品冷启动运营指南", href: externalResourceHrefs.podcastColdStartGuide, icon: "podcast" },
          { title: "第 4 期 开源产品发布方法论", href: externalResourceHrefs.podcastOpenSourceLaunch, icon: "podcast" },
          { title: "第 5 期 出海、运营与创业经验", href: externalResourceHrefs.podcastGrowthTips, icon: "podcast" },
          { title: "第 6 期 大厂经历与超级个体", href: externalResourceHrefs.podcastBigTechSolo, icon: "podcast" },
          { title: "第 7 期 投融资相关经验", href: externalResourceHrefs.podcastFundraisingTips, icon: "podcast" },
          { title: "第 8 期 用户运营与商业化认知（强推）", href: externalResourceHrefs.podcastUserOpsMonetization, icon: "podcast", highlighted: true },
          { title: "第 9 期 英国系统性压迫", href: externalResourceHrefs.podcastUkPressure, icon: "podcast" },
          { title: "第 10 期 关于善良的“既得利益者”", href: externalResourceHrefs.podcastPrivilegeKindness, icon: "podcast" },
          { title: "第 11 期 60 分钟听完 4 年创业故事", href: externalResourceHrefs.podcastFourYearFounderStory, icon: "podcast" },
          { title: "第 12 期 女性创业需要关注的困境和机会", href: externalResourceHrefs.podcastWomenFounder, icon: "podcast" },
        ],
      },
      {
        title: "视频分享 & 资源",
        items: [
          {
            title: "互联网大厂裸辞，创业血泪史",
            subtitle: "Bilibili 对谈生姜 Iris",
            href: externalResourceHrefs.videoBilibiliInterview,
            icon: "video",
          },
          {
            title: "1000 万美金融资经验 SOP",
            subtitle: "小红书",
            href: externalResourceHrefs.videoXiaohongshuInterview,
            icon: "video",
          },
          {
            title: "Iris 软件出海实战分享",
            subtitle: "百度网盘 (提取码: v75t)",
            href: externalResourceHrefs.growthArchive,
            icon: "download",
          },
        ],
      },
      {
        title: "个人成长 & 亲密关系",
        items: [
          { title: "你可以爱一个人，但仍然和ta说再见", href: externalResourceHrefs.relationshipLoveGoodbye, icon: "heart" },
          { title: "个人成长 / 女性力量", href: externalResourceHrefs.relationshipGrowthWomenPower, icon: "heart" },
        ],
      },
    ],
    consultTitle: "咨询服务",
    consultHint: "精力有限，不提供免费咨询，敬请谅解。",
    consultItems: [
      {
        id: "session-30",
        title: "单次咨询（30 分钟）",
        price: "800 RMB",
        href: "/zh#site-contact",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
      },
      {
        id: "session-60",
        title: "单次咨询（60 分钟）",
        price: "1500 RMB",
        href: "/zh#site-contact",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
      },
      {
        id: "growth-pack",
        title: "出海 0-1 资料包",
        subtitle: "包含方法论和初始工具包",
        price: "99 RMB",
        href: "/zh#site-contact",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
      },
      {
        id: "retainer",
        title: "企业陪跑咨询",
        subtitle: "每月累计咨询时长不超过 5 小时",
        price: "7000 RMB/月",
        href: "/zh#site-contact",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    courseSection: {
      eyebrow: "系统课程",
      title: "出海增长系统课",
      description: "如果你正在做 AI 产品或软件出海，或者刚接手增长团队、甚至刚被任命为 CGO/CMO/COO，这门课将是你今年最值得花时间投入的实战指南。这门课程凝聚了生姜 Iris 陪跑数十家明星初创出海增长的一线实战经验，涵盖 0 到 1 的冷启动、规模化投放、用户增长飞轮与跨国团队搭建。",
      benefits: [
        { title: "实战经验萃取", desc: "沉淀自数十家明星出海项目，拒绝空洞理论，只提供能落地的增长 SOP。" },
        { title: "全栈知识图谱", desc: "完整覆盖从「增长实习生」到「增长一号位」的技能模型与核心认知。" },
        { title: "出海情报社群", desc: "订阅后可加入「出海增长情报群」，与一线出海决策者实时探讨最新案例与复盘。订阅后联系微信号：staywildgrow，拉你入群。" }
      ],
      ctaLabel: "立即订阅课程",
      wechatId: "staywildgrow"
    },
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
            href: externalResourceHrefs.affineGithub,
            icon: "github",
          },
          {
            title: "Self-awareness Tool",
            subtitle: "VipaLabs AI",
            href: externalResourceHrefs.vipaLabs,
            icon: "tool",
          },
          {
            title: "Openclaw Open-Source Skills",
            subtitle: "See the 3 public skills",
            href: externalResourceHrefs.gingirisLaunchRepo,
            icon: "tool",
          },
        ],
      },
      {
        title: "Global Growth Insights",
        items: [
          { title: "Product Hunt launch notes", href: externalResourceHrefs.productHuntLaunch, icon: "article" },
          { title: "Competitor research framework", href: externalResourceHrefs.competitorResearchFramework, icon: "article" },
          { title: "Open-source global ops notes", href: externalResourceHrefs.openSourceOps, icon: "article" },
          { title: "Open-source launch retrospective", href: externalResourceHrefs.openSourceLaunchRetro, icon: "article" },
          { title: "Conversion-focused retrospectives", href: externalResourceHrefs.conversionRetro, icon: "article" },
          { title: "0-1 global launch notes", href: externalResourceHrefs.globalZeroToOne, icon: "article" },
          {
            title: "0-1 Global Growth Playbook",
            subtitle: "99 RMB pack",
            href: externalResourceHrefs.wechatShop,
            icon: "article",
            highlighted: true,
          },
        ],
      },
      {
        title: "Podcast Interviews",
        items: [
          { title: "Ep.1 Global ops & founder story", href: externalResourceHrefs.podcastOpsFounder, icon: "podcast" },
          { title: "Ep.2 Mistakes in my first startup", href: externalResourceHrefs.podcastFirstStartupMistakes, icon: "podcast" },
          { title: "Ep.3 Cold-start guide for global products", href: externalResourceHrefs.podcastColdStartGuide, icon: "podcast" },
          { title: "Ep.4 OSS launch methodology", href: externalResourceHrefs.podcastOpenSourceLaunch, icon: "podcast" },
          { title: "Ep.5 Startup + growth tips", href: externalResourceHrefs.podcastGrowthTips, icon: "podcast" },
          { title: "Ep.6 Big-tech to solo path", href: externalResourceHrefs.podcastBigTechSolo, icon: "podcast" },
          { title: "Ep.7 Fundraising insights", href: externalResourceHrefs.podcastFundraisingTips, icon: "podcast" },
          { title: "Ep.8 User ops & monetization (Recommended)", href: externalResourceHrefs.podcastUserOpsMonetization, icon: "podcast", highlighted: true },
          { title: "Ep.9 Structural pressure in UK", href: externalResourceHrefs.podcastUkPressure, icon: "podcast" },
          { title: "Ep.10 Kindness & privilege", href: externalResourceHrefs.podcastPrivilegeKindness, icon: "podcast" },
          { title: "Ep.11 4-year startup story in 60 min", href: externalResourceHrefs.podcastFourYearFounderStory, icon: "podcast" },
          { title: "Ep.12 Women founder opportunities", href: externalResourceHrefs.podcastWomenFounder, icon: "podcast" },
        ],
      },
      {
        title: "Video & Resources",
        items: [
          { title: "From big tech exit to startup", subtitle: "Bilibili interview", href: externalResourceHrefs.videoBilibiliInterview, icon: "video" },
          { title: "$10M fundraising SOP", subtitle: "Xiaohongshu", href: externalResourceHrefs.videoXiaohongshuInterview, icon: "video" },
          { title: "Global software growth playbook", subtitle: "Baidu Netdisk", href: externalResourceHrefs.growthArchive, icon: "download" },
        ],
      },
      {
        title: "Personal Growth & Relationship",
        items: [
          { title: "Love someone and still say goodbye", href: externalResourceHrefs.relationshipLoveGoodbye, icon: "heart" },
          { title: "Growth / Women power", href: externalResourceHrefs.relationshipGrowthWomenPower, icon: "heart" },
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
        href: "/en#site-contact",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
      },
      {
        id: "session-60",
        title: "One-off consulting (60 min)",
        price: "1500 RMB",
        href: "/en#site-contact",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
      },
      {
        id: "growth-pack",
        title: "0-1 Global Launch Pack",
        subtitle: "Frameworks + starter toolkit",
        price: "99 RMB",
        href: "/en#site-contact",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
      },
      {
        id: "retainer",
        title: "Company Coaching",
        subtitle: "Up to 5 consulting hours per month",
        price: "7000 RMB/mo",
        href: "/en#site-contact",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    courseSection: {
      eyebrow: "System Course",
      title: "Global Growth System Course",
      description: "If you are scaling AI products or software globally, leading a growth team, or stepping into a CGO/CMO/COO role, this course is designed as your most valuable investment this year. It condenses Iris Jiang's hands-on experience coaching dozens of star startups in global growth, covering 0-to-1 cold start, scaling paid ads, user growth engines, and building cross-border teams.",
      benefits: [
        { title: "Battle-Tested", desc: "Derived from real-world growth coaching for top startups, offering actionable SOPs instead of dry theory." },
        { title: "Full Capability Map", desc: "Covering the complete growth career path and skillset from hands-on execution to strategic leadership." },
        { title: "Intelligence Group", desc: "Subscribe to join the Global Growth Intelligence Group, exchange real-world teardowns with active builders, and add WeChat ID: staywildgrow to join." }
      ],
      ctaLabel: "Subscribe to Course",
      wechatId: "staywildgrow"
    },
  },
};
