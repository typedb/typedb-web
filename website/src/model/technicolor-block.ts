import { ParagraphWithHighlights, RichText } from "typedb-web-schema";

export type TechnicolorBlockVariant = "homePageIntro";

export class TechnicolorBlock {
    readonly variant?: TechnicolorBlockVariant;
    readonly title: ParagraphWithHighlights;
    readonly body: RichText;

    constructor(title: ParagraphWithHighlights, body: RichText) {
        this.title = title;
        this.body = body;
    }

    isRegularBlock(): boolean {
        return this.constructor.name === TechnicolorBlock.name;
    }

    isHomePageIntroBlock(): boolean {
        return false;
    }
}

export class HomePageIntroTechnicolorBlock extends TechnicolorBlock {
    // readonly actions: Action[];

    constructor(title: ParagraphWithHighlights, body: RichText) {
        super(title, body);
    }

    override isHomePageIntroBlock(): boolean {
        return true;
    }
}
