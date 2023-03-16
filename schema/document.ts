import { SanityDocument } from "@sanity/types";

export abstract class Document {
    readonly id: string;

    protected constructor(data: SanityDocument) {
        this.id = data._id;
    }
}
