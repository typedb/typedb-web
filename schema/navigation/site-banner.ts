import { SparklesIcon } from "@sanity/icons";
import { defineField, defineType, DocumentRule, SanityDocument } from "@sanity/types";
import { Link, SanityLink } from "../link";
import { linkField, requiredRule, textFieldWithHighlights } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, SanityPortableText } from "../text";
import { PropsOf } from "../util";

export interface SanitySiteBanner extends SanityDocument {
    isEnabled: boolean;
    text?: SanityPortableText;
    link?: SanityReference<SanityLink>;
}

export class SiteBanner {
    readonly text: ParagraphWithHighlights;
    readonly link: Link;

    constructor(data: PropsOf<SiteBanner>) {
        this.text = data.text;
        this.link = data.link;
    }

    static fromSanity(data: SanitySiteBanner, db: SanityDataset): SiteBanner | undefined {
        if (!data.isEnabled) return undefined;
        return new SiteBanner({
            text: ParagraphWithHighlights.fromSanity(data.text!),
            link: Link.fromSanityLinkRef(data.link!, db),
        });
    }
}

export const siteBannerSchemaName = "siteBanner";

export const siteBannerSchema = defineType({
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
            validation: requiredRule,
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
