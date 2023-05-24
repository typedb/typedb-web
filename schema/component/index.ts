import { conclusionPanelSchemas } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { linkPanelSchemas } from "./link-panel";

export const componentSchemas = [...conclusionPanelSchemas, ...contextTextPanelSchemas, ...linkPanelSchemas];
