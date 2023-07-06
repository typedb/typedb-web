import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType, NumberRule, SanityDocument, Slug } from "@sanity/types";
import { LinkButton } from "./button";
import { comingSoonField, descriptionFieldRichText, requiredRule, slugField, titleField } from "./common-fields";
import { hubspotFormIDField } from "./form";
import { Link } from "./link";
import { Person, personSchemaName, SanityPerson } from "./person";
import { SanityDataset, SanityImage, SanityReference } from "./sanity-core";
import { RichText, SanityPortableText } from "./text";
import { PropsOf } from "./util";

export interface SanityWebinar extends SanityDocument {
    title: string;
    slug: Slug;
    description: SanityPortableText;
    datetime: string;
    durationMins: number;
    image: SanityImage;
    speakers: SanityReference<SanityPerson>[];
    airmeetID?: string;
    hubspotFormID?: string;
    onDemandVideoURL?: string;
    comingSoon: boolean;
}

export class Webinar {
    readonly title: string;
    readonly slug: string;
    readonly description: RichText;
    readonly datetime: Date;
    readonly durationMins: number;
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly airmeetID?: string;
    readonly hubspotFormID?: string;
    readonly onDemandVideoURL?: string;
    readonly comingSoon: boolean;

    constructor(props: PropsOf<Webinar>) {
        this.title = props.title;
        this.slug = props.slug;
        this.description = props.description;
        this.datetime = props.datetime;
        this.durationMins = props.durationMins;
        this.imageURL = props.imageURL;
        this.speakers = props.speakers;
        this.airmeetID = props.airmeetID;
        this.hubspotFormID = props.hubspotFormID;
        this.onDemandVideoURL = props.onDemandVideoURL;
        this.comingSoon = props.comingSoon;
    }

    static fromSanity(data: SanityWebinar, db: SanityDataset): Webinar {
        return new Webinar({
            title: data.title,
            slug: data.slug.current,
            description: new RichText(data.description),
            datetime: new Date(data.datetime),
            durationMins: data.durationMins,
            imageURL: db.resolveRef(data.image.asset).url,
            speakers: data.speakers.map(x => Person.fromSanity(db.resolveRef(x), db)),
            airmeetID: data.airmeetID,
            hubspotFormID: data.hubspotFormID,
            onDemandVideoURL: data.onDemandVideoURL,
            comingSoon: data.comingSoon,
        });
    }

    isFinished(): boolean {
        return Date.now() > this.datetime.valueOf() + this.durationMins * 60_000;
    }

    listSpeakers(): string {
        return this.speakers.map(x => x.name).join(", ");
    }

    listSpeakerJobs(): string {
        return this.speakers.map(x => x.jobDescription()).join(", ");
    }

    registrationButton(): LinkButton {
        return new LinkButton({
            style: this.isFinished() || this.comingSoon ? "secondary" : "primary",
            text: this.comingSoon ? "Coming soon!" : this.isFinished() ? "Watch now" : "Register",
            link: this.comingSoon ? undefined : new Link({
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
        titleField,
        slugField,
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
            of: [{type: "reference", to: [{type: personSchemaName}]}],
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
        Object.assign({}, comingSoonField, { description: "If set, the Register button will be disabled and show 'Coming soon!'" }),
    ],
});

export const webinarSchemas = [webinarSchema];
