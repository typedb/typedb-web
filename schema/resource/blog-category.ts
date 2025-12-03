export const blogCategories = {
    engineering: "Engineering",
    product: "Product",
    useCases: "Use Cases",
    insights: "Insights",
    community: "Community",
} as const;

export type BlogCategoryID = keyof typeof blogCategories;

export const blogCategoryList = Object.keys(blogCategories) as BlogCategoryID[];
