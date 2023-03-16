import { DropIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { nameField, nameFieldName } from "./common-fields";

import { Document } from "./document";
import { SanityColor } from "./sanity-core";
import { sanitySchemaName } from "./util";

export interface SanityThemeColor extends SanityDocument {
    color: SanityColor;
}

export class ThemeColor extends Document {
    readonly hex: string;

    constructor(data: SanityThemeColor) {
        super(data);
        this.hex = data.color.hex;
    }
}

function colorIcon(bgColor: string) {
    return () => (
        React.createElement("div", { style: { backgroundColor: bgColor, width: "100%", height: "100%" } }, [])
    );
}

export const colorSchema = defineType({
    name: sanitySchemaName(ThemeColor),
    icon: DropIcon,
    type: "document",
    fields: [
        nameField,
        defineField({
            name: "color",
            type: "color",
            validation: (rule: any) => rule.required(),
        }),
    ],
    preview: {
        select: { name: nameFieldName, color: "color.hex" },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: selection.color,
            media: colorIcon(selection.color),
        }),
    },
});
