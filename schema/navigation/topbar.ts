import { BlockElementIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { LinkButton, buttonSchemaName, SanityButton } from "../button";
import { Link, SanityLink, SanityTextLink, SanityVideoEmbed, TextLink, textLinkSchemaName } from "../link";
import { descriptionField, linkField, titleField, titleFieldName, videoEmbedField } from "../common-fields";
import { Document, SanityDataset, SanityReference } from "../sanity-core";

export interface SanityTopbar extends SanityDocument {
    mainArea: (SanityTopbarMenuPanel | SanityTextLink)[];
    secondaryArea: SanityTopbarSecondaryArea;
}

interface SanityTopbarMenuPanel {
    title: string;
    columns: (SanityTopbarListColumn | SanityTopbarVideoColumn)[];
}

interface SanityTopbarVideoColumn {
    title: string;
    videoEmbed: SanityReference<SanityVideoEmbed>;
}

interface SanityTopbarListColumn {
    title: string;
    items: SanityTopbarListColumnItem[];
}

interface SanityTopbarListColumnItem {
    title: string;
    description: string;
    link: SanityReference<SanityLink>;
}

interface SanityTopbarSecondaryArea {
    links: SanityTextLink[];
    button: SanityButton;
}

export class Topbar extends Document {
    readonly mainArea: (TopbarMenuPanel | TextLink)[];
    readonly secondaryArea: TopbarSecondaryArea;

    constructor(data: SanityTopbar, db: SanityDataset) {
        super(data);
        this.mainArea = data.mainArea.map(x => {
            if ("columns" in x) return new TopbarMenuPanel(x, db);
            else return new TextLink(x, db);
        });
        this.secondaryArea = new TopbarSecondaryArea(data.secondaryArea, db);
    }
}

export class TopbarMenuPanel {
    readonly title: string;
    readonly columns: (TopbarListColumn | TopbarVideoColumn)[];

    constructor(data: SanityTopbarMenuPanel, db: SanityDataset) {
        this.title = data.title;
        this.columns = data.columns.map(x => {
            if ("items" in x) return new TopbarListColumn(x, db);
            else return new TopbarVideoColumn(x);
        });
    }
}

export class TopbarVideoColumn {
    readonly title: string;
    // TODO: video embed

    constructor(data: SanityTopbarVideoColumn) {
        this.title = data.title;
    }
}

export class TopbarListColumn {
    readonly title: string;
    readonly items: TopbarListColumnItem[];

    constructor(data: SanityTopbarListColumn, db: SanityDataset) {
        this.title = data.title;
        this.items = data.items.map(x => new TopbarListColumnItem(x, db));
    }
}

export class TopbarListColumnItem {
    readonly title: string;
    readonly description: string;
    readonly link: Link;

    constructor(data: SanityTopbarListColumnItem, db: SanityDataset) {
        this.title = data.title;
        this.description = data.description;
        this.link = new Link(db.resolveRef(data.link));
    }
}

export class TopbarSecondaryArea {
    readonly links: TextLink[];
    readonly button: LinkButton;

    constructor(data: SanityTopbarSecondaryArea, db: SanityDataset) {
        this.links = data.links.map(x => new TextLink(x, db));
        this.button = new LinkButton(data.button, db);
    }
}

const listColumnItemSchema = defineType({
    name: "topbarListColumnItem",
    title: "List Column Item",
    type: "object",
    fields: [
        titleField,
        descriptionField,
        linkField,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const listColumnSchema = defineType({
    name: "topbarListColumn",
    title: "List Column",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "items",
            description: "Items",
            type: "array",
            of: [{type: "topbarListColumnItem"}],
        }),
    ],
    preview: {
        select: { title: titleFieldName, items: "items" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.items?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const videoColumnSchema = defineType({
    name: "topbarVideoColumn",
    title: "Video Column",
    type: "object",
    fields: [
        titleField,
        videoEmbedField,
    ],
});

const topbarMenuPanelSchema = defineType({
    name: "topbarMenuPanel",
    title: "Menu Panel",
    icon: MasterDetailIcon,
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "columns",
            type: "array",
            of: [{type: "topbarListColumn"}, {type: "topbarVideoColumn"}],
        }),
    ],
    preview: {
        select: { title: titleFieldName, columns: "columns" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.columns?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

export const topbarSchemaName = "topbar";

const secondaryAreaSchemaName = `${topbarSchemaName}_secondaryArea`;

const secondaryAreaSchema = defineType({
    name: secondaryAreaSchemaName,
    title: "Right Side Items",
    type: "object",
    fields: [
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{type: textLinkSchemaName}],
        }),
        defineField({
            name: "button",
            title: "Button",
            type: buttonSchemaName,
        }),
    ],
});

const topbarItemTypes = [{type: "topbarMenuPanel"}, {type: textLinkSchemaName}];

const topbarSchema = defineType({
    name: topbarSchemaName,
    icon: BlockElementIcon,
    type: "document",
    fields: [
        defineField({
            name: "mainArea",
            title: "Left Side Items",
            description: "Displayed at the top on mobile",
            type: "array",
            of: topbarItemTypes,
        }),
        defineField({
            name: "secondaryArea",
            title: "Right Side Items",
            description: "Displayed at the bottom on mobile (GitHub link is always displayed)",
            type: secondaryAreaSchemaName,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Topbar" }) },
});

export const topbarSchemas = [listColumnItemSchema, listColumnSchema, videoColumnSchema, topbarMenuPanelSchema, secondaryAreaSchema, topbarSchema];
