import { Person } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SiteResource, resourcePropsFromSanity } from "./base";
import { SanityEventBase } from "./sanity";

export abstract class EventBase extends SiteResource {
    readonly speakers: Person[];
    readonly cioFormID?: string;

    protected constructor(props: PropsOf<EventBase>) {
        super(props);
        this.speakers = props.speakers;
        this.cioFormID = props.cioFormID;
    }

    static fromSanity(data: SanityEventBase, db: SanityDataset): PropsOf<EventBase> {
        return Object.assign(resourcePropsFromSanity(data, db), {
            speakers: data.speakers.map((x) => Person.fromSanity(db.resolveRef(x), db)),
            cioFormID: data.cioFormID,
        });
    }

    abstract location(): string;

    abstract startDate(): Date;

    abstract getDurationMins(): number;
}

export interface GetCalendarLinkParams {
    title: string;
    description?: string;
    startTime: string;
    durationMins: number;
    location: string;
    service: CalendarServiceName;
}

export type CalendarServiceName = "apple" | "google" | "stream";
