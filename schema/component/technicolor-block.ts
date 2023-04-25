import { LinkButton } from "../button";
import { ParagraphWithHighlights, RichText } from "../text";

export class TechnicolorBlock {
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

    isHomePageIntroBlock(): this is HomePageIntroTechnicolorBlock {
        return false;
    }

    isHomePageCloudBlock(): this is HomePageCloudTechnicolorBlock {
        return false;
    }
}

export class HomePageIntroTechnicolorBlock extends TechnicolorBlock {
    readonly actions?: LinkButton[];

    constructor(title: ParagraphWithHighlights, body: RichText, iconURL: string, actions?: LinkButton[]) {
        super(title, body, iconURL);
        this.actions = actions;
    }

    override isHomePageIntroBlock() {
        return true;
    }
}

export class HomePageCloudTechnicolorBlock extends TechnicolorBlock {
    readonly actions?: LinkButton[];

    constructor(title: ParagraphWithHighlights, body: RichText, iconURL: string, actions?: LinkButton[]) {
        super(title, body, iconURL);
        this.actions = actions;
    }

    override isHomePageCloudBlock() {
        return true;
    }
}
