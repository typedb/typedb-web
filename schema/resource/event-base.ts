import { ResourceSection } from "../component/page-section";
import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { Resource, resourcePropsFromSanity } from "./base";
import { SanityEventBase } from "./sanity";

export abstract class EventBase extends Resource {
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly hubspotFormID?: string;
    readonly furtherLearning?: ResourceSection;

    protected constructor(props: PropsOf<EventBase>) {
        super(props);
        this.imageURL = props.imageURL;
        this.speakers = props.speakers;
        this.hubspotFormID = props.hubspotFormID;
        this.furtherLearning = props.furtherLearning;
    }

    static fromSanity(data: SanityEventBase, db: SanityDataset): PropsOf<EventBase> {
        return Object.assign(resourcePropsFromSanity(data, db), {
            imageURL: db.resolveRef(data.image.asset).url,
            speakers: data.speakers.map((x) => Person.fromSanity(db.resolveRef(x), db)),
            hubspotFormID: data.hubspotFormID,
            furtherLearning: data.furtherLearning?.isVisible
                ? ResourceSection.fromSanityFurtherLearningSection(data.furtherLearning, db)
                : undefined,
        });
    }
}
