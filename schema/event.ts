import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";

import { LinkButton } from "./button";
import {
    collapsibleOptions,
    descriptionFieldRichText,
    isVisibleField,
    requiredRule,
    SanityVisibleToggle,
    sectionIconField,
    slugField,
    titleAndBodyFields,
    titleFieldWithHighlights,
} from "./common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./component/technicolor-block";
import { EventBase, SanityEventBase } from "./event-base";
import { EventDate, eventDate, SanityEventDate } from "./event-date";
import { hubspotFormIDField } from "./form";
import { Link } from "./link";
import { personSchemaName } from "./person";
import { SanityDataset, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export interface SanityFeaturedEventsSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    events?: SanityReference<SanityEvent>[];
}

export class FeaturedEventsSection extends TechnicolorBlock {
    events: Event[];

    constructor(props: PropsOf<FeaturedEventsSection>) {
        super(props);
        this.events = props.events;
    }

    static fromSanity(data: SanityFeaturedEventsSection, db: SanityDataset) {
        return new FeaturedEventsSection({
            ...TechnicolorBlock.fromSanityTechnicolorBlock(data, db),
            events: (data.events || []).map((ref) =>
                Event.fromSanity(
                    db.resolveRef(ref),
                    db,
                    false // to avoid circular dependency
                )
            ),
        });
    }
}

export interface SanityEvent extends SanityEventBase {
    tag: string;
    venue: string;
    dateOptions: SanityEventDate;
    featuredEventsSection: SanityFeaturedEventsSection;
}

export class Event extends EventBase {
    readonly tag: string;
    readonly venue: string;
    readonly dateOptions: EventDate;
    readonly featuredEventsSection?: FeaturedEventsSection;

    constructor(props: PropsOf<Event>) {
        super(props);
        this.tag = props.tag;
        this.venue = props.venue;
        this.dateOptions = props.dateOptions;
        this.featuredEventsSection = props.featuredEventsSection;
    }

    static override fromSanity(
        data: SanityEvent,
        db: SanityDataset,
        fillFeaturedEventsSection = data.featuredEventsSection.isVisible
    ): Event {
        return new Event({
            ...super.fromSanity(data, db),
            tag: data.tag,
            venue: data.venue,
            dateOptions: EventDate.fromSanity(data.dateOptions),
            featuredEventsSection: fillFeaturedEventsSection
                ? FeaturedEventsSection.fromSanity(data.featuredEventsSection, db)
                : undefined,
        });
    }

    registrationButton(): LinkButton {
        return new LinkButton({
            style: "secondary",
            text: "Watch now",
            link: new Link({
                type: "route",
                destination: `/events/${this.slug}`,
                opensNewTab: false,
            }),
            comingSoon: false,
        });
    }
}

export const eventSchemaName = "event";

const featuredEventsSection = defineField({
    name: "featuredEventsSection",
    title: "Featured Events Section",
    type: "object",
    options: collapsibleOptions,
    fields: [
        isVisibleField,
        ...titleAndBodyFields,
        sectionIconField,
        defineField({
            name: "events",
            type: "array",
            validation: (rule) =>
                rule.custom((value, { parent }) =>
                    (parent as SanityFeaturedEventsSection)?.isVisible && value?.length != 3
                        ? "Must have exactly 3 items"
                        : true
                ),
            of: [{ type: "reference", to: [{ type: eventSchemaName }] }],
        }),
    ],
});

export const eventSchema = defineType({
    name: eventSchemaName,
    title: "Event",
    icon: CalendarIcon,
    type: "document",
    fields: [
        titleFieldWithHighlights,
        slugField,
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
        defineField({
            name: "durationMins",
            title: "Duration (minutes)",
            type: "number",
            validation: (rule) => rule.required().positive(),
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
        hubspotFormIDField,
        featuredEventsSection,
    ],
});
