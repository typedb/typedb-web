import * as H from "history";

export function getSearchParam(name: string) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

export function setSearchParam(routerHistory: H.History, routerLocation: H.Location, name: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    routerHistory.push(`${routerLocation.pathname}?${params.toString()}`, { scroll: false });
}

export function deleteSearchParam(routerHistory: H.History, routerLocation: H.Location, name: string) {
    const params = new URLSearchParams(window.location.search);
    params.delete(name);
    routerHistory.push(`${routerLocation.pathname}?${params.toString()}`, { scroll: false });
}
