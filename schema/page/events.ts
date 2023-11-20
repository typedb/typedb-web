import { defineField, defineType } from "@sanity/types";

import { collapsibleOptions, isVisibleField, requiredRule } from "../common-fields";
import { LiveEvent } from "../resource/live-event";
import { liveEventSchemaName, SanityLiveEvent } from "../resource/sanity";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, TitleAndBody, titleAndBodySchemaName } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

interface SanityEventsListSection {
    isVisible: boolean;
    events: SanityReference<SanityLiveEvent>[];
}

export interface SanityEventsPage extends SanityPage {
    introSection: SanityTitleAndBody;
    featuredEvent?: SanityReference<SanityLiveEvent>;
    eventsList: SanityEventsListSection;
}

export class EventsPage extends Page {
    readonly introSection: TitleAndBody;
    readonly featuredEvent?: LiveEvent;
    readonly eventsList?: LiveEvent[];

    constructor(data: SanityEventsPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleAndBody.fromSanityTitleAndBody(data.introSection);
        this.featuredEvent = data.featuredEvent && LiveEvent.fromSanity(db.resolveRef(data.featuredEvent), db);
        this.eventsList = data.eventsList.isVisible
            ? data.eventsList.events.map((x) => LiveEvent.fromSanity(db.resolveRef(x), db))
            : undefined;
    }
}

export const eventsPageSchemaName = "eventsPage";

const eventsPageSchema = defineType({
    name: eventsPageSchemaName,
    title: "Events Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: "featuredEvent",
            title: "Featured Event",
            type: "reference",
            to: [{ type: liveEventSchemaName }],
        }),
        defineField({
            name: "eventsList",
            title: "Events List",
            description: "Displayed as a tiled grid with 2 columns",
            type: "object",
            options: collapsibleOptions,
            validation: requiredRule,
            fields: [
                isVisibleField,
                defineField({
                    name: "events",
                    title: "Events",
                    type: "array",
                    of: [{ type: "reference", to: [{ type: liveEventSchemaName }] }],
                    validation: (rule) =>
                        rule.custom((value = [], { parent }) => {
                            if (!(parent as { isVisible: boolean }).isVisible) {
                                return true;
                            }
                            if (!value.length) {
                                return "Required";
                            }
                            if (value.length % 2 === 1) {
                                return "Must contain an even number of items";
                            }
                            return true;
                        }),
                }),
            ],
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Events Page" }),
    },
});

export const eventsPageSchemas = [eventsPageSchema];
