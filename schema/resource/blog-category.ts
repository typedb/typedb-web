export const blogCategories = {
    announcements: "Announcements",
    applications: "Applications",
    engineering: "Engineering",
    philosophy: "Philosophy",
    tutorials: "Tutorials",
} as const;

export const blogCategoryList = Object.keys(blogCategories);

export type BlogCategoryID = keyof typeof blogCategories;
