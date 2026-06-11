import type { SiteLocale } from "./locales";

export type ServicePillar = {
  title: string;
  body: string;
};

export type PaymentChannelHint = "wechat" | "alipay";

export type ServicePlanCard = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  ctaLabel: string;
  checkoutPlanCode: string;
  preferredChannel?: PaymentChannelHint;
  detail: string;
  deliveryNote: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceEntryCard = {
  id: string;
  title: string;
  body: string;
  ctaLabel: string;
  action: "auth" | "orders" | "app";
};

export type PaymentStep = {
  title: string;
  body: string;
};

export type ServiceLocaleContent = {
  eyebrow: string;
  title: string;
  intro: string;
  pillars: ServicePillar[];
  entries: ServiceEntryCard[];
  notes: string[];
  plans: ServicePlanCard[];
  paymentHeading: string;
  paymentIntro: string;
  paymentSteps: PaymentStep[];
  faq: ServiceFaqItem[];
};

export const servicesContentByLocale: Record<SiteLocale, ServiceLocaleContent> = {
  zh: {
    eyebrow: "顾问合作",
    title: "与我合作",
    intro: "适合需要尽快校准方向的团队。",
    pillars: [
      {
        title: "全球发布",
        body: "适合正在做出海冷启动、发布节奏与增长定位校准的团队。",
      },
      {
        title: "开源运营",
        body: "适合把社区、内容、星标增长、品牌叙事与转化放到同一系统里看的项目。",
      },
      {
        title: "创始人定位",
        body: "适合创始人需要同时处理品牌表达、融资叙事与业务优先级的阶段。",
      },
    ],
    entries: [
      {
        id: "auth",
        title: "登录",
        body: "登录后即可继续预约、支付，并保留订单记录。",
        ctaLabel: "前往登录",
        action: "auth",
      },
      {
        id: "orders",
        title: "订单中心",
        body: "已支付的服务、资料包与后续链接都会保留在订单中心。",
        ctaLabel: "查看订单",
        action: "orders",
      },
      {
        id: "app",
        title: "账户",
        body: "如果已经登录，可以直接继续支付或查看订单。",
        ctaLabel: "进入账户",
        action: "app",
      },
    ],
    notes: [
      "先判断问题属于增长、叙事、服务设计还是组织协同，而不是立刻给建议。",
      "所有合作都以实际阶段为前提，不做模板化咨询，也不制造不必要的信息噪音。",
      "最终交付追求的是方向、结构与执行动作同时清晰。",
    ],
    plans: [
      {
        id: "session-30",
        title: "单次咨询（30 分钟）",
        subtitle: "适合快速校准问题和决策边界",
        price: "800 RMB",
        ctaLabel: "选择支付",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
        detail: "聚焦一个明确问题，适合快速校准方向、判断优先级或确认下一步动作。",
        deliveryNote: "适合先明确问题边界、目标和决策选项，再进入正式沟通。",
      },
      {
        id: "session-60",
        title: "单次咨询（60 分钟）",
        subtitle: "适合更完整梳理增长、叙事与服务结构",
        price: "1500 RMB",
        ctaLabel: "选择支付",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
        detail: "适合需要更完整拆解增长、出海、开源运营、创始人叙事或服务结构的问题。",
        deliveryNote: "适合在一次完整对话里把问题、优先级和下一步动作讲清楚。",
      },
      {
        id: "growth-pack",
        title: "出海 0-1 资料包",
        subtitle: "包含方法论与初始工具包",
        price: "99 RMB",
        ctaLabel: "选择支付",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
        detail: "适合先快速拿到方法论、模板与实战清单，再决定是否进入深度合作。",
        deliveryNote: "适合想先理解方法论、范围和内容结构，再决定是否继续合作。",
      },
      {
        id: "retainer",
        title: "企业陪跑咨询",
        subtitle: "每月累计咨询时长不超过 5 小时",
        price: "7000 RMB / 月",
        ctaLabel: "选择支付",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
        detail: "适合需要持续校准增长、内容、节奏和组织协同的团队型合作。",
        deliveryNote: "适合需要持续节奏、长期复盘和月度协作机制的团队。",
      },
    ],
    paymentHeading: "选择支付方式",
    paymentIntro: "网站只做导流，任选微信店铺或小红书店铺。",
    paymentSteps: [
      {
        title: "1. 选择入口",
        body: "从站内找到适合你的资料包、咨询或企业陪跑入口。",
      },
      {
        title: "2. 选择渠道",
        body: "进入微信店铺或小红书店铺，自行选择支付方式。",
      },
      {
        title: "3. 支付后继续",
        body: "支付后再继续获取资料、确认咨询或后续安排。",
      },
    ],
    faq: [
      {
        question: "如何选择单次咨询与企业陪跑？",
        answer: "如果问题明确且需要快速判断，适合单次咨询；如果团队需要持续校准策略与节奏，适合长期陪跑。",
      },
      {
        question: "支持英文咨询吗？",
        answer: "支持中英文沟通，交付语言也会根据你的市场和团队习惯调整。",
      },
      {
        question: "是否可以先沟通再支付？",
        answer: "可以，先提交背景与目标，确认合作范围后再进入支付流程。",
      },
    ],
  },
  en: {
    eyebrow: "Boutique Advisory",
    title: "Turn judgment into action",
    intro: "For teams that need faster direction.",
    pillars: [
      {
        title: "Global Launch",
        body: "For teams calibrating launch sequencing, early traction, and positioning in global markets.",
      },
      {
        title: "Open-source Ops",
        body: "For projects that need community, content, stars, narrative, and conversion treated as one operating system.",
      },
      {
        title: "Founder Positioning",
        body: "For founders handling brand expression, fundraising narrative, and business priorities at the same time.",
      },
    ],
    entries: [
      {
        id: "auth",
        title: "Sign in",
        body: "Continue bookings, payments, and order history from one account.",
        ctaLabel: "Sign in",
        action: "auth",
      },
      {
        id: "orders",
        title: "Orders center",
        body: "Purchased services, playbooks, and delivery links remain available in one place.",
        ctaLabel: "View orders",
        action: "orders",
      },
      {
        id: "app",
        title: "Account",
        body: "If you already have a session, continue directly to checkout or orders.",
        ctaLabel: "Account",
        action: "app",
      },
    ],
    notes: [
      "The work starts by identifying whether the real issue is growth, narrative, service design, or operating alignment.",
      "Every engagement is stage-specific rather than template-driven.",
      "The goal is clarity in direction, structure, and next actions at the same time.",
    ],
    plans: [
      {
        id: "session-30",
        title: "One-off consulting (30 min)",
        subtitle: "For fast direction checks and decision support",
        price: "800 RMB",
        ctaLabel: "Choose payment",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
        detail: "Best for one clear decision, launch question, or narrative calibration you want resolved fast.",
        deliveryNote: "Best when you want to clarify scope, priorities, and the right next move before committing deeper.",
      },
      {
        id: "session-60",
        title: "One-off consulting (60 min)",
        subtitle: "For deeper work across growth, narrative, and service design",
        price: "1500 RMB",
        ctaLabel: "Choose payment",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
        detail: "For a deeper review of launch rhythm, open-source growth, founder positioning, or service architecture.",
        deliveryNote: "Best when one focused conversation needs enough room to unpack the problem and define concrete next steps.",
      },
      {
        id: "growth-pack",
        title: "0-1 Global Launch Pack",
        subtitle: "Frameworks and a starter toolkit",
        price: "99 RMB",
        ctaLabel: "Choose payment",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
        detail: "A lightweight entry for operators and founders who want the frameworks before a deeper engagement.",
        deliveryNote: "A lighter entry point if you want to understand the frameworks and scope before a deeper engagement.",
      },
      {
        id: "retainer",
        title: "Company Coaching",
        subtitle: "Up to 5 consulting hours per month",
        price: "7000 RMB / month",
        ctaLabel: "Choose payment",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
        detail: "A monthly advisory format for teams that need continuous calibration instead of one-off advice.",
        deliveryNote: "Best for teams that need recurring rhythm, tighter feedback loops, and ongoing operating calibration.",
      },
    ],
    paymentHeading: "Choose payment",
    paymentIntro: "The site only routes traffic. Pick WeChat Store or Xiaohongshu Store.",
    paymentSteps: [
      {
        title: "1. Pick the right option",
        body: "Start from the on-site entry that matches your pack, consulting, or retainer need.",
      },
      {
        title: "2. Pick a channel",
        body: "Continue through WeChat Store or Xiaohongshu Store and choose how to pay there.",
      },
      {
        title: "3. Continue after payment",
        body: "After payment, continue into delivery, scheduling, or the next step.",
      },
    ],
    faq: [
      {
        question: "How should I choose one-off consulting vs company coaching?",
        answer: "One-off consulting fits clear scoped questions. Longer coaching fits teams needing ongoing calibration.",
      },
      {
        question: "Do you support English sessions?",
        answer: "Yes. Both communication and delivery can be bilingual depending on your market and team.",
      },
      {
        question: "Can we align on scope before payment?",
        answer: "Yes. Share context and goals first, then confirm the engagement before checkout.",
      },
    ],
  },
};
