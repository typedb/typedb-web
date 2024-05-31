import { SparklesIcon } from "@sanity/icons";
import { defineField, defineType, DocumentRule, SanityDocument } from "@sanity/types";
import { Link, SanityLink } from "../link";
import { linkField, required, textFieldWithHighlights } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanitySiteBanner extends SanityDocument {
    isEnabled: boolean;
    text?: PortableText;
    link?: SanityReference<SanityLink>;
}

export class SiteBanner {
    readonly text: ParagraphWithHighlights;
    readonly link?: Link;

    constructor(data: PropsOf<SiteBanner>) {
        this.text = data.text;
        this.link = data.link;
    }

    static fromSanity(data: SanitySiteBanner, db: SanityDataset): SiteBanner | undefined {
        if (!data.isEnabled) return undefined;
        return new SiteBanner({
            text: ParagraphWithHighlights.fromSanity(data.text!),
            link: data.link && Link.fromSanityLinkRef(data.link, db),
        });
    }
}

export const siteBannerSchemaName = "siteBanner";

const siteBannerSchema = defineType({
    name: siteBannerSchemaName,
    icon: SparklesIcon,
    title: "Site Banner",
    type: "document",
    fields: [
        defineField({
            name: "isEnabled",
            title: "Is Enabled",
            type: "boolean",
            initialValue: false,
            validation: required,
        }),
        textFieldWithHighlights,
        linkField,
    ],
    validation: (rule: DocumentRule) => rule.custom((value) => {
        if (!value) return "Required";
        if (value["isEnabled"] && (!value["text"] || !value["link"])) return "'Text' and 'Link' are required when 'Is Enabled' is set to 'true'";
        else return true;
    }),
    preview: { prepare: (_selection) => ({ title: "Site Banner" }) },
});

export const platformUiBannerSchemaName = "platformUiBanner";

const platformUiBannerSchema = defineType({
    ...siteBannerSchema,
    name: platformUiBannerSchemaName,
    title: "Platform UI Banner",
    preview: { prepare: (_selection) => ({ title: "Platform UI Banner" }) },
});

export const siteBannerSchemas = [siteBannerSchema, platformUiBannerSchema];
