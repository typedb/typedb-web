import { defineField, defineType, SanityDocument } from "@sanity/types";
import { LinkButton, SanityButton } from "../button";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { titleField, titleFieldName } from "../common-fields";
import { Document, SanityDataset } from "../sanity-core";
import { SocialMediaID, socialMediaLinksField } from "../social-media";

export const footerSchemaName = "footer";

export const contactMedias = {
    forum: "Discuss on Forum",
    discord: "Chat on Discord",
    contactForm: "Contact Us",
} as const;

export const contactMediaList = Object.keys(contactMedias);

export type ContactMediaID = keyof typeof contactMedias;

export interface SanityFooter extends SanityDocument {
    button: SanityButton;
    socialMediaLinks: SocialMediaID[];
    contactSectionTitle: string;
    contactMediaLinks: ContactMediaID[];
    columns: SanityFooterColumn[];
}

export interface SanityFooterColumn {
    title: string;
    items: SanityTextLink[];
}

export class Footer extends Document {
    readonly button: LinkButton;
    readonly socialMediaLinks: SocialMediaID[];
    readonly contactSectionTitle: string;
    readonly contactMediaLinks: ContactMediaID[];
    readonly columns: FooterColumn[];

    constructor(data: SanityFooter, db: SanityDataset) {
        super(data);
        this.button = LinkButton.fromSanity(data.button, db);
        this.socialMediaLinks = data.socialMediaLinks;
        this.contactSectionTitle = data.contactSectionTitle;
        this.contactMediaLinks = data.contactMediaLinks;
        this.columns = data.columns.map(x => new FooterColumn(x, db));
    }
}

export class FooterColumn {
    readonly title: string;
    readonly items: TextLink[];

    constructor(data: SanityFooterColumn, db: SanityDataset) {
        this.title = data.title;
        this.items = data.items.map(x => TextLink.fromSanityTextLink(x, db));
    }
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
            name: "contactSectionTitle",
            title: "Contact Section - Title",
            type: "string",
        }),
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
