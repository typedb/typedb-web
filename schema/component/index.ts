import { conclusionPanelSchemas } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { featureGridSchemas } from "./feature-grid";
import { featureTableSchemas } from "./feature-table";
import { linkPanelSchemas } from "./link-panel";
import { pageSectionSchemas } from "./page-section";
import { publicationSchemas } from "./publication-panel";

export const componentSchemas = [
    ...conclusionPanelSchemas, ...contextTextPanelSchemas, ...featureGridSchemas,
    ...featureTableSchemas, ...linkPanelSchemas, ...pageSectionSchemas, ...publicationSchemas
];
