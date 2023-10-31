import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { ParagraphWithHighlights, PortableText } from "../text";
import { PropsOf } from "../util";
import { MetaTags } from "../page/meta-tags";
import { SanityEventBase } from "./sanity";

export abstract class EventBase {
    readonly title: ParagraphWithHighlights;
    readonly slug: string;
    readonly description: PortableText;
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly hubspotFormID?: string;
    readonly metaTags: MetaTags;

    protected constructor(props: PropsOf<EventBase>) {
        this.title = props.title;
        this.slug = props.slug;
        this.description = props.description;
        this.imageURL = props.imageURL;
        this.speakers = props.speakers;
        this.hubspotFormID = props.hubspotFormID;
        this.metaTags = props.metaTags;
    }

    static fromSanity(data: SanityEventBase, db: SanityDataset): PropsOf<EventBase> {
        return {
            title: ParagraphWithHighlights.fromSanity(data.title),
            slug: data.slug.current,
            description: data.description,
            imageURL: db.resolveRef(data.image.asset).url,
            speakers: data.speakers.map((x) => Person.fromSanity(db.resolveRef(x), db)),
            hubspotFormID: data.hubspotFormID,
            metaTags: MetaTags.fromSanity(data.metaTags || {}, db),
        };
    }
}
