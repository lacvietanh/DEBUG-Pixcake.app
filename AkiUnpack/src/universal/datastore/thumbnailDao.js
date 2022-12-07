import { THUMBNAIL_TABLE } from '#/types/config'
import ThumbnailModel from '@/model/ThumbnailModel'
import DBIpcRender from '@/irender/DBIpcRender'

const table = THUMBNAIL_TABLE
const db = null

export async function findByKey(key, value) {

    let json = await DBIpcRender.findOneByExpression(table, ` ${key} = ${value} `)
    let obj = ThumbnailModel.initFromJson(json)
    return obj
}

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function find(extendId) {
    return await findByKey('extendId', extendId)
}

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function isExist(extendId) {
    let json = await findByKey('extendId', extendId)
    if (json && json.id != null && json.id != undefined) {
        return true
    }
    return false
}

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function findByPreset(presetId) {
    let json = await DBIpcRender.findGroupByExpression(table, ` presetId = ${presetId} `)
    let obj = ThumbnailModel.initFromJsonArray(json)
    return obj
}


/**
 * 根据指定projectId查询项目下的所有项
 * @returns {Promise<*>}
 */
export async function findByProjectId(projectId) {
    let items = await DBIpcRender.findGroupByExpression(table, ` projectId = ${projectId} `)
    let models = ThumbnailModel.initFromJsonArray(items)
    return models
}

/**
 * 根据指定projectId查询项目下的所有项
 * @returns {Promise<*>}
 */
export async function findImageIdsByProjectId(projectId) {
    let items = await DBIpcRender.findGroupByExpression(table, ` projectId = ${projectId} `)
    items = items.map(it => it.id)
    return items
}

/**
 * 根据指定projectId查询项目下的的缩略图对应的套装id,美化预设id,调色预设id
 * @returns {Promise<*>}
 */
export async function findPresetIdByProjectId(projectId) {
    let items = await DBIpcRender.execSql(table, `SELECT palettePresetId,presetId,presetSuitId FROM ${table} WHERE projectId = ${projectId}`)
    let models = items.map()
    return models
}

/**
 * 根据指定projectId查询项目下的的缩略图对应的调色预设id
 * @returns {Promise<*>}
 */
export async function findPalettePresetIdByProjectId(projectId) {
    let items = await DBIpcRender.findGroupByExpression(table, ` projectId = ${projectId} AND palettePresetId NOT NULL `)
    let models = items
    return models
}

/**
 * 根据指定thumbIds列表查找到对应的批量的调色预设的id包括(调色palettePresetId、美化presetId、套装presetSuitId)
 * @returns {Promise<*>}
 */
export async function findPresetIdsByThumbIds(thumbIds, projectId) {
    let items = []
    if (!thumbIds || thumbIds.length === 0) {
        return items
    }
    if (thumbIds.length === 1) {
        items = await DBIpcRender.findGroupByExpression(table, ` id = ${thumbIds[0]} AND projectId = ${projectId} `)
    } else {
        let strValues = ''
        for (const it of thumbIds) {
            strValues += `'${it}',`
        }
        strValues = strValues.substring(0, strValues.length - 1)
        items = await DBIpcRender.findGroupByExpression(table, ` id IN (${strValues}) AND projectId= ${projectId} `)
    }
    return items
}

export async function findAll() {
    let models = await DBIpcRender.findGroupByExpression(table)
    models = ThumbnailModel.initFromJsonArray(models)
    return models
}

export async function countOf(projectId) {
    let item = await DBIpcRender.execSql(table, `SELECT count(id) as count FROM ${table} WHERE projectId = ${projectId}`)
    let json = item[0]
    if (!json || !json.hasOwnProperty("count")){
        return 0
    }
    const count = json.count
    return count
}

export async function getProjectAlbumIconPaths(projectId) {
    const paths = await DBIpcRender.execSql(table, `SELECT originalImagePath FROM ${table} WHERE projectId = ${projectId}`)

    let total = paths.length
    if (!total) {
        return []
    }
    if (total == 1) {
        return [paths[0].originalImagePath]
    }
    if (total == 2) {
        return [paths[0].originalImagePath, paths[1].originalImagePath]
    }
    return [paths[0].originalImagePath, paths[Math.ceil(total / 2) - 1].originalImagePath, paths[total - 1].originalImagePath]
}
