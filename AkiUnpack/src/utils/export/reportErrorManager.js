export class ReportErrorManager {
    constructor() {
    }

    //加密
    async handleReportIssue(args) {
    }

    uploadReportFile(projectId, uploadFilePath, zipPath, type, failMessage) {
    }

    clearReportCache() {
    }

    getPre3DayDate() {
        let myDate = new Date
        let year = myDate.getFullYear() //获取当前年
        let mon = myDate.getMonth() + 1 //获取当前月
        let date = myDate.getDate() //获取当前日
        let hours = myDate.getHours() //获取当前小时
        let minutes = myDate.getMinutes() //获取当前分钟
        let seconds = myDate.getSeconds() //获取当前秒

        if (date > 3) {
            date -= 3
        } else {
            date = 28
            mon -= 1
        }
        let now = year + '-' + mon + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
        return now
    }

    findDir(dirPath, timestmap, prefex) {
        return []
    }

    findFiles(dirPath, timestmap, prefex, suffix) {
        return []
    }

    isSuccess(result) {
        if (result) {
            let isSuccess = result.code == 200
            if (!isSuccess) {
                console.error('db error : ', result)
            }
            return isSuccess
        }
        return false
    }

    async handleSexMessage(message) {
    }

    async handleFeedBackMessage(message) {

    }

    async handleMessage(message) {
    }

    //最早的崩溃问题上报
    addReportTask(message) {
    }

    //年龄修改上报
    addReportSexTask(message) {

    }

    //问题反馈上报
    addFeedbackTask(message) {

    }
}
