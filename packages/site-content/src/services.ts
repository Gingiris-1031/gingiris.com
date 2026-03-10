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
    eyebrow: "Boutique Advisory",
    title: "把增长、叙事与运营判断，收敛成真正可执行的合作",
    intro: "适合需要把增长、叙事与运营判断真正落成行动的人与团队。选择合适的合作方式后，可直接继续预约与支付。",
    pillars: [
      {
        title: "Global Launch",
        body: "适合正在做出海冷启动、发布节奏与增长定位校准的团队。",
      },
      {
        title: "Open-source Ops",
        body: "适合把社区、内容、stars、narrative 与转化放到同一系统里看的项目。",
      },
      {
        title: "Founder Positioning",
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
        title: "单次咨询（30分钟）",
        subtitle: "适合快速校准问题和决策边界",
        price: "800 RMB",
        ctaLabel: "进入支付",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
        detail: "聚焦一个明确问题，适合快速校准方向、判断优先级或确认下一步动作。",
        deliveryNote: "支付后进入排期确认，订单中心会同步会前材料与会议安排。",
      },
      {
        id: "session-60",
        title: "单次咨询（60分钟）",
        subtitle: "适合更完整梳理增长、叙事与服务结构",
        price: "1500 RMB",
        ctaLabel: "进入支付",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
        detail: "适合需要更完整拆解增长、出海、开源运营、创始人叙事或服务结构的问题。",
        deliveryNote: "支付后 1 个工作日内确认排期，订单中心同步资料、会议链接与后续备注。",
      },
      {
        id: "growth-pack",
        title: "出海 0-1 资料包",
        subtitle: "包含方法论与初始工具包",
        price: "99 RMB",
        ctaLabel: "领取资料",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
        detail: "适合先快速拿到方法论、模板与实战清单，再决定是否进入深度合作。",
        deliveryNote: "支付确认后，订单中心会展示资料链接与使用说明。",
      },
      {
        id: "retainer",
        title: "企业陪跑咨询",
        subtitle: "每月累计咨询时长不超过 5 小时",
        price: "7000 RMB / 月",
        ctaLabel: "申请合作",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
        detail: "适合需要持续校准增长、内容、节奏和组织协同的团队型合作。",
        deliveryNote: "支付后确认合作排期与沟通机制，月度交付会持续沉淀在订单中心。",
      },
    ],
    paymentHeading: "预约与交付流程",
    paymentIntro: "从预约到支付，再到后续交付，整个流程都会沉淀在同一个账户里，方便你持续查看。",
    paymentSteps: [
      {
        title: "1. 登录账户",
        body: "先完成登录，后续预约、支付与订单记录都会绑定到当前账号。",
      },
      {
        title: "2. 选择服务并支付",
        body: "按具体服务进入支付页，支持微信支付与支付宝。",
      },
      {
        title: "3. 查看订单与交付",
        body: "支付完成后可继续在订单中心查看状态、资料链接与后续安排。",
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
    title: "Turn growth, narrative, and operating judgment into clear engagements",
    intro: "For founders and teams who need growth, narrative, and operating judgment translated into concrete next moves. Choose the right engagement and continue straight into booking or payment.",
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
        ctaLabel: "Checkout",
        checkoutPlanCode: "session-30",
        preferredChannel: "wechat",
        detail: "Best for one clear decision, launch question, or narrative calibration you want resolved fast.",
        deliveryNote: "After payment the order center confirms scheduling details and any preparation notes.",
      },
      {
        id: "session-60",
        title: "One-off consulting (60 min)",
        subtitle: "For deeper work across growth, narrative, and service design",
        price: "1500 RMB",
        ctaLabel: "Checkout",
        checkoutPlanCode: "session-60",
        preferredChannel: "wechat",
        detail: "For a deeper review of launch rhythm, open-source growth, founder positioning, or service architecture.",
        deliveryNote: "Scheduling is confirmed within one business day and follow-up notes stay visible in orders.",
      },
      {
        id: "growth-pack",
        title: "0-1 Global Launch Pack",
        subtitle: "Frameworks and a starter toolkit",
        price: "99 RMB",
        ctaLabel: "Get access",
        checkoutPlanCode: "growth-pack",
        preferredChannel: "alipay",
        detail: "A lightweight entry for operators and founders who want the frameworks before a deeper engagement.",
        deliveryNote: "Once paid, the order center will expose the playbook link and delivery notes.",
      },
      {
        id: "retainer",
        title: "Company Coaching",
        subtitle: "Up to 5 consulting hours per month",
        price: "7000 RMB / month",
        ctaLabel: "Apply",
        checkoutPlanCode: "retainer",
        preferredChannel: "wechat",
        detail: "A monthly advisory format for teams that need continuous calibration instead of one-off advice.",
        deliveryNote: "After payment, the app confirms cadence, contact flow, and delivery checkpoints.",
      },
    ],
    paymentHeading: "Booking and delivery flow",
    paymentIntro: "From booking to payment and follow-up delivery, everything remains tied to the same account so the experience stays simple.",
    paymentSteps: [
      {
        title: "1. Sign in",
        body: "Start with your account so bookings, payment state, and order history stay connected.",
      },
      {
        title: "2. Continue to checkout",
        body: "Each plan opens a dedicated checkout route with plan preselection and WeChat / Alipay support.",
      },
      {
        title: "3. Review orders and delivery",
        body: "After payment, the orders center remains the place to review status, delivery, and follow-up links.",
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
