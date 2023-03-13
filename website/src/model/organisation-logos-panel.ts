import { Document, RawDataset, RawDocument } from "./content";

export class OrganisationLogosPanel extends Document {

    readonly logoURLs: string[];

    constructor(data: RawDocument, db: RawDataset) {
        super(data);
        this.logoURLs = data["organisations"].map((x: any) => db.resolveReference(x.logo.asset)["url"]);
    }
}
