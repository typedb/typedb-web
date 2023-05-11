import { conclusionPanelSchema } from "./conclusion-panel";
import { contextTextPanelSchemas } from "./content-text-panel";
import { linkPanelSchema } from "./link-panel";

export const componentSchemas = [conclusionPanelSchema, ...contextTextPanelSchemas, linkPanelSchema];
