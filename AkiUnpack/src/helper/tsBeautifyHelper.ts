// @ts-ignore
import path from '@/qt-ipc/path'
// @ts-ignore
import fileUtils from '@/utils/FileUtils'
import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'

const LRUMap = require('@/utils/lru').LRUMap

// 美化的辅助类
export default class TsBeautifyHelper {
    static instance: null | TsBeautifyHelper = null
    _defaultConfig: null
    defaultPath: any | string
    // @ts-ignore
    cacheParamsConfigMap: LRUMap
    // @ts-ignore
    cacheJsonConfigMap: LRUMap
    // @ts-ignore
    cacheBeautifyParamsViewModelMap: LRUMap
    // @ts-ignore
    cacheJsonConfigFormatMap: LRUMap = new LRUMap(30)

    constructor() {
        this._defaultConfig = null
        this.defaultPath = null // 默认效果配置

        this.cacheParamsConfigMap = new LRUMap(30)
        this.cacheJsonConfigMap = new LRUMap(30)
        this.cacheBeautifyParamsViewModelMap = new LRUMap(30)
    }

    /**
     * 单例
     * @returns {TsBeautifyHelper}
     */
    static getInstance() {
        this.instance = this.instance ? this.instance : new TsBeautifyHelper()
        return this.instance
    }

    /**
     * 获取默认信息
     * @returns {null}
     */
    async getDefaultConfig() {
        if (this._defaultConfig == null) {
            this.defaultPath = await path.joinResourcesPath('effect/config/none-config.json')
            this._defaultConfig = this.loadConfig(this.defaultPath)
        }
        return this._defaultConfig
    }

    /**
     * 通过路径读取json信息
     * @param configPath
     * @returns {Promise<never>|*}
     */
    loadConfig(configPath: any) {
        return fileUtils.readJsonFromLocal(configPath)
    }

    /**
     * 获取配置文件
     * @param path
     * @param cache
     * @returns {*|Promise<never>}
     */
    getConfig(path: string, cache: boolean = true) {
        if (this.cacheParamsConfigMap.has(path) && cache) {
            return this.cacheParamsConfigMap.get(path)
        }
        let json = fileUtils.readJsonFromLocal(path)
        this.cacheParamsConfigMap.set(path, json)
        return json
    }

    /**
     * 获取序列化后的数据
     * @param path 路径
     * @param viewModel 实例
     * @param readCache 读取缓存
     * @returns {string|*}
     */
    getJsonStr(path: string, viewModel: BeautifyParamsViewModel, readCache: boolean = true, onlyLoadPartParams: boolean = false) {
        const key = path + '-' + onlyLoadPartParams
        if (this.cacheJsonConfigMap.has(key) && readCache) {
            return this.cacheJsonConfigMap.get(key)
        }

        let jsonStr = ''
        if (onlyLoadPartParams) {
            jsonStr = JSON.stringify(viewModel.parseToPartJson())
        } else {
            jsonStr = JSON.stringify(viewModel.parseToJson())
        }
        this.cacheJsonConfigMap.set(key, jsonStr)

        // console.log('[Ethan] [TsBeautifyHelper] ', 'getJsonStr: ', `parse and set to cache, path: ${ path }, time: ${time.updateAndGetTotal()}`)

        return jsonStr
    }

    getCacheBeautifyParamsViewModel(path: string) {
        if (this.cacheBeautifyParamsViewModelMap.has(path)) {
            return this.cacheBeautifyParamsViewModelMap.get(path)
        }
    }

    saveBeautifyParamsViewModelCache(path: string, viewModel: BeautifyParamsViewModel) {
        this.cacheBeautifyParamsViewModelMap.set(path, viewModel)
    }

    clearBeautifyParamsCache() {
        this.cacheBeautifyParamsViewModelMap.clear()
    }

    setCacheJsonConfigFormatMap(path: string, json: any): any {
        this.cacheJsonConfigFormatMap.set(path, json)
    }

    getCacheJsonConfigFormatMap(path: string): any {
        if (this.cacheJsonConfigFormatMap.has(path)) {
            return this.cacheJsonConfigFormatMap.get(path)
        }

        return null
    }
}
