export type RawDocument = { [key: string]: any } & { _id: string, _type: string };

export type RawReference = { _ref: string, _type: "reference" };

export class RawDataset {
    readonly byType: { [key: string]: RawDocument[] };
    readonly byId: { [id: string]: RawDocument };

    constructor(props: { byType: { [key: string]: RawDocument[] }, byId: { [id: string]: RawDocument } }) {
        this.byType = props.byType;
        this.byId = props.byId;
    }

    resolveReference(ref: RawReference): RawDocument {
        const referencedObject = this.byId[ref._ref];
        if (referencedObject != null) return referencedObject;
        throw `Failed to resolve reference with ID '${ref._ref}'`;
    }
}

export abstract class Document {
    readonly id: string;

    protected constructor(data: RawDocument) {
        this.id = data._id;
    }
}
