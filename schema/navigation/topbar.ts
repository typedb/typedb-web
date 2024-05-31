import { BlockElementIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { LinkButton, buttonSchemaName, SanityButton } from "../button";
import { SanityVideoEmbed } from "../illustration";
import { SanityImageRef } from "../image";
import { Link, SanityLink, SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { comingSoonField, descriptionField, linkField, required, sectionIconField, titleField, titleFieldName, videoEmbedField } from "../common-fields";
import { Document, SanityDataset, SanityReference } from "../sanity-core";

export interface SanityTopbar extends SanityDocument {
    mainArea: (SanityTopbarMenuPanel | SanityTextLink)[];
    secondaryArea: SanityTopbarSecondaryArea;
}

interface SanityTopbarMenuPanel {
    title: string;
    columns: SanityTopbarColumn[];
}

interface SanityTopbarVideoColumn {
    _type: typeof videoColumnSchemaName;
    title: string;
    videoEmbed: SanityReference<SanityVideoEmbed>;
}

interface SanityTopbarListColumn {
    _type: typeof listColumnSchemaName;
    title: string;
    items: SanityTopbarListColumnItem[];
}

interface SanityTopbarListColumnItem {
    title: string;
    description: string;
    link?: SanityReference<SanityLink>;
    comingSoon: boolean;
}

interface SanityTopbarSpotlightColumn {
    _type: typeof spotlightColumnSchemaName;
    title: string;
    icon: SanityReference<SanityImageRef>;
    link: SanityReference<SanityLink>;
}

type SanityTopbarColumn = SanityTopbarListColumn | SanityTopbarVideoColumn | SanityTopbarSpotlightColumn;

function isListColumn(data: SanityTopbarColumn): data is SanityTopbarListColumn {
    return data._type === listColumnSchemaName;
}

function isVideoColumn(data: SanityTopbarColumn): data is SanityTopbarVideoColumn {
    return data._type === videoColumnSchemaName;
}

function isSpotlightColumn(data: SanityTopbarColumn): data is SanityTopbarSpotlightColumn {
    return data._type === spotlightColumnSchemaName;
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
            else return TextLink.fromSanityTextLink(x, db);
        }).filter(x => !!x) as (TopbarMenuPanel | TextLink)[];
        this.secondaryArea = new TopbarSecondaryArea(data.secondaryArea, db);
    }
}

export class TopbarMenuPanel {
    readonly title: string;
    readonly columns: TopbarColumn[];

    constructor(data: SanityTopbarMenuPanel, db: SanityDataset) {
        this.title = data.title;
        this.columns = data.columns.map(x => {
            if (isListColumn(x)) return new TopbarListColumn(x, db);
            else if (isVideoColumn(x)) return new TopbarVideoColumn(x);
            else if (isSpotlightColumn(x)) return new TopbarSpotlightColumn(x, db);
            else throw "Unreachable code";
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
    readonly link?: Link;
    readonly comingSoon: boolean;

    constructor(data: SanityTopbarListColumnItem, db: SanityDataset) {
        this.title = data.title;
        this.description = data.description;
        this.link = data.link ? Link.fromSanityLinkRef(data.link, db) : undefined;
        this.comingSoon = data.comingSoon;
    }
}

export class TopbarSpotlightColumn {
    readonly title: string;
    readonly iconURL: string;
    readonly link?: Link;

    constructor(data: SanityTopbarSpotlightColumn, db: SanityDataset) {
        this.title = data.title;
        this.iconURL = db.resolveImageRef(data.icon).url;
        this.link = Link.fromSanityLinkRef(data.link, db);
    }
}

export type TopbarColumn = TopbarListColumn | TopbarVideoColumn | TopbarSpotlightColumn;

export class TopbarSecondaryArea {
    readonly links: TextLink[];
    readonly button: LinkButton;

    constructor(data: SanityTopbarSecondaryArea, db: SanityDataset) {
        this.links = data.links.map(x => TextLink.fromSanityTextLink(x, db)).filter(x => !!x) as TextLink[];
        this.button = LinkButton.fromSanity(data.button, db);
    }
}

const listColumnItemSchema = defineType({
    name: "topbarListColumnItem",
    title: "List Column Item",
    type: "object",
    fields: [
        titleField,
        Object.assign({}, descriptionField, { validation: required }),
        linkField,
        comingSoonField,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const listColumnSchemaName = "topbarListColumn";

const listColumnSchema = defineType({
    name: listColumnSchemaName,
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

const videoColumnSchemaName = "topbarVideoColumn";

const videoColumnSchema = defineType({
    name: videoColumnSchemaName,
    title: "Video Column",
    type: "object",
    fields: [
        titleField,
        videoEmbedField,
    ],
});

const spotlightColumnSchemaName = "topbarSpotlightColumn";

const spotlightColumnSchema = defineType({
    name: spotlightColumnSchemaName,
    title: "Spotlight Column",
    type: "object",
    fields: [
        titleField,
        sectionIconField,
        Object.assign({}, linkField, { validation: required }),
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
            of: [{type: listColumnSchemaName}, {type: videoColumnSchemaName}, {type: spotlightColumnSchemaName}],
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
    title: "Topbar",
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

export const topbarSchemas = [listColumnItemSchema, listColumnSchema, videoColumnSchema, spotlightColumnSchema, topbarMenuPanelSchema, secondaryAreaSchema, topbarSchema];
