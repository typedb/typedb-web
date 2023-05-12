import { conclusionPanelSchema } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { linkPanelSchemas } from "./link-panel";

export const componentSchemas = [conclusionPanelSchema, ...contextTextPanelSchemas, ...linkPanelSchemas];
