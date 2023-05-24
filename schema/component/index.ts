import { conclusionPanelSchemas } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { featureTableSchemas } from "./feature-table";
import { linkPanelSchemas } from "./link-panel";

export const componentSchemas = [...conclusionPanelSchemas, ...contextTextPanelSchemas, ...featureTableSchemas, ...linkPanelSchemas];
