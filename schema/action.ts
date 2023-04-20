import { defineField, defineType } from "@sanity/types";
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
    link: SanityReference<SanityLink>;
}

export type SanityActions = SanityButton[];

export class Action {
    readonly buttonStyle: ButtonStyle;
    readonly text: string;
    readonly link: Link;

    constructor(data: SanityButton, db: SanityDataset) {
        this.buttonStyle = data.style;
        this.text = data.text;
        this.link = new Link(db.resolveRef(data.link));
    }
}

export const buttonSchemaName = "button";

const buttonSchema = defineType({
    name: buttonSchemaName,
    type: "object",
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
        ...textLinkSchema.fields
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
