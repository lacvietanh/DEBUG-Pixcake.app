let cctValues = [2000, 2074, 2152, 2235, 2323, 2416, 2515, 2621, 2734, 2855, 2984, 3122, 3271,
    3431, 3604, 3790, 3992, 4211, 4450, 4711, 5000/*4997*/, 5312, 5659, 6044, 6472, 6951, 7490, 8100, 8795, 9593,
    10516, 11596, 12873, 14403, 16266, 18579, 21519, 25370, 30600, 38150, 50000]

let displayCCTValues = [2000, 3256, 4488, 5784, 7028, 8634, 13030, 26718, 50000]

function findHighAndLowX(goal, values) {
    let result = { lowIndex: 0, highIndex: 0 }
    let maxIndex = values.length - 1
    if (goal <= values[0]) {
        result.lowIndex = 0
        result.highIndex = 0
    } else if (goal >= values[maxIndex]) {
        result.lowIndex = maxIndex
        result.highIndex = maxIndex
    } else {
        let high = 1
        while (true) {
            if (goal < values[high]) {
                result.lowIndex = high - 1
                result.highIndex = high
                break
            } else {
                high = high + 1
            }
        }
    }
    return result
}

export function cct_display_float2int(x) {
    return cct_float2int(x, displayCCTValues)
}

export function cct_display_int2float(y) {
    return cct_int2float(y, displayCCTValues)
}

/**
 * 色温0-0.5-1 转为2000-5000-50000
 */
export function cct_float2int(x, values = cctValues) {
    let fInterval = 1.0 / (values.length - 1)

    let lowX = Math.floor(x / fInterval)
    let highX = Math.ceil(x / fInterval)

    let lowY = values[lowX]
    let highY = values[highX]

    let y = lowY + Math.round((highY - lowY) * ((x - lowX * fInterval) / fInterval))
    return y
}

/**
 * 色温2000-5000-50000 转为 0-0.5-1
 */
export function cct_int2float(y, values = cctValues) {
    let index = findHighAndLowX(y, values)

    let lowX = index.lowIndex
    let highX = index.highIndex

    if (lowX === highX) {
        return lowX / (values.length - 1)
    }
    let lowY = values[lowX]
    let highY = values[highX]
    let x = (highX - (highY - y) / ((highY - lowY) / (highX - lowX))) / (values.length - 1)

    return x
}

/**
 * 色调 -minV到maxV 转为 0-1
 */
export function tint_int2float(y, minV, maxV, jpegBaseValue = 9) {
    let x
    if (y > jpegBaseValue) {
        x = 0.5 + 0.5 * (y - jpegBaseValue) / (maxV - jpegBaseValue)
    } else {
        x = 0.5 + 0.5 * (jpegBaseValue - y) / (minV - jpegBaseValue)
    }
    x = Math.min(Math.max(x, 0.0), 1.0)
    return x
}

/**
 * 0-1  转为  -minV到maxV
 */
export function tint_float2int(x, minV, maxV, baseValue = 9) {
    let y
    if (x > 0.5) {
        y = baseValue + Math.round((x - 0.5) * 2.0 * (maxV - baseValue))
    } else {
        y = baseValue + Math.round((0.5 - x) * 2.0 * (minV - baseValue))
    }
    y = Math.min(Math.max(y, minV), maxV)
    return y
}

/**
 * 合并raw 色温相对值和绝对值 0-1 =》 0-1
 */
export function mergeRawWhiteBalanceCCTValue(absValue, relativeValue, initValue) {
    if (absValue < 0) {
        // initValue求反
        absValue = cct_int2float(initValue)
    }
    relativeValue = (relativeValue - 0.5) * 2.0
    let x = absValue + relativeValue
    x = Math.min(Math.max(x, 0.0), 1.0)
    return x
}

/**
 * 合并jpg 色温相对值和绝对值 0-1 =》 0-1
 */
export function mergeJpgWhiteBalanceCCTValue(absValue, relativeValue) {
    return mergeRawWhiteBalanceCCTValue(absValue, relativeValue, 5000)
}

/**
 * 计算白平衡 色温参数 0-1 转 2000-50000
 * @param absValue      0-1.0
 * @param relativeValue 0-1.0
 * @param initValue     2000-50000
 * @returns {number|number} 返回 2000-50000
 */
export function calcRawWhiteBalanceCCTValue(absValue, relativeValue, initValue) {
    let x = mergeRawWhiteBalanceCCTValue(absValue, relativeValue, initValue)
    return cct_float2int(x)
}

/**
 * 计算白平衡 色温参数 2000-50000 转 0-1 (转为归一化参数）
 * @param value 2000-50000
 * @returns {number|number} 返回 0-1
 */
export function calcRawWhiteBalanceCCTValueToNormalizedValue(value) {
    return cct_int2float(value)
}

// export function calcRawWhiteBalanceDisplayCCTValue(absValue, relativeValue, initValue) {
//     let x = mergeRawWhiteBalanceCCTValue(absValue, relativeValue, initValue)
//     return cct_display_float2int(x)
// }

/**
 * 计算jpg白平衡 色温参数 0-1 转 -100 到 100
 * @param absValue 绝对值
 * @param relativeValue 相对值
 * @returns {number} 返回 -100 到 100的结果
 */
export function calcJpgWhiteBalanceCCTValue(absValue, relativeValue) {
    let x = mergeJpgWhiteBalanceCCTValue(absValue, relativeValue)
    //light room下 jpeg 和 raw的对应值如下
    //2000-5000-50000 （2000）（2417）（2985）（3791）（5000）（6957）（10526）（18605）（50000）
    //-100-0-100      （-100）（-75） （-50）  （-25）  （0）   （25）  （50）   （75）   （100）
    let y = Math.round((x - 0.5) * 200)
    return Math.min(Math.max(-100, y), 100)
}

/**
 * 计算jpg白平衡 色温参数 -100 到 100 转 0 - 1
 */
export function calcJpgWhiteBalanceCCTValueToNormalizedValue(value) {
    return Math.min(Math.max(0, (value + 100) / 200.0), 1)
}

/**
 * 合并raw 色调 相对值和绝对值 0-1 => 0-1
 */
export function mergeRawWhiteBalanceTintValue(absValue, relativeValue, initValue) {
    if (absValue < 0) {
        // initValue求反
        absValue = tint_int2float(initValue, -150.0, 150.0)
    }
    return absValue + (relativeValue - 0.5) * 2.0
}

/**
 * 合并jpeg 色调 相对值和绝对值 0-1 => 0-1
 */
export function mergeJpgWhiteBalanceTintValue(absValue, relativeValue, initValue) {
    if (absValue < 0) {
        // initValue求反
        absValue = 0.5
    }
    let x = absValue + (relativeValue - 0.5) * 2.0
    x = Math.min(Math.max(x, 0.0), 1.0)
    return x
}

/**
 * 计算Raw白平衡色调参数 0-1 转 -150 到 150
 */
export function calcRawWhiteBalanceTintValue(absValue, relativeValue, initValue) {
    if (absValue < 0) {
        // initValue求反
        absValue = tint_int2float(initValue, -150.0, 150.0)
    }
    let x = absValue + (relativeValue - 0.5) * 2.0
    return tint_float2int(x, -150.0, 150.0)
}

/**
 * 计算Raw白平衡色调参数 -150 到 150 转 0-1
 */
export function calcRawWhiteBalanceTintValueToNormalizedValue(value) {
    return tint_int2float(value, -150, 150)
}

/**
 * 计算jpg白平衡色调参数 0-1 转 -100 到 100
 * @param absValue
 * @param relativeValue
 * @returns {number}
 */
export function calcJpgWhiteBalanceTintValue(absValue, relativeValue) {
    if (absValue < 0) {
        // initValue求反
        absValue = 0.5
    }
    let x = absValue + (relativeValue - 0.5) * 2.0
    x = Math.min(Math.max(x, 0.0), 1.0)
    return tint_float2int(x, -100.0, 100.0, 0)
}

/**
 * 计算jpg白平衡色调参数 -100 到 100 转 0-1
 */
export function calcJpgWhiteBalanceTintValueToNormalizedValue(value) {
    return tint_int2float(value, -100, 100, 0)
}

/**
 * CR锐化数量计算
 * 0-1 转 0-150
 */
function calcCRDBValue_x2y(fValue, midValue) {
    // 0 - 0.5 - 1.0 => 0 - midValue - 150
    if (fValue <= 0.5) {
        let value = fValue * midValue * 2// +0.5是做四舍五入
        return Math.max(Math.min(midValue, value), 0)
    } else {
        let value = midValue + ((fValue - 0.5) * 2.0 * (150 - midValue))// +0.5是做四舍五入
        return Math.min(Math.max(midValue, value), 150)
    }
}

/**
 * CR锐化数量计算
 * 0-150 转 0-1
 */
function calcCRDBValue_y2x(iValue, midValue) {
    //  0 - midValue - 150 =>0 - 0.5 - 1.0
    if (iValue <= midValue) {
        return iValue / (2.0 * midValue)
    } else {
        let value = (iValue - midValue) / (2.0 * (150 - midValue))// 换算到0-0.5
        return value + 0.5 // 换算到0.5-1.0
    }
}

export function calcJpegCRDBValueX2Y(fValue) {
    return calcCRDBValue_x2y(fValue, 10)
}

export function calcRawCRDBValueX2Y(fValue) {
    return calcCRDBValue_x2y(fValue, 40)
}

export function calcJpegCRDBValueY2X(iValue) {
    return calcCRDBValue_y2x(iValue, 10)
}

export function calcRawCRDBValueY2X(iValue) {
    return calcCRDBValue_y2x(iValue, 40)
}
