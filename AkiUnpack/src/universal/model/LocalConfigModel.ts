// @ts-ignore
import FileUtils from '@/utils/FileUtils'
import { IS_ALLOW_CUSTOM_CONFIG } from '@/universal/types/config'
import {ShareObjectModel} from "@/universal/model/ShareObjectModel/ShareObjectModel";


export default class LocalConfigModel {
    static instance: LocalConfigModel
    private _switch: boolean = false
    private _host: string = ''
    private _isCustom: boolean = false
    private _hasRead: boolean = false
    private _debug: boolean = true
    private _title: string = ''
    private _crashHost: string = ''
    private _exhibitionConfig: any = {}

    constructor() {
    }

    static getInstance(): LocalConfigModel {
        if (!this.instance) {
            this.instance = new LocalConfigModel()
        }

        return this.instance
    }

    async readJsonFromLocal() {
        if (this._hasRead) return

        const json = await ShareObjectModel.instance().localConfig()
        console.log(`LocalConfigModel.readJsonFromLocal=`,json)
        if (!json ) return
        const isExist = Object.keys(json).length > 0
        if (!isExist)
            return
        if (json.customApi && json.apiHost) {
            this._host = json.apiHost
            this._isCustom = !!json.customApi

            this._hasRead = true
        }

        if (json.customApi && json.crashHost) {
            this._crashHost = json.crashHost
        }

        if (typeof json.hiddenDebug === 'number' && json.hiddenDebug) {
            this._debug = false
        }

        if ((typeof json.masterSwitch === 'number' || typeof json.masterSwitch === 'boolean') && json.masterSwitch) {
            this._switch = true
        }

        if (typeof json.title === 'string' && json.title) {
            this._title = json.title
        }

        if (typeof json.exhibitionConfig === 'object') {
            this._exhibitionConfig = json.exhibitionConfig
        }
    }

    async updateOnlineConfig(json: any): Promise<boolean> {
        const bool = await ShareObjectModel.instance().updateOnlineConfig(json)
        if (bool) {
            this._exhibitionConfig = json
        }
        return bool
    }

    get exhibitionConfig(): any {
        return this._exhibitionConfig
    }

    get host() {
        if (!this.switch){
            return process.env.VUE_APP_API_HOST
        }
        return (this._isCustom && this._host) ? this._host : process.env.VUE_APP_API_HOST
    }

    get debug(): boolean {
        if (!this.switch){
            return false
        }
        return this._debug
    }

    get switch(): boolean {
        return this._switch
    }

    get title(): string {
        if (!this.switch){
            return ""
        }
        return this._title
    }

    get crashHost(): string {
        if (!this.switch){
            return ''
        }
        return (this._isCustom && this._crashHost) ? this._crashHost : ''
    }
}
