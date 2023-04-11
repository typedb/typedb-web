import { ImageIcon } from "@sanity/icons";
import { defineField, defineType, Reference, SanityDocument } from "@sanity/types";

export const assetRefFieldName = "assetRef";

export interface SanityImageRef extends SanityDocument {
    assetRef: { asset: Reference };
}

export const sectionIconSchemaName = "sectionIcon";

export const sectionIconSchema = defineType({
    name: sectionIconSchemaName,
    title: "Section Icon",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: assetRefFieldName,
            title: "Icon",
            type: "image",
        }),
    ],
    preview: {
        select: { title: "assetRef.asset.title", originalFilename: "assetRef.asset.originalFilename" },
        prepare: (selection) => ({
            title: selection.title || selection.originalFilename,
        }),
    },
});
