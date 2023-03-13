export default {
    name: "webinar",
    type: "document",
    title: "Webinar",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "date",
            title: "Date",
            type: "datetime",
        },
        {
            name: "durationMins",
            title: "Duration (minutes)",
            type: "number",
        },
        {
            name: "description",
            title: "Description",
            type: "array",
            of: [{type: "block"}],
        },
        {
            name: "url",
            title: "URL",
            type: "url",
        },
        {
            name: "presenters",
            title: "Presenters",
            type: "array",
            of: [
                {
                    type: "reference",
                    weak: true,
                    to: [{type: "person"}],
                },
            ],
            description: "Who's presenting this webinar?",
        },
    ],
    preview: {
        select: {
            title: "title",
            date: "date",
        },
        prepare(selection) {
            const { title, date } = selection;
            return {
                title: title,
                subtitle: date.split("T")[0],
            };
        },
    },
};
