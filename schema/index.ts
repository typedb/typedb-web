import { actionSchemas } from "./action";
import { componentSchemas } from "./component";
import { customCssSchema } from "./custom-css";
import { formSchemas } from "./form";
import { keyPointSchemas } from "./key-point";
import { organisationSchema } from "./organisation";
import { pageSchemas } from "./page";
import { formEmailOnlyComponentSchema } from "./form-component";
import { organisationLogosStripSchema } from "./organisation-logos-strip";
import { textSchemas } from "./text";
import { websiteNavSchemas } from "./website-nav";

export const schemaTypes = [
    ...actionSchemas, ...componentSchemas, customCssSchema, ...formSchemas, formEmailOnlyComponentSchema, ...keyPointSchemas,
    organisationSchema, organisationLogosStripSchema, ...pageSchemas, ...textSchemas, ...websiteNavSchemas
];

export { linkSchemaName } from "./action";
export { customCssSchemaName } from "./custom-css";
export { Document } from "./sanity-core/document";
export { SanityDataset } from "./sanity-core";
export { OrganisationLogosStrip, organisationLogosStripSchemaName } from "./organisation-logos-strip";
export { Page } from "./page/common";
export type { SanityPage } from "./page/common";
export { HomePage, homePageSchemaName } from "./page/home";
export type { SanityHomePage } from "./page/home";
export { IntroPage, introPageSchemaName } from "./page/intro";
export type { SanityIntroPage } from "./page/intro";
export { ParagraphWithHighlights, RichText } from "./text";
export type { SanityPortableText } from "./text";
export { useCasePageSchemaName } from "./page/use-case";
export { webinarsPageSchemaName } from "./page/webinars";
export { topbarAndFooterSchemaName } from "./website-nav";
