/**
 * 保留精度
 * @param number
 * @param precision
 * @returns {number}
 */
export function round(number, precision = 2) {
    return Math.round(`${Number(number)}e${precision}`) / Math.pow(10, precision)
}

/**
 * bytes转成为KB、MB
 * @returns {string}
 * @param bytes
 */
export function bytesFormat(bytes) {
    const uts = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    // 当bytes 大于是1024字节时，开始循环，当循环到第4次时跳出；
    while (Math.abs(bytes) >= 1024) {
        i++
        bytes = bytes / 1024
        if (i === 4) break
    }
    // 将Bytes,KB,MB,GB,TB定义成一维数组；

    const bt = round(bytes, 2)
    return `${bt} ${uts[i]}`
}

// 打印调用堆栈的方法。
export function printCallStack() {
    try {
        throw(new Error('error can be ignored,just for printCallStack!!!'))
    } catch (e) {
        console.log(e.stack)
    }
}

export function sleep(delayTime) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delayTime)
    })
}

export function getIPAddress() {
    const interfaces = require('os').networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

// microSeconds 毫秒.延迟执行
export function delay(microSeconds) {
    return new Promise((resolve, reject) => {
        try {
            const timer = setTimeout(() => {
                resolve()
                clearTimeout(timer)
            }, microSeconds)
        } catch (e) {
            reject(e)
        }
    })
}

// 求矩形的交集

export function intersection(rectA, rectB) {
    const hasIntersect = isIntersect(rectA, rectB)
    if (!hasIntersect) {
        return null
    }
    let resRect = { x: 0, y: 0, width: 0, height: 0 }
    resRect.x = rectA.x > rectB.x ? rectA.x : rectB.x //选最右边的矩形的x作为交集的x
    resRect.y = rectA.y > rectB.y ? rectA.y : rectB.y //选最下面的矩形的y作为交集的y
    //选择左边矩形（x坐标较小者）的右边的作为交集矩形的右边，这样就可以求出交集矩形的宽度
    resRect.width = rectA.x + rectA.width < rectB.x + rectB.width ? rectA.x + rectA.width - resRect.x : rectB.x + rectB.width - resRect.x
    //同理，选择上面矩形（y坐标较小者）的下边的作为交集矩形的下边，这样就可以求出交集矩形的高度
    resRect.height = rectA.y + rectA.height < rectB.y + rectB.height ? rectA.y + rectA.height - resRect.y : rectB.y + rectB.height - resRect.y
    return resRect
}

// 求矩形是否相交

export function isIntersect(rect0, rect1) {
    let minX = Math.min(rect0.x, rect1.x)
    let maxX = Math.max(rect0.x + rect0.width, rect1.x + rect1.width)
    let diffX = Math.abs(maxX - minX)

    let minY = Math.min(rect0.y, rect1.y)
    let maxY = Math.max(rect0.y + rect0.height, rect1.y + rect1.height)
    let diffY = Math.abs(maxY - minY)

    let maxW = rect0.width + rect1.width
    let maxH = rect0.height + rect1.height
    if (diffX < maxW && diffY < maxH) {
        return true
    }
    return false
}

// 求矩形的中心点
export function getRectCenter(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

export function isPointInside(point, rect) {
    let ret = false
    const { x, y, width, height } = rect
    const maxX = x + width
    const maxY = y + height
    if (point.x > x && point.x < maxX && point.y > y && point.y < maxY) {
        ret = true
    }
    return ret
}

/*
    测量耗时调用的api;
    debugMsgLabel是消息标识;
    func,是返回promise的函数；
 */
export function measurePerformance(func, debugMsgLabel) {
    return new Promise(async (resolve, reject) => {
        const beginTime = new Date().getTime()
        try {
            const res = await func()
            resolve(res)
        } catch (e) {
            reject(e)
        }
        console.log(`[${debugMsgLabel}]:measurePerformance,constTime=${(new Date().getTime() - beginTime) / 1000}秒!!!`)
    })
}

/**
 * 传入概率，获取是否触发
 * @param patch
 * @returns {boolean}
 */
export function getIsTrigger(patch) {
    if (patch === 0) return false
    if (patch === 1) return true
    //0-1之间的随机数
    let num = Math.random()
    if (num >= 0 && num <= patch) return true
    if (num >= patch && num <= 1) return false
}

/**
 * 一维数组转二维
 * @param baseArray
 * @param row
 * @returns {[]|*}
 */
export function twoDimensionalArray(baseArray, row = 1) {
    if (row < 1) {
        return baseArray
    }

    const len = baseArray.length
    const n = row
    const lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
    const res = []
    for (let i = 0; i < lineNum; i++) {
        const temp = baseArray.slice(i * n, i * n + n)
        res.push(temp)
    }
    return res
}
