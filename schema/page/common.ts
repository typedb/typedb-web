import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { Document } from "../sanity-core/document";

export interface SanityPage extends SanityDocument {
    title: string;
}

export abstract class Page extends Document {
    readonly title: string;

    protected constructor(data: SanityPage) {
        super(data);
        this.title = data.title;
    }
}

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{type: "block"}],
});

export const displayedSectionsFieldName = "displayedSections";

export const displayedSectionsField = (sections: { [key: string]: { id: string, title: string } }) => defineField({
    name: displayedSectionsFieldName,
    title: "Displayed Sections",
    type: "array",
    of: [{type: "string"}],
    options: {
        layout: "grid",
        list: Object.values(sections).map(({ id, title }) => ({ value: id, title: title })),
    },
});

export const basePageSchemas = [bodyTextSchema];
