import { conclusionPanelSchemas } from "./conclusion-panel";
import { contentTextPanelSchemas } from "./content-text-panel";
import { featureGridSchemas } from "./feature-grid";
import { featureTableSchemas } from "./feature-table";
import { linkPanelSchemas } from "./link-panel";
import { sectionSchemas } from "./section";
import { brochureSchema } from "./brochure";
import { publicationSchemas } from "./publication-panel";
import { tierSummaryTableSchemas } from "./tier-summary-table";

export const componentSchemas = [
    ...conclusionPanelSchemas,
    ...contentTextPanelSchemas,
    ...featureGridSchemas,
    ...featureTableSchemas,
    ...linkPanelSchemas,
    brochureSchema,
    ...publicationSchemas,
    ...sectionSchemas,
    ...tierSummaryTableSchemas,
];
