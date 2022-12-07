import { PRESETS_SUIT_TABLE } from '#/types/config'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel.ts'
import DBIpcRender from '@/irender/DBIpcRender'

const table = PRESETS_SUIT_TABLE


/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function find(id) {
    let json = await DBIpcRender.findOneByExpression(table, ` extendId = ${id} `)
    return PresetSuitModel.initFromJson({
        ...json,
        id: parseInt(json.extendId)
    })
}

export async function findUserAll(userId) {
    //sourceType为2的为临时预设，临时预设不需要查出来'
    let objs = await DBIpcRender.findGroupByExpression(table, `  userId = ${userId}
                                AND classifyType = 2
                                AND (sourceType ISNULL OR sourceType = 1 OR sourceType = 0)
                                AND  disable = 0
                            order by id desc `)
    return PresetSuitModel.initFromJsonArray(objs)
}

export async function findSystemAll() {
    //sourceType为2的为临时预设，临时预设不需要查出来
    let objs = await DBIpcRender.findGroupByExpression(table, `  classifyType = 1
            AND (sourceType ISNULL OR sourceType = 1 OR sourceType = 0)
            AND disable = false
        order by id desc `)
    return PresetSuitModel.initFromJsonArray(objs)
}

/**
 * 根据指定美化预设列表查找到对应的批量美化预设的id,过滤根据类型来过滤
 * @returns {Promise<*>}
 */
export async function filterExtendPresetSuitIds(presetIds, strCondition) {
    let items = []
    if (!presetIds || presetIds.length === 0) {
        return items
    }
    const nextCondition = strCondition && strCondition.length > 0 ? `AND ${strCondition}` : ''
    if (presetIds.length === 1) {
        items = await DBIpcRender.findGroupByExpression(table, ` extendId = ${presetIds[0]} ${nextCondition} `)
    } else {
        let strValues = ''
        for (const it of presetIds) {
            strValues += `'${it}',`
        }
        strValues = strValues.substring(0, strValues.length - 1)
        items = await DBIpcRender.findGroupByExpression(table, ` extendId IN (${strValues}) ${nextCondition} `)
    }
    return items
}

