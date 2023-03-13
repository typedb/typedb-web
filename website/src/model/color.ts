import { Document, RawDocument } from "./content";

export class ThemeColor extends Document {

    readonly hex: string;

    constructor(data: RawDocument) {
        super(data);
        this.hex = data["color"].hex;
    }

}
