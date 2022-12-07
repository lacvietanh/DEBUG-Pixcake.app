String.prototype.byteLength = function () {
    const value = this
    let len = 0
    for (let i = 0; i < value.length; i++) {
        let a = value.charAt(i)
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2
        } else {
            len += 1
        }
    }
    return len
}

String.prototype.writeUTF = function (isGetBytes = false) {
    const str = this
    var back = []
    var byteSize = 0
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i)
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1
            back.push(code)
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2
            back.push((192 | (31 & (code >> 6))))
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3
            back.push((224 | (15 & (code >> 12))))
            back.push((128 | (63 & (code >> 6))))
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back)
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back)
    }
}
