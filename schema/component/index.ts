import { conclusionPanelSchemas } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { featureTableSchemas } from "./feature-table";
import { linkPanelSchemas } from "./link-panel";
import { furtherReadingSectionSchema } from "./page-section";

export const componentSchemas = [...conclusionPanelSchemas, ...contextTextPanelSchemas, furtherReadingSectionSchema, ...featureTableSchemas, ...linkPanelSchemas];
