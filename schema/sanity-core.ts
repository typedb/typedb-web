import { File, FileAsset, Image, ImageAsset, Reference, SanityDocument } from "@sanity/types";
import { SanityImageRef } from "./image";
import { associateBy } from "./util";

export class SanityDataset {
    private readonly _byType: { [key: string]: SanityDocument[] };
    private readonly _byId: { [id: string]: SanityDocument };

    constructor(props: { byType: { [key: string]: SanityDocument[] }; byId: { [id: string]: SanityDocument } }) {
        this._byType = props.byType;
        this._byId = props.byId;
    }

    getDocumentByID<T extends SanityDocument>(id: string): T | undefined {
        return (this._byId[`drafts.${id}`] || this._byId[id]) as T;
    }

    getDocumentsByType<T extends SanityDocument>(key: string): T[] {
        const documentsByID = associateBy(this._byType[key] || [], (x) => x._id);
        return Object.entries(documentsByID)
            .filter(([id, _document]) => id.startsWith("drafts.") || !documentsByID[`drafts.${id}`])
            .map(([_id, document]) => document as T);
    }

    resolveRef<T extends SanityDocument>(ref: SanityReference<T>): T {
        const referencedObject = this._byId[`drafts.${ref._ref}`] || this._byId[ref._ref];
        if (referencedObject != null) return referencedObject as T;
        throw `Failed to resolve reference with ID '${ref._ref}'`;
    }

    resolveImageRef(ref: SanityReference<SanityImageRef>) {
        const imageRef = this.resolveRef(ref);
        return this.resolveRef(imageRef.assetRef.asset);
    }
}

export class Document {
    readonly id: string;

    protected constructor(data: { _id: string }) {
        this.id = data._id;
    }
}

export interface SanityReference<REFERENCED_TYPE> extends Reference {}

export interface SanityImageAsset extends ImageAsset {
    altText?: string;
}

export interface SanityImage extends Image {
    asset: SanityReference<SanityImageAsset>;
}

export interface SanityFile extends File {
    asset: SanityReference<FileAsset>;
}
