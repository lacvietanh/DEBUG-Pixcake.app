import BtMigrate_V151_Process from './process/BtMigrate_V151_Process'
import BtMigrate_V140_Process from './process/BtMigrate_V140_Process'
import { BtMigrateProcess, IParam } from './BtMigrateInf'

const constructMap: any = {
    '1.5.1': BtMigrate_V151_Process,
    '1.4.0': BtMigrate_V140_Process
}

const versionsMap = [
    '1.4.0',
    '1.5.1'
]

export default class BtVersionMigrate {
    private readonly version: string
    private readonly params: IParam[]

    constructor(version: string, params: IParam[]) {
        this.version = version
        this.params = params
    }

    /**
     * 获取实例
     * @param version
     */
    _findMigrate(version: string): BtMigrateProcess[] {
        let list: BtMigrateProcess[] = []
        const versions = versionsMap.filter(item => item > version)
        versions.forEach((version: string) => {
            const Struct = constructMap[version]

            if (Struct) {
                const instance = new Struct()
                list.push(instance)
            }
        })

        return list
    }

    /**
     * 更新参数（递归）
     * @param param
     * @param version
     */
    _migrateParam(param: IParam, version: string): IParam[] {
        const tempParams: IParam[] = []

        const instances = this._findMigrate(version)
        if (instances.length > 0) {
            const firstInstance = instances[0]
            const result = firstInstance.formatData(param)
            const childParams: IParam[] = []

            result.forEach((item: IParam) => {
                childParams.push(...this._migrateParam(item, firstInstance.version))
            })


            tempParams.push(...childParams)
        } else {
            tempParams.push(param)
        }

        return tempParams
    }

    migrateData(): IParam[] {
        const instances = this._findMigrate(this.version)
        if (instances.length > 0) {
            const tempParams: IParam[] = []

            this.params.forEach((param: IParam) => {
                const childParams = this._migrateParam(param, this.version)
                tempParams.push(...childParams)
            })

            console.log('migrateData: ', tempParams)
            return tempParams
        } else {
            return this.params
        }
    }
}
