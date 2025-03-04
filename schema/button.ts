import { defineField, defineType } from "@sanity/types";
import { Link, SanityLink, textLinkSchema } from "./link";
import { SanityDataset, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export const buttonStyles = {
    greenSolid: "Green (solid)",
    greenHollow: "Green (hollow)",
    water: "Water",
    fire: "Fire",
    frameless: "Frameless",
} as const;

export type ButtonStyle = keyof typeof buttonStyles;

export interface SanityLinkButton {
    style: ButtonStyle;
    text: string;
    comingSoon: boolean;
    link?: SanityReference<SanityLink>;
}

export type SanityLinkButtons = SanityLinkButton[];

export class ActionButton {
    readonly style: ButtonStyle;
    readonly text: string;
    readonly comingSoon: boolean;
    readonly onClick?: () => any;

    constructor(props: PropsOf<ActionButton>) {
        this.style = props.style;
        this.text = props.text;
        this.comingSoon = props.comingSoon;
        this.onClick = props.onClick;
    }
}

export class LinkButton extends ActionButton {
    readonly link?: Link;
    readonly download?: LinkButtonDownload;

    constructor(props: PropsOf<LinkButton>) {
        super(props);
        this.link = props.link;
        this.download = props.download;
    }

    static fromSanity(data: SanityLinkButton, db: SanityDataset) {
        return new LinkButton({ style: data.style, text: data.text, comingSoon: data.comingSoon, link: data.link ? Link.fromSanityLinkRef(data.link, db) : undefined });
    }
}

export interface LinkButtonDownload {
    filename?: string;
}

export interface SanityOptionalActions {
    actions?: SanityLinkButtons;
}

export const buttonSchemaName = "button";

const buttonSchema = defineType({
    name: buttonSchemaName,
    type: "object",
    title: "Button",
    fields: [
        defineField({
            name: "style",
            title: "Style",
            type: "string",
            options: {
                list: Object.entries(buttonStyles).map(([value, title]) => ({ title, value })),
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "greenHollow",
        }),
        ...textLinkSchema.fields,
    ],
    preview: {
        select: { text: "text", linkDestination: "link.destination.current", linkRoute: "link.route.current" },
        prepare: (selection) => ({ title: selection.text, subtitle: selection.linkDestination || selection.linkRoute }),
    },
});

const actionsSchema = defineType({
    name: "actions",
    title: "Actions",
    type: "array",
    of: [{type: buttonSchemaName}],
});

export const actionSchemas = [buttonSchema, actionsSchema];
