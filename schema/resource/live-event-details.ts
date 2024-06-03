import { defineField } from "@sanity/types";
import { collapsible } from "../common-fields";
import { PropsOf } from "../util";

export enum EventSignupMethod {
    externalURL = "externalURL",
}

export interface SanityEventDate {
    dateTBC: boolean;
    endDate?: string;
    displayTime?: boolean;
    startDate?: string;
    timezone?: string;
}

export class EventDate {
    readonly dateTBC: boolean;
    readonly endDate?: Date;
    readonly displayTime?: boolean;
    readonly startDate?: Date;
    readonly timezone?: string;

    constructor(props: PropsOf<EventDate>) {
        this.dateTBC = props.dateTBC;
        this.endDate = props.endDate;
        this.displayTime = props.displayTime;
        this.startDate = props.startDate;
        this.timezone = props.timezone;
    }

    static fromSanity(data: SanityEventDate) {
        return new EventDate({
            dateTBC: data.dateTBC,
            ...(!data.dateTBC && {
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                displayTime: data.displayTime,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                timezone: data.timezone,
            }),
        });
    }
}

export const eventDateField = defineField({
    name: "dateOptions",
    title: "Date Options",
    type: "object",
    options: collapsible,
    fields: [
        defineField({
            name: "dateTBC",
            title: "Date TBC?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            description: "Local time at venue",
            type: "datetime",
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
            validation: (rule) =>
                rule.custom((value, { parent }) =>
                    (parent as SanityEventDate)?.dateTBC || value ? true : "Value is required"
                ),
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            description: "Local time at venue",
            type: "datetime",
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
        }),
        defineField({
            name: "displayTime",
            title: "Display Time?",
            type: "boolean",
            initialValue: true,
            description: "Whether to display the time components (hours, minutes) on the website",
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
        }),
        defineField({
            name: "timezone",
            title: "Timezone",
            description: "See CMS reference materials for Daylight Savings Time considerations",
            type: "string",
            options: {
                list: Intl.supportedValuesOf("timeZone").map((timeZone) => ({
                    value: timeZone,
                    title: `${timeZone} (${
                        Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).format().split(", ")[1]
                    })`,
                })),
            },
            initialValue: "Europe/London",
            validation: (rule) =>
                rule.custom((value, { parent }) =>
                    (parent as SanityEventDate)?.dateTBC || value ? true : "Value is required"
                ),
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
        }),
    ],
});
