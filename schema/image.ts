import { getExtension } from "@sanity/asset-utils";
import { ImageIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";

import { titleField } from "./common-fields";
import { SanityImage } from "./sanity-core";

export const assetRefFieldName = "assetRef";

export interface SanityImageRef extends SanityDocument {
    [assetRefFieldName]: SanityImage;
}

const assetRefField = defineField({
    name: assetRefFieldName,
    title: "Image",
    type: "image",
});

const svgRefField = defineField({
    ...assetRefField,
    options: { accept: "image/svg+xml" },
    validation: (rule) =>
        rule.custom((value) => {
            if (!value?.asset) {
                return true;
            }

            const filetype = getExtension(value.asset._ref);

            if (filetype !== "svg") {
                return "Image must be an SVG";
            }

            return true;
        }),
});

const imageRefSchemaBase = defineType({
    name: "",
    type: "document",
    icon: ImageIcon,
    fields: [titleField, assetRefField],
});

export const sectionIconSchemaName = "sectionIcon";

const sectionIconSchema = defineType({
    ...imageRefSchemaBase,
    fields: [
        titleField,
        defineField({
            name: "tags",
            title: "Tags",
            description: "Tags help CMS users find this icon via the search function",
            type: "array",
            of: [{type: "string"}],
            options: {
                layout: "tags",
            },
        }),
        svgRefField,
    ],
    name: sectionIconSchemaName,
    title: "Section Icon",
});

export const headshotSchemaName = "headshot";

const headshotSchema = Object.assign({}, imageRefSchemaBase, {
    name: headshotSchemaName,
    title: "Headshot",
    fields: [titleField, assetRefField],
});

export const imageSchemas = [headshotSchema, sectionIconSchema];
