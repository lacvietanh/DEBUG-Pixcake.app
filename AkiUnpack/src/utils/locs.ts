export default {
    get(name: string): any {
        let value = localStorage.getItem(name)
        if (/^\{.*\}$/.test(<string>value)) if (typeof value === 'string') {
            value = JSON.parse(value)
        }
        return value
    },
    set(name: string, value: any): any {
        if (typeof value === typeof {}) value = JSON.stringify(value)
        localStorage.setItem(name, value)

        return localStorage.getItem(name)
    },
    remove(name: string): any {
        return localStorage.removeItem(name)
    }
}
