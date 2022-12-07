export default abstract class EffectBaseModel {
    _name: string
    _path: string
    _defaultPath: string

    constructor(data: IEffectBaseJson) {
        this._name = data.EffectName
        this._path = data.Path
        this._defaultPath = data.Path
    }

    static identify(key: string, condition?: any): string {
        return 'en-' + key
    }

    get identify(): string {
        return EffectBaseModel.identify(this.name)
    }

    get path(): string {
        return this._path
    }

    get name(): string {
        return this._name
    }

    isIdentify(identify: string): boolean {
        return this.identify === identify
    }

    update(value: string): boolean {
        if (this._path == value) {
            return false
        }

        this._path = value
        return true
    }

    hasEffect(): boolean {
        return this._path !== this._defaultPath
    }

    reset(): void {
        this._path = this._defaultPath
    }
}
