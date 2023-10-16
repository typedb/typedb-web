import { Pipe, PipeTransform } from "@angular/core";

import { PortableText } from "typedb-web-schema";

@Pipe({ name: "portableText" })
export class PortableTextPipe implements PipeTransform {
    transform(value: string): PortableText {
        return value ? [{ _key: "0", _type: "span", children: [{ _key: "1", _type: "span", text: value }] }] : [];
    }
}
