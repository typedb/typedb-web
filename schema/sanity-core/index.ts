import { SanityDocument, Reference } from "@sanity/types";

export class SanityDataset {
    readonly byType: { [key: string]: SanityDocument[] };
    readonly byId: { [id: string]: SanityDocument };

    constructor(props: { byType: { [key: string]: SanityDocument[] }, byId: { [id: string]: SanityDocument } }) {
        this.byType = props.byType;
        this.byId = props.byId;
    }

    resolveReference<T extends SanityDocument>(ref: Reference): T {
        const referencedObject = this.byId[ref._ref];
        if (referencedObject != null) return referencedObject as T;
        throw `Failed to resolve reference with ID '${ref._ref}'`;
    }
}
