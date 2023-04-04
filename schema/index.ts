import { actionSchemas } from "./action";
import { componentSchemas } from "./component";
import { formSchemas } from "./form";
import { sectionIconSchema } from "./image";
import { keyPointSchemas } from "./key-point";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { formEmailOnlyComponentSchema } from "./form-component";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";
import { websiteNavSchemas } from "./website-nav";

export const schemaTypes = [
    ...actionSchemas, ...componentSchemas, ...formSchemas, formEmailOnlyComponentSchema, ...keyPointSchemas, sectionIconSchema,
    ...organisationSchemas, ...pageSchemas, ...textSchemas, testimonialSchema, ...websiteNavSchemas
];

export { linkSchemaName } from "./action";
export { sectionIconSchemaName } from "./image";
export { Organisation } from "./organisation";
export type { SanityOrganisation } from "./organisation";
export { Page } from "./page/common";
export type { SanityPage } from "./page/common";
export { FeaturesPage, featuresPageSchemaName } from "./page/features";
export type { SanityFeaturesPage } from "./page/features";
export { HomePage, homePageSchemaName } from "./page/home";
export type { SanityHomePage } from "./page/home";
export { IntroPage, introPageSchemaName } from "./page/intro";
export type { SanityIntroPage } from "./page/intro";
export { useCasePageSchemaName } from "./page/use-case";
export { webinarsPageSchemaName } from "./page/webinars";
export { Document } from "./sanity-core/document";
export { SanityDataset } from "./sanity-core";
export { ParagraphWithHighlights, RichText } from "./text";
export type { SanityPortableText } from "./text";
export { topbarSchemaName } from "./website-nav";
