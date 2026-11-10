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

export type HomeLearningItem = {
  title: string;
  edition?: string;
  lines: string[];
  price: string;
  href: string;
  external: boolean;
};

export type HomeLearningSection = {
  eyebrow: string;
  title: string;
  hint: string;
  introCtaLabel: string;
  introHref: string;
  consultCtaLabel: string;
  items: HomeLearningItem[];
};

export type HomeMediaKit = {
  eyebrow: string;
  title: string;
  packageLabel: string;
  packagePrice: string;
  singleLabel: string;
  singlePrice: string;
  description: string;
  audience: string;
  ctaLabel: string;
  ctaHref: string;
  wechatLabel: string;
  wechatId: string;
  emailLabel: string;
  email: string;
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
  learningSection: HomeLearningSection;
  consultTitle: string;
  consultHint: string;
  consultItems: HomePriceItem[];
  mediaKit: HomeMediaKit;
};

export const homeContentByLocale: Record<SiteLocale, HomeLocaleContent> = {
  zh: {
    name: "生姜 Iris",
    rolePrefix: "增长顾问",
    roleStrong: "| 创业陪跑｜前 AFFiNE 联合创始人兼 COO",
    baseTag: "常驻浙江",
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
        id: "retainer",
        title: "企业陪跑咨询",
        subtitle: "每月累计咨询时长不超过 5 小时",
        price: "7000 RMB/月",
        href: "/zh#site-contact",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    mediaKit: {
      eyebrow: "品牌投放刊例",
      title: "全渠道打包或单渠道投放",
      packageLabel: "出海增长全渠道包",
      packagePrice: "¥8,000（含税）",
      singleLabel: "单渠道投放",
      singlePrice: "¥800 起（含税）",
      description: "7 个渠道可打包可单投，精准触达中文出海圈，完整报价见刊例。",
      audience: "",
      ctaLabel: "查看完整刊例",
      ctaHref: externalResourceHrefs.mediaKitDoc,
      wechatLabel: "微信",
      wechatId: "Ww_Ziheng（备注「投放合作」）",
      emailLabel: "邮箱",
      email: "ziheng.will@outlook.com",
    },
    learningSection: {
      eyebrow: "学习资源",
      title: "出海增长学习资源",
      hint: "查阅一线增长方法与项目模板，也可以从系统课程开始了解出海增长。",
      introCtaLabel: "查看完整介绍 ↗",
      introHref: "/zh/learning",
      consultCtaLabel: "咨询购买 ↗",
      items: [
        {
          title: "出海实战指南",
          edition: "全套知识库",
          lines: ["22 份文档，获取完整步骤、模板与案例。", "永久更新 · VIP 同行群 · 专属闭门分享"],
          price: "¥599",
          href: "/zh/learning#bundle",
          external: false,
        },
        {
          title: "出海实战指南",
          edition: "按需资料包",
          lines: ["精选自完整知识库，可单独购买。", "按需求验证、发布获客、企业成交选购。"],
          price: "¥49 起",
          href: "/zh/learning#packs",
          external: false,
        },
        {
          title: "出海增长系统课",
          lines: ["小报童独立合作课程，共 21 节。", "配套文稿、音频与课后作业。"],
          price: "¥299",
          href: "https://xiaobot.net/p/Gingiris?refer=29043fdd-91ec-42c2-a88d-cb47d1718826",
          external: true,
        },
      ],
    },
  },
  en: {
    name: "Iris Wei",
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
        id: "retainer",
        title: "Company Coaching",
        subtitle: "Up to 5 consulting hours per month",
        price: "7000 RMB/mo",
        href: "/en#site-contact",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
      },
    ],
    mediaKit: {
      eyebrow: "Media Kit",
      title: "Bundle all channels or book a single one",
      packageLabel: "Global growth bundle",
      packagePrice: "¥8,000 (tax incl.)",
      singleLabel: "Single channel",
      singlePrice: "From ¥800 (tax incl.)",
      description: "Seven channels, bundled or booked individually. Full pricing in the media kit.",
      audience: "",
      ctaLabel: "View full media kit",
      ctaHref: externalResourceHrefs.mediaKitDoc,
      wechatLabel: "WeChat",
      wechatId: "Ww_Ziheng (note: media partnership)",
      emailLabel: "Email",
      email: "ziheng.will@outlook.com",
    },
    learningSection: {
      eyebrow: "Learning Resources",
      title: "Global Growth Learning Resources",
      hint: "Explore first-hand growth methods and project templates, or start with a structured course.",
      introCtaLabel: "View full introduction ↗",
      introHref: "/zh/learning",
      consultCtaLabel: "Ask about purchasing ↗",
      items: [
        {
          title: "Global Growth Playbook",
          edition: "Complete Knowledge Base",
          lines: ["22 documents with complete steps, templates, and cases.", "Lifetime updates · VIP peer group · Private member sessions"],
          price: "¥599",
          href: "/zh/learning#bundle",
          external: false,
        },
        {
          title: "Global Growth Playbook",
          edition: "Task-Based Packs",
          lines: ["Selected from the complete knowledge base, available individually.", "Choose from demand validation, launch and acquisition, or B2B sales."],
          price: "From ¥49",
          href: "/zh/learning#packs",
          external: false,
        },
        {
          title: "Global Growth System Course",
          lines: ["An independent Xiaobot course with 21 lessons.", "Includes course notes, audio, and exercises."],
          price: "¥299",
          href: "https://xiaobot.net/p/Gingiris?refer=29043fdd-91ec-42c2-a88d-cb47d1718826",
          external: true,
        },
      ],
    },
  },
};
