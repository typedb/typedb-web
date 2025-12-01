export const blogCategories = {
    engineering: "Engineering",
    community: "Community",
    companyNews: "Company News",
    tutorials: "Tutorials",
} as const;

export type BlogCategoryID = keyof typeof blogCategories;

export const blogCategoryList = Object.keys(blogCategories) as BlogCategoryID[];
