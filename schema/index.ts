import { actionSchemas } from "./button";
import { cloudPlatformSchemas } from "./cloud-platform";
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
import { surveySchemas } from "./survey";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";

export const schemaTypes: any[] = [
    ...actionSchemas, ...codeSchemas, ...linkSchemas, ...cloudPlatformSchemas, ...componentSchemas, ...formSchemas,
    ...keyPointSchemas, ...illustrationSchemas, ...imageSchemas, ...navigationSchemas, ...organisationSchemas,
    ...pageSchemas, ...personSchemas, referenceMaterialSchema, ...resourceSchemas, ...socialMediaSchemas,
    ...surveySchemas, ...textSchemas, testimonialSchema,
];

export { ActionButton, LinkButton, type ButtonStyle } from "./button";
export { countrySchemaName, continentSchemaName } from "./cloud-platform/geography";
export { type CloudOnboarding, cloudOnboardingSchemaName } from "./cloud-platform/onboarding";
export {
    type ProviderRegionData, type ProviderRegionInfo, type CloudRegion, type Country, type Continent,
    providerRegionsQuery, cloudProviderSchemaName
} from "./cloud-platform/provider";
export {
    languages, PolyglotSnippet, CodeSnippet, CodeSnippetShort, codeSnippetShortSchemaName,
    codeSnippetSchemaName, polyglotSnippetSchemaName,
} from "./code";
export { type SanityConclusionPanel, ConclusionPanel, ConclusionSection } from "./component/conclusion-panel";
export { ContentTextPanel, ContentTextTab } from "./component/content-text-panel";
export {
    FeatureGrid, type FeatureGridLayout, FeatureGridSection, FeatureGridCell, featureGridSchemaName,
} from "./component/feature-grid";
export { FeatureTable, featureTableSchemaName, type FeatureTableCell } from "./component/feature-table";
export { LinkPanel, LinkPanelWithIcon, ProductPanel } from "./component/link-panel";
export { TitleBodyPanelSection } from "./component/page-section";
export {
    PublicationSection, type PublicationPanelItem, PublicationContentRow, type PublicationContentRowItem,
} from "./component/publication-panel";
export { TechnicolorBlock } from "./component/technicolor-block";
export { type FormID, type SanityCustomerIoForms, formsSchemaName } from "./form";
export {
    imageIllustrationSchemaName, videoEmbedSchemaName, graphVisualisationSchemaName, splitPaneIllustrationSchemaName,
    ImageIllustration, VideoEmbed, GraphVisualisation, SplitPaneIllustration, type Illustration,
    type SplitPaneIllustrationContent,
} from "./illustration";
export { sectionIconSchemaName } from "./image";
export { KeyPoint, KeyPointWithIcon, ServicesKeyPoint } from "./key-point";
export { linkSchemaName, Link, TextLink } from "./link";
export { type ContactMediaID, contactMedias, Footer, footerSchemaName, type SanityFooter } from "./navigation/footer";
export {
    type SanitySiteBanner, SiteBanner, siteBannerSchemaName, platformUiBannerSchemaName
} from "./navigation/site-banner";
export {
    type SanityTopbar, Topbar, type TopbarColumn, TopbarListColumn, TopbarListColumnItem, TopbarMenuPanel,
    topbarSchemaName, TopbarVideoColumn, TopbarSpotlightColumn,
} from "./navigation/topbar";
export { Organisation, organisationSchemaName, type SanityOrganisation } from "./organisation";
export { blogSchemaName, Blog, type SanityBlog, type BlogRow, BlogPostsRow, ResourcePanelsRow } from "./page/blog";
export { Page, type SanityPage } from "./page/common";
export { GenericPage, type SanityGenericPage, genericPageSchemaName } from "./page/generic";
export { MetaTags, type SanityMetaTags } from "./page/meta-tags";
export { DeploymentPage, type SanityDeploymentPage, deploymentPageSchemaName } from "./page/deployment";
export { EventsPage, type SanityEventsPage, eventsPageSchemaName } from "./page/events";
export { FeaturesPage, featuresPageSchemaName, type SanityFeaturesPage } from "./page/features";
export {
    ResourceHub, learningCenterSchemaName, type SanityResourceHub, fundamentalsPageSchemaName,
} from "./page/learn";
export { LegalDocument, type SanityLegalDocument, legalDocumentSchemaName } from "./page/legal";
export { HomePage, homePageSchemaName, type SanityHomePage } from "./page/home";
export { PhilosophyPage, philosophyPageSchemaName, type SanityPhilosophyPage } from "./page/philosophy";
export {
    type SanityRequestTechTalkPage, RequestTechTalkPage, requestTechTalkPageSchemaName,
} from "./page/request-tech-talk";
export { ServicesPage, servicesPageSchemaName, type SanityServicesPage } from "./page/services";
export { type SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "./page/solution";
export { SupportPage, supportPageSchemaName, type SanitySupportPage } from "./page/support";
export { LecturesPage, type SanityLecturesPage, lecturesPageSchemaName } from "./page/lectures";
export { type SanityPapersPage, PapersPage, papersPageSchemaName } from "./page/papers";
export { Person, type SanityPerson, personSchemaName } from "./person";
export { referenceMaterialSchemaName } from "./reference-material";
export { resourceLinkOf, blogPostLinkOf } from "./resource";
export {
    type WordpressPosts, type WordpressPost, type RelatedBlogPosts, type BlogFilter, type BlogCategoryFilter,
    type BlogNullFilter, blogNullFilter, Article, FundamentalArticle, ApplicationArticle, BlogPost,
    articleFromApi,
} from "./resource/article";
export { ResourceLink } from "./resource/base";
export { blogCategories, blogCategoryList, type BlogCategoryID } from "./resource/blog-category";
export { EventBase, type GetCalendarLinkParams, type CalendarServiceName } from "./resource/event-base";
export { LiveEvent, liveEventSchema } from "./resource/live-event";
export { EventDate, type SanityEventDate } from "./resource/live-event-details";
export {
    applicationArticleSchemaName, blogPostSchemaName, fundamentalArticleSchemaName, genericResourceSchemaName,
    liveEventSchemaName, lectureSchemaName, paperSchemaName, type SanityBlogPost, type SanityPaper,
    type SanityLiveEvent, type SanityFundamentalArticle, type SanityLecture, type SanityArticle,
    type SanityApplicationArticle, type SanityGenericResource, type BlogPostLevel,
} from "./resource/sanity";
export { Lecture } from "./resource/lecture";
export { ResourceSection } from "./resource/section";
export { Paper } from "./resource/paper";
export { Document, SanityDataset } from "./sanity-core";
export {
    type SanityCommunityResources, communityResourcesSchemaName, type SocialMediaID, SocialMediaLink,
    socialMedias,
} from "./social-media";
export {
    type SanitySurvey, type SurveySection, type SurveyQuestion, type MultipleChoiceQuestion, type CustomQuestion,
    type QuestionOption, type QuestionPresentation, Survey, surveySchemaName, multiSelectOptionPosthogProperty,
    multiSelectOtherOptionPosthogProperty, isMultipleChoiceQuestion, isCustomQuestion,
} from "./survey";
export { type SanityTestimonial, Testimonial, testimonialSchemaName } from "./testimonial";
export { ParagraphWithHighlights, type PortableText, TitleAndBody } from "./text";
export { groupBy, associateBy } from "./util";
