export const blogCategories = {
    announcements: "Announcements",
    applications: "Applications",
    engineering: "Engineering",
    philosophy: "Philosophy",
    tutorials: "Tutorials",
} as const;

export type BlogCategoryID = keyof typeof blogCategories;

export const blogCategoryList = Object.keys(blogCategories) as BlogCategoryID[];
