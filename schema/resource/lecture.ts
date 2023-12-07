import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType, NumberRule } from "@sanity/types";
import { LinkButton } from "../button";
import { comingSoonField, requiredRule, slugField } from "../common-fields";
import { hubspotFormIDField } from "../form";
import { Link } from "../link";
import { personSchemaName } from "../person";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { resourceCommonFields } from "./base";
import { EventBase } from "./event-base";
import { SanityLecture, lectureSchemaName } from "./sanity";

export class Lecture extends EventBase {
    readonly datetime: Date;
    readonly durationMins: number;
    readonly lectureSlidesURL?: string;
    readonly lectureSlidesFileName?: string;
    readonly youtubeVideoID?: string;
    readonly comingSoon: boolean;

    constructor(props: PropsOf<Lecture>) {
        super(props);
        this.datetime = props.datetime;
        this.durationMins = props.durationMins;
        this.lectureSlidesURL = props.lectureSlidesURL;
        this.lectureSlidesFileName = props.lectureSlidesFileName;
        this.youtubeVideoID = props.youtubeVideoID;
        this.comingSoon = props.comingSoon;
    }

    static override fromSanity(data: SanityLecture, db: SanityDataset): Lecture {
        const lectureSlides = data.lectureSlides ? db.resolveRef(data.lectureSlides.asset) : undefined;
        return new Lecture({
            ...super.fromSanity(data, db),
            datetime: new Date(data.datetime),
            durationMins: data.durationMins,
            // With no dl parameter, the file opens in the browser with its original filename (a GUID), but with a dl
            // parameter as a string, Safari replaces spaces with %20 when downloading the file.
            lectureSlidesURL: lectureSlides ? `${lectureSlides.url}?dl=` : undefined,
            lectureSlidesFileName: lectureSlides?.originalFilename,
            youtubeVideoID: data.youtubeVideoID,
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
                      destination: `/lectures/${this.slug}`,
                      opensNewTab: false,
                  }),
            comingSoon: this.comingSoon,
        });
    }

    override location(): string {
        return this.youtubeVideoID ? `https://youtube.com/watch?v=${this.youtubeVideoID}` : `https://typedb.com/lectures/${this.slug}`;
    }

    override startDate(): Date {
        return this.datetime;
    }

    override getDurationMins(): number {
        return this.durationMins;
    }
}

const lectureSchema = defineType({
    name: lectureSchemaName,
    title: "Lecture",
    icon: PresentationIcon,
    type: "document",
    fields: [
        slugField,
        ...resourceCommonFields,
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
        hubspotFormIDField,
        defineField({
            name: "lectureSlides",
            title: "Lecture Slides",
            type: "file",
        }),
        defineField({
            name: "youtubeVideoID",
            title: "YouTube Video ID",
            description: "Can be obtained from the URL - youtube.com/watch?v={VIDEO_ID}",
            type: "string",
        }),
        Object.assign({}, comingSoonField, {
            description: "If set, the Register button will be disabled and show 'Coming soon!'",
        }),
    ],
});

export const lectureSchemas = [lectureSchema];
