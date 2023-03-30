import { defineType } from "@sanity/types";
import { bodyFieldRichText, titleField } from "../common-fields";

export const linkPanelSchemaName = "linkPanel";

export const linkPanelSchema = defineType({
    name: linkPanelSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,

    ],
});
