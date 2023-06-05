import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "eventDuration"
})
export class EventDurationPipe implements PipeTransform {
    transform(durationMins: number): string {
        if (!durationMins) {
            return '';
        }
        if (durationMins < 60) return `${durationMins} minutes`;
        else if (durationMins > 60) return `${durationMins / 60} hours`;
        else return "1 hour";
    }
}
