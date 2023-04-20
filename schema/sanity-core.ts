import { ImageAsset, Reference, SanityDocument } from "@sanity/types";
import { SanityImageRef } from "./image";

export class SanityDataset {
    readonly byType: { [key: string]: SanityDocument[] };
    readonly byId: { [id: string]: SanityDocument };

    constructor(props: { byType: { [key: string]: SanityDocument[] }, byId: { [id: string]: SanityDocument } }) {
        this.byType = props.byType;
        this.byId = props.byId;
    }

    resolveRef<T extends SanityDocument>(ref: SanityReference<T>): T {
        const referencedObject = this.byId[ref._ref];
        if (referencedObject != null) return referencedObject as T;
        throw `Failed to resolve reference with ID '${ref._ref}'`;
    }

    resolveImageRef(ref: SanityReference<SanityImageRef>) {
        const imageRef = this.resolveRef(ref);
        return this.resolveRef<ImageAsset>(imageRef.assetRef.asset);
    }
}

export abstract class Document {
    readonly id: string;

    protected constructor(data: SanityDocument) {
        this.id = data._id;
    }
}

export interface SanityReference<REFERENCED_TYPE> extends Reference {}
