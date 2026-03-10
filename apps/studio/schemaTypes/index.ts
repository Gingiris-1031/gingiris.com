import { homePage } from "./documents/homePage";
import { insightPost } from "./documents/insightPost";
import { linkItem } from "./documents/linkItem";
import { servicePlan } from "./documents/servicePlan";
import { servicesPage } from "./documents/servicesPage";
import { siteSettings } from "./documents/siteSettings";
import { ctaLink } from "./objects/ctaLink";
import { externalLink } from "./objects/externalLink";
import { faqItem } from "./objects/faqItem";
import { localizedString } from "./objects/localizedString";
import { localizedText } from "./objects/localizedText";
import { serviceFeature } from "./objects/serviceFeature";

export const schemaTypes = [
  localizedString,
  localizedText,
  ctaLink,
  faqItem,
  serviceFeature,
  externalLink,
  siteSettings,
  homePage,
  servicesPage,
  servicePlan,
  insightPost,
  linkItem,
];
