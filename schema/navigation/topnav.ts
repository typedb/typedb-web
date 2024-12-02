import { BlockElementIcon, SquareIcon, TrolleyIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { LinkButton, buttonSchemaName, SanityButton } from "../button";
import { Link, SanityLink, SanityTextLink } from "../link";
import { descriptionField, linkFieldOptional, requiredRule, textLinkFieldOptional, titleField } from "../common-fields";
import { Document, SanityDataset, SanityReference } from "../sanity-core";
import { PropsOf } from "../util";

const topnav = "topnav";

export const topnavSchemaNames = {
    topnav: topnav,
    item: `${topnav}_item`,
    productsPanel: `${topnav}_productsPanel`,
    developersPanel: `${topnav}_developersPanel`,
    resourcesPanel: `${topnav}_resourcesPanel`,
    productGroup: `${topnav}_productGroup`,
    product: `${topnav}_product`,
    resource: `${topnav}_resource`,
    panelCta: `${topnav}_panelCta`,
} as const;

export interface SanityTopnav extends SanityDocument {
    primaryItems: SanityNavItem[];
    secondaryItems: SanityNavItem[];
    cta: SanityButton;
}

interface SanityNavItem {
    title: string;
    panel?: SanityReference<SanityNavPanel>;
    link?: SanityReference<SanityLink>;
}

interface SanityProductsNavPanel extends SanityDocument {
    _type: typeof topnavSchemaNames.productsPanel;
    productGroups: SanityNavProductGroup[];
    bottomLinks?: SanityNavResource[];
    ctas?: SanityNavPanelCta[];
}

interface SanityNavProductGroup {
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

type SanityNavPanel = SanityProductsNavPanel;

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

export class ProductsNavPanel {
    readonly productGroups: NavProductGroup[];
    readonly bottomLinks: NavResource[];
    readonly ctas: NavPanelCta[];

    constructor(props: PropsOf<ProductsNavPanel>) {
        this.productGroups = props.productGroups;
        this.bottomLinks = props.bottomLinks;
        this.ctas = props.ctas;
    }

    static fromSanity(data: SanityProductsNavPanel, db: SanityDataset): ProductsNavPanel {
        return new ProductsNavPanel({
            productGroups: data.productGroups.map(x => NavProductGroup.fromSanity(x, db)),
            bottomLinks: (data.bottomLinks || []).map(x => NavResource.fromSanity(x, db)),
            ctas: (data.ctas || []).map(x => NavPanelCta.fromSanity(x, db)),
        });
    }
}

export class NavProductGroup {
    readonly title: string;
    readonly items: NavProduct[];

    constructor(props: PropsOf<NavProductGroup>) {
        this.title = props.title;
        this.items = props.items;
    }

    static fromSanity(data: SanityNavProductGroup, db: SanityDataset): NavProductGroup {
        return new NavProductGroup({
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
                style: "secondary",
                comingSoon: data.link.comingSoon,
            }),
        });
    }
}

export type NavPanel = ProductsNavPanel;

function navPanelFromSanity(data: SanityNavPanel, db: SanityDataset): NavPanel {
    switch (data._type) {
        case "topnav_productsPanel": return ProductsNavPanel.fromSanity(data, db);
        default: throw `Invalid type for NavPanel: ${data._type}`;
    }
}

const navPanelCtaSchema = defineType({
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

const navProductSchema = defineType({
    name: topnavSchemaNames.product,
    title: "Product",
    type: "object",
    fields: [
        titleField,
        descriptionField,
        linkFieldOptional,
        defineField({
            name: "iconName",
            type: "string",
            title: "Icon Name",
        }),
        defineField({
            name: "iconVariant",
            type: "string",
            title: "Icon Variant",
            initialValue: "thin",
            options: {
                list: ["regular", "light", "thin", "brands"],
                layout: "radio",
                direction: "horizontal",
            },
            hidden: (ctx) => {
                return ctx.parent == null || ctx.parent["iconName"] == null;
            },
        }),
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const navResourceSchema = defineType({
    name: topnavSchemaNames.resource,
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

const navProductGroupSchema = defineType({
    name: topnavSchemaNames.productGroup,
    title: "Product Group",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "items",
            title: "Items",
            type: "array",
            of: [{type: topnavSchemaNames.product}],
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

const productsNavPanelSchema = defineType({
    name: topnavSchemaNames.productsPanel,
    title: "Products Panel",
    icon: TrolleyIcon,
    type: "document",
    fields: [
        defineField({
            name: "productGroups",
            title: "Product Groups",
            type: "array",
            of: [{type: topnavSchemaNames.productGroup}],
            validation: requiredRule,
        }),
        defineField({
            name: "bottomLinks",
            title: "Bottom Links",
            type: "array",
            of: [{type: topnavSchemaNames.resource}],
        }),
        defineField({
            name: "ctas",
            title: "CTAs",
            type: "array",
            of: [{type: topnavSchemaNames.panelCta}],
        }),
    ],
    preview: {
        select: { productGroups: "productGroups" },
        prepare: (selection) => ({
            title: "Products",
            subtitle: `${selection.productGroups?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const navPanelTypes = [{type: topnavSchemaNames.productsPanel}];

const navItemSchema = defineType({
    name: topnavSchemaNames.item,
    icon: SquareIcon,
    title: "Nav Item",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "panel",
            title: "Panel",
            type: "reference",
            to: navPanelTypes,
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
    navPanelCtaSchema, navProductSchema, navResourceSchema, navProductGroupSchema, productsNavPanelSchema,
    navItemSchema, topnavSchema
];
