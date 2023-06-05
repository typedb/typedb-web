import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument, Slug } from "@sanity/types";
import { bodyFieldRichText, descriptionFieldRichText, requiredRule, slugField, titleField } from "./common-fields";
import { Link } from "./link";
import { SanityDataset, SanityFile, SanityImage } from "./sanity-core";
import { RichText, SanityPortableText } from "./text";
import { PropsOf } from "./util";

export interface SanityWhitePaper extends SanityDocument {
    title: string;
    slug: Slug;
    description: SanityPortableText;
    file: SanityFile;
    tags: string[];
    portraitImage: SanityImage;
    landscapeImage: SanityImage;
}

export class WhitePaper {
    readonly title: string;
    readonly slug: string;
    readonly description: RichText;
    readonly fileURL: string;
    readonly tags: string[];
    readonly portraitImageURL: string;
    readonly landscapeImageURL: string;

    constructor(props: PropsOf<WhitePaper>) {
        this.title = props.title;
        this.slug = props.slug;
        this.description = props.description;
        this.fileURL = props.fileURL;
        this.tags = props.tags;
        this.portraitImageURL = props.portraitImageURL;
        this.landscapeImageURL = props.landscapeImageURL;
    }

    static fromSanity(data: SanityWhitePaper, db: SanityDataset): WhitePaper {
        return new WhitePaper({
            title: data.title,
            slug: data.slug.current,
            description: new RichText(data.description),
            fileURL: db.resolveRef(data.file.asset).url,
            tags: data.tags,
            portraitImageURL: db.resolveRef(data.portraitImage.asset).url,
            landscapeImageURL: db.resolveRef(data.landscapeImage.asset).url,
        });
    }

    detailsPageLink(): Link {
        return new Link({
            type: "route",
            destination: `white-paper/${this.slug}`,
            opensNewTab: false,
        });
    }
}

export const whitePaperSchemaName = "whitePaper";

export const whitePaperSchema = defineType({
    name: whitePaperSchemaName,
    title: "White Paper",
    icon: DocumentPdfIcon,
    type: "document",
    fields: [
        titleField,
        slugField,
        descriptionFieldRichText,
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
    ],
});
