import { LinkButton } from "../button";
import { SanityIconField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";

export interface SanityTechnicolorBlock extends SanityTitleBodyActions, SanityIconField {}

export class TechnicolorBlock implements Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly sectionId: string;

    constructor(props: PropsOf<TechnicolorBlock>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.sectionId = props.sectionId;
    }

    static fromSanity(data: SanityTechnicolorBlock, db: SanityDataset) {
        const title = ParagraphWithHighlights.fromSanity(data.title);
        return new TechnicolorBlock({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            sectionId: title.toSectionID(),
        });
    }
}
