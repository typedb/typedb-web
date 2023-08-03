import { defineField } from "@sanity/types";
import { collapsibleOptions } from "./common-fields";
import { PropsOf } from "./util";

export interface SanityEventDate {
    dateTBC: boolean;
    endDate?: string;
    showTime?: boolean;
    startDate?: string;
    timezone?: string;
}

export class EventDate {
    readonly dateTBC: boolean;
    readonly endDate?: Date;
    readonly showTime?: boolean;
    readonly startDate?: Date;
    readonly timezone?: string;

    constructor(props: PropsOf<EventDate>) {
        this.dateTBC = props.dateTBC;
        this.endDate = props.endDate;
        this.showTime = props.showTime;
        this.startDate = props.startDate;
        this.timezone = props.timezone;
    }

    static fromSanity(data: SanityEventDate) {
        return new EventDate({
            dateTBC: data.dateTBC,
            ...(!data.dateTBC && {
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                showTime: data.showTime,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                timezone: data.timezone,
            }),
        });
    }
}

export const eventDate = defineField({
    name: "dateOptions",
    title: "Date Options",
    type: "object",
    options: collapsibleOptions,
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
            type: "datetime",
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
        }),
        defineField({
            name: "showTime",
            title: "Show Time",
            type: "boolean",
            initialValue: true,
            description: "If unset, the time components of the start/end dates will be hidden",
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
            hidden: ({ parent }) => (parent as SanityEventDate)?.dateTBC,
        }),
    ],
});
