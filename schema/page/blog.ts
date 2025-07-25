import { defineField, defineType, NumberRule, SanityDocument } from "@sanity/types";
import { collapsibleOptions, requiredRule, resourcesFieldOptional, SanityVisibleToggle, titleFieldWithHighlights } from "../common-fields";
import { BlogPost } from "../resource/article";
import { ResourceLink } from "../resource/base";
import { blogCategories, BlogCategoryID, blogCategoryList } from "../resource/blog-category";
import { BlogPostLevel, SanityResource } from "../resource/sanity";
import { Document, SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { MetaTags, metaTagsField, SanityMetaTags } from "./meta-tags";

export interface SanityBlog extends SanityDocument {
    title: string;
    blogTitle: PortableText;
    blogSubtitle: PortableText;
    tabs: Record<"all" | BlogCategoryID, SanityBlogTab>;
}

export interface SanityBlogTab {
    metaTags?: SanityMetaTags;
    additionalRows?: SanityBlogRow[];
}

type SanityBlogRow = SanityResourcePanelsRow;

interface SanityResourcePanelsRow extends SanityVisibleToggle {
    title: PortableText;
    rowIndex: number;
    resources?: SanityReference<SanityResource>[];
}

export class Blog extends Document {
    readonly title: string;
    readonly blogTitle: ParagraphWithHighlights;
    readonly blogSubtitle: ParagraphWithHighlights;
    readonly tabs: Record<"all" | BlogCategoryID, BlogTab>;

    constructor(data: SanityBlog, db: SanityDataset) {
        super(data);
        this.title = data.title;
        this.blogTitle = ParagraphWithHighlights.fromSanity(data.blogTitle);
        this.blogSubtitle = ParagraphWithHighlights.fromSanity(data.blogSubtitle);
        this.tabs = Object.fromEntries(Object.entries(data.tabs).map(([categoryID, tab]) => [categoryID, BlogTab.fromSanity(tab, db)])) as any;
    }
}

export class BlogTab {
    readonly metaTags: MetaTags;
    readonly additionalRows: BlogAdditionalRow[];

    constructor(props: PropsOf<BlogTab>) {
        this.metaTags = props.metaTags;
        this.additionalRows = props.additionalRows;
    }

    static fromSanity(data: SanityBlogTab, db: SanityDataset): BlogTab {
        return new BlogTab({
            metaTags: MetaTags.fromSanity(data.metaTags || {}, db),
            additionalRows: (data.additionalRows || []).map(x => ResourcePanelsRow.fromSanity(x, db))
        });
    }
}

type BlogAdditionalRow = ResourcePanelsRow;

export class BlogPostsRow {
    readonly level: BlogPostLevel;
    readonly posts: BlogPost[];

    constructor(props: PropsOf<BlogPostsRow>) {
        this.level = props.level;
        this.posts = props.posts;
    }
}

export type BlogRow = BlogPostsRow | BlogAdditionalRow;

export class ResourcePanelsRow {
    readonly title: ParagraphWithHighlights;
    readonly rowIndex: number;
    readonly resources: ResourceLink[];

    constructor(props: PropsOf<ResourcePanelsRow>) {
        this.title = props.title;
        this.rowIndex = props.rowIndex;
        this.resources = props.resources;
    }

    static fromSanity(data: SanityResourcePanelsRow, db: SanityDataset): ResourcePanelsRow {
        return new ResourcePanelsRow({
            title: ParagraphWithHighlights.fromSanity(data.title),
            rowIndex: data.rowIndex,
            resources: data.resources?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db)) || [],
        });
    }
}

const resourcePanelsRowSchemaName = "blogResourcePanelsRow";

const resourcePanelsRowSchema = defineType({
    name: resourcePanelsRowSchemaName,
    title: "Resource Panels Row",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        defineField({
            name: "rowIndex",
            title: "Row Index",
            description: "Where to insert this additional row",
            type: "number",
            validation: (rule: NumberRule) => rule.required().positive(),
            initialValue: 0,
        }),
        resourcesFieldOptional,
    ],
});

const blogTabSchemaName = "blogTab";

const blogTabSchema = defineType({
    name: blogTabSchemaName,
    title: "Blog Tab",
    type: "object",
    fields: [
        metaTagsField,
        defineField({
            name: "additionalRows",
            title: "Additional Rows",
            type: "array",
            of: [{type: resourcePanelsRowSchemaName}],
        }),
    ],
});

const blogTabField = (categoryID: BlogCategoryID | "all") => defineField({
    name: categoryID,
    title: categoryID === "all" ? "All Posts" : blogCategories[categoryID],
    type: blogTabSchemaName,
    validation: requiredRule,
    options: collapsibleOptions,
});

const blogTabsSchemaName = "blogTabs";

const blogTabsSchema = defineType({
    name: blogTabsSchemaName,
    title: "Tabs",
    type: "object",
    fields: (["all", ...blogCategoryList] as ("all" | BlogCategoryID)[]).map(x => blogTabField(x)),
});

export const blogSchemaName = "blog";

const blogSchema = defineType({
    name: blogSchemaName,
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "blogTitle",
            title: "Blog Title",
            type: "array",
            of: [{type: "block"}],
            validation: requiredRule,
        }),
        defineField({
            name: "blogSubtitle",
            title: "Blog Subtitle",
            type: "array",
            of: [{type: "block"}],
            validation: requiredRule,
        }),
        defineField({
            name: "tabs",
            title: "Tabs",
            type: blogTabsSchemaName,
            validation: requiredRule,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Blog" }),
    },
});

export const blogSchemas = [resourcePanelsRowSchema, blogTabSchema, blogTabsSchema, blogSchema];
