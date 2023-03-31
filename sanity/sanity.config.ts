import "./styles.css";

import { BlockElementIcon, DocumentIcon, FolderIcon } from "@sanity/icons";
import { defineConfig, isDev } from "sanity";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { StructureBuilder } from "sanity/lib/exports/desk";
import { featuresPageSchemaName, homePageSchemaName, introPageSchemaName, linkSchemaName, organisationLogosStripSchemaName, schemaTypes, topbarAndFooterSchemaName, useCasePageSchemaName, webinarsPageSchemaName } from "typedb-web-schema";
import { config } from "./config";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()]
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set([topbarAndFooterSchemaName, webinarsPageSchemaName]);

export default defineConfig({
    name: "default",
    title: "TypeDB Website - Content Editor",

    projectId: config.projectId,
    dataset: config.dataset,

    plugins: [
        deskTool({
            structure: (s: StructureBuilder) => s.list().title("Content").items([
                s.listItem().title("Site Layout").child(s.list().title("Site Layout")
                    .items([
                        singletonListItem(s, topbarAndFooterSchemaName, "Topbar & Footer", BlockElementIcon),
                    ])
                ),
                s.listItem().title("Pages").child(s.list().title("Pages")
                    .items([
                        singletonListItem(s, homePageSchemaName, "Home", DocumentIcon),
                        singletonListItem(s, introPageSchemaName, "Introduction", DocumentIcon),
                        singletonListItem(s, featuresPageSchemaName, "Features", DocumentIcon),
                        singletonListItem(s, webinarsPageSchemaName, "Webinars", DocumentIcon),
                        s.divider(),
                        s.documentTypeListItem(useCasePageSchemaName).title("Use Cases").icon(FolderIcon),
                    ])
                ),
                s.listItem().title("Components").child(s.list().title("Components")
                    .items([
                        s.documentTypeListItem(organisationLogosStripSchemaName),
                    ])
                ),
                s.listItem().title("Forms").child(s.list().title("Forms")
                    .items([
                        s.documentTypeListItem("formEmailOnly"),
                    ])
                ),
                s.listItem().title("Other").child(s.list().title("Other")
                    .items([
                        s.documentTypeListItem(linkSchemaName),
                    ])
                ),
            ])
        }),
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
