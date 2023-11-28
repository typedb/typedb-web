import { DocumentZipIcon } from "@sanity/icons";
import { SanityDocument, Slug, defineType } from "@sanity/types";
import { titleFieldWithHighlights } from "../common-fields";
import { WordpressPost, wordpressSlugField } from "../resource/article";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { MetaTags, metaTagsField, SanityMetaTags } from "./meta-tags";

export interface SanityLegalDocument extends SanityDocument {
    slug: Slug;
    metaTags?: SanityMetaTags;
    title: PortableText;
}

export class LegalDocument {
    readonly slug: string;
    readonly metaTags: MetaTags;
    readonly title: ParagraphWithHighlights;
    readonly contentHtml: string;

    constructor(props: PropsOf<LegalDocument>) {
        this.slug = props.slug;
        this.metaTags = props.metaTags;
        this.title = props.title;
        this.contentHtml = props.contentHtml;
    }

    static fromApi(data: SanityLegalDocument, db: SanityDataset, wordpressPost: WordpressPost): LegalDocument {
        return new LegalDocument({
            slug: data.slug.current,
            metaTags: MetaTags.fromSanity(data.metaTags || {}, db),
            title: ParagraphWithHighlights.fromSanity(data.title),
            contentHtml: wordpressPost.content,
        });
    }

    pageTitle(): string {
        return `TypeDB ${this.title.toPlainText()}`;
    }
}

export const legalDocumentSchemaName = "legalDocument";

export const legalDocumentSchema = defineType({
    name: legalDocumentSchemaName,
    title: "Legal Document",
    type: "document",
    icon: DocumentZipIcon,
    fields: [
        titleFieldWithHighlights,
        wordpressSlugField,
        metaTagsField,
    ],
});
