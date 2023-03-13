import { Document, RawDataset, RawDocument, RawReference } from "./content";
import { TechnicolorBlockChain } from "./technicolor-block-chain";

export class Page extends Document {
    readonly title: string;
    readonly route: string;
    readonly content: PageContent[];

    constructor(data: RawDocument, db: RawDataset) {
        super(data);
        this.title = data["title"];
        this.route = data["route"].current;
        this.content = data["content"].map((x: RawReference) => new TechnicolorBlockChain(db.resolveReference(x), db));
    }
}

export type PageContent = /* PageSection |*/ TechnicolorBlockChain;
