import { actionSchemas } from "./action";
import { componentSchemas } from "./component";
import { formSchemas } from "./form";
import { sectionIconSchema } from "./image";
import { keyPointSchemas } from "./key-point";
import { navigationSchemas } from "./navigation";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { socialMediaSchemas } from "./social-media";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";

export const schemaTypes = [
    ...actionSchemas, ...componentSchemas, ...formSchemas, ...keyPointSchemas, sectionIconSchema,
    ...navigationSchemas, ...organisationSchemas, ...pageSchemas, ...socialMediaSchemas, ...textSchemas, testimonialSchema
];

export { linkSchemaName } from "./action";
export { formsSchemaName } from "./form";
export { sectionIconSchemaName } from "./image";
export { footerSchemaName } from "./navigation/footer";
export { topbarSchemaName } from "./navigation/topbar";
export { Organisation } from "./organisation";
export type { SanityOrganisation } from "./organisation";
export { Page } from "./page/common";
export type { SanityPage } from "./page/common";
export { FeaturesPage, featuresPageSchemaName } from "./page/features";
export type { SanityFeaturesPage } from "./page/features";
export { HomePage, HomePageIntroSection, HomePageSection, homePageSchemaName } from "./page/home";
export type { SanityHomePage } from "./page/home";
export { IntroPage, introPageSchemaName } from "./page/intro";
export type { SanityIntroPage } from "./page/intro";
export { useCasePageSchemaName } from "./page/use-case";
export { webinarsPageSchemaName } from "./page/webinars";
export { Document } from "./sanity-core/document";
export { SanityDataset } from "./sanity-core";
export { communityResourcesSchemaName } from "./social-media";
export { ParagraphWithHighlights, RichText } from "./text";
export type { SanityPortableText } from "./text";
