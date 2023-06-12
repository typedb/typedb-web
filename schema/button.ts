import { defineField, defineType } from "@sanity/types";
import { requiredRule } from "./common-fields";
import { Link, SanityLink, textLinkSchema } from "./link";
import { SanityDataset, SanityReference } from "./sanity-core";

export const buttonStyles = {
    primary: "Primary",
    secondary: "Secondary",
} as const;

export const buttonStyleList = Object.keys(buttonStyles);

export type ButtonStyle = keyof typeof buttonStyles;

export interface SanityButton {
    style: ButtonStyle;
    text: string;
    comingSoon: boolean;
    link: SanityReference<SanityLink>;
}

export type SanityButtons = SanityButton[];

export class ActionButton {
    readonly style: ButtonStyle;
    readonly text: string;
    readonly comingSoon: boolean;

    constructor(props: { style: ButtonStyle, text: string, comingSoon: boolean }) {
        this.style = props.style;
        this.text = props.text;
        this.comingSoon = props.comingSoon;
    }
}

export class LinkButton extends ActionButton {
    readonly link: Link;

    constructor(props: { style: ButtonStyle, text: string, comingSoon: boolean, link: Link }) {
        super(props);
        this.link = props.link;
    }

    static fromSanity(data: SanityButton, db: SanityDataset) {
        return new LinkButton({ style: data.style, text: data.text, comingSoon: data.comingSoon, link: Link.fromSanityLinkRef(data.link, db) });
    }
}

export interface SanityOptionalActions {
    actions?: SanityButtons;
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
            description: "Primary (solid) buttons stand out more than secondary (hollow) ones",
            type: "string",
            options: {
                list: buttonStyleList,
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "primary",
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
