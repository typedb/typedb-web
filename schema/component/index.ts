import { conclusionPanelSchemas } from "./conclusion-panel";
import { contactFormSectionSchemas } from "./contact-form-section";
import { contentTextPanelSchemas } from "./content-text-panel";
import { featureGridSchemas } from "./feature-grid";
import { featureTableSchemas } from "./feature-table";
import { integrationsGridSchemas } from "./integrations-grid";
import { linkPanelSchemas } from "./link-panel";
import { pageSectionSchemas } from "./section";
import { pricingPanelSchemas } from "./pricing-panel";
import { pricingPanelsSectionSchemas } from "./pricing-panels-section";
import { publicationSchemas } from "./publication-panel";

export const componentSchemas: any[] = [
    ...conclusionPanelSchemas, ...contactFormSectionSchemas, ...contentTextPanelSchemas, ...featureGridSchemas, ...featureTableSchemas,
    ...integrationsGridSchemas, ...linkPanelSchemas, ...pageSectionSchemas, ...pricingPanelSchemas, ...pricingPanelsSectionSchemas,
    ...publicationSchemas,
];
