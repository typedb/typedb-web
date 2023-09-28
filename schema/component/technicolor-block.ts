import { LinkButton } from "../button";
import { SanityImageRef } from "../image";
import { SanityDataset, SanityReference } from "../sanity-core";
import { ParagraphWithHighlights, RichText, SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";

export interface SanityTechnicolorBlock extends SanityTitleBodyActions {
    icon: SanityReference<SanityImageRef>;
}

export class TechnicolorBlock {
    readonly title: ParagraphWithHighlights;
    readonly body?: RichText;
    readonly iconURL: string;
    readonly actions?: LinkButton[];

    constructor(props: PropsOf<TechnicolorBlock>) {
        this.title = props.title;
        this.body = props.body;
        this.iconURL = props.iconURL;
        this.actions = props.actions;
    }

    static fromSanity(data: SanityTechnicolorBlock, db: SanityDataset) {
        return new TechnicolorBlock({
            title: ParagraphWithHighlights.fromSanity(data.title),
            body: data.body ? RichText.fromSanity(data.body) : undefined,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            iconURL: db.resolveImageRef(data.icon).url,
        });
    }
}
