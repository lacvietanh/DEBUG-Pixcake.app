export function bindMany(object: object, ...keys: string[]): void {
    for (const key of keys) {
        // @ts-ignore
        const value = object[key]
        if (typeof value === 'function') {
            // @ts-ignore
            object[key] = value.bind(object)
        } else {
            throw new Error(`bindMany failed: '${key}' is no function`)
        }
    }
}
