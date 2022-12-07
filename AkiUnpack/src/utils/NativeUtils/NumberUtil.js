// 修复符点数问题
Number.prototype.toStrip = function (precision = 12) {
    const num = this
    return +parseFloat(num.toPrecision(precision))
}

// 四舍五入
Number.prototype.toRound = function (precision = 3) {
    const num = this
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}

// 根据基数进行四舍五入
Number.prototype.toRoundByBase = function (base = 0.05) {
    const num = this
    let baseNum = base
    if (base >= 1) return Math.round(num)
    // 1.求精度
    let precision = 0
    while (true) {
        precision++
        baseNum = baseNum * 10
        if (baseNum >= 1) break
    }
    // 2.根据精度进行取值
    const fixedNum = num.toRound(2)

    // 3.求余
    const leftNum = ((fixedNum * Math.pow(10, precision)) % (base * Math.pow(10, precision))) / Math.pow(10, precision)
    const roundBase = base / 2

    const resNum = leftNum > roundBase ? fixedNum - leftNum + base : fixedNum - leftNum
    return parseFloat(resNum.toFixed(precision))
}
