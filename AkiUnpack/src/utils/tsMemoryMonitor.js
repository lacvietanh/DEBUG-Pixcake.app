import { delay } from '#/utils/common'

const LRUMap = require('./lru').LRUMap
import { cloneDeep } from 'lodash'

const os = require('os')


const DEVICE_HIGH = 16
const DEVICE_MIDDLE = 12
const DEVICE_LOW = 8

const LIMIT_UNIT = 5 * 6

const mbTotal = 16//((os.totalmem()) / 1048576 / 1024);
const mbFree = 4//((os.freemem()) / 1048576 / 1024);

const WEAK_MONITOR_TIME = 1000 * 30
const MONITOR_TIME = 1000 * 20
const FREE_TIME_RANGE = 1000 * 8

function DeviceLevel() {
    if (mbTotal >= DEVICE_HIGH) {
        return DEVICE_HIGH
    } else if (mbTotal >= DEVICE_MIDDLE) {
        return DEVICE_MIDDLE
    } else {
        return DEVICE_LOW
    }
}

function strategyAnalyse() {

    let deviceLevel = DeviceLevel()
    switch (deviceLevel) {
        case DEVICE_HIGH: {
            return LIMIT_UNIT * 3.5
        }
        case DEVICE_MIDDLE: {
            return LIMIT_UNIT * 3
        }
        case DEVICE_LOW:
        default: {
            return LIMIT_UNIT * 2
        }
    }
}

function GCTime() {
    let deviceLevel = DeviceLevel()
    let unit = 1000
    switch (deviceLevel) {
        case DEVICE_HIGH: {
            return unit * 45
        }
        case DEVICE_MIDDLE: {
            return unit * 30
        }
        case DEVICE_LOW:
        default: {
            return unit * 25
        }
    }
}

export class TsMemoryMonitor {

    constructor() {

        this.limit = strategyAnalyse()
        this.map = new LRUMap(this.limit)
        this.weakMap = new Map()
        this.releaseCallback = null
        this.weakRealeaseCallback = null
        this.onGCListener = null

        this.lastMonitorTime = 0

        this.monitorRecycle = null
        this.weakMonitorRecycle = null
        this.gcRecycle = null

        let _that = this

        this.map.shift = function () {
            let entry = LRUMap.prototype.shift.call(this)

            if (_that.releaseCallback) {
                _that.releaseCallback(entry)
            }
            return entry
        }
    }

    launchMonitor(monitorCallback, weakMonitorCallback) {
        this.releaseCallback = monitorCallback
        this.weakRealeaseCallback = weakMonitorCallback
        let _that = this
        this.monitorRecycle = setInterval(() => {
            delay(0).then(() => {
                if (_that.isOutMonitorTime()) {
                    _that.executeRecycle()
                }
            })
        }, MONITOR_TIME)

        this.weakMonitorRecycle = setInterval(() => {
            delay(0).then(() => {
                _that.executeWeakRecycle()
            })
        }, WEAK_MONITOR_TIME)

        this.gcRecycle = setInterval(() => {
            delay(0).then(() => {
                if (_that.onGCListener) {
                    _that.onGCListener()
                }
            })
        }, GCTime())
    }

    setOnGCListener(listener) {
        this.onGCListener = listener
    }

    executeWeakRecycle() {
        if (this.weakMap != null && this.weakMap.size > 0) {
            let copyMap = cloneDeep(this.weakMap)
            for (const copyMapElement of copyMap) {
                this.weakMap.delete(copyMapElement[0])
                if (this.weakRealeaseCallback) {
                    this.weakRealeaseCallback(copyMapElement)
                }
            }
        }
    }

    isOutMonitorTime() {
        let time = (new Date().getTime() - this.lastMonitorTime)
        return time >= FREE_TIME_RANGE
    }

    executeRecycle() {
        let length = this.map.size
        while (length > 1) {
            let entry = this.map.shift()
            if (this.releaseCallback) {
                this.releaseCallback(entry)
            }
            length--
        }
    }

    addItem(key) {
        this.lastMonitorTime = new Date().getTime()
        // console.log('tsMemoryManager add ', key)
        this.map.set(key, this.lastMonitorTime)
    }

    addWeakMonitor(key) {
        this.weakMap.set(key, new Date().getTime())
    }

    clearItem(key) {
        if (this.map.has(key)) {
            this.map.delete(key)
        }
    }

    getItem(key) {
        return this.map.get(key)
    }

    hasFreeMemory() {
        return this.map.size <= (this.limit * 0.85)
    }

    clear() {
        this.map.clear()
        this.weakMap.clear()
    }

}

let instance = null

TsMemoryMonitor.shareInstance = (function () {
    return function () {
        if (!instance) {
            instance = new TsMemoryMonitor()
        }
        return instance
    }
})()


class MonitorModel {

    constructor(model, timoutLimit = 1000 * 10) {
        this.modelList = []
        this.modelList.push(model)
        this.timeoutLimit = timoutLimit
        this.monitorStartTime = new Date().getTime()
    }

    isTimeout() {
        return new Date().getTime() - this.monitorStartTime >= this.timeoutLimit
    }

    addChildMonitor(model) {
        this.modelList.push(model)
        this.monitorStartTime = new Date().getTime()
    }
}



