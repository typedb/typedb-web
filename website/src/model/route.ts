import { Document, RawDataset, RawDocument } from "./content";
import { Page } from "./page";

export class Route extends Document {

    readonly path: string;
    readonly page: Page;

    constructor(data: RawDocument, db: RawDataset) {
        super(data);
        this.path = data["route"].current;
        this.page = new Page(db.resolveReference(data["destination"]), db);
    }
}
