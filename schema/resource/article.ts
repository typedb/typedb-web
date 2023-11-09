import { BulbOutlineIcon, DocumentTextIcon, PlugIcon } from "@sanity/icons";
import { defineField, defineType, SlugRule } from "@sanity/types";
import axios from "axios";
import { authorField, imageFieldOptional, requiredRule, slugField } from "../common-fields";
import { Link } from "../link";
import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourceCommonFields, ResourceLink, resourcePropsFromSanity } from "./base";
import { blogCategories, BlogCategoryID } from "./blog-category";
import {
    applicationArticleSchemaName, blogPostBackupHeroImageURL, BlogPostLevel, blogPostSchemaName,
    fundamentalArticleSchemaName, isApplicationArticle, isBlogPost, isFundamentalArticle, SanityApplicationArticle,
    SanityArticle, SanityBlogPost, SanityFundamentalArticle
} from "./sanity";

export interface WordpressPosts {
    found: number;
    posts: WordpressPost[];
}

export interface WordpressPost {
    ID: number;
    slug: string;
    content: string;
}

export class BlogPostLink extends ResourceLink {
    readonly author: Person;
    readonly imageURL: string;

    constructor(props: PropsOf<BlogPostLink>) {
        super(props);
        this.author = props.author;
        this.imageURL = props.imageURL;
    }

    static override fromSanity(data: SanityBlogPost, db: SanityDataset): BlogPostLink {
        return new BlogPostLink(Object.assign(super.fromSanity(data, db), {
            author: Person.fromSanity(db.resolveRef(data.author), db),
            imageURL: data.image ? db.resolveRef(data.image.asset).url : blogPostBackupHeroImageURL(data.slug.current),
        }));
    }
}

export type RelatedBlogPosts = {
    categorySlug: BlogCategoryID;
    posts: BlogPostLink[];
}[];

export type BlogFilter = BlogNullFilter | BlogCategoryFilter;

export type BlogNullFilter = {};

export const blogNullFilter: () => BlogNullFilter = () => ({});

export type BlogCategoryFilter = { categorySlug: string }

export abstract class Article extends SiteResource {
    readonly contentHtml: string;
    readonly linkedResources: ResourceLink[];

    protected constructor(props: PropsOf<Article>) {
        super(props);
        this.contentHtml = props.contentHtml;
        this.linkedResources = props.linkedResources;
    }
}

function articlePropsFromApi(data: SanityArticle, db: SanityDataset, wordpressPost: WordpressPost): PropsOf<Article> {
    return Object.assign(resourcePropsFromSanity(data, db), {
        contentHtml: wordpressPost.content,
        linkedResources: data.linkedResources?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db)) || [],
    });
}

export class FundamentalArticle extends Article {
    static fromApi(data: SanityFundamentalArticle, db: SanityDataset, wordpressPost: WordpressPost): FundamentalArticle {
        return new FundamentalArticle(articlePropsFromApi(data, db, wordpressPost));
    }
}

export class ApplicationArticle extends Article {
    static fromApi(data: SanityApplicationArticle, db: SanityDataset, wordpressPost: WordpressPost): ApplicationArticle {
        return new ApplicationArticle(articlePropsFromApi(data, db, wordpressPost));
    }
}

export class BlogPost extends Article {
    readonly level: BlogPostLevel;
    readonly author: Person;
    readonly categories: BlogCategoryID[];
    readonly date: Date;
    readonly imageURL?: string;

    constructor(props: PropsOf<BlogPost>) {
        super(props);
        this.level = props.level;
        this.author = props.author;
        this.categories = props.categories;
        this.date = props.date;
        this.imageURL = props.imageURL;
    }

    static fromApi(data: SanityBlogPost, db: SanityDataset, wordpressPost: WordpressPost): BlogPost {
        return new BlogPost(Object.assign(articlePropsFromApi(data, db, wordpressPost), {
            level: data.level,
            author: Person.fromSanity(db.resolveRef(data.author), db),
            categories: data.categories,
            date: new Date(data.date),
            imageURL: data.image && db.resolveRef(data.image.asset).url,
        }));
    }

    readPostLink(): Link {
        return new Link({
            type: "route",
            destination: `/blog/${this.slug}`,
            opensNewTab: false,
        });
    }

    heroImageURL(): string {
        if (this.imageURL) return this.imageURL;
        else return blogPostBackupHeroImageURL(this.slug);
    }
}

export function articleFromApi(data: SanityArticle, db: SanityDataset, wordpressPost: WordpressPost): Article {
    if (isFundamentalArticle(data)) return FundamentalArticle.fromApi(data, db, wordpressPost);
    else if (isApplicationArticle(data)) return ApplicationArticle.fromApi(data, db, wordpressPost);
    else if (isBlogPost(data)) return BlogPost.fromApi(data, db, wordpressPost);
    else throw "Unreachable code";
}

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

const articleSchemaBase = defineType({
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
        ...resourceCommonFields,
    ],
});

const fundamentalArticleSchema = Object.assign({}, articleSchemaBase, {
    name: fundamentalArticleSchemaName,
    title: "Fundamental Article",
    icon: BulbOutlineIcon,
});

const applicationArticleSchema = Object.assign({}, articleSchemaBase, {
    name: applicationArticleSchemaName,
    title: "Application Article",
    icon: PlugIcon,
});

const blogPostSchema = Object.assign({}, articleSchemaBase, {
    name: blogPostSchemaName,
    title: "Blog Post",
    icon: DocumentTextIcon,
    fields: [
        ...articleSchemaBase.fields,
        defineField({
            name: "level",
            title: "Level",
            type: "string",
            options: {
                layout: "radio",
                direction: "horizontal",
                list: [
                    { value: "primary", title: "Primary" },
                    { value: "secondary", title: "Secondary" },
                    { value: "tertiary", title: "Tertiary" },
                ],
            },
            validation: requiredRule,
            initialValue: "tertiary",
        }),
        authorField,
        defineField({
            name: "date",
            title: "Published Date",
            type: "datetime",
            validation: requiredRule,
        }),
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
