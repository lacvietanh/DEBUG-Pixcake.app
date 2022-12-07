import { IMenuJson } from '@/types/api/user'
import { DICTIONARY_TABLE } from '@/universal/types/config'
import DBIpcRender from '@/irender/DBIpcRender'

const table = DICTIONARY_TABLE

export enum DictionaryKeys {
    CakeMenu = 'cake_menu',
    HiddenPreviewEffectTip = 'hidden_preview_effect_tip',
    NavbarBackgroundDot = 'navbar-background-dot-v1'
}

/**
 * 根据指定key查询value值
 * @returns {Promise<*>}
 * 待hcy实现
 */
export async function find(key: DictionaryKeys | string): Promise<any> {
    return DBIpcRender.findOneByExpression<string>(table, ` keyword = '${ key }' `)
}

export async function insert(key: DictionaryKeys | string, value: string): Promise<any> {
    return await DBIpcRender.insertToDB(table, {
        keyword: key,
        value: value
    })
}


// -------------------- 以上为基础函数 ————————————————————————

// 插入自定义菜单
export async function insertCakeMenu(data: IMenuJson): Promise<any> {
    return await insert(DictionaryKeys.CakeMenu, JSON.stringify(data))
}

// 查询自定义菜单
export async function findCakeMenu(): Promise<IMenuJson> {
    try {
        const data = await find(DictionaryKeys.CakeMenu)
        if (data.value) {
            return JSON.parse(data.value) as IMenuJson
        }
        return Promise.reject(new Error('not find valid value in dictionary'))
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function deleteCakeMenu(): Promise<void> {
    return await DBIpcRender.delete(table, 'keyword', DictionaryKeys.CakeMenu)
}

// 插入引导记录
export async function insertGuideRecord(key: DictionaryKeys): Promise<any> {
    return await insert(key, 'true')
}

// 查看是否存在引导记录
export async function checkHasGuideRecord(key: DictionaryKeys): Promise<boolean> {
    try {
        const data = await find(key)
        return data.value && data.value === 'true';
    } catch (e) {
        return Promise.reject(e)
    }
}
