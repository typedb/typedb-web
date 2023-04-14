export function sanitiseHtmlID(raw: string): string {
    return raw.replace(/\s/g, "-")
        .replace(/,/g, "")
        .replace(/&/g, "");
}
