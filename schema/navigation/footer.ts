import { defineField, defineType, SanityDocument } from "@sanity/types";
import { SanityButton } from "../action";
import { linkSchemaName, SanityTextLink, textLinkSchemaName } from "../link";
import { titleField, titleFieldName } from "../common-fields";
import { SocialMediaID, socialMediaLinksField, socialMedias } from "../social-media";

export const footerSchemaName = "footer";

const contactMedias = {
    github: "GitHub",
    discord: "Discord",
    contactForm: "Contact Form",
} as const;

export const contactMediaList = Object.keys(contactMedias);

export type ContactMediaID = keyof typeof contactMedias;

export interface SanityFooter extends SanityDocument {
    button: SanityButton;
    socialMediaLinks: SocialMediaID[];
    contactMediaLinks: ContactMediaID[];
    columns: SanityFooterColumn[];
}

export interface SanityFooterColumn {
    title: string;
    items: SanityTextLink[];
}

const columnSchemaName = "footerColumn";

const columnSchema = defineType({
    name: columnSchemaName,
    title: "Column",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "items",
            description: "Items",
            type: "array",
            of: [{type: textLinkSchemaName}],
        }),
    ],
    preview: {
        select: { title: titleFieldName, items: "items" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.items?.map((x: any) => x.text).join(", ") || ""}`,
        }),
    },
});

const footerSchema = defineType({
    name: footerSchemaName,
    title: "Footer",
    type: "document",
    fieldsets: [
        { name: "topSection", title: "Top Section" },
        { name: "bottomSection", title: "Bottom Section" },
    ],
    fields: [
        defineField({
            fieldset: "topSection",
            name: "button",
            title: "Button",
            type: "button",
        }),
        Object.assign({}, socialMediaLinksField, { fieldset: "topSection" } ),
        defineField({
            fieldset: "bottomSection",
            name: "contactMediaLinks",
            title: "Contact Methods",
            type: "array",
            of: [{type: "string"}],
            options: {
                layout: "grid",
                list: Object.entries(contactMedias).map(([id, title]) => ({ value: id, title: title })),
            },
        }),
        defineField({
            fieldset: "bottomSection",
            name: "columns",
            title: "Columns",
            type: "array",
            of: [{type: columnSchemaName}],
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Footer" }) },
});

export const footerSchemas = [columnSchema, footerSchema];
