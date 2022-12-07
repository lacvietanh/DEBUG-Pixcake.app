import CryptoJS from 'crypto-js'

type CipherGCMTypes = 'aes-128-cbc' | 'aes-192-cbc' | 'aes-256-cbc';
// 128 对应 16 位长度密钥
// 192 对应 24 位长度秘钥
// 256 对应 32 位长度密钥

// AES 加密算法
export function aesEncrypt(content: string, secret: string, algorithm = 'aes-256-cbc'): string {
    const iv = CryptoJS.enc.Utf8.parse(secret.substr(0, 16))
    const key = CryptoJS.enc.Utf8.parse(secret)

    const srcs = CryptoJS.enc.Utf8.parse(content)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}

// AES 解密算法
export function aesDecrypt(content: string, secret: string, algorithm = 'aes-256-cbc'): string {
    const iv = CryptoJS.enc.Utf8.parse(secret.substr(0, 16))
    const key = CryptoJS.enc.Utf8.parse(secret)

    const encryptedHexStr = CryptoJS.enc.Hex.parse(content)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)

    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

export function hexHashEncrypt(content: string): string {
    if (!content) return ''
    return CryptoJS.MD5(content).toString()
}
