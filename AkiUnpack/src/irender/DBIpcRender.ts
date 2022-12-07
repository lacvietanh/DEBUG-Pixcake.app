import NodeApi, { NodeChannelEvent } from '@/qt-ipc/node-api'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

let busyStatusMap = new Map<string, boolean>()
const promiseAckMap = new Map()

let isRegister = false


export default {

    registerDBListener() {
        if (isRegister) {
            return
        }
        isRegister = true
        this.onListen()
    },

    onListen() {
        const dbIpc = window.$db
        dbIpc['onResult'].connect((result: any) => {
            this.handleMessage(result)
        })

        dbIpc['printLogQt'].connect((result: any) => {
            console.log('', result)
        })
    },

    changeBusyStatus(table: string, status: boolean) {
        busyStatusMap.set(table, status)
    },

    handleMessage(result: any) {
        let { code, msg, identifyKey, table } = result
        let actions = promiseAckMap.get(identifyKey)

        promiseAckMap.delete(identifyKey)
        busyStatusMap.set(table, false)
        let resolve = actions && actions[0]
        let reject = actions && actions[1]

        let time = (actions && actions[2]) || 0
        let ms = time > 0 ? (+new Date() - time) : -1

        console.log('dbIpc render onListener ', result, ms + 'ms')

        if (actions) {
            if (this.isSuccess(result)) {
                resolve(msg == null ? true : msg)
            } else {
                reject(msg)
            }
        }

        if (this.isSuccess(result)) {
            if (resolve) {
                resolve(msg == null ? true : msg)
            }
        } else {
            if (reject) {
                reject(result)
            }
        }
    },

    isSuccess(result: any) {
        if (result) {
            let isSuccess = result.code == 200
            if (!isSuccess) {
                console.error('db error : ', result)
            }
            return isSuccess
        }
        return false
    },

    //添加数据
    async insertToDB(table: string, data: any) {
        return new Promise(async (resolve, reject) => {
            // @ts-ignore
            let args = {
                table: table,
                data: typeof data.parseToJson === 'function' ? data.parseToJson() : data,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.insert(args)

        })
    },

    /**
     * 批量事务处理
     * @param data {tab, list<model>>}
     */
    async transactionRequestDB(data: Map<string, []>) {
        if (!data) {
            return
        }

        return new Promise(async (resolve, reject) => {
            let list = []
            for (const item of data) {
                const table = item[0]
                const sqlList = item[1]
                list.push({ table: table, sqlList: sqlList })
            }
            let args = {
                list: list,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.transactionRequestDB(args)

        })
    },

    async updateAll(table: string, data: any) {
        // @ts-ignore

        return new Promise<resolve, reject>(async (resolve, reject) => {
            let args = {
                table: table,
                data: data,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.updateAll(args)
        })
    },

    async updateByKeys(table: string, data: any, keys: any, canDelay: boolean = false) {
        // @ts-ignore
        return new Promise<resolve, reject>(async (resolve, reject) => {
            const values = []
            for (const key of keys) {
                // @ts-ignore
                let value = data[key] == undefined ? null : data[key]
                const isAry = Array.isArray(value)
                if (isAry) {
                    value = value.join(',')
                }
                values.push(value)
            }


            let args = {
                table: table,
                values: values,
                keys: keys,
                id: data.id,
                canDelay: canDelay,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.updateByKeys(args)
        })
    },

    /**
     * 批量给key更新指定值，通过调用registerBatchUpdateListener()、unRegisterBatchUpdateListener() 来得到返回结果
     * @param table
     * @param ids
     * @param key
     * @param value 指定值
     */
    async updateBatchForValue(table: string, ids: [], key: string, value: any, viewModelKeys = null) {
        return new Promise(async (resolve, reject) => {
            if (!ids) {
                return
            }
            if (ids.length === 0) {
                return
            }
            const isAry = Array.isArray(value)
            let dstValue = value
            if (isAry) {
                dstValue = value.join(',')
            }
            // @ts-ignore
            let args = {
                table: table,
                ids: ids,
                key: key,
                value: dstValue,
                viewModelKeys: viewModelKeys,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            this.changeBusyStatus(table, true)
            window.$db.updateBatchForValue(args)
            this.changeBusyStatus(table, false)
        })
    },

    /**
     *  批量给多个key更新指定值，通过调用registerBatchUpdateListener()、unRegisterBatchUpdateListener() 来得到返回结果
     * @param table
     * @param ids
     * @param keyValues 格式：[{key : 字段1, value: 值}, { key : 字段2, value: 值}]
     */
    updateBatchMoreKeys(table: string, ids: [], keyValues: [], viewModelKeys = null) {

        return new Promise(async (resolve, reject) => {
            // @ts-ignore
            let args = {
                table: table,
                ids: ids,
                keyValues: keyValues,
                viewModelKeys: viewModelKeys,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            this.changeBusyStatus(table, true)
            window.$db.updateBatchMoreKeys(args)
            this.changeBusyStatus(table, false)
        })
    },

    /**
     * 批量给key增减值，通过调用registerBatchUpdateListener()、unRegisterBatchUpdateListener() 来得到返回结果
     * @param table
     * @param ids
     * @param key
     * @param value 要增减的值
     */
    updateBatchForIncrease(table: string, ids: [], key: string, value: any, viewModelKeys = null, minValue = 0, maxValue = 1.0) {
        return new Promise(async (resolve, reject) => {
            // @ts-ignore
            // @ts-ignore
            let args = {
                table: table,
                ids: ids,
                key: key,
                value: value,
                minValue: minValue,
                maxValue: maxValue,
                viewModelKeys: viewModelKeys,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            this.changeBusyStatus(table, true)
            window.$db.updateBatchForIncrease(args)
            this.changeBusyStatus(table, false)
        })
    },
    async delete(table: string, key: string, value: any) {
        // @ts-ignore
        return new Promise<resolve, reject>(async (resolve, reject) => {
            let args = {
                table: table,
                key: key,
                value: value,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.deleteTable(args)
        })
    },

    async batchDelete(table: string, key: string, values: any) {
        //TODO: 拼接js字符串,将values传给底层
        // @ts-ignore
        return new Promise<resolve, reject>(async (resolve, reject) => {
            const val = values.join(',')
            const sValue = `(${ val })`
            let args = {
                table: table,
                key: key,
                value: sValue,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.batchDelete(args)
        })
    },

    async findOneByExpression<T extends any>(table: string, expression: string | null = null): Promise<{
        id: number,
        key: string,
        update_time: number,
        value: T
    }> {

        return new Promise(async (resolve, reject) => {
            let args = {
                table: table,
                identifyKey: uuidv4()
            }
            if (expression) {
                // @ts-ignore
                args.expression = expression
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.findOneByExpression(args)
        })
    },

    async findGroupByExpression(table: string, expression: string | null = null) {
        return new Promise(async (resolve, reject) => {
            let args = {
                table: table,
                identifyKey: uuidv4()
            }
            if (expression) {
                // @ts-ignore
                args.expression = expression
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.findGroupByExpression(args)
        })
    },

    /**
     * 执行sql，返回的是jsonArray
     * @param table
     * @param sql
     */
    async execSql(table: string, sql: string) {
        return new Promise(async (resolve, reject) => {
            let args = {
                table: table,
                sql: sql,
                identifyKey: uuidv4()
            }
            let actions = [resolve, reject, +new Date()]
            promiseAckMap.set(args.identifyKey, actions)
            window.$db.execSql(args)
        })
    },


    async getBusyStatus(table: string) {

        return new Promise(((resolve, reject) => {
            if (busyStatusMap.has(table)) {
                let status = busyStatusMap.get(table)
                resolve(status)
            } else {
                resolve(false)
            }
        }))
    }
}
