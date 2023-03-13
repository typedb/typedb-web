export default {
    name: "person",
    type: "document",
    title: "Person",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: rule => rule.required()
        },
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "company",
            title: "Company",
            type: "string",
        },
        {
            name: "bio",
            title: "Bio",
            type: "text",
        },
        {
            name: "headshot",
            title: "Headshot",
            type: "image",
        },
        // TODO: reference to webinars?
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "company",
        },
    },
}
