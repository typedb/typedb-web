import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { EventBase, GetCalendarLinkParams } from "typedb-web-schema";

const apiURLs = {
    getCalendarLink: `/api/calendar-link`,
};

const TIME_ZONE = "Europe/London";

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private http: HttpClient) {}

    googleCalendarURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "google",
            title: props.title.toPlainText(),
            description: props.shortDescription,
            startTime: this.serializeDate(props.startDate()),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&description=${params.description}&startTime=${params.startTime}&timezone=${TIME_ZONE}&durationMins=${params.durationMins}&location=${params.location}`;
    }

    getICSFile(props: EventBase): Observable<string> {
        const params: GetCalendarLinkParams = {
            service: "stream",
            title: props.title.toPlainText(),
            description: props.shortDescription,
            startTime: this.serializeDate(props.startDate()),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return this.http.get(
            `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&description=${params.description}&startTime=${params.startTime}&timezone=${TIME_ZONE}&durationMins=${params.durationMins}&location=${params.location}`,
            {
                responseType: "text",
                headers: {
                    Accept: "text-calendar",
                },
            },
        );
    }

    icsFileURL(props: EventBase): string {
        const params: GetCalendarLinkParams = {
            service: "stream",
            title: props.title.toPlainText(),
            description: props.shortDescription,
            startTime: this.serializeDate(props.startDate()),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&description=${params.description}&startTime=${params.startTime}&timezone=${TIME_ZONE}&durationMins=${params.durationMins}&location=${params.location}`;
    }

    private serializeDate(date: Date): string {
        // calndr.link requires ISO format; sv-SE (Sweden) uses it
        return date.toLocaleString("sv-SE", { timeZone: TIME_ZONE });
    }
}
