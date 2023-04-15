import { actionSchemas } from "./action";
import { linkSchemas } from "./link";
import { componentSchemas } from "./component";
import { formSchemas } from "./form";
import { imageSchemas } from "./image";
import { keyPointSchemas } from "./key-point";
import { navigationSchemas } from "./navigation";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { socialMediaSchemas } from "./social-media";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";

export const schemaTypes = [
    ...actionSchemas, ...linkSchemas, ...componentSchemas, ...formSchemas, ...keyPointSchemas, ...imageSchemas,
    ...navigationSchemas, ...organisationSchemas, ...pageSchemas, ...socialMediaSchemas, ...textSchemas, testimonialSchema
];

export { Action } from "./action";
export { linkSchemaName, Link, videoEmbedSchemaName, VideoEmbed } from "./link";
export { ContentPanel, ContentTextPanel } from "./component/content-text-panel";
export { formsSchemaName } from "./form";
export { sectionIconSchemaName } from "./image";
export { KeyPoint } from "./key-point";
export { footerSchemaName } from "./navigation/footer";
export { Topbar, topbarSchemaName } from "./navigation/topbar";
export type { SanityTopbar } from "./navigation/topbar";
export { Organisation } from "./organisation";
export type { SanityOrganisation } from "./organisation";
export { Page } from "./page/common";
export type { SanityPage } from "./page/common";
export { FeaturesPage, FeaturesPageCoreSection, featuresPageSchemaName } from "./page/features";
export type { SanityFeaturesPage } from "./page/features";
export { HomePage, HomePageCoreSection, HomePageIntroSection, HomePageSection, HomePageUseCase, homePageSchemaName } from "./page/home";
export type { SanityHomePage } from "./page/home";
export { IntroPage, IntroPageCoreSection, introPageSchemaName } from "./page/intro";
export type { SanityIntroPage } from "./page/intro";
export { useCasePageSchemaName } from "./page/use-case";
export { webinarsPageSchemaName } from "./page/webinars";
export { Document } from "./sanity-core/document";
export { SanityDataset } from "./sanity-core";
export { communityResourcesSchemaName, socialMedias } from "./social-media";
export type { SocialMediaID } from "./social-media";
export { Testimonial } from "./testimonial";
export type { SanityTestimonial } from "./testimonial";
export { ParagraphWithHighlights, RichText, TitleAndBody } from "./text";
export type { SanityPortableText } from "./text";
