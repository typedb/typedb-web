import { Injectable } from "@angular/core";

import { EventBase, GetCalendarLinkParams } from "typedb-web-schema";

const apiURLs = {
    getCalendarLink: `/api/calendar-link`,
};

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    googleCalendarURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "google",
            title: props.title.toPlainText(),
            startTime: props.startDate().toLocaleString(),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&startTime=${params.startTime}&durationMins=${params.durationMins}&location=${params.location}`;
    }

    icsFileURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "stream",
            title: props.title.toPlainText(),
            startTime: props.startDate().toLocaleString(),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&startTime=${params.startTime}&durationMins=${params.durationMins}&location=${params.location}`;
    }
}
