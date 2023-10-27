import { defineField } from "@sanity/types";
import { descriptionFieldRichText, requiredRule, titleFieldWithHighlights } from "../common-fields";
import { metaTagsField } from "../page/meta-tags";
import { SanityDataset, SanityReference } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";
import { isApplicationArticle, isBlogPost, isFundamentalArticle, isGenericResource, isLiveEvent, isWebinar, isWhitePaper, SanityResource, SanitySiteResource } from "./sanity";

export interface ResourceLink {
    title: string;
    description: PortableText;
    url: string;
}

function resourceLinkFromSanity(dataRef: SanityReference<SanityResource>, db: SanityDataset): ResourceLink {
    const data = db.resolveRef(dataRef);
    if (isGenericResource(data)) return {
        title: data.title,
        description: data.description,
        url: db.resolveRef(data.link).destination!.current
    }; else return {
        title: data.shortTitle,
        description: data.shortDescription,
        url: siteResourceUrl(data),
    }
}

function siteResourceUrl(data: SanitySiteResource): string {
    if (isFundamentalArticle(data)) return `/learn/fundamentals/${data.slug}`;
    else if (isApplicationArticle(data)) return `/learn/applications/${data.slug}`;
    else if (isBlogPost(data)) return `/blog/${data.slug}`;
    else if (isWebinar(data)) return `/webinars/${data.slug}`;
    else if (isWhitePaper(data)) return `/white-papers/${data.slug}`;
    else if (isLiveEvent(data)) return `/events/${data.slug}`;
    else return "";
}

export abstract class ResourceBase {
    readonly slug: string;
    readonly title: PortableText;
    readonly description: PortableText;
    readonly shortTitle: string;
    readonly shortDescription: PortableText;
    readonly linkedResources: ResourceLink[];

    protected constructor(props: PropsOf<ResourceBase>) {
        this.slug = props.slug;
        this.title = props.title;
        this.description = props.description;
        this.shortTitle = props.shortTitle;
        this.shortDescription = props.shortDescription;
        this.linkedResources = props.linkedResources;
    }
}

export function resourcePropsFromSanity(data: SanitySiteResource, db: SanityDataset): PropsOf<ResourceBase> {
    return {
        slug: data.slug.current,
        title: data.title,
        description: data.description,
        shortTitle: data.shortTitle,
        shortDescription: data.shortDescription,
        linkedResources: data.linkedResources.map(x => resourceLinkFromSanity(x, db)),
    };
}

export const resourceCommonFields = [
    metaTagsField,
    titleFieldWithHighlights,
    defineField({ ...descriptionFieldRichText, validation: requiredRule }),
    defineField({
        name: "shortTitle",
        title: "Short Title",
        description: "Displayed in link panels, etc.",
        type: "string",
    }),
    defineField({
        name: "shortDescription",
        title: "Short Description",
        description: "Displayed in link panels, etc.",
        type: "text",
    }),
];
