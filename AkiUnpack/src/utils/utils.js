import FileUtils from '@/utils/FileUtils'
import path from '@/qt-ipc/path'

// let fs = require('fs');
// let path = require('path');

export const getClientHeight = () => {
    let clientHeight = 0
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight =
            document.body.clientHeight < document.documentElement.clientHeight ?
                document.body.clientHeight :
                document.documentElement.clientHeight
    } else {
        clientHeight =
            document.body.clientHeight > document.documentElement.clientHeight ?
                document.body.clientHeight :
                document.documentElement.clientHeight
    }
    return clientHeight
}

export const getClientWidth = () => {
    let clientWidth = 0
    if (document.body.clientWidth && document.documentElement.clientWidth) {
        clientWidth =
            document.body.clientWidth < document.documentElement.clientWidth ?
                document.body.clientWidth :
                document.documentElement.clientWidth
    } else {
        clientWidth =
            document.body.clientWidth > document.documentElement.clientWidth ?
                document.body.clientWidth :
                document.documentElement.clientWidth
    }
    return clientWidth
}

export const findProjectRootPath = () => {
    let renderPath = __dirname
    let start = renderPath.indexOf('node_modules')
    let finalPath = renderPath.substr(0, start)
    return finalPath
}

export const aspectScaleToFitSize = (frameW, frameH, imgW, imgH) => {
    let outSize = {
        width: 0,
        height: 0
    }
    let frameRatio = frameW / frameH
    let imgRatio = imgW / imgH
    if (imgRatio > frameRatio) {
        outSize.width = frameW
        outSize.height = outSize.width / imgRatio
    } else {
        outSize.height = frameH
        outSize.width = outSize.height * imgRatio
    }
    return outSize
}


//递归创建目录 同步方法
function mkdirSync(dirname) {
    //console.log(dirname);
    if (FileUtils.isFileExist(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

export const mkdirNeedCascad = (inputPath) => {
    return mkdirSync(inputPath)
}

export const getDir = (inputPath) => {
    let lIndex = inputPath.lastIndexOf(path.sep)
    let s = inputPath.substring(0, lIndex)
    return s
}

export const getLastPathName = (strPath) => {
    let lIndex = strPath.lastIndexOf(path.sep)
    let s = strPath.substring(lIndex + 1, strPath.length)
    return s
}

export const getFileExtenstionName = (strPath) => {
    let lIndex = strPath.lastIndexOf('.')
    let s = strPath.substring(lIndex + 1, strPath.length)
    return s
}

export const sortBy = (list, key) => {
    if (key == undefined || key == null) {
        return list.sort((a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language, {
            numeric: true,
            ignorePunctuation: true
        }))
    }
    return list.sort((a, b) => a[key].localeCompare(b[key], navigator.languages[0] || navigator.language, {
        numeric: true,
        ignorePunctuation: true
    }))
}

/**
 * 格式化字符串
 * @param value
 * @param opt
 * @returns {string|*}
 */
export const formatString = (value, opt = {}) => {
    if (value == null || value == undefined) {
        return ''
    }
    const { endCount = 10, max = 34, sep = ' ... ' } = opt
    if (value.byteLength() >= max) {
        const nameArr = value.split('') || []
        const endArr = []
        const startArr = []

        let sLen = 0
        let eLen = 0

        nameArr.forEach(str => {
            if (sLen < (max - endCount - sep.byteLength())) {
                startArr.push(str)
                sLen += str.byteLength()
            }
        })


        nameArr.reverse().forEach(str => {
            if (eLen <= endCount) {
                endArr.push(str)
                eLen += str.byteLength()
            }
        })

        // ... 名字过滤器
        return `${startArr.join('')}${sep}${endArr.reverse().join('')}`
    }
    return value
}

export const deleteItemOf = (array, dataItem) => {
    const index = array.indexOf(dataItem)
    if (index > -1) {
        array.splice(index, 1)
    }
}

/**
 * 一维转二维
 */
export function convertToMultArray(data, column = 1) {
    let originArr = data || []
    let outList = []
    let i = column
    let ary = []
    originArr.forEach((element) => {
        let isNewRow = i % column === 0
        if (isNewRow) {
            ary = []
            outList.push(ary)
        }
        ary.push(element)
        i++
    })

    return outList
}

export function hexToBytes(hex) {
    let bytes = []
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16))
    }
    return bytes
}

export function hexToInt(hex) {
    let ints = []
    for (let c = 0; c < hex.length; c += 8) {
        let v = hex.substr(c + 6, 2) + hex.substr(c + 4, 2) + hex.substr(c + 2, 2) + hex.substr(c, 2)
        ints.push(parseInt(v, 16))
    }
    return ints
}

export function filterObjectByKeys(data, keys) {
    const obj = {}
    for (const key in data) {
        if (keys.includes(key)) {
            obj[key] = data[key]
        }
    }
    return obj
}

export function CGRectGetMinX(rect) {
    return rect.x
}

export function CGRectGetMinY(rect) {
    return rect.y
}

export function CGRectGetMaxX(rect) {
    return rect.x + rect.width
}

export function CGRectGetMaxY(rect) {
    return rect.y + rect.height
}

export function isRectOverFlow(cropRect,edgeRect){
    let isOverFlow = false;
    const isLeftOver = CGRectGetMinX(cropRect) - CGRectGetMinX(edgeRect) < 0;
    const isTopOver = CGRectGetMinY(cropRect) - CGRectGetMinY(edgeRect) < 0;
    const isRightOver = CGRectGetMaxX(cropRect) - CGRectGetMaxX(edgeRect) > 0;
    const isBottomOver = CGRectGetMaxY(cropRect) - CGRectGetMaxY(edgeRect) > 0;
    isOverFlow = isLeftOver || isTopOver || isRightOver || isBottomOver;
    return isOverFlow;
}

