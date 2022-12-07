interface IPoint {
    x: number,
    y: number
}

interface IRect {
    x: number,
    y: number,
    width: number,
    height: number
}

export function vecAdd(vecA: IPoint, vecB: IPoint): IPoint {
    return { x: vecA.x + vecB.x, y: vecA.y + vecB.y }
}

export function rectGetMaxX(rect: IRect): number {
    return rect.x + rect.width
}

export function rectGetMaxY(rect: IRect): number {
    return rect.y + rect.height
}

export function rectGetMidX(rect: IRect): number {
    return rect.x + rect.width / 2
}

export function rectGetMidY(rect: IRect): number {
    return rect.y + rect.height / 2
}

export function rectGetMinY(rect: IRect): number {
    return rect.y
}

export function rectGetMinX(rect: IRect): number {
    return rect.x
}

// degree是弧度,以原点为中心旋转
export function rotatePoint(point: IPoint, degree: number): IPoint {
    let x = point.x * Math.cos(degree) - point.y * Math.sin(degree)
    let y = point.x * Math.sin(degree) + point.y * Math.cos(degree)
    return { x, y }
}

// scale是放大倍率,以原点放大
export function zoomPoint(point: IPoint, scaleX: number, scaleY: number): IPoint {
    let x = point.x * scaleX
    let y = point.y * scaleY
    return { x, y }
}

/*
  绕旋转中心，获得旋转后的矩形坐标
 */
export function rotateAndZoomRect(rect: IRect, degree: number, scaleX: number, scaleY: number): {
    p0: IPoint, p1: IPoint, p2: IPoint, p3: IPoint
} {
    const tranVex = { x: rectGetMidX(rect), y: rectGetMidY(rect) }
    const v0 = { x: rectGetMinX(rect), y: rectGetMinY(rect) } // topLeft
    const v1 = { x: rectGetMaxX(rect), y: rectGetMinY(rect) } // topRight
    const v2 = { x: rectGetMaxX(rect), y: rectGetMaxY(rect) } // bottomRight
    const v3 = { x: rectGetMinX(rect), y: rectGetMaxY(rect) } // bottomLeft

    const t2Ori = { x: -tranVex.x, y: -tranVex.y }
    let nV0 = vecAdd(v0, t2Ori)
    let nV1 = vecAdd(v1, t2Ori)
    let nV2 = vecAdd(v2, t2Ori)
    let nV3 = vecAdd(v3, t2Ori)

    nV0 = rotatePoint(nV0, degree)
    nV1 = rotatePoint(nV1, degree)
    nV2 = rotatePoint(nV2, degree)
    nV3 = rotatePoint(nV3, degree)

    nV0 = zoomPoint(nV0, scaleX, scaleY)
    nV1 = zoomPoint(nV1, scaleX, scaleY)
    nV2 = zoomPoint(nV2, scaleX, scaleY)
    nV3 = zoomPoint(nV3, scaleX, scaleY)


    nV0 = vecAdd(nV0, tranVex)
    nV1 = vecAdd(nV1, tranVex)
    nV2 = vecAdd(nV2, tranVex)
    nV3 = vecAdd(nV3, tranVex)
    return { p0: nV0, p1: nV1, p2: nV2, p3: nV3 }
}


/**
 * 计算居中中心点 左上小坐标和缩放比
 */
export function computeCssScaleCenterPosition(cw: number, ch: number, iw: number, ih: number): { x: number, y: number, scale: number } {
    let x: number, y: number, scale: number

    const scW = cw / iw;
    const scH = ch / ih;

    if (scW < 1 || scH < 1) {
        scale = scW < scH ? scW : scH
    } else {
        scale = 1;
    }

    x = (cw - iw) / 2
    y = (ch - ih) / 2

    return { x, y, scale }
}

/**
 * 根据缩放步长 获取下一个 缩放值
 * @param value
 * @param isZoom
 */
export function getStepScale(value: number = 0, isZoom: boolean = true): number {
    const zoomOutList = [1, 3, 5, 7, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const zoomInList = [100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000]
    const zoomList = Array.from(new Set([...zoomOutList, ...zoomInList]))

    let ratio = Number(parseInt((value * 100).toFixed(2)))
    const reverseRatio = [...zoomList].reverse()
    if (!isZoom) {
        for (const i of reverseRatio) {
            if (i < ratio) {
                ratio = i / 100
                return ratio
            }
        }
    } else if (isZoom) {
        for (const i of zoomList) {
            if (i > ratio) {
                ratio = i / 100
                return ratio
            }
        }
    }

    return ratio / 100
}

/**
 * 版本号比对，v1是否比v2大
 * @param v1
 * @param v2
 */
export function versionComparison(v1: string, v2: string): boolean {
    if (!v1 || !v2) {
        return false
    }
    const v1Arr: number[] = v1.split('.').map(v => Number(v))
    const v2Arr: number[] = v2.split('.').map(v => Number(v))
    const v1Res = v1Arr.reduce((pre: number,cur: number, i: number,arr: number[]) =>  pre + Number(cur) * Math.pow(1000, arr.length - 1 - i), 0)
    const v2Res = v2Arr.reduce((pre: number,cur: number, i: number,arr: number[]) =>  pre + cur * Math.pow(1000, arr.length - 1 - i), 0)
    return v1Res > v2Res
}

/*
   限制最近的偶数
 */
export function limitToEven(value: number): number {
    const result = Math.floor(value);
    if (result % 2 === 0) {
        return result;
    }
    return result + 1;
}

export function limitToPrecision(value: number, precision: number = 0): number {
    const base = precision > 0 ? Math.pow(10, precision) : 1
    const result = Math.round(value * base);
    return result / base;
}

/**
 * 换算pix
 * @param dpi 图片dpi
 * @param cm 选择的尺寸
 */
export function cm2pix(dpi: number, cm: number): number {
    const pix = 28.346 / 72.0 * dpi * cm
    return limitToPrecision(limitToEven(pix * 1000) / 1000, 3)
}

/**
 * 换算cm
 * @param dpi 图片dpi
 * @param px
 */
export function pix2cm(dpi: number, px: number): number {
    const cm = px / (28.346 / 72.0 * dpi)
    return limitToPrecision(cm, 3)
}

/**
 * 换算dpi
 * @param pix 图片像素
 * @param cm 选择的尺寸
 */
export function pix2dpi(pix: number, cm: number): number{
    const dpi = pix / 28.346 * 72.0 / cm
    return Math.floor(dpi)
}

/**
 * 根据图片尺寸转化画笔区域
 */
export function translateRange(width: number, height: number, value = 0, min = 0, max = 100): number {
    // 最短边、最长边
    const shortSide = width > height ? height : width
    const longSide = width > height ? width : height

    const fMin = shortSide / 1000
    const fMax = longSide * 1.5

    const rangeArr = [min, max]

    const prt = (value - rangeArr[0]) / (rangeArr[1] - rangeArr[0])

    return (fMax - fMin) * prt + fMin
}


export function isIntersect(a: any[], b: any[]): boolean{
    return a.filter(function(v){ return b.indexOf(v) > -1 }).length > 0
}
