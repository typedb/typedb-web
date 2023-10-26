import { BulbOutlineIcon, DocumentTextIcon, PlugIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument, Slug, SlugRule } from "@sanity/types";
import axios from "axios";
import { authorField, imageFieldOptional, requiredRule, slugField, titleFieldWithHighlights } from "./common-fields";
import { metaTagsField } from "./page/meta-tags";
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
    previewText: PortableText;
    relatedArticles: SanityReference<SanityArticle>[];
}

export interface SanityFundamentalArticle extends SanityArticle {}

export interface SanityApplicationArticle extends SanityArticle {}

export interface SanityBlogPost extends SanityArticle {
    author: SanityReference<SanityPerson>;
    categories: BlogCategoryID[];
    image?: SanityImage;
}

export abstract class Article {
    readonly slug: string;
    readonly title: PortableText;
    readonly previewText: PortableText;

    protected constructor(props: PropsOf<Article>) {
        this.slug = props.slug;
        this.title = props.title;
        this.previewText = props.previewText;
    }
}

function articlePropsFromApi(data: SanityArticle): PropsOf<Article> {
    return {
        slug: data.slug.current,
        title: data.title,
        previewText: data.previewText,
    };
}

export class FundamentalArticle extends Article {
    static fromApi(data: SanityFundamentalArticle): FundamentalArticle {
        return new FundamentalArticle(articlePropsFromApi(data));
    }
}

export class ApplicationArticle extends Article {
    static fromApi(data: SanityApplicationArticle): ApplicationArticle {
        return new ApplicationArticle(articlePropsFromApi(data));
    }
}

export class BlogPost extends Article {
    readonly author: Person;
    readonly categories: BlogCategoryID[];
    readonly contentHtml: string;
    readonly dateString: string;
    readonly imageURL?: string;

    constructor(props: PropsOf<BlogPost>) {
        super(props);
        this.author = props.author;
        this.categories = props.categories;
        this.contentHtml = props.contentHtml;
        this.dateString = props.dateString;
        this.imageURL = props.imageURL;
    }

    static fromApi(data: SanityBlogPost, db: SanityDataset, wordpressPost: WordpressPost): BlogPost {
        return new BlogPost(Object.assign(articlePropsFromApi(data), {
            author: Person.fromSanity(db.resolveRef(data.author), db),
            categories: data.categories,
            contentHtml: wordpressPost.content,
            dateString: wordpressPost.date,
            imageURL: data.image && db.resolveRef(data.image.asset).url,
        }));
    }
}

export const fundamentalArticleSchemaName = `fundamentalArticle`;
export const applicationArticleSchemaName = `applicationArticle`;
export const blogPostSchemaName = `blogPost`;

const BLOG_POSTS_URL = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts";
const BLOG_POSTS_MIN_REFRESH_INTERVAL_MS = 3000;

async function wordpressPostSlugs(): Promise<string[]> {
    if (!(window as any)["wordpressData"]) {
        (window as any)["wordpressData"] = { postSlugs: [], lastUpdated: 0 };
    }
    const wordpressData = (window as any)["wordpressData"] as { postSlugs: string[], lastUpdated: number };
    if (Date.now() - wordpressData.lastUpdated < BLOG_POSTS_MIN_REFRESH_INTERVAL_MS) {
        return wordpressData.postSlugs;
    }
    wordpressData.lastUpdated = Date.now();
    const { data } = await axios.get<{ found: number, posts: { slug: string }[] }>(BLOG_POSTS_URL, {
        params: { "fields": "slug" },
    });
    wordpressData.postSlugs = data.posts.map(x => x.slug);
    return wordpressData.postSlugs;
}

const articleBaseSchema = defineType({
    name: "article",
    type: "document",
    fields: [
        Object.assign({}, slugField, {
            description: "Must match the post's slug in WordPress. Content is pulled from WordPress",
            validation: (rule: SlugRule) => rule.custom(async (value) => {
                if (!value?.current) return "Required";
                const slugs = await wordpressPostSlugs();
                return slugs.includes(value.current) || `WordPress post with slug '${value.current}' not found`;
            }),
        }),
        titleFieldWithHighlights,
        defineField({
            name: "previewText",
            title: "Preview Text",
            type: "array",
            of: [{type: "block"}],
        }),
        metaTagsField,
    ],
});

const fundamentalArticleSchema = Object.assign({}, articleBaseSchema, {
    name: fundamentalArticleSchemaName,
    title: "Fundamental Article",
    icon: BulbOutlineIcon,
});

const applicationArticleSchema = Object.assign({}, articleBaseSchema, {
    name: applicationArticleSchemaName,
    title: "Application Article",
    icon: PlugIcon,
});

const blogPostSchema = Object.assign({}, articleBaseSchema, {
    name: blogPostSchemaName,
    title: "Blog Post",
    icon: DocumentTextIcon,
    fields: [
        ...articleBaseSchema.fields,
        authorField,
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{type: "string"}],
            options: {
                layout: "grid",
                list: Object.entries(blogCategories).map(([id, title]) => ({ value: id, title: title })),
            },
            validation: requiredRule,
            initialValue: ["engineering"],
        }),
        imageFieldOptional,
    ],
});

export const articleSchemas = [fundamentalArticleSchema, applicationArticleSchema, blogPostSchema];
