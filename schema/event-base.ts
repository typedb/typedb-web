import { SanityDocument, Slug } from "@sanity/types";
import { Person, SanityPerson } from "./person";
import { SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { ParagraphWithHighlights, RichText, SanityPortableText } from "./text";
import { PropsOf } from "./util";
import { MetaTags, SanityMetaTags } from "./page/common";

export interface SanityEventBase extends SanityDocument {
    title: SanityPortableText;
    slug: Slug;
    description: SanityPortableText;
    image: SanityImage;
    speakers: SanityReference<SanityPerson>[];
    hubspotFormID?: string;
    metaTags?: SanityMetaTags;
}

export abstract class EventBase {
    readonly title: ParagraphWithHighlights;
    readonly slug: string;
    readonly description: RichText;
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly hubspotFormID?: string;
    readonly metaTags: MetaTags;

    constructor(props: PropsOf<EventBase>) {
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
            description: RichText.fromSanity(data.description),
            imageURL: db.resolveRef(data.image.asset).url,
            speakers: data.speakers.map((x) => Person.fromSanity(db.resolveRef(x), db)),
            hubspotFormID: data.hubspotFormID,
            metaTags: MetaTags.fromSanity(data.metaTags || {}, db),
        };
    }
}
