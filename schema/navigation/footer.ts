import { defineField, defineType } from "@sanity/types";
import { socialMediaLinksField } from "../social-media";

export const footerSchemaName = "footer";

const footerSchema = defineType({
    name: footerSchemaName,
    title: "Footer",
    type: "document",
    fields: [
        socialMediaLinksField,
    ],
    preview: { prepare: (_selection) => ({ title: "Footer" }) },
});

export const footerSchemas = [footerSchema];
