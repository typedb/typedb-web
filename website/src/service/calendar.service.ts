import { Injectable } from "@angular/core";

import { EventBase, GetCalendarLinkParams } from "typedb-web-schema";

const apiURLs = {
    getCalendarLink: `/api/calendar-link`,
};

const TIME_ZONE = "Europe/London";

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    googleCalendarURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "google",
            title: props.title.toPlainText(),
            description: props.shortDescription,
            startTime: props.startDate().toLocaleString("en-GB", { timeZone: TIME_ZONE }),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&description=${params.description}&startTime=${params.startTime}&timezone=${TIME_ZONE}&durationMins=${params.durationMins}&location=${params.location}`;
    }

    icsFileURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "stream",
            title: props.title.toPlainText(),
            description: props.shortDescription,
            startTime: props.startDate().toLocaleString("en-GB", { timeZone: TIME_ZONE }),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&description=${params.description}&startTime=${params.startTime}&timezone=${TIME_ZONE}&durationMins=${params.durationMins}&location=${params.location}`;
    }
}
