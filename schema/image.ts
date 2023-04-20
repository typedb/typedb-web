import { ImageIcon } from "@sanity/icons";
import { defineField, defineType, ImageAsset, Reference, SanityDocument } from "@sanity/types";
import { titleField } from "./common-fields";
import { SanityReference } from "./sanity-core";

export const assetRefFieldName = "assetRef";

export interface SanityImageRef extends SanityDocument {
    assetRef: { asset: SanityReference<ImageAsset> };
}

const assetRefField = defineField({
    name: assetRefFieldName,
    title: "Image",
    type: "image",
});

const imageRefSchemaBase = defineType({
    name: "",
    type: "document",
    icon: ImageIcon,
    fields: [assetRefField],
    preview: {
        select: { title: "title", assetTitle: "assetRef.asset.title", originalFilename: "assetRef.asset.originalFilename" },
        prepare: (selection) => ({
            title: selection.title || selection.assetTitle || selection.originalFilename,
        }),
    },
});

export const sectionIconSchemaName = "sectionIcon";

const sectionIconSchema = Object.assign({}, imageRefSchemaBase, { name: sectionIconSchemaName, title: "Section Icon" });

export const headshotSchemaName = "headshot";

const headshotSchema = Object.assign({}, imageRefSchemaBase, {
    name: headshotSchemaName,
    title: "Headshot",
    fields: [titleField, assetRefField],
});

export const imageSchemas = [headshotSchema, sectionIconSchema];
