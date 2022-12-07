// @ts-ignore

let singleInstance: MemoryMonitor | null = null
// 非pro环境开启
const canEnable = process.env[' VUE_APP_ENV'] !== 'pro'

export class MemoryMonitor {
    private vueWeakSet: WeakSet<any>   // vue对象的引用池
    private otherWeakSet: WeakSet<any> // 除vue对象外的对象的引用池

    constructor() {
        this.vueWeakSet = new WeakSet<any>()
        this.otherWeakSet = new WeakSet<any>()
    }

    static shareInstance(): MemoryMonitor {
        if (!singleInstance) {
            singleInstance = new MemoryMonitor()
        }
        return singleInstance
    }

    addObject(object: any) {
        if (!canEnable) {
            return
        }
        if (!object) {
            return
        }
        const name = object.constructor.name
        if (name === 'VueComponent') {
            this.vueWeakSet.add(object)
        } else {
            this.otherWeakSet.add(object)
        }
    }

    deleteObject(object: any) {
        if (!canEnable) {
            return
        }
        if (!object) {
            return
        }
        const name = object.constructor.name
        if (name === 'VueComponent') {
            this.vueWeakSet.delete(object)
        } else {
            this.otherWeakSet.delete(object)
        }
    }

    clear() {
        this.vueWeakSet = new WeakSet<any>()
        this.otherWeakSet = new WeakSet<any>()
    }

    print() {
        if (!canEnable) {
            return
        }

        console.log(`MemoryMonitor.trackObjects:`, 'vueObject:', this.vueWeakSet, 'otherObject:', this.otherWeakSet)
    }
}
