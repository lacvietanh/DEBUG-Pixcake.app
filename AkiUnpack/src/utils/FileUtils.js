import md5 from 'js-md5'
import { getFileExtenstionName } from '@/utils/utils'
import { ImageExtendNames } from '#/types/constants'
import NodeApi from '@/qt-ipc/node-api'
import fs from '@/qt-ipc/fs'
import path from "@/qt-ipc/path";
export default {
    /**
     * 递归创建目录（同步）
     * @param path
     */
    async mkdirAsync(path) {
        return fs.mkdirSync(path)
    },

    //递归创建目录 同步方法
    async mkdirSync(dirname) {
        //console.log(dirname);
        if (await fs.existsSync(dirname)) {
            return true
        } else {
            await fs.mkdirSync(dirname)
        }
    },

    findFiles(dirPath, timestmap, prefex) {
        // if (dirPath == null) {
        //     return 0
        // }
        // let files = []
        // let finalFiles = []
        // if (this.isFileExist(dirPath)) {
        //     if (fs.statSync(dirPath).isDirectory()) {
        //         files = fs.readdirSync(dirPath);
        //         for (let i = 0; i < files.length; i++) {
        //             const file = files[i]
        //             let curPath = path.join(dirPath, file);
        //             if (fs.statSync(curPath).isFile()) {
        //                 if (file.startsWith(prefex)) {
        //                     let name = path.basename(curPath, '.txt')
        //                     if (timestmap - name.substring(prefex.length) >= 0) {
        //                         finalFiles.push(curPath)
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // return finalFiles
        return []
    },

    async isFileExist(filePath) {
        try {
            if (filePath == null || filePath.length == 0) {
                return false
            }
            const ret = await fs.existsSync(filePath)
            return ret
        } catch (e) {
            console.error('isFileExist : ' + filePath)
        }
        return false
    },

    async isDirExist(dirPath) {
        if (dirPath == null || dirPath.length == 0) {
            return false
        }
        if (!await fs.existsSync(dirPath)) {
            return false
        }
        return (await fs.statSync(dirPath)).isDirectory()
    },

    isImageType(str) {
        return ['png', 'jpg', 'jpeg'].indexOf(str.toLowerCase()) !== -1
    },


    /**
     * 写入json至本地
     * @param path
     * @param json
     * @returns {Promise<never>|Promise<void>}
     */
    async writeJsonIntoLocal(path, json) {
        try {
            const JsonStr = JSON.stringify(json)
            await fs.writeFileSync(path, JsonStr, 'utf-8')
            return Promise.resolve()
        } catch (e) {
            console.error(e)
            return Promise.reject(new Error('配置文件写入失败'))
        }
    },

    /**
     * 读取本地json文件
     * @param path
     * @returns {Promise<never>|any}
     */
    async readJsonFromLocal(path) {
        try {
            const JsonStr = await fs.readFileSync(path, 'utf-8')
            return JSON.parse(JsonStr)
        } catch (err) {
            return new Error(`读取预设配置文件失败，路径:${path}`)
        }
    },

    /**
     * 读取文件并转换为File类型
     * @param fPath
     * @param filename
     * @returns {File}
     */
    async readImageFileAsync(fPath, filename) {
        const buffer = await this.readFileAsync(fPath)
        return new File([buffer], filename, { type: 'image/' + filename.split('.').reverse()[0] })
    },

    /**
     * 读取文件并转换为File类型
     * @param fPath
     * @param filename
     * @returns {File}
     */
    async readBinFileAsync(fPath, filename) {
        let buffer = null
        try {
            buffer = await this.readFileAsync(fPath)
        } catch (e) {
        }
        if (buffer) {
            return new File([buffer], filename)
        } else {
            return null
        }
    },

    /**
     * 查找文件对应的文件目录
     * @param filePath
     */ async findDirPath(filePath) {
        if (filePath == null) {
            return null
        }


        if (await this.isFileExist(filePath)) {
            let state = await fs.statSync(filePath)
            if (state.isDirectory()) {
                return filePath
            } else {
                const index = filePath.lastIndexOf(path.sep)
                return filePath.substr(0, index)
            }
        } else {
            let pathExtenstionName = getFileExtenstionName(filePath).toLowerCase()
            let isValidExtendNameFmt = ImageExtendNames.includes(pathExtenstionName)
            if (isValidExtendNameFmt) {
                const index = filePath.lastIndexOf(path.sep)
                return filePath.substr(0, index)
            } else {
                return filePath
            }
        }
    },

    /**
     * 字符串转换为 unicode 格式
     * @returns {Buffer}
     * @param path
     */
    toUnicode(path) {
        const format = `${path}\0`
        return Buffer.from(format, 'ucs2')
    },
    replacePath(inPath) {
        return inPath.replaceAll(path.sep, '/')
    },

    /*
        写入数据流Buffer
     */
    writeDataBuffer(path, data) {
        let wstream = fs.createWriteStream(path)
        wstream.write(data)
        wstream.end()
    },

    async deleteFile(filePath) {
        if (await this.isFileExist(filePath)) {
            await fs.unlinkSync(filePath)
        }
    },

    //删除所有的文件(将所有文件夹置空)
    async deleteFolder(filePath) {
        if (await this.isFileExist(filePath)) {
            await fs.rmdirSync(filePath, { recursive: true })
        }
    },

    async deleteFolderByCondition(filePath, canDeleteCallBack) {
        if (await this.isFileExist(filePath)) {
            const files = await fs.readdirSync(filePath)
            files.forEach(async (file) => {
                const nextFilePath = await NodeApi.path.join(filePath, file)
                const states = await fs.statSync(nextFilePath)
                if (states.isDirectory()) {
                    await this.deleteFolderByCondition(nextFilePath, canDeleteCallBack)
                } else {
                    let canDelete = false
                    if (canDeleteCallBack) {
                        canDelete = canDeleteCallBack(nextFilePath)
                    }
                    if (canDelete) {
                        await fs.unlinkSync(nextFilePath)
                    }
                }
            })
            let canDelete = false
            if (canDeleteCallBack) {
                canDelete = canDeleteCallBack(filePath)
            }
            if (canDelete) {
                await fs.rmdirSync(filePath)
            }
        }
    },

    async copyDirAsync(srcDir, destDir) {
        if (!await this.isDirExist(srcDir)) {
            return
        }
        if (!await this.isDirExist(destDir)) {
            await this.mkdirAsync(destDir)
        }

        let files = await fs.readdirSync(srcDir)
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            let curPath = path.join(srcDir, file)
            if (await fs.statSync(curPath).isFile()) {
                let destFile = path.join(destDir, file)
                await this.copyFileAsync(curPath, destFile)
            }
        }
    },

    async copyFileSync(from, to) {
        await fs.writeFileSync(to, fs.readFileSync(from))
    },

    /**
     * 拷贝目录
     * @param from
     * @param to
     */
    async copyDirSync(from, to) {
        console.log('[copyDir] from: ', from)
        console.log('[copyDir] to: ', to)

        if (!await this.isFileExist(from)) {
            console.log('[copyDir] copy from path is not exist: ', from)
            return
        }

        // 递归拷贝所有
        const copyAllDir = async (fromDir, toDir) => {
            const names = await fs.readdirSync(fromDir)
            names.forEach(async name => {
                if (name === '.DS_Store') return
                const childFromPath = await NodeApi.path.join(fromDir, name)
                const childToPath = await NodeApi.path.join(toDir, name)
                const stat = await fs.statSync(childFromPath)
                if (stat.isDirectory()) {
                    await copyAllDir(childFromPath, childToPath)
                } else if (stat.isFile()) {
                    console.log('[copyDir] from: ', childFromPath, ' to: ', childToPath)
                    await this.mkdirSync(path.dirname(childToPath))
                    await this.copyFileSync(childFromPath, childToPath)
                    console.log('[copyDir] success')
                }
            })
        }

        const stat = await fs.statSync(from)

        if (stat.isDirectory()) {
            await copyAllDir(from, to)
        } else if (stat.isFile()) {
            console.log('[copyDir] from: ', from, ' to: ', to)
            await this.mkdirSync(path.dirname(to))
            await this.copyFileSync(from, to)
            console.log('[copyDir] success')
        }
    },

    async readFileAsync(filePath) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!await this.isFileExist(filePath)) {
                    resolve(null)
                    return
                }
                let res = await fs.readFileSync(filePath, 'utf-8')
                resolve(res)
            } catch (e) {
                reject(e)
                console.log(e)
            }
        })
    },

    /**
     * 文件为空，获取读取流失败的情况下返回null
     * @param filePath
     * @returns {Promise<unknown>}
     */
    async safeReadFileAsync(filePath) {
        if (!await this.isFileExist(filePath)) {
            return null
        }
        await fs.readFileSync(filePath)
    },

    async readFileToStringAsync(filePath) {
        let fileData = await this.readFileAsync(filePath)
        if (fileData) {
            return fileData.toString()
        }
        return null
    },

    async safeReadFileToStringAsync(filePath) {
        let fileData = await this.safeReadFileAsync(filePath)
        if (fileData) {
            return fileData.toString()
        }
        return null
    },

    async writeFileAsync(filePath, data) {
        await fs.writeFileSync(filePath, data)
    },

    async safeWriteFileAsync(filePath, data) {
        await fs.writeFileSync(filePath, data)
    },

    async copyFileAsync(fromPath, toPath) {
        if (!await this.isFileExist(fromPath)) {
            return
        }
        try {
            let data = await this.readFileAsync(fromPath)
            await this.writeFileAsync(toPath, data)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    async safeCopyFileAsync(fromPath, toPath) {
        if (!await this.isFileExist(fromPath)) {
            resolve(false)
            return
        }
        try {
            let data = await this.readFileAsync(fromPath)
            let fromFileMD5 = md5(data)
            await this.writeFileAsync(toPath, data)
            let toData = await this.readFileAsync(toPath)
            let toFileMD5 = md5(toData)
            if (fromFileMD5 !== toFileMD5) {
                await this.deleteFile(toPath)
                return false
            } else {
                return true
            }
        } catch (e) {
            return false
        }
    },

    encodeURIComponent(filepath){
        let encode = encodeURIComponent(filepath.replaceAll('\\', '/'))
        encode = encode.replaceAll('%3A', ':')
        encode = encode.replaceAll('%2F', '/')
        return encode
    }

}
