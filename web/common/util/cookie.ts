export function getCookieByName(name: string): string | null {
    return ('; '+document.cookie).split(`; ${name}=`).pop()!.split(';')[0] || null;
}
