import { Person } from "./person";
import { RichText } from "./text";

export class Webinar {
    title: string;
    date: Date;
    durationMins: number;
    description: RichText;
    speakers: Person[];
}
