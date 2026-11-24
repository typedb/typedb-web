import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { heroImageWarnings, slugField } from "../common-fields";
import { cioFormIDField } from "../form";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourceCommonFields, resourcePropsFromSanity } from "./base";
import { SanityPaper, paperSchemaName } from "./sanity";

export class Paper extends SiteResource {
    readonly fileURL?: string;
    readonly fileName?: string;
    readonly externalURL?: string;
    readonly tags: string[];
    readonly portraitImageURL?: string;
    readonly landscapeImageURL?: string;

    constructor(props: PropsOf<Paper>) {
        super(props);
        this.fileURL = props.fileURL;
        this.fileName = props.fileName;
        this.externalURL = props.externalURL;
        this.tags = props.tags;
        this.portraitImageURL = props.portraitImageURL;
        this.landscapeImageURL = props.landscapeImageURL;
    }

    static fromSanity(data: SanityPaper, db: SanityDataset): Paper {
        return new Paper(Object.assign(resourcePropsFromSanity(data, db), {
            fileURL: data.file && db.resolveRef(data.file.asset).url,
            fileName: data.file && db.resolveRef(data.file.asset).originalFilename,
            externalURL: data.externalUrl,
            tags: data.tags,
            portraitImageURL: data.portraitImage && db.resolveRef(data.portraitImage.asset).url,
            landscapeImageURL: data.landscapeImage && db.resolveRef(data.landscapeImage.asset).url,
        }));
    }

    detailsPageLink(): Link {
        return new Link({
            type: "route",
            destination: `papers/${this.slug}`,
            opensNewTab: false,
        });
    }
}

export const paperSchema = defineType({
    name: paperSchemaName,
    title: "Paper",
    icon: DocumentPdfIcon,
    type: "document",
    fields: [
        slugField,
        ...resourceCommonFields,
        defineField({
            name: "file",
            title: "File",
            description: "Hosted PDF. Leave empty for papers we can only link to.",
            type: "file",
            validation: (rule) => rule.custom((value, context) => {
                if (value || (context.document as any)?.externalUrl) return true;
                return "Provide a file or an external URL";
            }),
        }),
        defineField({
            name: "externalUrl",
            title: "External URL",
            description: "Publisher or DOI link, used when there is no file",
            type: "url",
        }),
        defineField({
            name: "portraitImage",
            title: "Portrait Image",
            type: "image",
        }),
        defineField({
            name: "landscapeImage",
            title: "Landscape Image",
            type: "image",
            validation: heroImageWarnings,
        }),
    ],
});
