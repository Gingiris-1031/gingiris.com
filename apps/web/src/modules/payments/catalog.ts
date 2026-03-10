import type { Locale } from "@/modules/i18n/config";

export type PaymentChannel = "wechat" | "alipay";

export type ServicePlan = {
  code: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  deliveryNote: Record<Locale, string>;
  amountCny: number;
};

export const servicePlans: ServicePlan[] = [
  {
    code: "session-30",
    name: {
      zh: "单次咨询（30分钟）",
      en: "One-off Consulting (30 min)",
    },
    description: {
      zh: "适合聚焦一个明确问题，快速校准方向、边界与下一步动作。",
      en: "A focused session for one clear problem, with fast calibration on direction and next actions.",
    },
    deliveryNote: {
      zh: "支付后进入排期确认，订单中心会同步会前材料与会议安排。",
      en: "After payment the order center confirms scheduling details and any preparation notes.",
    },
    amountCny: 80000,
  },
  {
    code: "session-60",
    name: {
      zh: "单次咨询（60分钟）",
      en: "One-off Consulting (60 min)",
    },
    description: {
      zh: "适合更完整梳理增长、叙事、开源运营与服务结构的深度咨询。",
      en: "A deeper review across growth, narrative, open-source operations, and service structure.",
    },
    deliveryNote: {
      zh: "支付后 1 个工作日内确认排期，订单中心同步资料、会议链接与后续备注。",
      en: "Scheduling is confirmed within one business day, with notes and meeting links in orders.",
    },
    amountCny: 150000,
  },
  {
    code: "growth-pack",
    name: {
      zh: "出海 0-1 资料包",
      en: "0-1 Global Launch Pack",
    },
    description: {
      zh: "适合先快速获取方法论、模板资料与实战清单，再决定是否进入深度合作。",
      en: "A lightweight starter pack of frameworks, templates, and checklists before deeper work.",
    },
    deliveryNote: {
      zh: "支付确认后可在订单中心查看资料链接与使用说明。",
      en: "Once paid, the order center will show the playbook link and delivery notes.",
    },
    amountCny: 9900,
  },
  {
    code: "retainer",
    name: {
      zh: "企业陪跑咨询",
      en: "Company Coaching",
    },
    description: {
      zh: "适合需要持续校准增长、内容、节奏和组织协同的团队型合作。",
      en: "A monthly advisory format for teams that need ongoing calibration across growth and operations.",
    },
    deliveryNote: {
      zh: "支付后确认合作排期与沟通机制，月度交付会持续沉淀在订单中心。",
      en: "After payment, cadence and contact flow are confirmed with delivery checkpoints in orders.",
    },
    amountCny: 700000,
  },
];

export function getServicePlanByCode(planCode: string) {
  return servicePlans.find((plan) => plan.code === planCode) ?? null;
}

export function formatCny(amountCny: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 2,
  }).format(amountCny / 100);
}
