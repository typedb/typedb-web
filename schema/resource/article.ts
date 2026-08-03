import { BulbOutlineIcon, DocumentTextIcon, PlugIcon } from "@sanity/icons";
import { defineField, defineType, SlugRule } from "@sanity/types";
import axios, { AxiosError } from "axios";
import { authorField, imageFieldOptional, requiredRule, slugField } from "../common-fields";
import { Link } from "../link";
import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourceCommonFields, ResourceLink, resourcePropsFromSanity } from "./base";
import { blogCategories, BlogCategoryID } from "./blog-category";
import {
    applicationArticleSchemaName, blogPostBackupHeroImageURL, BlogPostLevel, blogPostSchemaName,
    fundamentalArticleSchemaName, isApplicationArticle, isBlogPost, isFundamentalArticle,
    SanityApplicationArticle, SanityArticle, SanityBlogPost, SanityFundamentalArticle,
} from "./sanity";

export interface WordpressPost {
    ID: number;
    slug: string;
    content: string;
}

// Lightweight form used when transferring the full post list to the browser - carries what
// list views need without the post body, which is only transferred for the article being viewed.
export interface WordpressPostSummary {
    ID: number;
    slug: string;
    readingTimeMins: number;
}

export function wordpressReadingTimeMins(content: string): number {
    return Math.max(1, Math.ceil((content.match(/\s+/g)?.length || 0) / 200));
}

// Tolerate a missing or dangling author reference (possible in drafts, since Sanity
// validation only blocks publishing) so one bad post doesn't 404 the whole blog
function blogPostAuthor(data: SanityBlogPost, db: SanityDataset): Person | null {
    const person = db.tryResolveRef(data.author);
    if (!person) console.warn(`Blog post '${data.slug.current}' references an author that could not be resolved: `, data.author);
    return person ? Person.fromSanity(person, db) : null;
}

export class BlogPostLink extends ResourceLink {
    readonly author: Person | null;

    constructor(props: PropsOf<BlogPostLink>) {
        super(props);
        this.author = props.author;
    }

    static override fromSanity(data: SanityBlogPost, db: SanityDataset): BlogPostLink {
        return new BlogPostLink(
            Object.assign(super.fromSanity(data, db), {
                author: blogPostAuthor(data, db),
                imageURL: data.image
                    ? db.resolveRef(data.image.asset).url
                    : blogPostBackupHeroImageURL(data.slug.current),
            })
        );
    }
}

export type BlogFilter = BlogNullFilter | BlogCategoryFilter;

export type BlogNullFilter = {};

export const blogNullFilter: () => BlogNullFilter = () => ({});

export type BlogCategoryFilter = { categorySlug: string };

export abstract class Article extends SiteResource {
    readonly contentHtml: string;
    readonly canonicalUrl?: string;
    readonly readingTimeMins: number;

    protected constructor(props: PropsOf<Article>) {
        super(props);
        this.contentHtml = props.contentHtml;
        this.canonicalUrl = props.canonicalUrl;
        this.readingTimeMins = props.readingTimeMins;
    }

    abstract pageTitle(): string;
}

function articlePropsFromWPApi(
    data: SanityArticle,
    db: SanityDataset,
    wordpressPost: WordpressPost | WordpressPostSummary
): PropsOf<Article> {
    const contentHtml = "content" in wordpressPost ? wordpressPost.content : "";
    return {
        ...resourcePropsFromSanity(data, db),
        contentHtml,
        canonicalUrl: data.canonicalUrl,
        imageURL: data.image && db.resolveRef(data.image.asset).url,
        readingTimeMins: "readingTimeMins" in wordpressPost
            ? wordpressPost.readingTimeMins
            : wordpressReadingTimeMins(contentHtml),
    };
}

export class FundamentalArticle extends Article {
    static fromApi(
        data: SanityFundamentalArticle,
        db: SanityDataset,
        wordpressPost: WordpressPost | WordpressPostSummary
    ): FundamentalArticle {
        return new FundamentalArticle(articlePropsFromWPApi(data, db, wordpressPost));
    }

    pageTitle(): string {
        return `TypeDB Fundamentals: ${this.title.toPlainText()}`;
    }
}

export class ApplicationArticle extends Article {
    static fromApi(
        data: SanityApplicationArticle,
        db: SanityDataset,
        wordpressPost: WordpressPost | WordpressPostSummary
    ): ApplicationArticle {
        return new ApplicationArticle(articlePropsFromWPApi(data, db, wordpressPost));
    }

    pageTitle(): string {
        return `TypeDB Applications: ${this.title.toPlainText()}`;
    }
}

export class BlogPost extends Article {
    readonly level: BlogPostLevel;
    readonly author: Person | null;
    readonly categories: BlogCategoryID[];
    readonly date: Date;

    constructor(props: PropsOf<BlogPost>) {
        super(props);
        this.level = props.level;
        this.author = props.author;
        this.categories = props.categories;
        this.date = props.date;
    }

    static fromSanityAndWPApi(data: SanityBlogPost, db: SanityDataset, wordpressPost: WordpressPost | WordpressPostSummary): BlogPost {
        return new BlogPost(
            Object.assign(articlePropsFromWPApi(data, db, wordpressPost), {
                level: data.level,
                author: blogPostAuthor(data, db),
                categories: data.categories,
                date: new Date(data.date),
            })
        );
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

    pageTitle(): string {
        return `TypeDB Blog: ${this.title.toPlainText()}`;
    }

    canonicalURL(): string {
        return this.canonicalUrl || `https://typedb.com/blog/${this.slug}`;
    }
}

export function articleFromWPApi(data: SanityArticle, db: SanityDataset, wordpressPost: WordpressPost | WordpressPostSummary): Article {
    if (isFundamentalArticle(data)) return FundamentalArticle.fromApi(data, db, wordpressPost);
    else if (isApplicationArticle(data)) return ApplicationArticle.fromApi(data, db, wordpressPost);
    else if (isBlogPost(data)) return BlogPost.fromSanityAndWPApi(data, db, wordpressPost);
    else throw "Unreachable code";
}

const blogPostBySlugUrl = (slug: string) => `https://public-api.wordpress.com/wp/v2/sites/typedb.wordpress.com/posts?slug=${slug}&_fields=id`;

async function wordpressPostExists(slug: string): Promise<boolean> {
    try {
        const res = await axios.get<any[]>(blogPostBySlugUrl(slug));
        return res.data.length > 0;
    } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 404) {
            return false;
        } else {
            throw err;
        }
    }
}

export const wordpressSlugField = Object.assign({}, slugField, {
    description: "Must match the post's slug in WordPress. Content is pulled from WordPress",
    validation: (rule: SlugRule) =>
        rule.custom(async (value) => {
            if (!value?.current) return "Required";
            if (value.current.includes("/")) return "Slug must not contain slashes (including at start/end)";
            const exists = await wordpressPostExists(value.current);
            return exists ? true : `WordPress post with slug '${value.current}' not found`;
        }),
});

const articleSchemaBase = defineType({
    name: "article",
    type: "document",
    fields: [
        wordpressSlugField,
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
        }),
        ...resourceCommonFields,
    ],
});

const fundamentalArticleSchema = defineType(Object.assign({}, articleSchemaBase, {
    name: fundamentalArticleSchemaName,
    title: "Fundamental Article",
    icon: BulbOutlineIcon,
}));

const applicationArticleSchema = defineType(Object.assign({}, articleSchemaBase, {
    name: applicationArticleSchemaName,
    title: "Application Article",
    icon: PlugIcon,
}));

const blogPostSchema = defineType(Object.assign({}, articleSchemaBase, {
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
            of: [{ type: "string" }],
            options: {
                layout: "grid",
                list: Object.entries(blogCategories).map(([id, title]) => ({ value: id, title: title })),
            },
            validation: requiredRule,
            initialValue: ["engineering"],
        }),
    ],
}));

export const articleSchemas = [fundamentalArticleSchema, applicationArticleSchema, blogPostSchema];
