import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { EventBase, GetCalendarLinkParams } from "typedb-web-schema";

const apiURLs = {
    getCalendarLink: `/api/calendar-link`,
};

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private http: HttpClient) {}

    getGoogleCalendarLink(props: EventBase): Observable<{ redirectTo: string }> {
        const params: GetCalendarLinkParams = {
            service: "google",
            title: props.title.toPlainText(),
            startTime: props.startDate().toLocaleString(),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return this.http.get<{ redirectTo: string }>(
            `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&startTime=${params.startTime}&durationMins=${params.durationMins}&location=${params.location}`,
        );
    }

    getICS(props: EventBase): Observable<Blob> {
        const params: GetCalendarLinkParams = {
            service: "stream",
            title: props.title.toPlainText(),
            startTime: props.startDate().toLocaleString(),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        return this.http.get(
            `${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&startTime=${params.startTime}&durationMins=${params.durationMins}&location=${params.location}`,
            {
                responseType: "blob",
            },
        );
    }
}
