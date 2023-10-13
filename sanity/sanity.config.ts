import "./styles.css";

import { BlockElementIcon, ClipboardImageIcon, CommentIcon, DocumentIcon, DocumentsIcon, ImagesIcon, PresentationIcon, SparklesIcon, ThListIcon } from "@sanity/icons";
import { defineConfig, isDev } from "sanity";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { StructureBuilder } from "sanity/lib/exports/desk";
import {
    featuresPageSchemaName, homePageSchemaName, sectionIconSchemaName, philosophyPageSchemaName, linkSchemaName, schemaTypes, topbarSchemaName, solutionPageSchemaName,
    webinarsPageSchemaName, footerSchemaName, communityResourcesSchemaName, formsSchemaName, videoEmbedSchemaName, organisationSchemaName, imageIllustrationSchemaName,
    codeSnippetSchemaName, polyglotSnippetSchemaName, graphVisualisationSchemaName, splitPaneIllustrationSchemaName, referenceMaterialSchemaName, genericPageSchemaName,
    deploymentPageSchemaName, personSchemaName, webinarSchemaName, whitePapersPageSchemaName, whitePaperSchemaName, siteBannerSchemaName, requestTechTalkPageSchemaName,
    eventSchemaName, eventsPageSchemaName, supportPageSchemaName, servicesPageSchemaName, testimonialSchemaName, featureGridSchemaName
} from "typedb-web-schema";
import { config } from "./config";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()];
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([topbarSchemaName, webinarsPageSchemaName]);

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
                    singletonListItem(s, featuresPageSchemaName, { title: "Features", icon: DocumentIcon }),
                    singletonListItem(s, philosophyPageSchemaName, { title: "Philosophy", icon: DocumentIcon }),
                    singletonListItem(s, genericPageSchemaName, { title: "Cloud", icon: DocumentIcon, documentID: "cloudPage" }),
                    singletonListItem(s, genericPageSchemaName, { title: "Studio", icon: DocumentIcon, documentID: "studioPage" }),
                    singletonListItem(s, deploymentPageSchemaName, { title: "Deployment", icon: DocumentIcon }),
                    singletonListItem(s, webinarsPageSchemaName, { title: "Webinars", icon: DocumentIcon }),
                    singletonListItem(s, whitePapersPageSchemaName, { title: "White Papers", icon: DocumentIcon }),
                    singletonListItem(s, eventsPageSchemaName, { title: "Events", icon: DocumentIcon }),
                    singletonListItem(s, requestTechTalkPageSchemaName, { title: "Request Tech Talk", icon: DocumentIcon }),
                    singletonListItem(s, supportPageSchemaName, { title: "Support", icon: DocumentIcon }),
                    singletonListItem(s, servicesPageSchemaName, { title: "Services", icon: DocumentIcon }),
                    s.divider(),
                    s.documentTypeListItem(solutionPageSchemaName).title("Solutions").icon(DocumentsIcon),
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
                s.documentTypeListItem(webinarSchemaName).title("Webinars"),
                s.documentTypeListItem(whitePaperSchemaName).title("White Papers"),
                s.documentTypeListItem(eventSchemaName).title("Events"),
                s.divider(),
                singletonListItem(s, communityResourcesSchemaName, { title: "Community Resources", icon: CommentIcon }),
                singletonListItem(s, formsSchemaName, { title: "HubSpot Forms", icon: ClipboardImageIcon }),
                s.listItem().title("Icons & Logos").icon(ImagesIcon).child(s.list().title("Icons & Logos").items([
                    s.documentTypeListItem(sectionIconSchemaName).title("Section Icons"),
                ])),
                s.documentTypeListItem(referenceMaterialSchemaName).title("CMS Reference Material"),
            ]),
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
const singletonListItem = (s: StructureBuilder, typeName: string, options: { title?: string, icon?: any, documentID?: string } = {}) => s.listItem()
    .title(options?.title || typeName)
    .id(options?.documentID || typeName)
    .icon(options?.icon || DocumentIcon)
    .child(s.document().schemaType(typeName).documentId(options?.documentID || typeName));
