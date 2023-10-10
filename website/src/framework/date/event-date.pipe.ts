import { Pipe, PipeTransform } from "@angular/core";

import { EventDate } from "typedb-web-schema";

@Pipe({
    name: "eventDate",
})
export class EventDatePipe implements PipeTransform {
    transform(eventDate: EventDate): string {
        if (eventDate.dateTBC || !eventDate.startDate) {
            return "TBC";
        }

        return eventDate.startDate.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: eventDate.displayTime ? "short" : undefined,
        });
    }
}
