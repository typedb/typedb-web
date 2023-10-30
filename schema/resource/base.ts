import { defineField } from "@sanity/types";
import { descriptionFieldRichText, requiredRule, titleFieldWithHighlights } from "../common-fields";
import { Link } from "../link";
import { MetaTags, metaTagsField } from "../page/meta-tags";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { isApplicationArticle, isBlogPost, isFundamentalArticle, isGenericResource, isLiveEvent, isWebinar, isWhitePaper, SanityResource, SanitySiteResource } from "./sanity";

export abstract class ResourceBase {
    readonly slug: string;
    readonly metaTags: MetaTags;
    readonly title: ParagraphWithHighlights;
    readonly description: PortableText;
    readonly shortTitle: string;
    readonly shortDescription: PortableText;
    readonly linkedResources: ResourceLink[];

    protected constructor(props: PropsOf<ResourceBase>) {
        this.slug = props.slug;
        this.metaTags = props.metaTags;
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
        metaTags: MetaTags.fromSanity((data.metaTags || {}), db),
        title: ParagraphWithHighlights.fromSanity(data.title),
        description: data.description,
        shortTitle: data.shortTitle,
        shortDescription: data.shortDescription || data.description,
        linkedResources: data.linkedResources?.map(x => ResourceLink.fromSanity(x, db)) || [],
    };
}

export class ResourceLink {
    readonly title: string;
    readonly description: PortableText;
    readonly link?: Link;

    constructor(props: PropsOf<ResourceLink>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
    }

    static fromSanity(dataRef: SanityReference<SanityResource>, db: SanityDataset): ResourceLink {
        const data = db.resolveRef(dataRef);
        if (isGenericResource(data)) return new ResourceLink({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db),
        }); else return new ResourceLink({
            title: data.shortTitle,
            description: data.shortDescription || data.description,
            link: new Link({ destination: siteResourceUrl(data), type: "route", opensNewTab: false }),
        });
    }
}

function siteResourceUrl(data: SanitySiteResource): string {
    if (isFundamentalArticle(data)) return `/learn/fundamentals/${data.slug.current}`;
    else if (isApplicationArticle(data)) return `/learn/applications/${data.slug.current}`;
    else if (isBlogPost(data)) return `/blog/${data.slug.current}`;
    else if (isWebinar(data)) return `/webinars/${data.slug.current}`;
    else if (isWhitePaper(data)) return `/white-papers/${data.slug.current}`;
    else if (isLiveEvent(data)) return `/events/${data.slug.current}`;
    else return "";
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
