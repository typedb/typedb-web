import { BlockContentIcon } from "@sanity/icons";
import { defineType, SanityDocument } from "@sanity/types";
import { Document, SanityDataset } from "../sanity-core";
import { MetaTags, SanityMetaTags } from "./meta-tags";

export interface SanityPage extends SanityDocument {
    title: string;
    metaTags?: SanityMetaTags;
}

export abstract class Page extends Document {
    readonly title: string;
    readonly metaTags: MetaTags;

    protected constructor(data: SanityPage, db: SanityDataset) {
        super(data);
        this.title = data.title;
        this.metaTags = MetaTags.fromSanity(data.metaTags || {}, db);
    }
}

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{ type: "block" }],
});

export const basePageSchemas = [bodyTextSchema];
