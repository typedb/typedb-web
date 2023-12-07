import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { LinkButton } from "../button";
import { requiredRule, slugField } from "../common-fields";
import { resourceCommonFields } from "./base";
import { EventBase } from "./event-base";
import { EventDate, eventDateField, EventSignupMethod } from "./live-event-details";
import { Link } from "../link";
import { personSchemaName } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { liveEventSchemaName, SanityLiveEvent } from "./sanity";

export class LiveEvent extends EventBase {
    readonly tag: string;
    readonly venue: string;
    readonly dateOptions: EventDate;
    readonly signupMethod: EventSignupMethod;
    readonly externalUrlButton?: LinkButton;

    constructor(props: PropsOf<LiveEvent>) {
        super(props);
        this.tag = props.tag;
        this.venue = props.venue;
        this.dateOptions = props.dateOptions;
        this.signupMethod = props.signupMethod;
        this.externalUrlButton = props.externalUrlButton;
    }

    static override fromSanity(data: SanityLiveEvent, db: SanityDataset): LiveEvent {
        return new LiveEvent({
            ...super.fromSanity(data, db),
            tag: data.tag,
            venue: data.venue,
            dateOptions: EventDate.fromSanity(data.dateOptions),
            signupMethod: data.signupMethod,
            externalUrlButton:
                data.signupMethod === EventSignupMethod.externalURL && data.externalUrlButton
                    ? LinkButton.fromSanity(data.externalUrlButton, db)
                    : undefined,
        });
    }

    detailsPageLink(): Link {
        return new Link({
            type: "route",
            destination: `/events/${this.slug}`,
            opensNewTab: false,
        });
    }

    registrationButton(): LinkButton {
        return new LinkButton({
            style: "primary",
            text: "Register Now",
            link: this.detailsPageLink(),
            comingSoon: false,
        });
    }

    override location(): string {
        return this.venue;
    }

    override startDate(): Date {
        return this.dateOptions.startDate || new Date();
    }

    override getDurationMins(): number {
        return this.dateOptions.startDate && this.dateOptions.endDate ? (this.dateOptions.endDate.getTime() - this.dateOptions.startDate.getTime()) / 60000 : 60;
    }
}

export const liveEventSchema = defineType({
    name: liveEventSchemaName,
    title: "Live Event",
    icon: CalendarIcon,
    type: "document",
    fields: [
        slugField,
        ...resourceCommonFields,
        defineField({
            name: "tag",
            title: "Tag",
            type: "string",
            validation: requiredRule,
        }),
        eventDateField,
        defineField({
            name: "venue",
            title: "Venue",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            validation: requiredRule,
        }),
        defineField({
            name: "speakers",
            title: "Speakers",
            type: "array",
            of: [{ type: "reference", to: [{ type: personSchemaName }] }],
            validation: requiredRule,
        }),
        defineField({
            name: "signupMethod",
            title: "Signup Method",
            type: "string",
            initialValue: EventSignupMethod.externalURL,
            options: { list: [{ title: "External URL", value: EventSignupMethod.externalURL }] },
            validation: requiredRule,
        }),
        defineField({
            name: "externalUrlButton",
            title: "External URL Button",
            type: "button",
            hidden: ({ parent }) => (parent as SanityLiveEvent)?.signupMethod !== EventSignupMethod.externalURL,
        }),
    ],
});
