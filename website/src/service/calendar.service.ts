import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CalendarServiceName, EventBase, GetCalendarLinkParams } from "typedb-web-schema";

const apiURLs = {
    getCalendarLink: `/api/calendar-link`,
};

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private http: HttpClient) {}

    getCalendarLink(props: EventBase, service: CalendarServiceName) {
        const params: GetCalendarLinkParams = {
            service: service,
            title: props.title.toPlainText(),
            startTime: props.startDate().toLocaleString(),
            durationMins: props.getDurationMins(),
            location: props.location(),
        };
        this.http.get(`${apiURLs.getCalendarLink}?service=${params.service}&title=${params.title}&startTime=${params.startTime}&durationMins=${params.durationMins}&location=${params.location}`).subscribe((resp) => {
            console.log(resp);
        });
    }
}
