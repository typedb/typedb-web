import { PortableText } from "typedb-web-schema";

/**
 * Extracts plain text from PortableText (Sanity's rich text format)
 */
export function portableTextToPlainText(portableText?: PortableText): string {
    if (!portableText) return '';

    return portableText
        .map(block =>
            block.children?.map(child => ('text' in child ? child.text : '')).join('') || ''
        )
        .join(' ')
        .trim();
}
