import fs from '@/qt-ipc/fs'
import { app as APP } from '@/qt-ipc/app'

const log4js = null

/**
 * 日志等级
 * @type {{warn: *, trace: *, debug: *, error: number, info: *, fatal: *}}
 */
const levels = {
    'trace': log4js?.levels?.TRACE,
    'debug': log4js?.levels?.DEBUG,
    'info': log4js?.levels?.INFO,
    'warn': log4js?.levels?.WARN,
    'error': log4js?.levels?.ERROR,
    'fatal': log4js?.levels?.FATAL
}

/**
 * 创建日志目录
 * @param pathStr
 */
async function judgePath(pathStr) {
    if (!await fs.existsSync(pathStr)) {
        await fs.mkdirSync(pathStr)
        //   console.log('createPath: ' + pathStr)
    }
}

// const USER_PATH = APP.getPath('userData')
// const rpath = process.env.NODE_ENV === 'development' ? './logs' : Path.join(USER_PATH, '/logs')

// judgePath(Path.resolve(rpath))

// log4js?.configure({
//     appenders: {
//         out: { type: 'console' },
//         allLog: {
//             type: 'file',
//             filename: Path.resolve(`${rpath}/TSAllLog.log`),
//             keepFileExt: true,
//             maxLogSize: 10485760,
//             backups: 3
//         },
//         errorLog: {
//             type: 'file',
//             filename: Path.resolve(`${rpath}/TSUncaughtException.log`),
//             keepFileExt: true,
//             maxLogSize: 5242880,
//             backups: 3
//         },
//         sqliteErrorLog: {
//             type: 'file',
//             filename: Path.resolve(`${rpath}/TSSqliteError.log`),
//             keepFileExt: true,
//             maxLogSize: 5242880,
//             backups: 3
//         },
//         qrcLog: {
//             type: 'file',
//             filename: Path.resolve(`${rpath}/TSQrc.log`),
//             keepFileExt: true,
//             maxLogSize: 5242880,
//             backups: 3
//         },
//         exportLog: {
//             type: 'file',
//             filename: Path.resolve(`${rpath}/export.log`),
//             keepFileExt: true,
//             maxLogSize: 5242880,
//             backups: 3
//         },
//         sqlite: {
//             type: 'logLevelFilter',
//             level: 'error',
//             appender: 'sqliteErrorLog'
//         }
//     },
//     categories: {
//         default: {
//             appenders: ['out', 'allLog'],
//             level: 'debug'
//         },
//         download: {
//             appenders: ['out', 'allLog'],
//             level: 'debug'
//         },
//         uncaught: {
//             appenders: ['out', 'errorLog', 'allLog'],
//             level: 'error'
//         },
//         sqlite: {
//             appenders: ['out', 'sqlite', 'allLog'],
//             level: 'info'
//         },
//         qrc: {
//             appenders: ['out', 'qrcLog', 'allLog'],
//             level: 'info'
//         },
//         exportErr: {
//             appenders: ['out', 'exportLog', 'errorLog', 'allLog'],
//             level: 'error'
//         },
//     }
// })

export function logger(name, level) {

}

export function use(app, level) {

}

export const log = logger('default')

export default log4js
