import { conclusionPanelSchemas } from "./conclusion-panel";
import { contentTextPanelSchemas } from "./content-text-panel";
import { featureGridSchemas } from "./feature-grid";
import { featureTableSchemas } from "./feature-table";
import { integrationsGridSchemas } from "./integrations-grid";
import { linkPanelSchemas } from "./link-panel";
import { pageSectionSchemas } from "./section";
import { pricingPanelSchemas } from "./pricing-panel";
import { publicationSchemas } from "./publication-panel";

export const componentSchemas: any[] = [
    ...conclusionPanelSchemas, ...contentTextPanelSchemas, ...featureGridSchemas, ...featureTableSchemas,
    ...integrationsGridSchemas, ...linkPanelSchemas, ...pageSectionSchemas, ...pricingPanelSchemas,
    ...publicationSchemas,
];
