import { formEmailOnlyComponentSchema } from "./form";
import { keyPointPanelsSchema } from "./keyPointPanels";
import { organisationLogosPanelSchema } from "./organisationLogosPanel";
import { technicolorBlockChainSchemas } from "./technicolorBlockChain";

export const visualComponentSchemas = [
    formEmailOnlyComponentSchema, keyPointPanelsSchema, organisationLogosPanelSchema, ...technicolorBlockChainSchemas
];
