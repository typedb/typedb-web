export type OS = "macOS" | "iOS" | "Windows" | "Android" | "Linux" | "Other"

export function getCurrentOS(): OS {
    const userAgent = navigator.userAgent || "",
        platform = window.navigator.platform || "",
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(platform) !== -1) {
        return "macOS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        return "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        return "Windows";
    } else if (/Android/.test(userAgent)) {
        return "Android";
    } else if (/Linux/.test(platform)) {
        return "Linux";
    }

    return "Other";
}
