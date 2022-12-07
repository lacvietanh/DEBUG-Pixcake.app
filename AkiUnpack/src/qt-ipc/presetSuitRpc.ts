import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import { IPresetBindThumbnail } from '@/qt-ipc/types/IPresetBindThumbnail'
import NodeApi, { NodeChannelEvent } from '@/qt-ipc/node-api'
import PresettingItemModel from '@/model/PresettingItemModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import { BeautifyPresetType, ImageType, PresetSuitIdType } from '@/constants/constants'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import store from '@/store'
// @ts-ignore
import { find as findPreset } from '@/universal/datastore/presettingDao'
import TsBeautifyHelper from '@/helper/tsBeautifyHelper'
// @ts-ignore
import { CreateSCENE } from '@/utils/tsImageIO.js'
import { isEqual } from 'lodash'

export interface IBindBeautify {
    imageId: number;
    presetSuitId: string;
    presetId: string;
    userId: number
}

export interface IBindPalette {
    imageId: number;
    presetSuitId: string;
    paletteId: string;
    userId: number;
    imgFormat: ImageType;
    projectId: number
}

export interface IBindBeautifyAndPalette extends IBindBeautify, IBindPalette {

}

export interface IGetEffectConfig extends IBindBeautify {
    scene: number
}

export interface IGetApplyParams extends IBindBeautify {
    createScene: number
}

/*
    通过图片路径和viewModel绑定
 */
class PresetSuitRpc implements IPresetBindThumbnail {
    onSignal: any
    // 用imageId来做关联
    beautifyParamsViewModelMap: Map<number, BeautifyParamsViewModel> = new Map()
    paletteParamsViewModelMap: Map<number, PaletteParamsViewModel> = new Map()
    presetModelMap: Map<number, PresettingItemModel> = new Map() //美化预设
    palettePresetModelMap: Map<number, PalettePresetCfgModel> = new Map() //调色预设

    constructor() {

    }

    invoke(actionName: string, eventId: string, jsonObject: any): Promise<any> {
        return this.presetSuit.invoke(actionName, eventId, jsonObject)
    }

    get presetSuit(): IPresetBindThumbnail {
        return NodeApi.presetSuit
    }

    registerListener() {
        this.onSignal = NodeApi.presetSuit.onSignal
        const onRecv = (actionName: string, eventId: string, bindInfo: any) => {
            if (actionName == 'bindBeautifyVM') {
                this.bindBeautifyPreset(bindInfo as IBindBeautify).then(vm => {
                    const json = vm?.parseToJson()
                    this.invoke(actionName, eventId, json)
                }).catch((e) => {
                    console.error(e)
                })
            }
            if (actionName == 'bindPaletteVM') {
                this.bindPalettePreset(bindInfo as IBindPalette).then(vm => {
                    const json = vm?.parseToJson()
                    this.invoke(actionName, eventId, json)
                }).catch((e) => {
                    console.error(e)
                })

            }
            if (actionName == 'getEffectConfig') {
                this.getEffectConfig(bindInfo).then(json => {
                    this.invoke(actionName, eventId, json)
                }).catch((e) => {
                    console.error(e)
                })
            }
            if (actionName == 'getApplyParams') {
                this.getApplyParams(bindInfo).then(json => {
                    this.invoke(actionName, eventId, json)
                }).catch((e) => {
                    console.error(e)
                })
            }
            if (actionName == 'needHandleFa') {
                this.needHandleFa(bindInfo).then(json => {
                    this.invoke(actionName, eventId, json)
                }).catch((e) => {
                    console.error(e)
                })
            }
        }
        this.presetSuit.onSignal.connect(onRecv)
    }

    setPresetModel(imageId: number, model: PresettingItemModel) {
        this.presetModelMap.set(imageId, model)
    }

    async getPresetModel({
        imageId,
        presetSuitId,
        presetId,
        userId
    }: IBindBeautify) {
        // let presetModel = this.presetModelMap.get(imageId)
        // if (!presetModel) {
        let presetModel = null
        // 如果使用套装id
        if (presetSuitId === PresetSuitIdType.NoEffect) {
            presetModel = PresetSuitModel.noneBeautifyEffectModel(userId as number)
        } else if (presetSuitId === PresetSuitIdType.UnSet) {
            if (await PresettingItemModel.isEqualNoEffect(presetId!)) {
                presetModel = PresetSuitModel.noneBeautifyEffectModel(userId)
            } else {
                //@ts-ignore
                if (store.state.presetting.presetsCache.has(presetId)) {
                    //@ts-ignore
                    presetModel = store.state.presetting.presetsCache.get(presetId)
                } else {
                    presetModel = await findPreset(presetId)
                    store.commit('setCachePreset', { presetID: presetId, preset: presetModel })
                }
            }
        } else if (presetSuitId !== PresetSuitIdType.UnSet) {
            const presetSuitModel = await store.dispatch('presetSuit/ACT_GetPresetSpecSuit', presetSuitId)
            //@ts-ignore
            if (store.state.presetting.presetsCache.has(presetSuitModel.beautifyPresetId)) {
                //@ts-ignore
                presetModel = store.state.presetting.presetsCache.get(presetSuitModel.beautifyPresetId)
            } else {
                if (await PresettingItemModel.isEqualNoEffect(presetSuitModel.beautifyPresetId)) {
                    return PresetSuitModel.noneBeautifyEffectModel(userId as number)
                }
                presetModel = await findPreset(presetSuitModel.beautifyPresetId)
                store.commit('setCachePreset', { presetID: presetId, preset: presetModel })
            }

        }
        presetModel.userId = parseInt(presetModel.userId)
        this.presetModelMap.set(imageId, presetModel)
        return presetModel!
        // } else {
        //     return presetModel
        // }
    }

    setPalettePresetCfgModel(imageId: number, model: PalettePresetCfgModel | null) {
        let paletteParamsViewModel = this.paletteParamsViewModelMap.get(imageId)
        if (model) {
            if (paletteParamsViewModel) {
                paletteParamsViewModel.bindCfgModel(model)
                this.palettePresetModelMap.set(imageId, model)
            }
        } else {
            const palettePresetCfgModel = PalettePresetCfgModel.default()

            if (paletteParamsViewModel) {
                paletteParamsViewModel.bindCfgModel(palettePresetCfgModel)
                this.palettePresetModelMap.set(imageId, palettePresetCfgModel)
            }
            console.error('palettePresetCfgModel 不能为空 查看调用地方，改成 PalettePresetCfgModel.default()')
        }
    }

    getBeautifyParamsViewModel(imageId: number) {
        return this.beautifyParamsViewModelMap.get(imageId)
    }

    getPaletteParamsViewModel(imageId: number): PaletteParamsViewModel | undefined {
        return this.paletteParamsViewModelMap.get(imageId)
    }

    getPalettePresetCfgModel(imageId: number) {
        return this.palettePresetModelMap.get(imageId)
    }

    // 本地调用
    async bindBeautifyPreset({
        imageId,
        presetSuitId,
        presetId,
        userId
    }: IBindBeautify, forceCreate: boolean = false, useCache: boolean = false): Promise<BeautifyParamsViewModel | null> {
        let beautifyParamsViewModel = null
        //@ts-ignore
        const user = store.state.user
        if (presetSuitId !== PresetSuitIdType.NoEffect) {
            let presetModel = await this.getPresetModel({
                imageId,
                presetSuitId,
                presetId,
                userId
            })
            // 注 wql:includes此处的匹配和presetModel.id 不匹配
            if (!presetModel || [BeautifyPresetType.NoEffect, BeautifyPresetType.NoEffectPath].includes(`${ presetModel!.id }` as any)) {
                if (forceCreate) {
                    //@ts-ignore
                    beautifyParamsViewModel = new BeautifyParamsViewModel(null, null, user.userId)
                }
            } else {
                this.setPresetModel(imageId, presetModel)
                //@ts-ignore
                const fullCfgPath = await presetModel.fullCfgPath(user)
                const key = `fullCfgPath=${ fullCfgPath }&sourceType=${ presetModel.sourceType }`
                if (useCache) {
                    beautifyParamsViewModel = TsBeautifyHelper.getInstance().getCacheBeautifyParamsViewModel(key)
                }
                if (!beautifyParamsViewModel) {
                    const json = await BeautifyParamsViewModel.readJsonFromPath(fullCfgPath)
                    if (presetModel.sourceType === 2) {
                        beautifyParamsViewModel = new BeautifyParamsViewModel(json, presetModel.extendId(), user.userId, fullCfgPath)
                    } else {
                        beautifyParamsViewModel = new BeautifyParamsViewModel(json, null, user.userId, fullCfgPath)
                    }
                    if (useCache) {
                        TsBeautifyHelper.getInstance().saveBeautifyParamsViewModelCache(key, beautifyParamsViewModel)
                    }
                }
            }
        } else {
            if (forceCreate) {
                beautifyParamsViewModel = new BeautifyParamsViewModel(null, null, user.userId)
            }
        }

        if (beautifyParamsViewModel) {
            this.beautifyParamsViewModelMap.set(imageId, beautifyParamsViewModel)
        }

        return beautifyParamsViewModel
    }

    // 本地调用
    async bindPalettePreset({
        imageId,
        presetSuitId,
        paletteId,
        userId,
        imgFormat,
        projectId
    }: IBindPalette): Promise<PaletteParamsViewModel | null> {
        let palettePresetId = paletteId
        //@ts-ignore
        const user = store.state.user


        let currPalettePresetId = palettePresetId
        //@ts-ignore
        const oriPreset = store.state.presetting.oriPreset

        // 创建原图预设
        const createOriPreset = ({ imgFormat }: any) => {
            const PaletteParamsVmInstance = new PaletteParamsViewModel({ imgFormat, userId: user.userId } as any)
            const PalettePresetCfgInstance = PalettePresetCfgModel.default()

            PalettePresetCfgInstance.createLink(imageId, projectId)
            this.setPalettePresetCfgModel(imageId, PalettePresetCfgInstance)
            this.paletteParamsViewModelMap.set(imageId, PaletteParamsVmInstance)
            return PaletteParamsVmInstance
        }

        // 临时预设 或 云端预设
        if (presetSuitId !== oriPreset.id) {

            // 如果使用套装id
            if (presetSuitId !== PresetSuitIdType.UnSet) {
                const presetSuitModel: PresetSuitModel = await store.dispatch('presetSuit/ACT_GetPresetSpecSuit', presetSuitId)
                currPalettePresetId = presetSuitModel.palettePresetId!
            }

            const model = await store.dispatch('presetSuit/ACT_GetPalettePreset', currPalettePresetId)

            const paletteParamsVmInstance = this.getPaletteParamsViewModel(imageId)
            //thumbnailViewModel.paletteParamsViewModel() || null
            if (paletteParamsVmInstance) {
                paletteParamsVmInstance.resetViewModelConfig({
                    id: model.sourceType === 2 ? model.id : null,
                    userId: user.userId
                })
            } else {
                const instance = new PaletteParamsViewModel({
                    id: model.sourceType === 2 ? model.id : null,
                    imgFormat: imgFormat,
                    userId: user.userId
                })
                this.paletteParamsViewModelMap.set(imageId, instance)
            }

            if (model) {
                this.setPalettePresetCfgModel(imageId, model)
                // 临时预设
                return this.paletteParamsViewModelMap.get(imageId)!
            } else {
                console.log(`loadEffectCfgWhenFromDb getPresetModel null,imageId = ${ imageId }`)
                return createOriPreset({ imgFormat })
            }

        } else {
            // ... 无效果
            return createOriPreset({ imgFormat })
        }
    }

    async getEffectConfig({
        imageId,
        presetSuitId,
        presetId,
        userId,
        scene
    }: IGetEffectConfig) {
        let presetModel = await this.getPresetModel({
            imageId,
            presetSuitId,
            presetId,
            userId
        })
        let palettePresetModel = this.getPalettePresetCfgModel(imageId)
        let presetResPath = ''
        let cfgJsonStr = ''

        let tongJsonStr = ''
        let paletteResPath = ''
        //@ts-ignore
        const user = store.state.user

        // 写入美化数据
        if (presetModel) {

            let beautifyParamsVmInstance = this.getBeautifyParamsViewModel(imageId)

            presetResPath = await presetModel.resPath()

            let cfgPath = await presetModel.fullCfgPath(user)
            if (!beautifyParamsVmInstance || cfgPath !== beautifyParamsVmInstance.path) {
                const json = await BeautifyParamsViewModel.readJsonFromPath(cfgPath)
                beautifyParamsVmInstance = new BeautifyParamsViewModel(json, null, user.userId, cfgPath)
                this.beautifyParamsViewModelMap.set(imageId, beautifyParamsVmInstance)
            }

            // 如果是精修左栏的话
            if (scene === CreateSCENE.photoFinishing_thumb) {
                cfgJsonStr = await beautifyParamsVmInstance.parsePartParamsToJsonStr()
            } else {
                cfgJsonStr = await beautifyParamsVmInstance.parseToJsonStr()
            }
        }

        if (palettePresetModel) {
            let paletteParamsViewModel = this.getPaletteParamsViewModel(imageId)
            if (paletteParamsViewModel == null) {
            } else {
                paletteResPath = await palettePresetModel.resPath()

                // 如果是精修左栏的话
                if (scene === CreateSCENE.photoFinishing_thumb) {
                    tongJsonStr = await paletteParamsViewModel.parseToPartJsonStr()
                } else {
                    tongJsonStr = await paletteParamsViewModel.parseToJsonStr()
                }
            }
        }
        return {
            presetResPath: presetResPath,
            cfgJsonStr: cfgJsonStr,
            paletteResPath: paletteResPath,
            tongJsonStr: tongJsonStr
        }
    }

    async getApplyParams({
        imageId,
        presetSuitId,
        presetId,
        userId,
        createScene
    }: IGetApplyParams) {
        let presetModel = await this.getPresetModel({
            imageId,
            presetSuitId,
            presetId,
            userId
        })
        let palettePresetModel = this.getPalettePresetCfgModel(imageId)
        let currentConfigJsonStr = ''
        let currentToningJsonStr = ''
        //@ts-ignore
        const user = store.state.user
        // 写入美化数据
        if (presetModel) {
            let beautifyParamsVmInstance = this.getBeautifyParamsViewModel(imageId)

            let cfgPath = await presetModel.fullCfgPath(user, user.userId)
            if (!beautifyParamsVmInstance || cfgPath !== beautifyParamsVmInstance.path) {
                const json = await BeautifyParamsViewModel.readJsonFromPath(cfgPath)
                beautifyParamsVmInstance = new BeautifyParamsViewModel(json, null, user.userId, cfgPath)
                this.beautifyParamsViewModelMap.set(imageId, beautifyParamsVmInstance)
            }
            if (createScene === CreateSCENE.photoFinishing_thumb) {
                currentConfigJsonStr = await beautifyParamsVmInstance.parsePartParamsToJsonStr()
            } else {
                currentConfigJsonStr = await beautifyParamsVmInstance.parseToJsonStr()
            }
        }

        // 写入色彩数据
        if (palettePresetModel) {
            let paletteParamsViewModel = this.getPaletteParamsViewModel(imageId)
            if (paletteParamsViewModel !== null) {
                if (createScene === CreateSCENE.photoFinishing_thumb) {
                    currentToningJsonStr = paletteParamsViewModel!.parseToPartJsonStr()
                } else {
                    currentToningJsonStr = paletteParamsViewModel!.parseToJsonStr()
                }
            }
        }

        return { currentConfigJsonStr, currentToningJsonStr }
    }

    async needHandleFa(bindInfo: IBindBeautifyAndPalette) {
        //@ts-ignore
        let bTime = bindInfo['_beginTime']
        const bJsTime = new Date().getTime()
        console.log(`needHandleFa :transBegin=${ bJsTime - bTime }`)

        //@ts-ignore
        const user = store.state.user
        await this.bindBeautifyPreset(bindInfo, true)
        await this.bindPalettePreset(bindInfo)
        let presetModel = await this.getPresetModel(bindInfo)
        let palettePresetModel = this.getPalettePresetCfgModel(bindInfo.imageId)
        let currentBeautifyParams = null
        let currentPaletteParams = null
        if (presetModel) {
            let beautifyParamsVmInstance = this.getBeautifyParamsViewModel(bindInfo.imageId)
            if (beautifyParamsVmInstance) {
                currentBeautifyParams = await beautifyParamsVmInstance.parseToComponent()
            }
        }
        if (palettePresetModel) {
            let paletteParamsViewModel = this.getPaletteParamsViewModel(bindInfo.imageId)
            if (paletteParamsViewModel !== null) {
                currentPaletteParams = paletteParamsViewModel!.parseToComponent()
            }
        }
        //@ts-ignore
        let oriBeautifyParams = store.state.presetting.oriBeautifyParams

        const PaletteParamsVmInstance = new PaletteParamsViewModel({
            imgFormat: bindInfo.imgFormat,
            userId: user.userId
        })
        let oriPaletteParams = PaletteParamsVmInstance.parseToComponent()

        const beautify = isEqual({ ...oriBeautifyParams }, { ...currentBeautifyParams })
        const palette = isEqual({ ...oriPaletteParams }, { ...currentPaletteParams })
        const eTime = new Date().getTime()
        console.log(`needHandleFa :qt2js=${ eTime - bTime },js=${ eTime - bJsTime }`)
        console.log(`needHandleFa : beautify = ${ beautify } palette = ${ palette } `)
        let need = !palette || !beautify
        return { result: need }
    }
}

let instance = new PresetSuitRpc()
export default instance
