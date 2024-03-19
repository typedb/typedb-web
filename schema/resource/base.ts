import { defineField } from "@sanity/types";
import { descriptionFieldRichText, requiredRule, titleFieldWithHighlights } from "../common-fields";
import { Link } from "../link";
import { MetaTags, metaTagsField } from "../page/meta-tags";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { isApplicationArticle, isBlogPost, isFundamentalArticle, isGenericResource, isLiveEvent, isLecture, isPaper, SanityResource, SanitySiteResource } from "./sanity";
import { furtherLearningFieldOptional, ResourceSection } from "./section";

export abstract class SiteResource {
    readonly slug: string;
    readonly metaTags: MetaTags;
    readonly title: ParagraphWithHighlights;
    readonly description: PortableText;
    readonly shortTitle: string;
    readonly shortDescription: string;
    readonly furtherLearning?: ResourceSection;

    protected constructor(props: PropsOf<SiteResource>) {
        this.slug = props.slug;
        this.metaTags = props.metaTags;
        this.title = props.title;
        this.description = props.description;
        this.shortTitle = props.shortTitle;
        this.shortDescription = props.shortDescription;
        this.furtherLearning = props.furtherLearning;
    }
}

export function resourcePropsFromSanity(data: SanitySiteResource, db: SanityDataset): PropsOf<SiteResource> {
    return {
        slug: data.slug.current,
        metaTags: MetaTags.fromSanity((data.metaTags || {}), db),
        title: ParagraphWithHighlights.fromSanity(data.title),
        description: data.description,
        shortTitle: data.shortTitle,
        shortDescription: data.shortDescription || "",
        furtherLearning: data.furtherLearning?.isVisible
            ? ResourceSection.fromSanityFurtherLearningSection(data.furtherLearning, db)
            : undefined,
    };
}

export class ResourceLink {
    readonly title: string;
    readonly description: string;
    readonly link?: Link;
    readonly linkText: string;

    constructor(props: PropsOf<ResourceLink>) {
        this.title = props.title;
        this.description = props.description;
        this.link = props.link;
        this.linkText = props.linkText;
    }

    static fromSanity(data: SanityResource, db: SanityDataset, useLongTitle: boolean = false): ResourceLink {
        if (isGenericResource(data)) return new ResourceLink({
            title: data.title,
            description: data.description,
            link: Link.fromSanityLinkRef(data.link, db),
            linkText: data.linkText,
        }); else return new ResourceLink({
            title: useLongTitle ? ParagraphWithHighlights.fromSanity(data.title).toPlainText() : data.shortTitle,
            description: data.shortDescription,
            link: new Link({ destination: siteResourceUrl(data), type: "route", opensNewTab: false }),
            linkText: resourceLinkText(data),
        });
    }
}

function siteResourceUrl(data: SanitySiteResource): string {
    if (isFundamentalArticle(data)) return `/fundamentals/${data.slug.current}`;
    else if (isApplicationArticle(data)) return `/applications/${data.slug.current}`;
    else if (isBlogPost(data)) return `/blog/${data.slug.current}`;
    else if (isLecture(data)) return `/lectures/${data.slug.current}`;
    else if (isPaper(data)) return `/papers/${data.slug.current}`;
    else if (isLiveEvent(data)) return `/events/${data.slug.current}`;
    else return "";
}

export function resourceLinkText(data: SanityResource): string {
    if (isGenericResource(data)) return data.linkText;
    else if (isFundamentalArticle(data)) return `Read article`;
    else if (isApplicationArticle(data)) return `Read article`;
    else if (isBlogPost(data)) return `Read article`;
    else if (isLecture(data)) return `Watch lecture`;
    else if (isPaper(data)) return `Read paper`;
    else if (isLiveEvent(data)) return `Go to event`;
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
    furtherLearningFieldOptional,
];
