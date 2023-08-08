import { Pipe, PipeTransform } from "@angular/core";
import { EventDate } from "typedb-web-schema";

@Pipe({
    name: "dateRange",
})
export class DateRangePipe implements PipeTransform {
    transform(eventDate: EventDate): string {
        if (eventDate.dateTBC || !eventDate.startDate) {
            return "TBC";
        }

        const day = eventDate.startDate.getDate();
        const month = this.getMonth(eventDate.startDate);
        const year = eventDate.startDate.getFullYear();
        return `${month} ${day}, ${year}`;

        // @TODO support time, endDate and timezone
    }

    private getMonth(date: Date) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[date.getMonth()];
    }
}
