import { actionSchemas } from "./button";
import { codeSchemas } from "./code";
import { componentSchemas } from "./component";
import { illustrationSchemas } from "./illustration";
import { linkSchemas } from "./link";
import { formSchemas } from "./form";
import { imageSchemas } from "./image";
import { keyPointSchemas } from "./key-point";
import { navigationSchemas } from "./navigation";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { personSchemas } from "./person";
import { referenceMaterialSchema } from "./reference-material";
import { resourceSchemas } from "./resource";
import { socialMediaSchemas } from "./social-media";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";

export const schemaTypes = [
    ...actionSchemas, ...codeSchemas, ...linkSchemas, ...componentSchemas, ...formSchemas, ...keyPointSchemas,
    ...illustrationSchemas, ...imageSchemas, ...navigationSchemas, ...organisationSchemas, ...pageSchemas,
    ...personSchemas, referenceMaterialSchema, ...resourceSchemas, ...socialMediaSchemas, ...textSchemas, testimonialSchema,
];

export { ActionButton, LinkButton, type ButtonStyle } from "./button";
export { languages, PolyglotSnippet, CodeSnippet, CodeSnippetShort, codeSnippetShortSchemaName, codeSnippetSchemaName, polyglotSnippetSchemaName } from "./code";
export { type SanityConclusionPanel, ConclusionPanel, ConclusionSection } from "./component/conclusion-panel";
export { ContentTextPanel } from "./component/content-text-panel";
export { type FeatureGridLayout, FeatureGridSection, FeatureGridCell, featureGridSchemaName } from "./component/feature-grid";
export { FeatureTable, featureTableSchemaName, type FeatureTableCell } from "./component/feature-table";
export { LinkPanel, LinkPanelWithIcon, ProductPanel } from "./component/link-panel";
export { TitleBodyIllustrationSection } from "./component/page-section";
export { PublicationSection, type PublicationPanelItem, PublicationContentRow, type PublicationContentRowItem } from "./component/publication-panel";
export { TechnicolorBlock } from "./component/technicolor-block";
export { type FormID, type SanityHubspotForms, formsSchemaName, type WebinarRegistrationForm } from "./form";
export {
    imageIllustrationSchemaName, videoEmbedSchemaName, graphVisualisationSchemaName, splitPaneIllustrationSchemaName,
    ImageIllustration, VideoEmbed, GraphVisualisation, SplitPaneIllustration, type Illustration,
    type SplitPaneIllustrationContent
} from "./illustration";
export { sectionIconSchemaName } from "./image";
export { KeyPoint, KeyPointWithIcon, ServicesKeyPoint } from "./key-point";
export { linkSchemaName, Link, TextLink } from "./link";
export { type ContactMediaID, contactMedias, Footer, footerSchemaName, type SanityFooter } from "./navigation/footer";
export { type SanitySiteBanner, SiteBanner, siteBannerSchemaName } from "./navigation/site-banner";
export { type SanityTopbar, Topbar, TopbarListColumn, TopbarListColumnItem, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "./navigation/topbar";
export { Organisation, organisationSchemaName, type SanityOrganisation } from "./organisation";
export { blogSchemaName, Blog, type SanityBlog, type BlogRow, BlogPostsRow } from "./page/blog";
export { Page, type SanityPage } from "./page/common";
export { GenericPage, type SanityGenericPage, genericPageSchemaName } from "./page/generic";
export { MetaTags, type SanityMetaTags } from "./page/meta-tags";
export { DeploymentPage, type SanityDeploymentPage, deploymentPageSchemaName } from "./page/deployment";
export { EventsPage, type SanityEventsPage, eventsPageSchemaName } from "./page/events";
export { FeaturesPage, featuresPageSchemaName, type SanityFeaturesPage } from "./page/features";
export { HomePage, homePageSchemaName, type SanityHomePage } from "./page/home";
export { PhilosophyPage, philosophyPageSchemaName, type SanityPhilosophyPage } from "./page/philosophy";
export { type SanityRequestTechTalkPage, RequestTechTalkPage, requestTechTalkPageSchemaName } from "./page/request-tech-talk";
export { ServicesPage, servicesPageSchemaName, type SanityServicesPage } from "./page/services";
export { type SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "./page/solution";
export { SupportPage, supportPageSchemaName, type SanitySupportPage } from "./page/support";
export { WebinarsPage, type SanityWebinarsPage, webinarsPageSchemaName } from "./page/webinars";
export { type SanityWhitePapersPage, WhitePapersPage, whitePapersPageSchemaName } from "./page/white-papers";
export { Person, type SanityPerson, personSchemaName } from "./person";
export { referenceMaterialSchemaName } from "./reference-material";
export {
    type WordpressPosts, type WordpressPost, type RelatedBlogPosts, type BlogFilter, type BlogCategoryFilter,
    type BlogNullFilter, blogNullFilter, Article, FundamentalArticle, ApplicationArticle, BlogPost,
} from "./resource/article";
export { blogCategories, blogCategoryList, type BlogCategoryID } from "./resource/blog-category";
export { LiveEvent, liveEventSchema } from "./resource/live-event";
export { EventDate, type SanityEventDate } from "./resource/live-event-details";
export {
    applicationArticleSchemaName, blogPostSchemaName, fundamentalArticleSchemaName, genericResourceSchemaName,
    liveEventSchemaName, webinarSchemaName, whitePaperSchemaName, type SanityBlogPost, type SanityWhitePaper,
    type SanityLiveEvent, type SanityFundamentalArticle, type SanityWebinar, type SanityApplicationArticle,
    type SanityGenericResource, type BlogPostLevel,
} from "./resource/sanity";
export { Webinar } from "./resource/webinar";
export { WhitePaper } from "./resource/white-paper";
export { Document, SanityDataset } from "./sanity-core";
export { type SanityCommunityResources, communityResourcesSchemaName, type SocialMediaID, SocialMediaLink, socialMedias } from "./social-media";
export { type SanityTestimonial, Testimonial, testimonialSchemaName } from "./testimonial";
export { ParagraphWithHighlights, type PortableText, TitleAndBody } from "./text";
export { groupBy, associateBy } from "./util";
