import "./styles.css";

import {
    BinaryDocumentIcon, BlockElementIcon, ClipboardImageIcon, CommentIcon, DocumentIcon, DocumentsIcon,
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
    schemaTypes, topbarSchemaName, solutionPageSchemaName, lecturesPageSchemaName, footerSchemaName,
    communityResourcesSchemaName, formsSchemaName, videoEmbedSchemaName, organisationSchemaName,
    imageIllustrationSchemaName, codeSnippetSchemaName, polyglotSnippetSchemaName, graphVisualisationSchemaName,
    splitPaneIllustrationSchemaName, referenceMaterialSchemaName, genericPageSchemaName, deploymentPageSchemaName,
    personSchemaName, lectureSchemaName, papersPageSchemaName, paperSchemaName, siteBannerSchemaName,
    requestTechTalkPageSchemaName, liveEventSchemaName, eventsPageSchemaName, supportPageSchemaName,
    servicesPageSchemaName, testimonialSchemaName, featureGridSchemaName, fundamentalArticleSchemaName,
    applicationArticleSchemaName, blogPostSchemaName, genericResourceSchemaName, blogSchemaName,
    learningCenterSchemaName, legalDocumentSchemaName, fundamentalsPageSchemaName
} from "typedb-web-schema";
import { config } from "./config";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()];
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([topbarSchemaName, lecturesPageSchemaName]);

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
                    singletonListItem(s, topbarSchemaName, { title: "Topbar", icon: ThListIcon }),
                    singletonListItem(s, footerSchemaName, { title: "Footer", icon: ThListIcon }),
                ])),
                s.listItem().title("Pages").icon(DocumentsIcon).child(s.list().title("Pages").items([
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
                s.listItem().title("Technical Articles").icon(BinaryDocumentIcon).child(s.list().title("Technical Articles").items([
                    s.documentTypeListItem(fundamentalArticleSchemaName).title("Fundamentals"),
                    s.documentTypeListItem(applicationArticleSchemaName).title("Applications"),
                    s.documentTypeListItem(blogPostSchemaName).title("Blog Posts"),
                ])),
                s.documentTypeListItem(linkSchemaName).title("Links"),
                s.listItem().title("Illustrations & Videos").icon(PresentationIcon).child(s.list().title("Illustrations & Videos").items([
                    s.documentTypeListItem(splitPaneIllustrationSchemaName).title("Split Pane Illustrations"),
                    s.documentTypeListItem(imageIllustrationSchemaName).title("Images"),
                    s.documentTypeListItem(videoEmbedSchemaName).title("Video Embeds"),
                    s.documentTypeListItem(codeSnippetSchemaName).title("Code Snippets"),
                    s.documentTypeListItem(polyglotSnippetSchemaName).title("Polyglot Code Snippets"),
                    s.documentTypeListItem(graphVisualisationSchemaName).title("Graph Visualisations"),
                ])),
                s.documentTypeListItem(personSchemaName).title("People"),
                s.documentTypeListItem(organisationSchemaName).title("Organisations"),
                s.documentTypeListItem(testimonialSchemaName).title("Testimonials"),
                s.documentTypeListItem(featureGridSchemaName).title("Feature Grids"),
                s.documentTypeListItem(lectureSchemaName).title("Lectures"),
                s.documentTypeListItem(paperSchemaName).title("Papers"),
                s.documentTypeListItem(solutionPageSchemaName).title("Solutions"),
                s.documentTypeListItem(liveEventSchemaName).title("Events"),
                s.documentTypeListItem(genericResourceSchemaName).title("Generic Resources"),
                s.divider(),
                singletonListItem(s, communityResourcesSchemaName, { title: "Community Resources", icon: CommentIcon }),
                singletonListItem(s, formsSchemaName, { title: "Forms", icon: ClipboardImageIcon }),
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
