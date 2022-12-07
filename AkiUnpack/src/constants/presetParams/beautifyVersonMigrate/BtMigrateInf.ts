export interface IParam {
    fEffectValue: number,
    ParamFlag: number,
    PersonType?: number
}

export interface IBtMigrate {
    _version: string

    formatData(param: IParam): IParam[]
}


export abstract class BtMigrateProcess implements IBtMigrate {
    abstract readonly _version: string

    get version(): string {
        return this._version
    }

    abstract formatData(param: IParam): IParam[]
}
