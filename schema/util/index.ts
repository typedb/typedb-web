export function sanitySchemaName<T>(clazz: { new(...args: any[]): T }) {
    return clazz.name[0].toLowerCase() + clazz.name.slice(1);
}
