import { SanityDocument, Slug } from "@sanity/types";
import { SanityImageRef } from "./image";
import { Person, SanityPerson } from "./person";
import { SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { PortableText } from "./text";
import { PropsOf } from "./util";

export interface WordpressSite {
    ID: number;
    URL: string;
    description: string;
    is_following: boolean;
    logo: WordpressSiteLogo;
    name: string;
    subscribers_count: number;
}

export interface WordpressSiteLogo {
    id: number;
    sizes: any[];
    url: string;
}

export interface WordpressPosts {
    found: number;
    posts: WordpressPost[];
}

export interface WordpressPost {
    ID: number;
    URL: string;
    attachment_count: number;
    attachments: { [id: number]: WordpressAttachment; };
    author: WordpressAuthor;
    categories: { [name: string]: WordpressTaxonomy; };
    content: string;
    date: string;
    discussion: any;
    excerpt: string;
    featured_image: string;
    global_ID: string;
    i_like: boolean;
    is_following: boolean;
    is_reblogged: boolean;
    like_count: number;
    likes_enabled: boolean;
    menu_order: number;
    meta: any;
    metadata: any[];
    modified: string;
    other_URLs: any;
    post_thumbnail: any;
    sharing_enabled: boolean;
    short_URL: string;
    slug: string;
    status: "publish";
    sticky: boolean;
    tags: { [name: string]: WordpressTaxonomy };
    terms: any;
    title: string;
}

export interface WordpressAttachment {
    ID: number;
    URL: string;
    alt: string;
    author_ID: number;
    caption: string;
    date: string;
    description: string;
    height: number;
    thumbnails: any;
    title: string;
    width: number;
}

export interface WordpressAuthor {
    ID: number;
    URL: string;
    avatar_URL: string;
    email: boolean;
    first_name: string;
    last_name: string;
    name: string;
    profile_URL: string;
}

export interface WordpressCategoriesResponse {
    found: number;
    categories: WordpressTaxonomy[];
}

export interface WordpressTaxonomy {
    ID: number;
    description: string;
    meta: any;
    name: string;
    parent: number;
    post_count: number;
    slug: string;
}

export type WordpressRelatedPosts = {
    category: WordpressTaxonomy;
    posts: WordpressPost[];
}[];

export type WordpressACFResponse = {
    id: number;
    acf: WordpressACF;
}[];

export interface WordpressACF {
    social_sharing_description: string | null;
}

export type BlogFilter = BlogNullFilter | BlogCategoryFilter;

export type BlogNullFilter = {};

export const blogNullFilter: () => BlogNullFilter = () => ({});

export type BlogCategoryFilter = { categorySlug: string }

export const blogCategories = {
    announcements: "Announcements",
    applications: "Applications",
    engineering: "Engineering",
    philosophy: "Philosophy",
    tutorials: "Tutorials",
} as const;

export const blogCategoryList = Object.keys(blogCategories);

export type BlogCategoryID = keyof typeof blogCategories;

export interface SanityArticle extends SanityDocument {
    slug: Slug;
    title: PortableText;
    excerpt: PortableText;
    relatedArticles: SanityReference<SanityArticle>[];
}

export interface SanityFundamentalArticle extends SanityArticle {}

export interface SanityApplicationArticle extends SanityArticle {}

export interface SanityBlogPost extends SanityArticle {
    author: SanityReference<SanityPerson>;
    categories: BlogCategoryID[];
    image: SanityImage;
}

export abstract class Article {
    readonly slug: string;
    readonly title: PortableText;
    readonly excerpt: PortableText;

    protected constructor(props: PropsOf<Article>) {
        this.slug = props.slug;
        this.title = props.title;
        this.excerpt = props.excerpt;
    }

    static fromApi(data: SanityArticle): PropsOf<Article> {
        return {
            slug: data.slug.current,
            title: data.title,
            excerpt: data.excerpt,
        };
    }
}

export class BlogPost extends Article {
    readonly author: Person;
    readonly categories: BlogCategoryID[];
    readonly contentHtml: string;
    readonly dateString: string;
    readonly imageURL: string;

    constructor(props: PropsOf<BlogPost>) {
        this.slug = props.slug;
        this.title = props.title;
        this.author = props.author;
        this.categories = props.categories;
        this.contentHtml = props.contentHtml;
        this.dateString = props.dateString;
        this.excerpt = props.excerpt;
        this.imageURL = props.imageURL;
    }

    static override fromApi(data: SanityBlogPost, db: SanityDataset, wordpressPost: WordpressPost): BlogPost {
        return new BlogPost({
            slug: data.slug.current,
            title: data.title,
            author: Person.fromSanity(db.resolveRef(data.author), db),
            categories: data.categories,
            contentHtml: wordpressPost.content,
            dateString: wordpressPost.date,
            excerpt: data.excerpt,
            imageURL: db.resolveRef(data.image.asset).url,
        });
    }
}
