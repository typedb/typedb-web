export type PropsOf<OBJECT> = { [KEY in keyof OBJECT]: OBJECT[KEY] }

export function groupBy<T>(arr: T[], key: (i: T) => string) {
    return arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as { [key: string]: T[] });
}

export function associateBy<T>(arr: T[], key: (i: T) => string) {
    return arr.reduce((items, item) => {
        if (items[key(item)]) { throw `Duplicate key: ${key(item)}`; }
        items[key(item)] = item;
        return items;
    }, {} as { [key: string]: T })
}
