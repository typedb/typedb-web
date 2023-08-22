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

export type BlogFilter = BlogNullFilter | BlogCategoryFilter;

export type BlogNullFilter = {};

export const blogNullFilter: () => BlogNullFilter = () => ({});

export type BlogCategoryFilter = { categorySlug: string }
