import { conclusionPanelSchemas } from "./conclusion-panel";
import { contentTextPanelSchemas } from "./content-text-panel";
import { featureGridSchemas } from "./feature-grid";
import { featureTableSchemas } from "./feature-table";
import { linkPanelSchemas } from "./link-panel";
import { pageSectionSchemas } from "./page-section";
import { pricingPanelSchemas } from "./pricing-panel";
import { publicationSchemas } from "./publication-panel";

export const componentSchemas: any[] = [
    ...conclusionPanelSchemas,
    ...contentTextPanelSchemas,
    ...featureGridSchemas,
    ...featureTableSchemas,
    ...linkPanelSchemas,
    ...pageSectionSchemas,
    ...pricingPanelSchemas,
    ...publicationSchemas,
];
