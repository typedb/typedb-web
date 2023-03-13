import { ThemeColor } from "./color";
import { Document, RawDocument, RawDataset } from "./content";
import { OrganisationLogosPanel } from "./organisation-logos-panel";
import { ParagraphWithHighlights } from "./text";

interface CommonFields {
    title: ParagraphWithHighlights;
    body: ParagraphWithHighlights;
    themeColor: ThemeColor;
    visualContent: VisualContent;
    /* actions: Actions; */
}

type VisualContent = OrganisationLogosPanel /*| KeyPointPanels */;

function parseCommonFields(data: RawDocument, db: RawDataset): CommonFields {
    return {
        title: new ParagraphWithHighlights(data["title"]),
        body: new ParagraphWithHighlights(data["body"]),
        themeColor: new ThemeColor(db.resolveReference(data["themeColor"])),
        visualContent: new OrganisationLogosPanel(db.resolveReference(data["visualContent"]), db),
    };
}

export class TechnicolorBlock implements CommonFields {
    readonly title: ParagraphWithHighlights;
    readonly body: ParagraphWithHighlights;
    readonly themeColor: ThemeColor;
    readonly visualContent: VisualContent;

    constructor(data: RawDocument, db: RawDataset) {
        const commonFields = parseCommonFields(data, db);
        [this.title, this.body, this.themeColor, this.visualContent] = [commonFields.title, commonFields.body, commonFields.themeColor, commonFields.visualContent];
    }
}

export class TechnicolorBlockChain extends Document {
    readonly blocks: TechnicolorBlock[];

    constructor(data: RawDocument, db: RawDataset) {
        super(data);
        this.blocks = [
            new TechnicolorBlock(data["firstBlock"], db),
            ...data["otherBlocks"].map((x: any) => new TechnicolorBlock(x, db))
        ];
    }
}
