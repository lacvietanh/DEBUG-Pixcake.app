import { PRESETS_TABLE } from '@/universal/types/config'
import PresettingItemModel from '@/model/PresettingItemModel'
import DBIpcRender from '@/irender/DBIpcRender'

const table = PRESETS_TABLE


/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function find(extendId, userId) {
    try {
        let json = await DBIpcRender.findOneByExpression(table, ` extendId = '${extendId}' `)
        return PresettingItemModel.initFromJson(json)
    } catch (err) {
        console.log('==> presetting dao: ', err)
    }
}

export async function findAll(userId) {
    //sourceType为2的为临时预设，临时预设不需要查出来
    let objs = await DBIpcRender.findGroupByExpression(table, `  userId = ${userId} AND (sourceType ISNULL OR sourceType = 1 OR sourceType = 0) AND  disable = false `)
    return PresettingItemModel.initFromJsonArray(objs)
}

/**
 * 根据指定美化预设列表查找到对应的批量美化预设的id,过滤根据类型来过滤
 * @returns {Promise<*>}
 */
export async function filterExtendPresetIds(presetIds, strCondition) {
    let items = []
    if (!presetIds || presetIds.length === 0) {
        return items
    }
    const nextCondition = strCondition && strCondition.length > 0 ? `AND ${strCondition}` : ''
    if (presetIds.length === 1) {
        items = await DBIpcRender.findGroupByExpression(table, ` extendId = ${presetIds[0]}  ${nextCondition} `)

    } else {
        let strValues = ''
        for (const it of presetIds) {
            strValues += `'${it}',`
        }
        strValues = strValues.substring(0, strValues.length - 1)
        items = await DBIpcRender.findGroupByExpression(table, ` extendId IN (${strValues})  ${nextCondition} `)
    }
    return items
}
