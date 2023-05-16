import { HelpCircleIcon } from "@sanity/icons";
import { defineType } from "@sanity/types";
import { bodyFieldRichText, titleField } from "./common-fields";

export const referenceMaterialSchemaName = "referenceMaterial";

export const referenceMaterialSchema = defineType({
    name: referenceMaterialSchemaName,
    title: "Reference Material",
    icon: HelpCircleIcon,
    type: "document",
    fields: [
        titleField,
        bodyFieldRichText,
    ],
});
