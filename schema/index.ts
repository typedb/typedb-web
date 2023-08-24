import { actionSchemas } from "./button";
import { componentSchemas } from "./component";
import { illustrationSchemas } from "./illustration";
import { linkSchemas } from "./link";
import { eventSchema } from "./event";
import { formSchemas } from "./form";
import { imageSchemas } from "./image";
import { keyPointSchemas } from "./key-point";
import { navigationSchemas } from "./navigation";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { personSchemas } from "./person";
import { referenceMaterialSchema } from "./reference-material";
import { socialMediaSchemas } from "./social-media";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";
import { webinarSchemas } from "./webinar";
import { whitePaperSchema } from "./white-paper";

export const schemaTypes = [
    ...actionSchemas, ...linkSchemas, ...componentSchemas, ...formSchemas, ...keyPointSchemas, ...illustrationSchemas, ...imageSchemas, ...navigationSchemas,
    ...organisationSchemas, ...pageSchemas, ...personSchemas, referenceMaterialSchema, ...socialMediaSchemas, ...textSchemas, testimonialSchema, ...webinarSchemas, whitePaperSchema, eventSchema
];

export {
    type WordpressCategoriesResponse, type WordpressPosts, type WordpressPost, type WordpressSite,
    type WordpressTaxonomy, type WordpressRelatedPosts, type BlogFilter, type BlogCategoryFilter, type BlogNullFilter,
    blogNullFilter, type WordpressACFResponse, type WordpressACF,
} from "./blog";
export { ActionButton, LinkButton, type ButtonStyle } from "./button";
export { type SanityConclusionPanel, ConclusionPanel, ConclusionSection } from "./component/conclusion-panel";
export { ContentTextPanel } from "./component/content-text-panel";
export { FeatureTable, featureTableSchemaName, type FeatureTableCell } from "./component/feature-table";
export { LinkPanel, LinkPanelWithIcon, ProductPanel } from "./component/link-panel";
export { TechnicolorBlock } from "./component/technicolor-block";
export { Event, type SanityEvent, eventSchema, eventSchemaName } from "./event";
export { EventDate, type SanityEventDate } from "./event-date";
export { type FormID, type SanityHubspotForms, formsSchemaName, type WebinarRegistrationForm } from "./form";
export {
    imageIllustrationSchemaName, videoEmbedSchemaName, codeSnippetSchemaName, polyglotSnippetSchemaName, graphVisualisationSchemaName, splitPaneIllustrationSchemaName,
    ImageIllustration, VideoEmbed, CodeSnippet, PolyglotSnippet, GraphVisualisation, SplitPaneIllustration, type Illustration, type SplitPaneIllustrationContent,
} from "./illustration";
export { sectionIconSchemaName } from "./image";
export { KeyPoint, KeyPointWithIcon } from "./key-point";
export { linkSchemaName, Link, TextLink } from "./link";
export { type ContactMediaID, contactMedias, Footer, footerSchemaName, type SanityFooter } from "./navigation/footer";
export { type SanitySiteBanner, SiteBanner, siteBannerSchemaName } from "./navigation/site-banner";
export { type SanityTopbar, Topbar, TopbarListColumn, TopbarListColumnItem, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "./navigation/topbar";
export { Organisation, organisationSchemaName, type SanityOrganisation } from "./organisation";
export { GenericPage, type SanityGenericPage, genericPageSchemaName } from "./page/generic";
export { Page, type SanityPage } from "./page/common";
export { DeploymentPage, type SanityDeploymentPage, deploymentPageSchemaName } from "./page/deployment";
export { EventsPage, type SanityEventsPage, eventsPageSchemaName } from "./page/events";
export { FeaturesPage, FeaturesPageCoreSection, featuresPageSchemaName, type SanityFeaturesPage } from "./page/features";
export { HomePage, homePageSchemaName, type SanityHomePage } from "./page/home";
export { IntroPage, IntroPageCoreSection, introPageSchemaName, type SanityIntroPage } from "./page/intro";
export { type SanityRequestTechTalkPage, RequestTechTalkPage, requestTechTalkPageSchemaName } from "./page/request-tech-talk";
export { type SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "./page/solution";
export { SupportPage, supportPageSchemaName, type SanitySupportPage } from "./page/support";
export { WebinarsPage, type SanityWebinarsPage, webinarsPageSchemaName } from "./page/webinars";
export { type SanityWhitePapersPage, WhitePapersPage, whitePapersPageSchemaName } from "./page/white-papers";
export { Person, type SanityPerson, personSchemaName } from "./person";
export { referenceMaterialSchemaName } from "./reference-material";
export { Document, SanityDataset } from "./sanity-core";
export { type SanityCommunityResources, communityResourcesSchemaName, type SocialMediaID, SocialMediaLink, socialMedias } from "./social-media";
export { type SanityTestimonial, Testimonial, testimonialSchemaName } from "./testimonial";
export { ParagraphWithHighlights, RichText, type RichTextSpan, type SanityPortableText, TitleAndBody, TitleBodyIllustrationSection } from "./text";
export { groupBy, associateBy } from "./util";
export { Webinar, type SanityWebinar, webinarSchemaName } from "./webinar";
export { WhitePaper, type SanityWhitePaper, whitePaperSchemaName } from "./white-paper";
