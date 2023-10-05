import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";

import { LinkButton, SanityButton } from "./button";
import { descriptionFieldRichText, requiredRule, slugField, titleFieldWithHighlights } from "./common-fields";
import { EventBase, SanityEventBase } from "./event-base";
import { EventDate, eventDate, SanityEventDate } from "./event-date";
import { Link } from "./link";
import { personSchemaName } from "./person";
import { SanityDataset } from "./sanity-core";
import { PropsOf } from "./util";
import { metaTagsField } from "./page/common";

enum SignupMethod {
    externalURL = "externalURL",
}

export interface SanityEvent extends SanityEventBase {
    tag: string;
    venue: string;
    dateOptions: SanityEventDate;
    signupMethod: SignupMethod;
    externalUrlButton?: SanityButton;
}

export class Event extends EventBase {
    readonly tag: string;
    readonly venue: string;
    readonly dateOptions: EventDate;
    readonly signupMethod: SignupMethod;
    readonly externalUrlButton?: LinkButton;

    constructor(props: PropsOf<Event>) {
        super(props);
        this.tag = props.tag;
        this.venue = props.venue;
        this.dateOptions = props.dateOptions;
        this.signupMethod = props.signupMethod;
        this.externalUrlButton = props.externalUrlButton;
    }

    static override fromSanity(data: SanityEvent, db: SanityDataset): Event {
        return new Event({
            ...super.fromSanity(data, db),
            tag: data.tag,
            venue: data.venue,
            dateOptions: EventDate.fromSanity(data.dateOptions),
            signupMethod: data.signupMethod,
            externalUrlButton:
                data.signupMethod === SignupMethod.externalURL && data.externalUrlButton
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
}

export const eventSchemaName = "event";

export const eventSchema = defineType({
    name: eventSchemaName,
    title: "Event",
    icon: CalendarIcon,
    type: "document",
    fields: [
        titleFieldWithHighlights,
        slugField,
        metaTagsField,
        defineField({
            name: "tag",
            title: "Tag",
            type: "string",
            validation: requiredRule,
        }),
        eventDate,
        defineField({
            name: "venue",
            title: "Venue",
            type: "string",
            validation: requiredRule,
        }),
        defineField({ ...descriptionFieldRichText, validation: requiredRule }),
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
            initialValue: SignupMethod.externalURL,
            options: { list: [{ title: "External URL", value: SignupMethod.externalURL }] },
            validation: requiredRule,
        }),
        defineField({
            name: "externalUrlButton",
            title: "External URL Button",
            type: "button",
            hidden: ({ parent }) => (parent as SanityEvent)?.signupMethod !== SignupMethod.externalURL,
        }),
    ],
});
