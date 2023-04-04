import { ImageAsset, Reference, SanityDocument } from "@sanity/types";
import { SanityImageRef } from "../image";

export class SanityDataset {
    readonly byType: { [key: string]: SanityDocument[] };
    readonly byId: { [id: string]: SanityDocument };

    constructor(props: { byType: { [key: string]: SanityDocument[] }, byId: { [id: string]: SanityDocument } }) {
        this.byType = props.byType;
        this.byId = props.byId;
    }

    resolveRef<T extends SanityDocument>(ref: Reference): T {
        const referencedObject = this.byId[ref._ref];
        if (referencedObject != null) return referencedObject as T;
        throw `Failed to resolve reference with ID '${ref._ref}'`;
    }

    resolveImageRef(ref: Reference) {
        const imageRef = this.resolveRef<SanityImageRef>(ref);
        return this.resolveRef<ImageAsset>(imageRef.assetRef);
    }
}
