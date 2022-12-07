import { PROJECT_TABLE } from '@/universal/types/config'
import DBIpcRender from '@/irender/DBIpcRender'

const table = PROJECT_TABLE


/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function find(id) {
    return await DBIpcRender.findOneByExpression(table, ` id = ${id} `)

}

export async function findAll(userId) {
    return await DBIpcRender.findGroupByExpression(table, `  userId = ${userId} and disable = false order by created_time desc `)
}

/*
    rowUpdateTime为行记录的更新时间
 */
export async function findBatchProjects(userId, { pageCount, rowUpdateTime }) {
    let updateTime = rowUpdateTime
    if (!updateTime) {
        updateTime = new Date().getTime()
    }

    return await DBIpcRender.findGroupByExpression(table, ` userId = ${userId} and disable = false and update_time < ${updateTime} order by update_time desc limit ${pageCount} `)
}

export async function countSince(userId, rowUpdateTime = null) {
    let updateTime = rowUpdateTime
    if (!updateTime) {
        updateTime = new Date().getTime()
    }

    let ret = await DBIpcRender.execSql(table, ` SELECT count(id) as count FROM ${table} WHERE userId = ${userId} and disable = false and update_time < ${updateTime} `)
    let json = ret[0]
    const count = json.count
    console.log('count : ', count)
    return count

}
