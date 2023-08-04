export function sanitiseHtmlID(raw: string): string {
    return raw.toLowerCase().replace(/\s/g, "-").replace(/,/g, "").replace(/&/g, "");
}
