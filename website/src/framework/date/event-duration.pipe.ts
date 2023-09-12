import { Pipe, PipeTransform } from "@angular/core";
import { EventDate } from "typedb-web-schema";

@Pipe({
    name: "eventDuration",
})
export class EventDurationPipe implements PipeTransform {
    transform(val: number | EventDate): string {
        if (typeof val === "object") {
            if (!val.startDate || !val.endDate) {
                return "";
            }
            const durationMins = (+val.endDate - +val.startDate) / 1000 / 60;

            if (durationMins < 60 * 12) {
                return this.formatDurationMins(durationMins);
            }

            const startDate = new Date(val.startDate);
            const endDate = new Date(val.endDate);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            const durationDays = Math.round((+endDate - +startDate) / 1000 / 60 / 60 / 24) + 1;

            return `${durationDays} day${durationDays === 1 ? "" : "s"}`;
        }
        return this.formatDurationMins(val);
    }

    private formatDurationMins(val: number) {
        if (!val) {
            return "";
        }
        if (val < 60) {
            return `${val} minutes`;
        }
        if (val === 60) {
            return `1 hour`;
        }
        if (val < 60 * 12) {
            return `${val / 60} hours`;
        }
        return "";
    }
}
