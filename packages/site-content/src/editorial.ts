import type { SiteLocale } from "./locales";

export type InsightItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  sourceHref: string;
  sourceLabel: string;
  summary: string;
  highlights: string[];
};

export type LinkCollectionItem = {
  title: string;
  description?: string;
  href?: string;
  meta?: string;
  note?: string;
  badge?: string;
  featured?: boolean;
};

export type LinkCollection = {
  id: string;
  title: string;
  description?: string;
  items: LinkCollectionItem[];
};

export type EditorialLocaleContent = {
  insightsTitle: string;
  insightsSubtitle: string;
  linksTitle: string;
  linksSubtitle: string;
};

export const externalResourceHrefs = {
  affineGithub: "https://github.com/toeverything/AFFiNE",
  vipaLabs: "https://vipalabs.ai/",
  wechatShop: "https://channels.weixin.qq.com/shop/b/DoIDyQPrKp4pAxq",
  xiaohongshuShop: "https://xhslink.com/m/2Bc3ZumxOL6",
  productHuntLaunch: "https://ua2hss9chad.feishu.cn/wiki/BguowBANWiqXoZk8EOmcZxMenXg?from=from_copylink",
  competitorResearchFramework: "https://ua2hss9chad.feishu.cn/wiki/CVkYwEprTiTog3kMGmQcqk0zn1g",
  openSourceOps: "https://ua2hss9chad.feishu.cn/wiki/UIalwrXuPi0rtNkpGuLc82vCn2f?from=from_copylink",
  openSourceLaunchRetro: "https://mp.weixin.qq.com/s/yX16SMbFBgmtUpUNYoRUNQ",
  conversionRetro: "https://mp.weixin.qq.com/s/7kdcFJMSXTnlXOzEvTbuiw",
  globalZeroToOne: "https://mp.weixin.qq.com/s/TOYvVH1E35cU41m7ElWRgg",
  globalGrowthPlaybook: "https://my.feishu.cn/wiki/SHM4wCqWRiJe10k05RTc30Y6nwd?from=from_copylink",
  launchAgent: "https://leapility.com/share/agent/i-ed53wdpchkm6?ref=r-3w1o43q7buk7",
  podcastOpsFounder: "https://www.xiaoyuzhoufm.com/episode/6774f7f51e823e72d366a543",
  podcastFirstStartupMistakes: "https://www.xiaoyuzhoufm.com/episode/670d07570d2f24f2890a1410",
  podcastColdStartGuide: "https://www.xiaoyuzhoufm.com/episode/6703a38081cdab3a933cdfec",
  podcastOpenSourceLaunch: "https://www.xiaoyuzhoufm.com/episode/64d4a09be490c5dee51060f2",
  podcastGrowthTips: "https://www.xiaoyuzhoufm.com/episode/6825c4f15ccf03732b0626e3",
  podcastBigTechSolo: "https://www.xiaoyuzhoufm.com/episode/68b56f9e97178f08eeb96cf5",
  podcastFundraisingTips: "https://www.xiaoyuzhoufm.com/episode/6814589f6970cc7b4d576d19",
  podcastUserOpsMonetization: "https://www.xiaoyuzhoufm.com/episode/68add1e2293471fed49b8944",
  podcastUkPressure: "https://www.xiaoyuzhoufm.com/episode/68bd76de5faf36865974c78f",
  podcastPrivilegeKindness: "https://www.xiaoyuzhoufm.com/episode/68f4a70622654730203106c2",
  podcastFourYearFounderStory: "https://www.xiaoyuzhoufm.com/episode/69363e6f3fec3166cfd0ae43",
  podcastWomenFounder: "https://www.xiaoyuzhoufm.com/episode/695005d348b2027f30c36c19",
  videoBilibiliInterview: "https://b23.tv/4uN5ski",
  videoXiaohongshuInterview: "http://xhslink.com/o/7Dh9XMzdHZv",
  growthArchive: "https://pan.baidu.com/s/1s4U7XNKKtlcM5iCIuPf0Tg?pwd=v75t",
  relationshipLoveGoodbye: "https://www.xiaoyuzhoufm.com/episode/689d7b53759c1ff652de4e7c",
  relationshipGrowthWomenPower: "https://www.xiaoyuzhoufm.com/episode/689e88fc51528e172ac1b9ac",
  gingirisLaunchRepo: "https://github.com/Gingiris/gingiris-launch",
  gingirisB2bGrowthRepo: "https://github.com/Gingiris/gingiris-b2b-growth",
  gingirisOpensourceRepo: "https://github.com/Gingiris/gingiris-opensource",
} as const;

export const editorialContentByLocale: Record<SiteLocale, EditorialLocaleContent> = {
  zh: {
    insightsTitle: "干货内容",
    insightsSubtitle: "保留 6 篇精选摘要，并附上原文入口，方便继续深读或直接跳转。",
    linksTitle: "链接导航",
    linksSubtitle: "把文档、播客、视频、工具和 GitHub 仓库整理成可直接跳转的归档页。",
  },
  en: {
    insightsTitle: "Insights",
    insightsSubtitle: "Six curated summaries stay on-site, each with a direct link back to the original source.",
    linksTitle: "Links",
    linksSubtitle: "Documents, podcasts, videos, tools, and GitHub repos are organized into a direct-jump archive.",
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
      sourceHref: externalResourceHrefs.productHuntLaunch,
      sourceLabel: "飞书 Wiki",
      summary: "这篇内容围绕 Product Hunt launch 的完整节奏展开，重点不是单点技巧，而是如何把预热、发布日和榜后承接连成一条连续的增长链路。",
      highlights: [
        "把 launch 分成预热期、榜单日和榜后承接三个阶段，避免所有动作都堆到上线当天。",
        "提前准备 narrative、评论素材、支持者协同和常见问题，减少首日临场消耗。",
        "榜单成绩只是起点，真正的承接仍然要回到官网、社群、试用和后续内容分发。",
      ],
    },
    {
      slug: "competitor-research-framework",
      category: "调研",
      title: "竞品调研框架文档",
      excerpt: "把竞品、用户任务、叙事位置和转化路径放进同一张研究表里。",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.competitorResearchFramework,
      sourceLabel: "飞书 Wiki",
      summary: "这份框架强调竞品调研不是功能堆叠对比，而是把用户任务、场景、叙事和转化动作放在同一张表里分析，方便直接反哺 landing page 和产品策略。",
      highlights: [
        "除了看功能和定价，还要同步比较目标用户、入口场景和叙事位置。",
        "调研结果最好能直接回填到官网文案、产品优先级和销售沟通中，而不是停留在研究文档里。",
        "把竞品优势、你的差异化和用户真实任务并排梳理，才能看清真正的替代关系。",
      ],
    },
    {
      slug: "open-source-ops",
      category: "开源",
      title: "开源出海运营经验分享",
      excerpt: "社区内容、stars、GitHub 入口和全球用户反馈如何一起工作。",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.openSourceOps,
      sourceLabel: "飞书 Wiki",
      summary: "这篇经验分享把开源增长看成内容、GitHub、社区和用户反馈共同构成的系统，而不是单纯追求 star 数或一次性曝光。",
      highlights: [
        "GitHub README、Issue、文档站和社区内容需要围绕同一叙事展开，否则流量很难沉淀。",
        "star 只是表层信号，更重要的是用户是否愿意继续试用、反馈和传播。",
        "全球化开源运营要把英文表达、时区节奏和社区响应速度一起考虑进去。",
      ],
    },
    {
      slug: "open-source-launch-retro",
      category: "发布",
      title: "开源发布相关复盘",
      excerpt: "冷启动前后的节奏拆分、团队分工和叙事统一方法。",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.openSourceLaunchRetro,
      sourceLabel: "微信公众号",
      summary: "这篇复盘更关注开源项目冷启动时的团队配合，尤其是发布前后的分工、素材准备和对外叙事一致性。",
      highlights: [
        "开源 launch 不是把代码公开这么简单，文档、官网、社交内容和社区回复要同步成套出现。",
        "团队内部需要提前约定发布时间线、角色分工和临场反馈机制。",
        "对外表达越统一，用户越容易理解项目要解决的核心问题和下一步该去哪里。",
      ],
    },
    {
      slug: "conversion-retro",
      category: "转化",
      title: "关于转化的相关复盘",
      excerpt: "从入口、预期管理到付费动作，哪些地方最容易损耗信任。",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.conversionRetro,
      sourceLabel: "微信公众号",
      summary: "这篇复盘把转化拆到更细的用户感知层面，强调影响购买决定的往往不是单一按钮，而是路径中的预期落差和信任损耗。",
      highlights: [
        "转化问题通常出在用户进入页面前后的心理预期不一致，而不只是按钮颜色或价格文案。",
        "让用户快速知道自己会得到什么、下一步做什么，比堆功能更重要。",
        "付费动作之前的每一个解释成本，都会影响最终成交和复购信心。",
      ],
    },
    {
      slug: "global-zero-to-one",
      category: "全球增长",
      title: "出海 0-1 的文字复盘",
      excerpt: "出海早期到底先做产品、内容、社群还是叙事，这里给出阶段判断。",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.globalZeroToOne,
      sourceLabel: "微信公众号",
      summary: "这篇文字复盘讨论的是出海 0-1 阶段的优先级问题，核心在于不同阶段该先抓产品、内容、社群还是分发，而不是平均用力。",
      highlights: [
        "冷启动阶段最怕同时铺太多战线，先找到最能验证价值的入口更重要。",
        "内容、社区和产品节奏应该围绕同一个增长假设协同，而不是各做各的。",
        "真正有效的 0-1 复盘，会明确下一阶段继续投入什么、停止什么，以及为什么。",
      ],
    },
  ],
  en: [
    {
      slug: "product-hunt-launch",
      category: "Product Hunt",
      title: "Product Hunt launch notes",
      excerpt: "How to sequence pre-launch warmup, day-one rhythm, community collaboration, and post-launch capture.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.productHuntLaunch,
      sourceLabel: "Feishu Wiki",
      summary: "This note frames a Product Hunt launch as one connected system: warmup before launch, coordinated execution on the day, and deliberate capture after the ranking spike.",
      highlights: [
        "Treat warmup, launch day, and post-launch capture as separate stages with different goals.",
        "Prepare narrative, comment assets, supporter coordination, and FAQs before day one.",
        "The ranking itself is only a signal; the real work continues on the website, community, and trial-to-paid path.",
      ],
    },
    {
      slug: "competitor-research-framework",
      category: "Research",
      title: "Competitor research framework",
      excerpt: "A research sheet that puts competitors, jobs-to-be-done, narrative position, and conversion path in one place.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.competitorResearchFramework,
      sourceLabel: "Feishu Wiki",
      summary: "This framework positions competitor research as decision support for product, landing-page, and positioning work rather than a static feature checklist.",
      highlights: [
        "Compare narrative position, target user, and entry scenario alongside product features and pricing.",
        "Research should directly feed product priorities, website copy, and sales conversations.",
        "Placing competitors next to your differentiation and the user's job-to-be-done reveals the real substitute set.",
      ],
    },
    {
      slug: "open-source-ops",
      category: "Open Source",
      title: "Open-source global ops notes",
      excerpt: "How community content, stars, GitHub entry points, and global feedback loops work as one system.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.openSourceOps,
      sourceLabel: "Feishu Wiki",
      summary: "This write-up treats open-source growth as a coordinated operating system spanning GitHub, docs, community, and fast feedback loops instead of a stars-only tactic.",
      highlights: [
        "README, docs, issues, and community content need to tell the same story.",
        "Stars matter less than whether users keep trying, responding, and sharing the project.",
        "Global open-source ops require strong English copy, timezone awareness, and fast response habits.",
      ],
    },
    {
      slug: "open-source-launch-retro",
      category: "Launch",
      title: "Open-source launch retrospective",
      excerpt: "How to split cold-start sequencing, team roles, and narrative alignment before and after launch.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.openSourceLaunchRetro,
      sourceLabel: "WeChat article",
      summary: "This retrospective focuses on team choreography around an open-source launch: what needs to be ready before release, who owns what, and how the external story stays consistent.",
      highlights: [
        "An open-source launch needs coordinated docs, website, social content, and community replies, not just a public repo.",
        "The team should align on a timeline, role ownership, and response loops ahead of time.",
        "Consistent external messaging makes it much easier for users to understand the project and their next step.",
      ],
    },
    {
      slug: "conversion-retro",
      category: "Conversion",
      title: "Conversion retrospectives",
      excerpt: "Where trust usually leaks between entry points, expectation setting, and payment actions.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.conversionRetro,
      sourceLabel: "WeChat article",
      summary: "This retrospective looks at conversion through user trust and expectation management rather than isolated UI tweaks.",
      highlights: [
        "Conversion often fails because user expectations drift before and after the landing page.",
        "Users need quick clarity on what they get and what to do next.",
        "Every extra explanation cost before payment weakens confidence and final conversion.",
      ],
    },
    {
      slug: "global-zero-to-one",
      category: "Global Growth",
      title: "0-1 global launch notes",
      excerpt: "What to prioritize first in early global growth: product, content, community, or narrative.",
      publishedAt: "2026-03-10",
      sourceHref: externalResourceHrefs.globalZeroToOne,
      sourceLabel: "WeChat article",
      summary: "This essay is about priority setting in the 0-1 stage of global growth: which lever to push first, which fronts to ignore, and how to sequence the system.",
      highlights: [
        "Early-stage teams lose momentum when they spread effort across too many channels at once.",
        "Product, content, community, and distribution should all reinforce the same growth hypothesis.",
        "A useful 0-1 retrospective makes explicit what to keep funding, what to stop, and why.",
      ],
    },
  ],
};

export const linkCollectionsByLocale: Record<SiteLocale, LinkCollection[]> = {
  zh: [
    {
      id: "strategy-docs",
      title: "出海 / 开源 / 转化文档",
      description: "核心文档、复盘和长期可回看的方法资料。",
      items: [
        {
          title: "Product Hunt 打榜经验分享",
          description: "飞书 Wiki｜预热、首日节奏、社群协同与榜后承接。",
          href: externalResourceHrefs.productHuntLaunch,
          meta: "Product Hunt / 飞书",
          note: "站内也保留了摘要版，可从干货页继续读。",
          badge: "精选",
          featured: true,
        },
        {
          title: "竞品调研框架文档",
          description: "飞书 Wiki｜把竞品、用户任务、叙事位置和转化路径放进同一张研究表。",
          href: externalResourceHrefs.competitorResearchFramework,
          meta: "Research / 飞书",
          note: "适合拿来统一团队调研结构。",
        },
        {
          title: "开源出海运营经验分享",
          description: "飞书 Wiki｜社区内容、GitHub 入口和全球用户反馈的系统协同。",
          href: externalResourceHrefs.openSourceOps,
          meta: "Open Source / 飞书",
        },
        {
          title: "开源 launch 的相关复盘",
          description: "公众号文章｜冷启动前后的节奏拆分、团队分工和叙事统一。",
          href: externalResourceHrefs.openSourceLaunchRetro,
          meta: "Launch / 微信",
        },
        {
          title: "关于转化的相关复盘",
          description: "公众号文章｜从入口、预期管理到付费动作的信任损耗复盘。",
          href: externalResourceHrefs.conversionRetro,
          meta: "Conversion / 微信",
        },
        {
          title: "出海 0-1 的文字复盘",
          description: "公众号文章｜早期应该先做产品、内容、社群还是叙事。",
          href: externalResourceHrefs.globalZeroToOne,
          meta: "Global Growth / 微信",
        },
        {
          title: "软件出海 0-1 全球化增长实战",
          description: "99 RMB 资料包",
          href: "/zh/services#payment-options",
          meta: "付费资料",
          badge: "付费",
          featured: true,
        },
      ],
    },
    {
      id: "tools-and-skills",
      title: "工具 / Agent / Skills",
      description: "可直接体验的工具、Launch Agent，以及 3 个开源 Skills。",
      items: [
        {
          title: "欢迎尝试这个帮你了解自己的小工具",
          description: "VipaLabs AI｜公开体验入口。",
          href: externalResourceHrefs.vipaLabs,
          meta: "工具",
          featured: true,
        },
        {
          title: "开源 Launch Agent",
          description: "Leapility 分享页｜围绕发布策略和时间线规划整理的 Agent。",
          href: externalResourceHrefs.launchAgent,
          meta: "Agent",
        },
        {
          title: "gingiris-launch",
          description: "产品发布策略 / 时间线规划。",
          href: externalResourceHrefs.gingirisLaunchRepo,
          meta: "Skill",
        },
        {
          title: "gingiris-b2b-growth",
          description: "B2B 产品增长策略 / SOP。",
          href: externalResourceHrefs.gingirisB2bGrowthRepo,
          meta: "Skill",
        },
        {
          title: "gingiris-opensource",
          description: "开源产品发布策略 / 时间线规划。",
          href: externalResourceHrefs.gingirisOpensourceRepo,
          meta: "Skill",
        },
      ],
    },
    {
      id: "podcasts-growth",
      title: "播客：出海 / 运营 / 创业",
      description: "围绕增长、开源、融资与创业认知的 12 期访谈。",
      items: [
        {
          title: "播客 1｜出海运营 / 创业经历",
          description: "小宇宙｜围绕出海运营与创业历程的长期对谈。",
          href: externalResourceHrefs.podcastOpsFounder,
          meta: "小宇宙",
        },
        {
          title: "播客 2｜第一段创业踩过的坑",
          description: "小宇宙｜复盘第一次创业中的关键失误与判断偏差。",
          href: externalResourceHrefs.podcastFirstStartupMistakes,
          meta: "小宇宙",
        },
        {
          title: "播客 3｜出海产品冷启动运营指南",
          description: "小宇宙｜更偏方法论的冷启动运营讨论。",
          href: externalResourceHrefs.podcastColdStartGuide,
          meta: "小宇宙",
        },
        {
          title: "播客 4｜开源产品发布方法论",
          description: "小宇宙｜开源 launch 节奏和发布方法拆解。",
          href: externalResourceHrefs.podcastOpenSourceLaunch,
          meta: "小宇宙",
        },
        {
          title: "播客 5｜出海 + 运营 + 创业的 tips",
          description: "小宇宙｜把多个阶段踩过的坑和经验放到同一集里讲。",
          href: externalResourceHrefs.podcastGrowthTips,
          meta: "小宇宙",
        },
        {
          title: "播客 6｜大厂经历 / 超级个体",
          description: "小宇宙｜从大厂经历走向个人路径的认知整理。",
          href: externalResourceHrefs.podcastBigTechSolo,
          meta: "小宇宙",
        },
        {
          title: "播客 7｜投融资相关 tips",
          description: "小宇宙｜融资过程中的经验与提醒。",
          href: externalResourceHrefs.podcastFundraisingTips,
          meta: "小宇宙",
        },
        {
          title: "播客 8｜用户运营 / 商业化认知",
          description: "小宇宙｜用户运营与商业化认知的系统梳理。",
          href: externalResourceHrefs.podcastUserOpsMonetization,
          meta: "小宇宙",
          badge: "强推",
          featured: true,
        },
        {
          title: "播客 9｜英国系统性压迫",
          description: "小宇宙｜更偏社会观察与结构性议题的讨论。",
          href: externalResourceHrefs.podcastUkPressure,
          meta: "小宇宙",
        },
        {
          title: "播客 10｜关于善良的“既得利益者”",
          description: "小宇宙｜围绕善良、结构位置与认知的讨论。",
          href: externalResourceHrefs.podcastPrivilegeKindness,
          meta: "小宇宙",
        },
        {
          title: "播客 11｜60 min 听完 4 年创业故事",
          description: "小宇宙｜用一集时间快速回顾四年创业历程。",
          href: externalResourceHrefs.podcastFourYearFounderStory,
          meta: "小宇宙",
        },
        {
          title: "播客 12｜女性创业需要关注的困境和机会",
          description: "小宇宙｜女性创业者需要额外关注的限制与机会。",
          href: externalResourceHrefs.podcastWomenFounder,
          meta: "小宇宙",
        },
      ],
    },
    {
      id: "videos-archives",
      title: "视频访谈 & 资料下载",
      description: "更长形式的访谈和资料包入口。",
      items: [
        {
          title: "视频访谈 1｜互联网大厂裸辞，融资千万美金又全烧光",
          description: "Bilibili｜对谈生姜 Iris 的创业血泪史与关键转折。",
          href: externalResourceHrefs.videoBilibiliInterview,
          meta: "Bilibili",
          featured: true,
        },
        {
          title: "视频访谈 2｜她把 1000 万美金融资经验总结成一套出海 SOP",
          description: "小红书｜围绕融资经验与出海 SOP 的访谈节选。",
          href: externalResourceHrefs.videoXiaohongshuInterview,
          meta: "小红书",
        },
        {
          title: "iris 软件出海 8.19.mp4",
          description: "百度网盘｜软件出海实战分享视频存档。",
          href: externalResourceHrefs.growthArchive,
          meta: "百度网盘",
          note: "提取码：v75t",
          badge: "下载",
        },
      ],
    },
    {
      id: "relationships",
      title: "亲密关系 / 个人成长",
      description: "保留的额外内容入口。",
      items: [
        {
          title: "你可以爱一个人，但仍然和 ta 说再见",
          description: "小宇宙｜关于亲密关系边界与离开的讨论。",
          href: externalResourceHrefs.relationshipLoveGoodbye,
          meta: "小宇宙",
        },
        {
          title: "个人成长 / 女性力量",
          description: "小宇宙｜围绕个人成长与女性力量的讨论。",
          href: externalResourceHrefs.relationshipGrowthWomenPower,
          meta: "小宇宙",
        },
      ],
    },
  ],
  en: [
    {
      id: "strategy-docs",
      title: "Global Growth / OSS / Conversion Docs",
      description: "Core documents, retrospectives, and long-tail playbooks.",
      items: [
        {
          title: "Product Hunt launch notes",
          description: "Feishu Wiki | Warmup, launch-day rhythm, supporter coordination, and post-launch capture.",
          href: externalResourceHrefs.productHuntLaunch,
          meta: "Product Hunt / Feishu",
          note: "A site summary is also available in the Insights section.",
          badge: "Featured",
          featured: true,
        },
        {
          title: "Competitor research framework",
          description: "Feishu Wiki | Competitors, JTBD, narrative position, and conversion path in one sheet.",
          href: externalResourceHrefs.competitorResearchFramework,
          meta: "Research / Feishu",
        },
        {
          title: "Open-source global ops notes",
          description: "Feishu Wiki | How community content, GitHub entry points, and feedback loops connect.",
          href: externalResourceHrefs.openSourceOps,
          meta: "Open Source / Feishu",
        },
        {
          title: "Open-source launch retrospective",
          description: "WeChat article | Team sequencing, launch prep, and narrative alignment.",
          href: externalResourceHrefs.openSourceLaunchRetro,
          meta: "Launch / WeChat",
        },
        {
          title: "Conversion retrospectives",
          description: "WeChat article | Where trust leaks between entry, expectation, and payment.",
          href: externalResourceHrefs.conversionRetro,
          meta: "Conversion / WeChat",
        },
        {
          title: "0-1 global launch notes",
          description: "WeChat article | What to prioritize first in early global growth.",
          href: externalResourceHrefs.globalZeroToOne,
          meta: "Global Growth / WeChat",
        },
        {
          title: "0-1 global growth playbook",
          description: "99 RMB pack",
          href: "/en/services#payment-options",
          meta: "Paid material",
          badge: "Paid",
          featured: true,
        },
      ],
    },
    {
      id: "tools-and-skills",
      title: "Tools / Agent / Skills",
      description: "A public tool, a launch agent, and 3 open-source skills.",
      items: [
        {
          title: "Self-awareness tool",
          description: "VipaLabs AI | Public experience entry.",
          href: externalResourceHrefs.vipaLabs,
          meta: "Tool",
          featured: true,
        },
        {
          title: "Open-source launch agent",
          description: "Leapility share page | Agent for launch strategy and timeline planning.",
          href: externalResourceHrefs.launchAgent,
          meta: "Agent",
        },
        {
          title: "gingiris-launch",
          description: "Launch strategy and timeline planning.",
          href: externalResourceHrefs.gingirisLaunchRepo,
          meta: "Skill",
        },
        {
          title: "gingiris-b2b-growth",
          description: "B2B growth strategy and SOP.",
          href: externalResourceHrefs.gingirisB2bGrowthRepo,
          meta: "Skill",
        },
        {
          title: "gingiris-opensource",
          description: "Open-source launch strategy and timeline planning.",
          href: externalResourceHrefs.gingirisOpensourceRepo,
          meta: "Skill",
        },
      ],
    },
    {
      id: "podcasts-growth",
      title: "Podcasts: Global Growth / Ops / Founder Journey",
      description: "Twelve episodes covering growth, launch, fundraising, and startup learnings.",
      items: [
        {
          title: "Podcast 1 | Global ops / founder story",
          description: "Xiaoyuzhou | A long-form founder and operator conversation.",
          href: externalResourceHrefs.podcastOpsFounder,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 2 | Mistakes in my first startup",
          description: "Xiaoyuzhou | Lessons from the first founder cycle.",
          href: externalResourceHrefs.podcastFirstStartupMistakes,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 3 | Cold-start guide for global products",
          description: "Xiaoyuzhou | A more tactical cold-start operating guide.",
          href: externalResourceHrefs.podcastColdStartGuide,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 4 | OSS launch methodology",
          description: "Xiaoyuzhou | How to think about open-source release timing and method.",
          href: externalResourceHrefs.podcastOpenSourceLaunch,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 5 | Startup + growth + ops tips",
          description: "Xiaoyuzhou | A compact cross-stage experience episode.",
          href: externalResourceHrefs.podcastGrowthTips,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 6 | Big-tech path / solo path",
          description: "Xiaoyuzhou | Moving from large-company experience toward an individual path.",
          href: externalResourceHrefs.podcastBigTechSolo,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 7 | Fundraising tips",
          description: "Xiaoyuzhou | Practical fundraising reminders and perspective.",
          href: externalResourceHrefs.podcastFundraisingTips,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 8 | User ops / monetization",
          description: "Xiaoyuzhou | A strong episode on user ops and monetization thinking.",
          href: externalResourceHrefs.podcastUserOpsMonetization,
          meta: "Xiaoyuzhou",
          badge: "Recommended",
          featured: true,
        },
        {
          title: "Podcast 9 | Structural pressure in the UK",
          description: "Xiaoyuzhou | A conversation with more structural and social framing.",
          href: externalResourceHrefs.podcastUkPressure,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 10 | Kindness and privilege",
          description: "Xiaoyuzhou | A conversation about morality, structure, and position.",
          href: externalResourceHrefs.podcastPrivilegeKindness,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 11 | Four years of startup story in 60 minutes",
          description: "Xiaoyuzhou | A compressed walkthrough of a four-year founder journey.",
          href: externalResourceHrefs.podcastFourYearFounderStory,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Podcast 12 | Challenges and opportunities for women founders",
          description: "Xiaoyuzhou | Constraints and openings that women founders should watch closely.",
          href: externalResourceHrefs.podcastWomenFounder,
          meta: "Xiaoyuzhou",
        },
      ],
    },
    {
      id: "videos-archives",
      title: "Video Interviews & Downloadable Archive",
      description: "Long-form interviews and the downloadable growth archive.",
      items: [
        {
          title: "Interview 1 | Leaving big tech, raising $10M, then burning it",
          description: "Bilibili | A candid startup retrospective with Iris Jiang.",
          href: externalResourceHrefs.videoBilibiliInterview,
          meta: "Bilibili",
          featured: true,
        },
        {
          title: "Interview 2 | Turning $10M fundraising experience into an expansion SOP",
          description: "Xiaohongshu | A shorter interview excerpt on fundraising and global launch ops.",
          href: externalResourceHrefs.videoXiaohongshuInterview,
          meta: "Xiaohongshu",
        },
        {
          title: "iris global software growth 8.19.mp4",
          description: "Baidu Netdisk | Archived video share.",
          href: externalResourceHrefs.growthArchive,
          meta: "Baidu Netdisk",
          note: "Access code: v75t",
          badge: "Download",
        },
      ],
    },
    {
      id: "relationships",
      title: "Relationship / Personal Growth",
      description: "A smaller side archive for relationship and growth conversations.",
      items: [
        {
          title: "You can love someone and still say goodbye",
          description: "Xiaoyuzhou | A conversation on boundaries and leaving.",
          href: externalResourceHrefs.relationshipLoveGoodbye,
          meta: "Xiaoyuzhou",
        },
        {
          title: "Personal growth / women power",
          description: "Xiaoyuzhou | A conversation on growth and women’s inner strength.",
          href: externalResourceHrefs.relationshipGrowthWomenPower,
          meta: "Xiaoyuzhou",
        },
      ],
    },
  ],
};
