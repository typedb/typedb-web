import { actionSchemas } from "./button";
import { illustrationSchemas } from "./illustration";
import { linkSchemas } from "./link";
import { componentSchemas } from "./component";
import { formSchemas } from "./form";
import { imageSchemas } from "./image";
import { keyPointSchemas } from "./key-point";
import { navigationSchemas } from "./navigation";
import { organisationSchemas } from "./organisation";
import { pageSchemas } from "./page";
import { referenceMaterialSchema } from "./reference-material";
import { socialMediaSchemas } from "./social-media";
import { testimonialSchema } from "./testimonial";
import { textSchemas } from "./text";

export const schemaTypes = [
    ...actionSchemas, ...linkSchemas, ...componentSchemas, ...formSchemas, ...keyPointSchemas, ...illustrationSchemas, ...imageSchemas,
    ...navigationSchemas, ...organisationSchemas, ...pageSchemas, referenceMaterialSchema, ...socialMediaSchemas, ...textSchemas, testimonialSchema
];

export { ActionButton, LinkButton, type ButtonStyle } from "./button";
export { type SanityConclusionPanel, ConclusionPanel, ConclusionSection } from "./component/conclusion-panel";
export { ContentPanel, ContentTextPanel } from "./component/content-text-panel";
export { LinkPanel, LinkPanelWithIcon } from "./component/link-panel";
export { TechnicolorBlock } from "./component/technicolor-block";
export { formsSchemaName } from "./form";
export {
    imageIllustrationSchemaName, videoEmbedSchemaName, codeSnippetSchemaName, polyglotSnippetSchemaName, graphVisualisationSchemaName, splitPaneIllustrationSchemaName,
    ImageIllustration, VideoEmbed, CodeSnippet, PolyglotSnippet, GraphVisualisation, SplitPaneIllustration, type Illustration, type SplitPaneIllustrationContent,
} from "./illustration";
export { sectionIconSchemaName } from "./image";
export { KeyPoint } from "./key-point";
export { linkSchemaName, Link, TextLink } from "./link";
export { type ContactMediaID, contactMedias, Footer, footerSchemaName, type SanityFooter } from "./navigation/footer";
export { type SanityTopbar, Topbar, TopbarListColumn, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "./navigation/topbar";
export { Organisation, organisationSchemaName, type SanityOrganisation } from "./organisation";
export { GenericPage, type SanityGenericPage, genericPageSchemaName } from "./page/generic";
export { Page, type SanityPage } from "./page/common";
export { FeaturesPage, FeaturesPageCoreSection, featuresPageSchemaName, type SanityFeaturesPage } from "./page/features";
export { HomePage, homePageSchemaName, type SanityHomePage } from "./page/home";
export { IntroPage, IntroPageCoreSection, introPageSchemaName, type SanityIntroPage } from "./page/intro";
export { type SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "./page/solution";
export { webinarsPageSchemaName } from "./page/webinars";
export { referenceMaterialSchemaName } from "./reference-material";
export { Document, SanityDataset } from "./sanity-core";
export { type SanityCommunityResources, communityResourcesSchemaName, type SocialMediaID, SocialMediaLink, socialMedias } from "./social-media";
export { type SanityTestimonial, Testimonial } from "./testimonial";
export { ParagraphWithHighlights, RichText, type SanityPortableText, TitleAndBody, TitleBodyIllustrationSection } from "./text";
export { groupBy, associateBy } from "./util";
