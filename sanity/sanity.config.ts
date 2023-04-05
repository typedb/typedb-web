import "./styles.css";

import { BlockElementIcon, ClipboardImageIcon, CodeIcon, CommentIcon, DocumentIcon, DocumentsIcon, FolderIcon, ImagesIcon, MasterDetailIcon, ThListIcon } from "@sanity/icons";
import { defineConfig, isDev } from "sanity";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { deskTool } from "sanity/desk";
import { StructureBuilder } from "sanity/lib/exports/desk";
import { featuresPageSchemaName, homePageSchemaName, sectionIconSchemaName, introPageSchemaName, linkSchemaName, schemaTypes, topbarSchemaName, useCasePageSchemaName, webinarsPageSchemaName, footerSchemaName, communityResourcesSchemaName } from "typedb-web-schema";
import { config } from "./config";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()]
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([topbarSchemaName, webinarsPageSchemaName]);

export default defineConfig({
    name: "default",
    title: "TypeDB Website - Content Editor",

    projectId: config.projectId,
    dataset: config.dataset,

    plugins: [
        deskTool({
            structure: (s: StructureBuilder) => s.list().title("Content").items([
                s.listItem().title("Site Navigation").icon(BlockElementIcon).child(s.list().title("Site Navigation")
                    .items([
                        singletonListItem(s, topbarSchemaName, "Topbar", ThListIcon),
                        singletonListItem(s, footerSchemaName, "Footer", ThListIcon),
                    ]),
                ),
                s.listItem().title("Pages").icon(DocumentsIcon).child(s.list().title("Pages")
                    .items([
                        singletonListItem(s, homePageSchemaName, "Home Page", DocumentIcon),
                        singletonListItem(s, introPageSchemaName, "Introduction Page", DocumentIcon),
                        singletonListItem(s, featuresPageSchemaName, "Features Page", DocumentIcon),
                        singletonListItem(s, webinarsPageSchemaName, "Webinars Page", DocumentIcon),
                        s.divider(),
                        s.documentTypeListItem(useCasePageSchemaName).title("Use Case Pages").icon(DocumentsIcon),
                    ])
                ),
                s.listItem().title("Forms").icon(ClipboardImageIcon).child(s.list().title("Forms")
                    .items([
                        s.documentTypeListItem("formEmailOnly").title("Email-Only Forms"),
                    ])
                ),
                s.listItem().title("Images").icon(ImagesIcon).child(s.list().title("Images")
                    .items([
                        s.documentTypeListItem(sectionIconSchemaName).title("Section Icons"),
                    ])
                ),
                s.documentTypeListItem(linkSchemaName).title("Links"),
                s.divider(),
                singletonListItem(s, communityResourcesSchemaName, "Community Resources", CommentIcon),
            ]),
        }),
        media(),
        visionTool(),
        colorInput(),
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
const singletonListItem = (s: StructureBuilder, typeName: string, title?: string, icon?: any) => s.listItem()
    .title(title || typeName)
    .id(typeName)
    .icon(icon || DocumentIcon)
    .child(s.document().schemaType(typeName).documentId(typeName));
