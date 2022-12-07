type IMode = {
    default: number,
    value: number
}

type IExtraInfo = {
    bgCleanMode: IMode
    bgCleanMooreMode: IMode
}

/**
 * 额外的图片信息
 * 1、纯色背景、非纯色背景
 */
export default class ExtraInfoModel {
    private _init: boolean = false
    info: IExtraInfo = {
        bgCleanMode: {
            default: -1,
            value: -1
        },

        bgCleanMooreMode: {
            default: -1,
            value: -1
        }
    }

    constructor(data?: { [key: string]: IMode }) {
        if (data) {
            const { bgCleanMode, bgCleanMooreMode } = data

            this.info.bgCleanMode.value = bgCleanMode.value
            this.info.bgCleanMode.default = bgCleanMode.default

            // 不存在默认数值时，同步背景去瑕疵缓存值
            if (!bgCleanMooreMode) {
                const defaultValue = data.bgCleanMode.default
                this.info.bgCleanMooreMode.default = defaultValue
                this.info.bgCleanMooreMode.value = defaultValue
            } else {
                this.info.bgCleanMooreMode.default = bgCleanMooreMode.default
                this.info.bgCleanMooreMode.value = bgCleanMooreMode.value
            }

            this._init = true
        }
    }

    get init(): boolean {
        return this._init
    }

    get bgCleanMooreMode(): IMode {
        return this.info.bgCleanMooreMode
    }

    get bgCleanMode(): IMode {
        return this.info.bgCleanMode
    }

    getJson(): IExtraInfo {
        return this.info
    }

    getJsonStr(): string {
        try {
            return JSON.stringify(this.info)
        } catch (e) {
            console.warn('[ExtraInfoModel] ', e)
            return ''
        }
    }

    /**
     * 设置默认值 首次设置
     * @param value
     */
    setDefaultCleanMode(value: number): void {
        this.info.bgCleanMode.default = value
        this.info.bgCleanMode.value = value

        this.info.bgCleanMooreMode.default = value
        this.info.bgCleanMooreMode.value = value

        this._init = true
    }

    /**
     * 判断是否需要更新默认值
     * @param value
     */
    isNeedUpdateDefaultMode(value: number): boolean {
        return this.info.bgCleanMode.default !== value
            || this.info.bgCleanMooreMode.default !== value
    }

    /**
     * 更新默认值
     * @param value
     */
    updateDefaultMode(value: number): void {
        this.info.bgCleanMode.default = value
        this.info.bgCleanMooreMode.default = value
    }

    updateBgCleanMode(value: number): void {
        this.info.bgCleanMode.value = value
    }

    updateBgCleanMooreMode(value: number): void {
        this.info.bgCleanMooreMode.value = value
    }
}
