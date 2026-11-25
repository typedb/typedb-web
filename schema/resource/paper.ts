import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { heroImageWarnings, slugField } from "../common-fields";
import { cioFormIDField } from "../form";
import { Link } from "../link";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourceCommonFields, resourcePropsFromSanity } from "./base";
import { SanityPaper, paperSchemaName } from "./sanity";

/** Shown on the research page in this order */
export const researchCategories = [
    { value: "robotics", title: "Robotics" },
    { value: "autonomous-driving", title: "Autonomous Driving" },
    { value: "space", title: "Space" },
    { value: "database-foundations", title: "TypeDB Foundations" },
    { value: "industry", title: "Industry" },
    { value: "life-sciences", title: "Life Sciences" },
    { value: "geoscience", title: "Geoscience" },
    { value: "humanities-public-sector", title: "Humanities & Public Sector" },
] as const;

export type ResearchCategoryID = (typeof researchCategories)[number]["value"];

export class Paper extends SiteResource {
    readonly fileURL?: string;
    readonly fileName?: string;
    readonly externalURL?: string;
    readonly publicationDate?: string;
    readonly authors: string[];
    readonly category?: ResearchCategoryID;
    readonly focus?: string;
    readonly tags: string[];
    readonly portraitImageURL?: string;
    readonly landscapeImageURL?: string;

    constructor(props: PropsOf<Paper>) {
        super(props);
        this.fileURL = props.fileURL;
        this.fileName = props.fileName;
        this.externalURL = props.externalURL;
        this.publicationDate = props.publicationDate;
        this.authors = props.authors;
        this.category = props.category;
        this.focus = props.focus;
        this.tags = props.tags;
        this.portraitImageURL = props.portraitImageURL;
        this.landscapeImageURL = props.landscapeImageURL;
    }

    static fromSanity(data: SanityPaper, db: SanityDataset): Paper {
        return new Paper(Object.assign(resourcePropsFromSanity(data, db), {
            fileURL: data.file && db.resolveRef(data.file.asset).url,
            fileName: data.file && db.resolveRef(data.file.asset).originalFilename,
            externalURL: data.externalUrl,
            publicationDate: data.publicationDate,
            authors: data.authors || [],
            category: data.category as ResearchCategoryID | undefined,
            focus: data.focus,
            tags: data.tags,
            portraitImageURL: data.portraitImage && db.resolveRef(data.portraitImage.asset).url,
            landscapeImageURL: data.landscapeImage && db.resolveRef(data.landscapeImage.asset).url,
        }));
    }

    detailsPageLink(): Link {
        return new Link({
            type: "route",
            destination: `research/${this.slug}`,
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
            name: "category",
            title: "Category",
            description: "The group this paper appears under on the research page",
            type: "string",
            options: { list: [...researchCategories] },
        }),
        defineField({
            name: "focus",
            title: "Focus",
            description: "A short tag for what the paper is about, e.g. \"Self-adaptive systems\"",
            type: "string",
        }),
        defineField({
            name: "authors",
            title: "Authors",
            description: "One name per item, in the order they appear on the paper",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "publicationDate",
            title: "Publication Date",
            description: "As precise as is known: 2025, 2025-05 or 2025-05-20",
            type: "string",
            validation: (rule) => rule.regex(/^d{4}(-d{2}(-d{2})?)?$/, { name: "date" }),
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
