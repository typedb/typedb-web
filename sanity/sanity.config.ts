import "./styles.css";

import {
    AddUserIcon,
    ArrowTopRightIcon,
    BlockElementIcon, BookIcon, ClipboardImageIcon, ComponentIcon, CubeIcon, DiamondIcon, DocumentIcon, DocumentsIcon, MasterDetailIcon,
    PresentationIcon, SparklesIcon, ThListIcon
} from "@sanity/icons";
import { presentationTool } from "@sanity/presentation";
import { defineConfig, isDev } from "sanity";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { StructureBuilder } from "sanity/lib/exports/desk";

import {
    featuresPageSchemaName, homePageSchemaName, sectionIconSchemaName, philosophyPageSchemaName, linkSchemaName,
    schemaTypes, topnavSchemaNames, solutionPageSchemaName, lecturesPageSchemaName, footerSchemaName,
    communityResourcesSchemaName, formsSchemaName, videoEmbedSchemaName, organisationSchemaName,
    imageIllustrationSchemaName, codeSnippetSchemaName, polyglotSnippetSchemaName, graphVisualisationSchemaName,
    splitPaneIllustrationSchemaName, referenceMaterialSchemaName, genericPageSchemaName, deploymentPageSchemaName,
    personSchemaName, lectureSchemaName, papersPageSchemaName, paperSchemaName, siteBannerSchemaName,
    requestTechTalkPageSchemaName, liveEventSchemaName, eventsPageSchemaName, supportPageSchemaName,
    servicesPageSchemaName, testimonialSchemaName, featureGridSchemaName, fundamentalArticleSchemaName,
    applicationArticleSchemaName, blogPostSchemaName, genericResourceSchemaName, blogSchemaName,
    learningCenterSchemaName, legalDocumentSchemaName, fundamentalsPageSchemaName, platformUiBannerSchemaName, surveySchemaName, cloudProviderSchemaName, countrySchemaName, continentSchemaName, cloudOnboardingSchemaName, cloudLoginPortalSchemaName
} from "typedb-web-schema";
import { config } from "./config";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()];
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([topnavSchemaNames.topnav, lecturesPageSchemaName]);

export default defineConfig({
    name: "default",
    title: "TypeDB Website CMS",

    projectId: config.projectId,
    dataset: config.dataset,

    plugins: [
        deskTool({
            structure: (s: StructureBuilder) => s.list().title("Content").items([
                s.listItem().title("Site Navigation").icon(BlockElementIcon).child(s.list().title("Site Navigation").items([
                    singletonListItem(s, siteBannerSchemaName, { title: "Site Banner", icon: SparklesIcon }),
                    singletonListItem(s, platformUiBannerSchemaName, { title: "Platform UI Banner", icon: SparklesIcon }),
                    singletonListItem(s, topnavSchemaNames.topnav, { title: "Topnav", icon: MasterDetailIcon }),
                    singletonListItem(s, footerSchemaName, { title: "Footer", icon: ThListIcon }),
                ])),
                s.listItem().title("Pages - Main Site").icon(DocumentsIcon).child(s.list().title("Pages - Main Site").items([
                    singletonListItem(s, homePageSchemaName, { title: "Home", icon: DocumentIcon }),
                    s.divider(),
                    singletonListItem(s, featuresPageSchemaName, { title: "Features", icon: DocumentIcon }),
                    singletonListItem(s, philosophyPageSchemaName, { title: "Philosophy", icon: DocumentIcon }),
                    singletonListItem(s, genericPageSchemaName, { title: "Cloud", icon: DocumentIcon, documentID: "cloudPage" }),
                    singletonListItem(s, genericPageSchemaName, { title: "Studio", icon: DocumentIcon, documentID: "studioPage" }),
                    singletonListItem(s, deploymentPageSchemaName, { title: "Deploy", icon: DocumentIcon }),
                    s.divider(),
                    singletonListItem(s, learningCenterSchemaName, { title: "Learning Center", icon: DocumentIcon }),
                    singletonListItem(s, fundamentalsPageSchemaName, { title: "Fundamentals", icon: DocumentIcon }),
                    singletonListItem(s, lecturesPageSchemaName, { title: "Lectures", icon: DocumentIcon }),
                    singletonListItem(s, papersPageSchemaName, { title: "Papers", icon: DocumentIcon }),
                    singletonListItem(s, blogSchemaName, { title: "Blog", icon: DocumentIcon }),
                    singletonListItem(s, eventsPageSchemaName, { title: "Events", icon: DocumentIcon }),
                    s.divider(),
                    singletonListItem(s, servicesPageSchemaName, { title: "Services", icon: DocumentIcon }),
                    singletonListItem(s, supportPageSchemaName, { title: "Support", icon: DocumentIcon }),
                    singletonListItem(s, requestTechTalkPageSchemaName, { title: "Tech Talk", icon: DocumentIcon }),
                    s.divider(),
                    s.documentTypeListItem(legalDocumentSchemaName).title("Legal").icon(DocumentsIcon),
                ])),
                s.listItem().title("Pages - Cloud Platform").icon(DocumentsIcon).child(s.list().title("Pages - Cloud Platform").items([
                    singletonListItem(s, cloudLoginPortalSchemaName, { title: "Login Portal", icon: AddUserIcon }),
                    singletonListItem(s, cloudOnboardingSchemaName, { title: "Onboarding", icon: DiamondIcon }),
                    s.documentTypeListItem(cloudProviderSchemaName).title("Provider & Region Info"),
                ])),
                s.listItem().title("Learning Resources & Events").icon(BookIcon).child(s.list().title("Learning Resources & Events").items([
                    s.documentTypeListItem(fundamentalArticleSchemaName).title("Fundamentals"),
                    s.documentTypeListItem(applicationArticleSchemaName).title("Applications"),
                    s.documentTypeListItem(blogPostSchemaName).title("Blog Posts"),
                    s.documentTypeListItem(lectureSchemaName).title("Lectures"),
                    s.documentTypeListItem(paperSchemaName).title("Papers"),
                    s.documentTypeListItem(liveEventSchemaName).title("Live Events"),
                    s.documentTypeListItem(solutionPageSchemaName).title("Solutions"),
                    s.documentTypeListItem(genericResourceSchemaName).title("Generic Resources"),
                ])),
                s.listItem().title("Structure").icon(ComponentIcon).child(s.list().title("Structure").items([
                    s.documentTypeListItem(featureGridSchemaName).title("Feature Grids"),
                ])),
                s.listItem().title("Illustrations & Videos").icon(PresentationIcon).child(s.list().title("Illustrations & Videos").items([
                    s.documentTypeListItem(splitPaneIllustrationSchemaName).title("Split Pane Illustrations"),
                    s.documentTypeListItem(imageIllustrationSchemaName).title("Images"),
                    s.documentTypeListItem(videoEmbedSchemaName).title("Video Embeds"),
                    s.documentTypeListItem(codeSnippetSchemaName).title("Code Snippets"),
                    s.documentTypeListItem(polyglotSnippetSchemaName).title("Polyglot Code Snippets"),
                    s.documentTypeListItem(graphVisualisationSchemaName).title("Graph Visualisations"),
                ])),
                s.documentTypeListItem(linkSchemaName).title("Links"),
                s.listItem().title("Objects").icon(CubeIcon).child(s.list().title("Objects").items([
                    s.documentTypeListItem(personSchemaName).title("People"),
                    s.documentTypeListItem(organisationSchemaName).title("Organisations"),
                    s.documentTypeListItem(testimonialSchemaName).title("Testimonials"),
                    s.documentTypeListItem(countrySchemaName).title("Countries"),
                    s.documentTypeListItem(continentSchemaName).title("Continents"),
                ])),
                s.divider(),
                singletonListItem(s, formsSchemaName, { title: "Forms", icon: ClipboardImageIcon }),
                s.documentTypeListItem(surveySchemaName).title("Surveys"),
                singletonListItem(s, communityResourcesSchemaName, { title: "External Platforms", icon: ArrowTopRightIcon }),
                s.documentTypeListItem(sectionIconSchemaName).title("Icons"),
                s.documentTypeListItem(referenceMaterialSchemaName).title("CMS Reference Material"),
            ]),
        }),
        presentationTool({
            previewUrl: "https://development.typedb.com",
        }),
        media(),
        visionTool(),
        ...(isDev ? devOnlyPlugins : [])
    ],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (input, context) =>
            singletonTypes.has(context.schemaType)
                ? input.filter(({ action }) => action && singletonActions.has(action))
                : input,
    },
});

// N.B: To rename part of the schema of a singleton type, use 'sanity documents (get|create|delete)'
// prettier-ignore
const singletonListItem = (s: StructureBuilder, typeName: string, options: { title?: string, icon?: any, documentID?: string } = {}) => s.listItem()
    .title(options?.title || typeName)
    .id(options?.documentID || typeName)
    .icon(options?.icon || DocumentIcon)
    .child(s.document().schemaType(typeName).documentId(options?.documentID || typeName));
