import { DropIcon } from "@sanity/icons";
import React from "react";
import { defineField, defineType, StringRule } from "sanity";

function colorIcon(bgColor: string) {
    return () => (
        React.createElement("div", { style: { backgroundColor: bgColor, width: "100%", height: "100%" } }, [])
    );
}

export const colorSchema = defineType({
    name: "themeColor",
    icon: DropIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "color",
            type: "color",
            validation: (rule: any) => rule.required(),
        }),
    ],
    preview: {
        select: { name: "name", color: "color.hex" },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: selection.color,
            media: colorIcon(selection.color),
        }),
    },
});
