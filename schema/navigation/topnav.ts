import { BlockElementIcon, ComponentIcon, SquareIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { LinkButton, buttonSchemaName, SanityLinkButton } from "../button";
import { Link, SanityLink, SanityTextLink } from "../link";
import { descriptionField, iconNameFieldOptional, iconVariantFieldOptional, linkFieldOptional, requiredRule, textLinkFieldOptional, titleField } from "../common-fields";
import { Document, SanityDataset, SanityReference } from "../sanity-core";
import { PropsOf } from "../util";

const topnav = "topnav";

export const topnavSchemaNames = {
    topnav: topnav,
    item: `${topnav}_item`,
    panel: `${topnav}_productsPanel`,
    panelColumn: `${topnav}_panelColumn`,
    panelItemGroup: `${topnav}_panelItemGroup`,
    panelItem: `${topnav}_panelItem`,
    panelResource: `${topnav}_panelResource`,
    panelCta: `${topnav}_panelCta`,
} as const;

export interface SanityTopnav extends SanityDocument {
    primaryItems: SanityNavItem[];
    secondaryItems: SanityNavItem[];
    cta: SanityLinkButton;
}

interface SanityNavItem {
    title: string;
    panel?: SanityReference<SanityNavPanel>;
    link?: SanityReference<SanityLink>;
}

interface SanityNavPanel extends SanityDocument {
    _type: typeof topnavSchemaNames.panel;
    columns: SanityNavPanelColumn[];
    bottomLinks?: SanityNavResource[];
    ctas?: SanityNavPanelCta[];
}

interface SanityNavPanelColumn {
    itemGroups: SanityNavItemGroup[];
}

interface SanityNavItemGroup {
    title: string;
    items: SanityNavProduct[];
}

interface SanityNavResource {
    title: string;
    description?: string;
    link: SanityReference<SanityLink>;
}

interface SanityNavProduct {
    title: string;
    description?: string;
    link: SanityReference<SanityLink>;
    iconName?: string;
    iconVariant?: string;
}

interface SanityNavPanelCta {
    title: string;
    description?: string;
    link: SanityTextLink;
}

export class Topnav extends Document {
    readonly primaryItems: NavItem[];
    readonly secondaryItems: NavItem[];
    readonly cta: LinkButton;

    constructor(data: SanityTopnav, db: SanityDataset) {
        super(data);
        this.primaryItems = data.primaryItems.map(x => NavItem.fromSanity(x, db));
        this.secondaryItems = data.secondaryItems.map(x => NavItem.fromSanity(x, db));
        this.cta = LinkButton.fromSanity(data.cta, db);
    }
}

export class NavItem {
    readonly title: string;
    readonly panel?: NavPanel;
    readonly link?: Link;

    constructor(props: PropsOf<NavItem>) {
        this.title = props.title;
        this.panel = props.panel;
        this.link = props.link;
    }

    static fromSanity(data: SanityNavItem, db: SanityDataset): NavItem {
        return new NavItem({
            title: data.title,
            panel: data.panel ? navPanelFromSanity(db.resolveRef(data.panel), db) : undefined,
            link: data.link ? Link.fromSanityLinkRef(data.link, db) : undefined,
        });
    }
}

export class NavPanel {
    readonly columns: NavItemGroup[][];
    readonly bottomLinks: NavResource[];
    readonly ctas: NavPanelCta[];

    constructor(props: PropsOf<NavPanel>) {
        this.columns = props.columns;
        this.bottomLinks = props.bottomLinks;
        this.ctas = props.ctas;
    }

    static fromSanity(data: SanityNavPanel, db: SanityDataset): NavPanel {
        return new NavPanel({
            columns: data.columns.map(x => x.itemGroups.map(y => NavItemGroup.fromSanity(y, db))),
            bottomLinks: (data.bottomLinks || []).map(x => NavResource.fromSanity(x, db)),
            ctas: (data.ctas || []).map(x => NavPanelCta.fromSanity(x, db)),
        });
    }
}

export class NavItemGroup {
    readonly title: string;
    readonly items: NavProduct[];

    constructor(props: PropsOf<NavItemGroup>) {
        this.title = props.title;
        this.items = props.items;
    }

    static fromSanity(data: SanityNavItemGroup, db: SanityDataset): NavItemGroup {
        return new NavItemGroup({
            title: data.title,
            items: data.items.map(x => NavProduct.fromSanity(x, db)),
        });
    }
}

export class NavResource {
    readonly title: string;
    readonly description?: string;
    readonly link?: Link;

    constructor(props: PropsOf<NavResource>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
    }

    static fromSanity(data: SanityNavResource, db: SanityDataset): NavResource {
        return new NavResource({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db),
        });
    }
}

export class NavProduct {
    readonly title: string;
    readonly description?: string;
    readonly link?: Link;
    readonly iconName?: string;
    readonly iconVariant?: string;

    constructor(props: PropsOf<NavProduct>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
        this.iconName = props.iconName;
    }

    static fromSanity(data: SanityNavProduct, db: SanityDataset): NavProduct {
        return new NavProduct({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db),
            iconName: data.iconName,
        });
    }
}

export class NavPanelCta {
    readonly title: string;
    readonly description?: string;
    readonly linkButton: LinkButton;

    constructor(props: PropsOf<NavPanelCta>) {
        this.title = props.title;
        this.description = props.description;
        this.linkButton = props.linkButton;
    }

    static fromSanity(data: SanityNavPanelCta, db: SanityDataset): NavPanelCta {
        return new NavPanelCta({
            title: data.title,
            description: data.description,
            linkButton: new LinkButton({
                text: data.link.text,
                link: Link.fromSanityLinkRef(data.link.link, db),
                style: "greenHollow",
                comingSoon: data.link.comingSoon,
            }),
        });
    }
}

function navPanelFromSanity(data: SanityNavPanel, db: SanityDataset): NavPanel {
    switch (data._type) {
        case "topnav_productsPanel": return NavPanel.fromSanity(data, db);
        default: throw `Invalid type for NavPanel: ${data._type}`;
    }
}

const panelCtaSchema = defineType({
    name: topnavSchemaNames.panelCta,
    title: "CTA",
    type: "object",
    fields: [
        titleField,
        descriptionField,
        textLinkFieldOptional,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description ?? ""}` }),
    },
});

const panelItemSchema = defineType({
    name: topnavSchemaNames.panelItem,
    title: "Product",
    type: "object",
    fields: [
        titleField,
        descriptionField,
        linkFieldOptional,
        iconNameFieldOptional,
        iconVariantFieldOptional,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const panelResourceSchema = defineType({
    name: topnavSchemaNames.panelResource,
    title: "Resource",
    type: "object",
    fields: [
        titleField,
        descriptionField,
        linkFieldOptional,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const panelItemGroupSchema = defineType({
    name: topnavSchemaNames.panelItemGroup,
    title: "Item Group",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "items",
            title: "Items",
            type: "array",
            of: [{type: topnavSchemaNames.panelItem}],
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { title: "title", items: "items" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.items?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const panelColumnSchema = defineType({
    name: topnavSchemaNames.panelColumn,
    title: "Column",
    type: "object",
    fields: [
        defineField({
            name: "itemGroups",
            title: "Item Groups",
            type: "array",
            of: [{type: topnavSchemaNames.panelItemGroup}],
            validation: requiredRule,
        }),
    ],
    preview: {
        select: { itemGroups: "itemGroups" },
        prepare: (selection) => ({
            title: `Column`,
            subtitle: `${selection.itemGroups?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const panelSchema = defineType({
    name: topnavSchemaNames.panel,
    title: "Topnav Panel",
    icon: ComponentIcon,
    type: "object",
    fields: [
        defineField({
            name: "columns",
            title: "Columns",
            type: "array",
            of: [{type: topnavSchemaNames.panelColumn}],
            validation: requiredRule,
        }),
        defineField({
            name: "bottomLinks",
            title: "Bottom Links",
            type: "array",
            of: [{type: topnavSchemaNames.panelResource}],
        }),
        defineField({
            name: "ctas",
            title: "CTAs",
            type: "array",
            of: [{type: topnavSchemaNames.panelCta}],
        }),
    ],
    preview: {
        select: { columns: "columns" },
        prepare: (selection) => ({
            title: "Panel",
            subtitle: `${selection.columns?.map((x: any) => x.itemGroups?.map((y: any) => y.title).join(", ") || "").join(", ") || ""}`,
        }),
    },
});

const navItemSchema = defineType({
    name: topnavSchemaNames.item,
    icon: SquareIcon,
    title: "Nav Item",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "panel",
            title: "Panel (optional)",
            type: topnavSchemaNames.panel,
        }),
        linkFieldOptional,
    ],
});

const topnavSchema = defineType({
    name: topnavSchemaNames.topnav,
    icon: BlockElementIcon,
    title: "Topnav",
    type: "document",
    fields: [
        defineField({
            name: "primaryItems",
            title: "Primary Items",
            type: "array",
            of: [{type: topnavSchemaNames.item}],
            validation: requiredRule,
        }),
        defineField({
            name: "secondaryItems",
            title: "Secondary Items",
            type: "array",
            of: [{type: topnavSchemaNames.item}],
            validation: requiredRule,
        }),
        defineField({
            name: "cta",
            title: "CTA",
            type: buttonSchemaName,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Topnav" }) },
});

export const topnavSchemas = [
    panelCtaSchema, panelItemSchema, panelResourceSchema, panelItemGroupSchema, panelSchema, panelColumnSchema,
    navItemSchema, topnavSchema
];
