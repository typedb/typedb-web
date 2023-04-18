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
export { type SanityTopbar, Topbar, TopbarListColumn, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "./navigation/topbar";
export { Organisation, type SanityOrganisation } from "./organisation";
export { Page, type SanityPage } from "./page/common";
export { FeaturesPage, FeaturesPageCoreSection, featuresPageSchemaName, type SanityFeaturesPage } from "./page/features";
export { HomePage, HomePageCoreSection, HomePageIntroSection, HomePageSection, HomePageUseCase, homePageSchemaName, type SanityHomePage } from "./page/home";
export { IntroPage, IntroPageCoreSection, introPageSchemaName, type SanityIntroPage } from "./page/intro";
export { useCasePageSchemaName } from "./page/use-case";
export { webinarsPageSchemaName } from "./page/webinars";
export { Document } from "./sanity-core/document";
export { SanityDataset } from "./sanity-core";
export { type SanityCommunityResources, CommunityResources, communityResourcesSchemaName, type SocialMediaID, socialMedias } from "./social-media";
export { type SanityTestimonial, Testimonial } from "./testimonial";
export { ParagraphWithHighlights, RichText, type SanityPortableText, TitleAndBody } from "./text";
