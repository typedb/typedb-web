import { formEmailOnlyComponentSchema } from "./form";
import { keyPointPanelsSchema } from "./key-point-panels";
import { organisationLogosPanelSchema } from "./organisation-logos-panel";
import { technicolorBlockChainSchemas } from "./technicolor-block-chain";

export const visualComponentSchemas = [
    formEmailOnlyComponentSchema, keyPointPanelsSchema, organisationLogosPanelSchema, ...technicolorBlockChainSchemas
];
