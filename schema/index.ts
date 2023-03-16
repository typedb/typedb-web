import { actionSchemas } from "./action";
import { colorSchema } from "./color";
import { customCssSchema } from "./custom-css";
import { formSchemas } from "./form";
import { keyPointSchemas } from "./key-point";
import { organisationSchema } from "./organisation";
import { pageSchemas } from "./page";
import { formEmailOnlyComponentSchema } from "./form-component";
import { keyPointPanelsSchema } from "./key-point-panels";
import { organisationLogosPanelSchema } from "./organisation-logos-panel";
import { technicolorBlockChainSchemas } from "./technicolor-block-chain";
import { websiteNavSchemas } from "./website-nav";

export const schemaTypes = [
    ...actionSchemas, colorSchema, customCssSchema, ...formSchemas, formEmailOnlyComponentSchema, keyPointPanelsSchema,
    ...keyPointSchemas, organisationSchema, organisationLogosPanelSchema, ...pageSchemas,
    ...technicolorBlockChainSchemas, ...websiteNavSchemas
];

export { ThemeColor } from "./color";
export { Document } from "./document";
export { SanityDataset } from "./sanity-core";
export type { SanityColor } from "./sanity-core";
export { Page } from "./page";
export type { PageContent, SanityPage } from "./page";
export { ParagraphWithHighlights } from "./text";
export { OrganisationLogosPanel } from "./organisation-logos-panel";
export { TechnicolorBlock, TechnicolorBlockChain } from "./technicolor-block-chain";
