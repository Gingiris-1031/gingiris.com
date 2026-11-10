import catalogData from "./learning-catalog.json";
import englishCatalogData from "./learning-catalog.en.json";
import type { SiteLocale } from "./locales";

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

export const TASK_PACKS_EN = [
  {
    title: "Paid Demand Validation",
    price: 199,
    desc: "Validate demand, analyze competitors, and explore pricing and monetization.",
    ids: [7, 8, 9, 17, 20],
  },
  {
    title: "Launch & Acquisition",
    price: 329,
    desc: "From launch preparation to channel execution, explore product launch and acquisition playbooks.",
    ids: [0, 1, 2, 3, 5, 6, 21, 12, 16, 10, 14],
  },
  {
    title: "B2B Business Starter",
    price: 199,
    desc: "Advance enterprise sales, project delivery, and team collaboration.",
    ids: [4, 18, 15, 11, 13],
  },
  {
    title: "OPC Starter Guide",
    price: 49,
    desc: "Turn professional expertise into a service you can sell.",
    ids: [19],
  },
] satisfies [LearningTaskPack, LearningTaskPack, LearningTaskPack, LearningTaskPack];

const englishData = englishCatalogData satisfies LearningCatalog;

export type LocalizedLearningCatalog = LearningCatalog & {
  taskPacks: LearningTaskPack[];
  catalogGroups: LearningCatalogGroup[];
};

const englishCatalogGroups: LearningCatalogGroup[] = TASK_PACKS_EN.map(({ title, ids }) => ({
  title,
  ids,
}));

export const learningCatalogByLocale: Record<SiteLocale, LocalizedLearningCatalog> = {
  zh: {
    ...DATA,
    taskPacks: TASK_PACKS,
    catalogGroups: CATALOG_GROUPS,
  },
  en: {
    ...englishData,
    taskPacks: TASK_PACKS_EN,
    catalogGroups: englishCatalogGroups,
  },
};

export function getLearningCatalog(locale: SiteLocale): LocalizedLearningCatalog {
  return learningCatalogByLocale[locale];
}

export type LearningPageContent = {
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    title: [string, string];
    intro: string;
    actionLabel: string;
    bookLabel: string;
    bookTitle: [string, string];
    bookFooter: [string, string, string];
    sheetLabel: string;
    sheetTitle: [string, string];
  };
  bundle: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    documentCount: string;
    documentLabel: string;
    characterCount: string;
    characterLabel: string;
    inclusion: string;
    price: string;
    catalogTitle: string;
    catalogEyebrow: string;
    catalogIntro: string;
    catalogActionLabel: string;
    contactActionLabel: string;
    membershipEyebrow: string;
    benefits: [{ title: string; description: string }, { title: string; description: string }, { title: string; description: string }];
  };
  packs: {
    eyebrow: string;
    title: string;
    description: string;
    cardEyebrow: string;
    sourceLabel: string;
    catalogActionLabel: string;
    contactActionLabel: string;
    cards: [
      { countLabel: string; question: string; description: string; tags: string[] },
      { countLabel: string; question: string; description: string; tags: string[] },
      { countLabel: string; question: string; description: string; tags: string[] },
    ];
    opcEyebrow: string;
    opcDescription: string;
    opcPrice: string;
    opcCatalogActionLabel: string;
    note: string;
  };
  course: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    actionLabel: string;
    href: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: [{ question: string; answer: string }, { question: string; answer: string }, { question: string; answer: string }];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
    footnote: string;
  };
  catalog: {
    packEyebrow: string;
    packIntroTemplate: { singular: string; plural: string };
    groupCountTemplate: { singular: string; plural: string };
    groupToggleAriaLabel: string;
    documentToggleAriaLabel: string;
    closeAriaLabel: string;
    contactActionLabel: string;
  };
};

export const learningPageContentByLocale: Record<SiteLocale, LearningPageContent> = {
  zh: {
    title: "出海实战指南｜Gingiris 学习资源",
    description: "出海增长知识库与系统课程，提供产品发布、渠道获客、企业成交等一线增长方法、模板与案例。",
    hero: {
      eyebrow: "THE GROWTH FIELD GUIDE / 出海增长指南",
      title: ["从产品发布到获客，", "每一步都有实战参考。"],
      intro: "生姜与 Iris 辅导 80+ 家公司的实战积累，整理成你做项目时用得上的步骤、模板与案例。",
      actionLabel: "了解出海增长知识库 ↓",
      bookLabel: "GINGIRIS / 01",
      bookTitle: ["出海增长", "从这里开始"],
      bookFooter: ["LEARN →", "BUILD →", "GROW"],
      sheetLabel: "THE PLAYBOOK",
      sheetTitle: ["带着问题", "找到方法"],
    },
    bundle: {
      eyebrow: "全套获取",
      title: "出海实战指南 · 全套知识库",
      subtitle: "从第一次出海，到持续推进项目",
      description: "需求验证、产品发布、渠道获客、企业成交与服务起步，按当前项目需要查阅。",
      documentCount: "22",
      documentLabel: "份文档",
      characterCount: "28 万＋",
      characterLabel: "字符",
      inclusion: "包含下方三个资料包＋OPC 起步指南。",
      price: "¥599",
      catalogTitle: "出海实战指南 · 全套目录",
      catalogEyebrow: "GINGIRIS / 完整目录",
      catalogIntro: "当前22份文档，按组合整理。以下为章节目录与PDF页码，不含付费正文。",
      catalogActionLabel: "查看详细目录 ↗",
      contactActionLabel: "咨询购买 ↗",
      membershipEyebrow: "购买全套，享三项会员权益",
      benefits: [
        { title: "知识库永久更新", description: "一次购买，持续获取新增的方法、案例与模板。" },
        { title: "VIP 同行交流群", description: "链接创业者、产品与增长同行，交流经验，积累长期人脉。" },
        { title: "专属闭门分享", description: "与生姜 Iris 及受邀嘉宾深度交流，拓展实战思路。" },
      ],
    },
    packs: {
      eyebrow: "知识库内容 · 按需选购",
      title: "实战资料，按需选购",
      description: "精选自完整知识库，¥49 起。已购全套，无需重复购买。",
      cardEyebrow: "独立资料包 · 可单独购买",
      sourceLabel: "精选自完整出海增长知识库",
      catalogActionLabel: "查看内容与目录 ↗",
      contactActionLabel: "咨询购买 ↗",
      cards: [
        {
          countLabel: "5 份文档",
          question: "用户说想要，真的会付费吗？",
          description: "把竞品研究、用户访谈、产品测试与定价验证串起来，为下一步投入找到依据。",
          tags: ["竞品研究框架", "用户访谈与测试流程", "定价与商业化验证方法"],
        },
        {
          countLabel: "11 份文档",
          question: "产品准备好了，怎么发布并找到用户？",
          description: "从发布筹备到渠道运营，查阅每个阶段的执行步骤、内容方法与复盘参考。",
          tags: ["产品发布与 Launch 流程", "KOL、UGC、Reddit 运营方法", "内容分发、社区与增长复盘"],
        },
        {
          countLabel: "5 份文档",
          question: "有企业意向客户，怎么把沟通推进成订单？",
          description: "围绕客户信任、需求确认、报价与交付，梳理企业业务从沟通到协作的完整过程。",
          tags: ["2B 成交与交付 SOP", "报价、SOW 与合同核心条款模板", "品牌建设与团队协作方法"],
        },
      ],
      opcEyebrow: "服务起步 / 1 份指南",
      opcDescription: "把专业能力整理成可出售的服务。已包含在 ¥599 全套中，也可单独购买。",
      opcPrice: "¥49",
      opcCatalogActionLabel: "查看目录 ↗",
      note: "组合包按内容范围购买；VIP 群、闭门分享及永久更新权益以上方全套说明为准。目录弹窗仅展示章节与页码，不含付费正文。",
    },
    course: {
      eyebrow: "独立合作课程 · 小报童",
      title: "出海增长系统课",
      subtitle: "出海路上的教科书",
      description: "从用户研究、产品定位到渠道选择，系统理解出海增长的基础知识与工作逻辑。18 节主线课＋3 节专题课，配套文稿、音频与课后作业，含 VIP 同行交流群。",
      price: "¥299",
      actionLabel: "前往小报童试读 ↗",
      href: "https://xiaobot.net/p/Gingiris?refer=29043fdd-91ec-42c2-a88d-cb47d1718826",
    },
    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      items: [
        {
          question: "购买「出海实战指南 · 全套知识库」后，还需要购买按需资料包吗？",
          answer: "「出海实战指南 · 全套知识库」已包含「付费需求验证」「出海起号获客」「2B 生意起步」三个资料包及「OPC 起步指南」，无需重复购买。只需要其中一部分内容，可以单独选购对应资料包。",
        },
        {
          question: "第一次做出海项目，应该选「出海实战指南」还是「出海增长系统课」？",
          answer: "已有项目，可以直接使用「出海实战指南」。只推进一项任务，选择对应资料包；需要多个阶段的完整方法，选择「出海实战指南 · 全套知识库」。希望先系统理解用户、产品与渠道等基础知识，可以选择小报童合作课程「出海增长系统课」。",
        },
        {
          question: "「出海实战指南 · 全套知识库」包含小报童合作课程「出海增长系统课」吗？",
          answer: "不包含。「出海增长系统课」是通过小报童购买的独立合作课程，侧重基础知识与系统理解；「出海实战指南 · 全套知识库」提供执行步骤、框架、模板与案例，两者可根据需要分别购买。",
        },
      ],
    },
    cta: {
      eyebrow: "GINGIRIS / LEARN & GROW",
      title: "想了解更多出海增长学习资源？",
      description: "内容介绍、选购建议与购买咨询，欢迎添加微信：staywildgrow",
      actionLabel: "添加微信咨询购买 ↗",
      footnote: "当前内容规模按本地版本提取统计，约 28.7 万字符，含中英文、模板与附录。内容持续更新。",
    },
    catalog: {
      packEyebrow: "GINGIRIS / 任务组合",
      packIntroTemplate: {
        singular: "¥{price} · {count} 份指南 · 当前试售价格",
        plural: "¥{price} · {count} 份指南 · 当前试售价格",
      },
      groupCountTemplate: { singular: "{count} 份", plural: "{count} 份" },
      groupToggleAriaLabel: "展开 {title} 目录",
      documentToggleAriaLabel: "展开 {title} 章节",
      closeAriaLabel: "关闭",
      contactActionLabel: "添加微信咨询购买 ↗",
    },
  },
  en: {
    title: "Global Growth Field Guide | Gingiris Learning Resources",
    description: "A global growth knowledge base and course with practical methods, templates, and cases for product launches, customer acquisition, and B2B sales.",
    hero: {
      eyebrow: "THE GROWTH FIELD GUIDE / GLOBAL GROWTH",
      title: ["From product launch to acquisition,", "practical guidance for every step."],
      intro: "Built on Ginger & Iris's hands-on experience advising 80+ companies, this guide turns real project work into practical steps, templates, and examples.",
      actionLabel: "Explore the knowledge base ↓",
      bookLabel: "GINGIRIS / 01",
      bookTitle: ["GLOBAL GROWTH", "START HERE"],
      bookFooter: ["LEARN →", "BUILD →", "GROW"],
      sheetLabel: "THE PLAYBOOK",
      sheetTitle: ["START WITH A QUESTION", "FIND YOUR METHOD"],
    },
    bundle: {
      eyebrow: "THE COMPLETE COLLECTION",
      title: "Global Growth Field Guide · Complete Knowledge Base",
      subtitle: "From your first global project to steady progress",
      description: "Explore demand validation, product launches, customer acquisition, B2B sales, and service business fundamentals as your project needs them.",
      documentCount: "22",
      documentLabel: "documents",
      characterCount: "280k+",
      characterLabel: "characters",
      inclusion: "Includes the three topic packs below and the OPC Starter Guide.",
      price: "¥599",
      catalogTitle: "Global Growth Field Guide · Complete Contents",
      catalogEyebrow: "GINGIRIS / COMPLETE CONTENTS",
      catalogIntro: "22 documents organized by topic. Browse chapter titles and PDF page numbers; paid content is not included.",
      catalogActionLabel: "Browse the complete contents ↗",
      contactActionLabel: "Ask about purchasing ↗",
      membershipEyebrow: "Three membership benefits with the complete collection",
      benefits: [
        { title: "Lifetime knowledge base updates", description: "One purchase gives you ongoing access to new methods, cases, and templates." },
        { title: "VIP peer community", description: "Connect with founders, product leaders, and growth practitioners to share experience and build lasting relationships." },
        { title: "Private member sessions", description: "Exchange ideas with Ginger & Iris and invited guests, and build practical perspectives." },
      ],
    },
    packs: {
      eyebrow: "KNOWLEDGE BASE · CHOOSE A TOPIC",
      title: "Practical resources, available by topic",
      description: "Selected from the complete knowledge base, from ¥49. No duplicate purchase is needed with the complete collection.",
      cardEyebrow: "TOPIC PACK · AVAILABLE INDIVIDUALLY",
      sourceLabel: "Selected from the complete global growth knowledge base",
      catalogActionLabel: "View contents and outline ↗",
      contactActionLabel: "Ask about purchasing ↗",
      cards: [
        {
          countLabel: "5 documents",
          question: "Users say they want it—but will they pay?",
          description: "Connect competitor research, user interviews, product testing, and pricing validation to decide what to invest in next.",
          tags: ["Competitor research framework", "User interview and testing workflows", "Pricing and monetization validation"],
        },
        {
          countLabel: "11 documents",
          question: "The product is ready. How do you launch and find users?",
          description: "Follow practical steps, content methods, and review frameworks from launch preparation through channel operations.",
          tags: ["Product launch and Launch workflows", "KOL, UGC, and Reddit operations", "Content distribution, community, and growth reviews"],
        },
        {
          countLabel: "5 documents",
          question: "You have interested business customers. How do you turn talks into deals?",
          description: "Map the B2B journey from customer trust and requirements discovery to pricing, delivery, and collaboration.",
          tags: ["B2B sales and delivery SOP", "Pricing, SOW, and contract templates", "Brand building and team collaboration"],
        },
      ],
      opcEyebrow: "SERVICE BUSINESS · 1 GUIDE",
      opcDescription: "Turn professional expertise into a service you can sell. Included in the ¥599 complete collection or available separately.",
      opcPrice: "¥49",
      opcCatalogActionLabel: "View the outline ↗",
      note: "Topic packs are sold by content scope. VIP peer community, private member sessions, and lifetime updates are included with the complete collection above. The catalog dialog shows chapter titles and page numbers, not paid content.",
    },
    course: {
      eyebrow: "INDEPENDENT COURSE · XIAOBOT",
      title: "Global Growth System Course",
      subtitle: "A field guide for building global growth",
      description: "Build a systematic understanding of global growth, from user research and product positioning to channel selection. Includes 18 core lessons and 3 special-topic lessons, with notes, audio, exercises, and a VIP peer community.",
      price: "¥299",
      actionLabel: "Preview on Xiaobot ↗",
      href: "https://xiaobot.net/p/Gingiris?refer=29043fdd-91ec-42c2-a88d-cb47d1718826",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        {
          question: "If I buy the Global Growth Field Guide · Complete Knowledge Base, should I also buy topic packs?",
          answer: "The Global Growth Field Guide · Complete Knowledge Base already includes Paid Demand Validation, Launch & Acquisition, B2B Business Starter, and the OPC Starter Guide. You do not need to buy them again. If you only need selected materials, you can purchase the relevant topic pack on its own.",
        },
        {
          question: "For my first global project, should I choose the Global Growth Field Guide or the Global Growth System Course?",
          answer: "If you already have a project, start with the Global Growth Field Guide. Choose a topic pack to advance one task, or the Complete Knowledge Base for methods across multiple stages. If you want a structured introduction to users, products, channels, and other fundamentals, choose the independently sold Global Growth System Course on Xiaobot.",
        },
        {
          question: "Does the Global Growth Field Guide · Complete Knowledge Base include the Global Growth System Course on Xiaobot?",
          answer: "No. The Global Growth System Course is a separate course sold on Xiaobot, focused on foundational knowledge and a systematic understanding. The Complete Knowledge Base provides execution steps, frameworks, templates, and cases. Purchase either or both based on what you need.",
        },
      ],
    },
    cta: {
      eyebrow: "GINGIRIS / LEARN & GROW",
      title: "Want to learn more about global growth?",
      description: "For an introduction, recommendations, or purchasing questions, add us on WeChat: staywildgrow",
      actionLabel: "Ask about the resources on WeChat ↗",
      footnote: "The current local edition contains approximately 287,000 characters across Chinese and English, including templates and appendices. Content is updated continuously.",
    },
    catalog: {
      packEyebrow: "GINGIRIS / TOPIC PACK",
      packIntroTemplate: {
        singular: "¥{price} · {count} guide · introductory price",
        plural: "¥{price} · {count} guides · introductory price",
      },
      groupCountTemplate: {
        singular: "{count} document",
        plural: "{count} documents",
      },
      groupToggleAriaLabel: "Expand the {title} group",
      documentToggleAriaLabel: "Expand chapters for {title}",
      closeAriaLabel: "Close",
      contactActionLabel: "Ask about the resources on WeChat ↗",
    },
  },
};
