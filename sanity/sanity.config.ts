import { BlockElementIcon, DocumentIcon } from "@sanity/icons";
import { defineConfig, isDev } from "sanity";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { StructureBuilder } from "sanity/lib/exports/desk";
import { config } from "./config";
import { schemaTypes } from "./schemas";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()]
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["topbarAndFooter"]);

export default defineConfig({
    name: "default",
    title: "TypeDB Website - Content Editor",

    projectId: config.projectId,
    dataset: config.dataset,

    plugins: [
        deskTool({
            structure: (s: StructureBuilder) => s.list()
                .title("Content")
                .items([
                    singletonListItem(s, "topbarAndFooter", "Topbar & Footer", BlockElementIcon),
                    ...s.documentTypeListItems().filter(x => !singletonTypes.has(x.getId()))
                ])
        }),
        visionTool(),
        colorInput(),
        ...(isDev ? devOnlyPlugins : [])
    ],

    schema: {
        types: schemaTypes,
    },
});

// N.B: To rename part of the schema of a singleton type, use 'sanity documents (get|create|delete)'
const singletonListItem = (s: StructureBuilder, typeName: string, title?: string, icon?: any) => s.listItem()
    .title(title || typeName)
    .id(typeName)
    .icon(icon || DocumentIcon)
    .child(s.document().schemaType(typeName).documentId(typeName));
