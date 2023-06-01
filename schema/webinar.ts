import { PresentationIcon, UserIcon } from "@sanity/icons";
import { defineField, defineType, NumberRule, SanityDocument } from "@sanity/types";
import { descriptionField, descriptionFieldRichText, nameField, requiredRule, titleField } from "./common-fields";
import { organisationSchemaName } from "./organisation";
import { Person, personSchemaName } from "./person";
import { SanityImage } from "./sanity-core";
import { RichText } from "./text";
import { PropsOf } from "./util";

export interface SanityWebinar extends SanityDocument {
    airmeetID: string;
    hubspotFormID: string;
    image: SanityImage;
}

export interface Airmeet {
    uid: string;
    name: string;
    // description: string; // TODO description is not currently returned correctly by the Airmeet API
}

export interface AirmeetSession {
    start_time: string;
    duration: number;
    speakerList: AirmeetSpeaker[];
}

export interface AirmeetSpeaker {
    name: string;
    company: string;
    designation: string;
    speaker_img: string;
}

export class Webinar {
    readonly title: string;
    readonly date: Date;
    readonly durationMins: number;
    readonly description: RichText;
    readonly imageURL: string;
    readonly speakers: Person[];
    readonly airmeetID: string;
    readonly hubspotFormID: string;

    constructor(props: PropsOf<Webinar>) {
        this.title = props.title;
        this.date = props.date;
        this.durationMins = props.durationMins;
        this.description = props.description;
        this.imageURL = props.imageURL;
        this.speakers = props.speakers;
        this.airmeetID = props.airmeetID;
        this.hubspotFormID = props.hubspotFormID;
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
        descriptionFieldRichText,
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
            of: [{type: personSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "airmeetID",
            title: "Airmeet ID",
            type: "string",
        }),
    ],
});

export const webinarSchemas = [webinarSchema];
