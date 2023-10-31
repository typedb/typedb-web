import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { requiredRule, slugField } from "../common-fields";
import { FurtherReadingSection, furtherReadingSectionSchemaName } from "../component/page-section";
import { hubspotFormIDField } from "../form";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { MetaTags } from "../page/meta-tags";
import { resourceCommonFields } from "./base";
import { SanityWhitePaper, whitePaperSchemaName } from "./sanity";

export class WhitePaper {
    readonly title: ParagraphWithHighlights;
    readonly slug: string;
    readonly description: PortableText;
    readonly fileURL: string;
    readonly fileName?: string;
    readonly tags: string[];
    readonly portraitImageURL: string;
    readonly landscapeImageURL: string;
    readonly furtherReading?: FurtherReadingSection;
    readonly hubspotFormID: string;
    readonly metaTags: MetaTags;

    constructor(props: PropsOf<WhitePaper>) {
        this.title = props.title;
        this.slug = props.slug;
        this.description = props.description;
        this.fileURL = props.fileURL;
        this.fileName = props.fileName;
        this.tags = props.tags;
        this.portraitImageURL = props.portraitImageURL;
        this.landscapeImageURL = props.landscapeImageURL;
        this.furtherReading = props.furtherReading;
        this.hubspotFormID = props.hubspotFormID;
        this.metaTags = props.metaTags;
    }

    static fromSanity(data: SanityWhitePaper, db: SanityDataset): WhitePaper {
        return new WhitePaper({
            title: ParagraphWithHighlights.fromSanity(data.title),
            slug: data.slug.current,
            description: data.description,
            fileURL: db.resolveRef(data.file.asset).url,
            fileName: db.resolveRef(data.file.asset).originalFilename,
            tags: data.tags,
            portraitImageURL: db.resolveRef(data.portraitImage.asset).url,
            landscapeImageURL: db.resolveRef(data.landscapeImage.asset).url,
            furtherReading: data.furtherReading.isVisible
                ? FurtherReadingSection.fromSanityFurtherReadingSection(data.furtherReading, db)
                : undefined,
            hubspotFormID: data.hubspotFormID,
            metaTags: MetaTags.fromSanity(data.metaTags || {}, db),
        });
    }

    detailsPageLink(): Link {
        return new Link({
            type: "route",
            destination: `white-papers/${this.slug}`,
            opensNewTab: false,
        });
    }
}

export const whitePaperSchema = defineType({
    name: whitePaperSchemaName,
    title: "White Paper",
    icon: DocumentPdfIcon,
    type: "document",
    fields: [
        slugField,
        ...resourceCommonFields,
        defineField({
            name: "file",
            title: "File",
            type: "file",
            validation: requiredRule,
        }),
        defineField({
            name: "portraitImage",
            title: "Portrait Image",
            type: "image",
            validation: requiredRule,
        }),
        defineField({
            name: "landscapeImage",
            title: "Landscape Image",
            type: "image",
            validation: requiredRule,
        }),
        defineField({
            name: "furtherReading",
            title: "Further Reading",
            type: furtherReadingSectionSchemaName,
            validation: requiredRule,
        }),
        hubspotFormIDField,
    ],
});
