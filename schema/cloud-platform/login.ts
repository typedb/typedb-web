import { AddUserIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { requiredRule, titleFieldWithHighlights } from "../common-fields";
import { PortableText } from "../text";

export interface CloudLoginPortal {
    title: PortableText;
    subtitle: PortableText;
    keyPoints: string[];
}

export const cloudLoginPortalSchemaName = "cloudLoginPortal";

const loginPortalSchema = defineType({
    name: cloudLoginPortalSchemaName,
    title: "Cloud Login Portal",
    icon: AddUserIcon,
    type: "document",
    fields: [
        titleFieldWithHighlights,
        Object.assign({}, titleFieldWithHighlights, {
            name: "subtitle",
            title: "Subtitle",
        }),
        defineField({
            name: "keyPoints",
            title: "Key Points",
            type: "array",
            of: [{ type: "string" }],
            validation: requiredRule,
        }),
    ],
    preview: {
        prepare: () => ({ title: "Login Portal" }),
    },
});

export const loginSchemas = [loginPortalSchema];
