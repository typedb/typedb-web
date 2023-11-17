import { defineField, defineType, SanityDocument, Slug } from "@sanity/types";
import { SanityButton } from "../button";
import { bodyFieldRichText, isVisibleField, requiredRule, resourcesField, SanityVisibleToggle, sectionIdField } from "../common-fields";
import { SanityTechnicolorBlock } from "../component/technicolor-block";
import { SanityLink } from "../link";
import { SanityMetaTags } from "../page/meta-tags";
import { SanityPerson } from "../person";
import { SanityFile, SanityImage, SanityReference } from "../sanity-core";
import { PortableText } from "../text";
import { BlogCategoryID } from "./blog-category";
import { EventSignupMethod, SanityEventDate } from "./live-event-details";

export type SanityResource = SanityGenericResource | SanityArticle | SanityLecture | SanityWhitePaper | SanityLiveEvent;

// Because in Sanity every Resource can link to every other kind of Resource, they must all be declared
// in the same file to avoid circular dependencies
export interface SanitySiteResource extends SanityDocument {
    slug: Slug;
    metaTags?: SanityMetaTags;
    title: PortableText;
    description: PortableText;
    shortTitle: string;
    shortDescription: PortableText;
    furtherLearning?: SanityResourceSection;
}

export interface SanityGenericResource extends SanityDocument {
    _type: typeof genericResourceSchemaName;
    title: string;
    description: PortableText;
    link: SanityReference<SanityLink>;
    linkText: string;
}

export interface SanityArticle extends SanitySiteResource {}

export interface SanityFundamentalArticle extends SanityArticle {
    _type: typeof fundamentalArticleSchemaName;
}

export interface SanityApplicationArticle extends SanityArticle {
    _type: typeof applicationArticleSchemaName;
}

export interface SanityBlogPost extends SanityArticle {
    _type: typeof blogPostSchemaName;
    level: BlogPostLevel;
    author: SanityReference<SanityPerson>;
    date: string;
    categories: BlogCategoryID[];
    image?: SanityImage;
}

export type BlogPostLevel = "primary" | "secondary" | "tertiary";

export function blogPostBackupHeroImageURL(slug: string) {
    switch (slug.length % 3) {
        case 0:
            return "/assets/graphic/blog-placeholder-image-0.svg";
        case 1:
            return "/assets/graphic/blog-placeholder-image-1.svg";
        case 2:
        default:
            return "/assets/graphic/blog-placeholder-image-2.webp";
    }
}

export interface SanityEventBase extends SanitySiteResource {
    image: SanityImage;
    speakers: SanityReference<SanityPerson>[];
    hubspotFormID?: string;
    metaTags?: SanityMetaTags;
}

export interface SanityLecture extends SanityEventBase {
    _type: typeof lectureSchemaName;
    datetime: string;
    durationMins: number;
    airmeetID?: string;
    lectureSlides?: SanityFile;
    onDemandVideoURL?: string;
    comingSoon: boolean;
}

export interface SanityWhitePaper extends SanitySiteResource {
    _type: typeof whitePaperSchemaName;
    file: SanityFile;
    tags: string[];
    portraitImage: SanityImage;
    landscapeImage: SanityImage;
    furtherLearning?: SanityResourceSection;
    hubspotFormID: string;
    metaTags?: SanityMetaTags;
}

export interface SanityLiveEvent extends SanityEventBase {
    _type: typeof liveEventSchemaName;
    tag: string;
    venue: string;
    dateOptions: SanityEventDate;
    signupMethod: EventSignupMethod;
    externalUrlButton?: SanityButton;
}

export interface SanityResourceSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    resources?: SanityReference<SanityResource>[];
}

export const genericResourceSchemaName = "genericResource";
export const fundamentalArticleSchemaName = "fundamentalArticle";
export const applicationArticleSchemaName = "applicationArticle";
export const blogPostSchemaName = "blogPost";
export const lectureSchemaName = "lecture";
export const whitePaperSchemaName = "whitePaper";
export const liveEventSchemaName = "liveEvent";

export function isGenericResource(data: SanityResource): data is SanityGenericResource {
    return data._type === genericResourceSchemaName;
}

export function isFundamentalArticle(data: SanityResource): data is SanityFundamentalArticle {
    return data._type === fundamentalArticleSchemaName;
}

export function isApplicationArticle(data: SanityResource): data is SanityApplicationArticle {
    return data._type === applicationArticleSchemaName;
}

export function isBlogPost(data: SanityArticle): data is SanityBlogPost {
    return data._type === blogPostSchemaName;
}

export function isLecture(data: SanityArticle): data is SanityLecture {
    return data._type === lectureSchemaName;
}

export function isWhitePaper(data: SanityArticle): data is SanityWhitePaper {
    return data._type === whitePaperSchemaName;
}

export function isLiveEvent(data: SanityArticle): data is SanityLiveEvent {
    return data._type === liveEventSchemaName;
}
