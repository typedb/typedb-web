import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourcePropsFromSanity } from "./base";
import { SanityEventBase } from "./sanity";

export abstract class EventBase extends SiteResource {
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly hubspotFormID?: string;

    protected constructor(props: PropsOf<EventBase>) {
        super(props);
        this.imageURL = props.imageURL;
        this.speakers = props.speakers;
        this.hubspotFormID = props.hubspotFormID;
    }

    static fromSanity(data: SanityEventBase, db: SanityDataset): PropsOf<EventBase> {
        return Object.assign(resourcePropsFromSanity(data, db), {
            imageURL: db.resolveRef(data.image.asset).url,
            speakers: data.speakers.map((x) => Person.fromSanity(db.resolveRef(x), db)),
            hubspotFormID: data.hubspotFormID,
        });
    }
}
