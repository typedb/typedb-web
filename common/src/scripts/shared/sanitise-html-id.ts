export function sanitiseHtmlID(raw: string): string {
    return raw.toLowerCase().replace(/\s/g, "-").replace(/[^0-9a-z-]/g, "");
}
