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

const imageRefSchemaBase = defineType({
    name: "",
    type: "document",
    icon: ImageIcon,
    fields: [titleField, assetRefField],
});

export const headshotSchemaName = "headshot";

const headshotSchema = Object.assign({}, imageRefSchemaBase, {
    name: headshotSchemaName,
    title: "Headshot",
    fields: [titleField, assetRefField],
});

export const imageSchemas = [headshotSchema];
