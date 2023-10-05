import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType, NumberRule } from "@sanity/types";
import { LinkButton } from "./button";
import {
    comingSoonField,
    descriptionFieldRichText,
    requiredRule,
    slugField,
    titleFieldWithHighlights,
} from "./common-fields";
import {
    FurtherReadingSection,
    furtherReadingSectionSchemaName,
    SanityFurtherReadingSection,
} from "./component/page-section";
import { hubspotFormIDField } from "./form";
import { Link } from "./link";
import { personSchemaName } from "./person";
import { SanityDataset } from "./sanity-core";
import { PropsOf } from "./util";
import { EventBase, SanityEventBase } from "./event-base";
import { metaTagsField } from "./page/common";

export interface SanityWebinar extends SanityEventBase {
    datetime: string;
    durationMins: number;
    furtherReading: SanityFurtherReadingSection;
    airmeetID?: string;
    onDemandVideoURL?: string;
    comingSoon: boolean;
}

export class Webinar extends EventBase {
    readonly datetime: Date;
    readonly durationMins: number;
    readonly furtherReading?: FurtherReadingSection;
    readonly airmeetID?: string;
    readonly onDemandVideoURL?: string;
    readonly comingSoon: boolean;

    constructor(props: PropsOf<Webinar>) {
        super(props);
        this.datetime = props.datetime;
        this.durationMins = props.durationMins;
        this.furtherReading = props.furtherReading;
        this.airmeetID = props.airmeetID;
        this.onDemandVideoURL = props.onDemandVideoURL;
        this.comingSoon = props.comingSoon;
    }

    static override fromSanity(data: SanityWebinar, db: SanityDataset): Webinar {
        return new Webinar({
            ...super.fromSanity(data, db),
            datetime: new Date(data.datetime),
            durationMins: data.durationMins,
            furtherReading: data.furtherReading.isVisible
                ? FurtherReadingSection.fromSanityFurtherReadingSection(data.furtherReading, db)
                : undefined,
            airmeetID: data.airmeetID,
            onDemandVideoURL: data.onDemandVideoURL,
            comingSoon: data.comingSoon,
        });
    }

    isFinished(): boolean {
        return Date.now() > this.datetime.valueOf() + this.durationMins * 60_000;
    }

    listSpeakers(): string {
        return this.speakers.map((x) => x.name).join(", ");
    }

    listSpeakerJobs(): string {
        return this.speakers.map((x) => x.jobDescription()).join(", ");
    }

    registrationButton(): LinkButton {
        return new LinkButton({
            style: this.isFinished() || this.comingSoon ? "secondary" : "primary",
            text: this.comingSoon ? "Coming soon!" : this.isFinished() ? "Watch now" : "Register",
            link: this.comingSoon
                ? undefined
                : new Link({
                      type: "route",
                      destination: `/webinars/${this.slug}`,
                      opensNewTab: false,
                  }),
            comingSoon: this.comingSoon,
        });
    }
}

export const webinarSchemaName = "webinar";

const webinarSchema = defineType({
    name: webinarSchemaName,
    title: "Webinar",
    icon: PresentationIcon,
    type: "document",
    fields: [
        titleFieldWithHighlights,
        slugField,
        metaTagsField,
        descriptionFieldRichText,
        defineField({
            name: "datetime",
            title: "Date & Time",
            type: "datetime",
            validation: requiredRule,
            options: {
                timeStep: 5,
            },
        }),
        defineField({
            name: "durationMins",
            title: "Duration (minutes)",
            type: "number",
            validation: (rule: NumberRule) => rule.required().positive(),
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
            name: "furtherReading",
            title: "Further Reading",
            type: furtherReadingSectionSchemaName,
            validation: requiredRule,
        }),
        defineField({
            name: "airmeetID",
            title: "Airmeet ID",
            type: "string",
            validation: requiredRule,
        }),
        hubspotFormIDField,
        defineField({
            name: "onDemandVideoURL",
            title: "On-Demand Video URL",
            type: "url",
        }),
        Object.assign({}, comingSoonField, {
            description: "If set, the Register button will be disabled and show 'Coming soon!'",
        }),
    ],
});

export const webinarSchemas = [webinarSchema];
