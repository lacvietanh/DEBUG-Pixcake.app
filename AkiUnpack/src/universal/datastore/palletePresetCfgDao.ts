import { Optional } from '@/universal/types/foundation'
import { PALETTE_PRESETS_CFG_TABLE } from '@/universal/types/config'

import DBIpcRender from '@/irender/DBIpcRender'

import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'

const table = PALETTE_PRESETS_CFG_TABLE

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function find(id: string): Promise<Optional<PalettePresetCfgModel>> {
    let json = await DBIpcRender.findOneByExpression(table, `extendId = '${id}'`)
    return PalettePresetCfgModel.initFromJson(json)
}

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 */
export async function findByUserId(id: string, userId: number): Promise<Optional<PalettePresetCfgModel>> {
    // id 是uuid 唯一处理
    return find(id)
}

export async function findAll(userId: number): Promise<PalettePresetCfgModel[]> {
    //sourceType为2的为临时预设，临时预设不需要查出来
    let json = await DBIpcRender.findGroupByExpression(table, ` userId = ${userId} `)
    return PalettePresetCfgModel.initFromJsonArray(json)
}

export async function findByProjectId(projectId: number): Promise<PalettePresetCfgModel[]> {
    //sourceType为2的为临时预设，临时预设不需要查出来
    let json = await DBIpcRender.findGroupByExpression(table, ` projectId = ${projectId} `)
    return PalettePresetCfgModel.initFromJsonArray(json)
}

