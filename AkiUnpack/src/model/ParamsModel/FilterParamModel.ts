import ParamModel, { Config } from './ParamModel'
import { filterParams } from '@/constants/preset-def'

const config = filterParams[0]

export type FilterConfig = Config & {
    path?: string
}

export default class FilterParamModel extends ParamModel {
    _path: string

    constructor(param: string, config: FilterConfig) {
        const { min, max, value, path } = config
        super(param, { min, max, value })
        this._path = path || ''
    }

    static get key(): string {
        return config.key
    }

    static get pathKey(): string {
        return config.pathKey
    }

    set path(path: string) {
        this._path = path
    }

    get path(): string {
        return this._path
    }

    getFullPath(): string {
        if (this.path) {
            return this.path
        }
        return ''
    }
}
