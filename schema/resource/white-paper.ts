import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { requiredRule, slugField } from "../common-fields";
import { hubspotFormIDField } from "../form";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourceCommonFields, resourcePropsFromSanity } from "./base";
import { SanityWhitePaper, whitePaperSchemaName } from "./sanity";

export class WhitePaper extends SiteResource {
    readonly fileURL: string;
    readonly fileName?: string;
    readonly tags: string[];
    readonly portraitImageURL: string;
    readonly landscapeImageURL: string;
    readonly hubspotFormID: string;

    constructor(props: PropsOf<WhitePaper>) {
        super(props);
        this.fileURL = props.fileURL;
        this.fileName = props.fileName;
        this.tags = props.tags;
        this.portraitImageURL = props.portraitImageURL;
        this.landscapeImageURL = props.landscapeImageURL;
        this.hubspotFormID = props.hubspotFormID;
    }

    static fromSanity(data: SanityWhitePaper, db: SanityDataset): WhitePaper {
        return new WhitePaper(Object.assign(resourcePropsFromSanity(data, db), {
            fileURL: db.resolveRef(data.file.asset).url,
            fileName: db.resolveRef(data.file.asset).originalFilename,
            tags: data.tags,
            portraitImageURL: db.resolveRef(data.portraitImage.asset).url,
            landscapeImageURL: db.resolveRef(data.landscapeImage.asset).url,
            hubspotFormID: data.hubspotFormID,
        }));
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
        hubspotFormIDField,
    ],
});
