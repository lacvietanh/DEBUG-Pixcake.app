export default class ArrayMap<K, V> {

    dataMap: Map<K, V>
    orderIndexList = []

    constructor() {
        this.dataMap = new Map<K, V>()
    }

    clear() {
        this.dataMap.clear()
        this.orderIndexList = []
    }

    delete(key: K) {
        if (this.dataMap.has(key)) {
            this.dataMap.delete(key)
        }
        // @ts-ignore
        let index = this.orderIndexList.indexOf(key)
        if (index > -1) {
            this.orderIndexList.splice(index, 1)
        }
    }

    get(key: K): V | undefined {
        return this.dataMap.get(key)
    }

    set(key: K, value: V) {
        this.dataMap.set(key, value)
        // @ts-ignore
        let index = this.orderIndexList.indexOf(key)
        if (index > -1) {
            this.orderIndexList.splice(index, 1)
        }
        // @ts-ignore
        this.orderIndexList.push(key)
    }

    size() {
        return this.dataMap.size
    }

    forEach(callbackfn: (value: V, key: K) => void) {
        for (const orderIndexListElement of this.orderIndexList) {
            if (this.dataMap.has(orderIndexListElement)) {
                // @ts-ignore
                callbackfn(this.dataMap.get(orderIndexListElement), orderIndexListElement)
            }
        }
    }

    keys() {
        return this.orderIndexList
    }

    has(key: K): boolean {
        return this.dataMap.has(key)
    }
}
