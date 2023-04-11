import { ParagraphWithHighlights, RichText } from "typedb-web-schema";

export type TechnicolorBlockVariant = "homePageIntro";

export class TechnicolorBlock {
    readonly variant?: TechnicolorBlockVariant;
    readonly title: ParagraphWithHighlights;
    readonly body: RichText;
    readonly iconURL: string;

    constructor(title: ParagraphWithHighlights, body: RichText, iconURL: string) {
        this.title = title;
        this.body = body;
        this.iconURL = iconURL;
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

    constructor(title: ParagraphWithHighlights, body: RichText, iconURL: string) {
        super(title, body, iconURL);
    }

    override isHomePageIntroBlock(): boolean {
        return true;
    }
}
