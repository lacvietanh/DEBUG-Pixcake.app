import fs from '@/qt-ipc/fs'
import path from '@/qt-ipc/path'
import { app as APP } from '@/qt-ipc/app'
import shell from '@/qt-ipc/shell'

export const findProjectRootPath = () => {
    let renderPath = __dirname
    let start = renderPath.indexOf('node_modules')
    return renderPath.substr(0, start)
}

export async function joinResourcesPath(rpath) {
    const platform = `${process.platform}`
    const { NODE_ENV } = process.env
    const darwinDev = await path.resolve(`resources/${rpath}`)
    const darwin = await path.join(__dirname, '..') + `/${rpath}`
    const win = await path.resolve()
    const libsPath = {
        darwinDev,
        darwin,
        win
    }

    if (platform === 'darwin') {
        return NODE_ENV === 'development' ? libsPath.darwinDev : libsPath.darwin
    } else {
        return await libsPath.win.toString('utf8') + path.sep + `resources/${rpath}`
    }
}

/*
    获得应用程序所在路径
 */
export async function getExcutePath() {
    let app = APP
    let appPath = await app.getAppPath()
    let isDev = process.env.VUE_APP_ENV == 'dev'
    let isWin = `${process.platform}` == 'win32'

    if (isDev) {
        appPath = appPath.replace('dist_electron', '')
    } else {
        if (isWin) {
            appPath = await path.join(appPath, '../../')
        } else {
            appPath = await path.join(appPath, '../MacOS')
        }
    }
    return appPath
}

/**
 * 打开路径
 * @param path
 */
export async function openPath(path) {
    await shell.openPath(path)
}

export async function openItemInFolder(path) {
    await shell.showItemInFolder(path)
}

/**
 * 打开路径
 * @param path
 */
export async function openFile(path) {
    if (await fs.statSync(path).isFile()) {
        try {
            await openPath(path)
        } catch (err) {
        }
    } else {
        return Promise.reject(new Error('文件不存在'))
    }
}

/**
 * 打开当前路径上一级文件夹
 * @param path
 */
export async function showItemInFolder(path) {
    const stat = await fs.statSync(path)
    if (stat.isFile()) {
        await shell.showItemInFolder(path)
    } else {
        const temp = path.split(path.sep)
        temp.pop()
        openFile(temp).then(_ => {
        })
    }
}

export async function prefixPath(path) {
    const platform = `${process.platform}`

    let prefixPath = await APP.getPath('userData')

    if (platform === 'win32') {
        prefixPath = await path.join(await APP.getAppPath(), `../../../.${await APP.getName()} Workspace`)
    }

    if (path) {
        prefixPath = await path.join(prefixPath, path)
    }

    return prefixPath
}
