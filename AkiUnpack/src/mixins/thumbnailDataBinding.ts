import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import store from '@/store'
import { PresetSuitIdType, BeautifyPresetType } from '@/constants/constants'
import TsBeautifyHelper from '@/helper/tsBeautifyHelper'

/**
 * 绑定美化预设
 * @param thumbnailViewModel
 * @param forceCreate
 */
export async function bindBeautifyPreset(thumbnailViewModel: any, forceCreate: boolean = false, useCache: boolean = false): Promise<BeautifyParamsViewModel | null> {
    const user = (store.state as any).user
    let { presetSuitId } = thumbnailViewModel.thumbnailModel!
    let beautifyParamsViewModel = null

    if (presetSuitId !== PresetSuitIdType.NoEffect) {
        let presetModel = await thumbnailViewModel.thumbnailModel?.getPresetModel(store)
        // 注 wql:includes此处的匹配和presetModel.id 不匹配
        if (!presetModel || [BeautifyPresetType.NoEffect, BeautifyPresetType.NoEffectPath].includes(`${ presetModel!.id }` as any)) {
            if (forceCreate) {
                // @ts-ignore
                beautifyParamsViewModel = new BeautifyParamsViewModel(null, null, user.userId)
            }
        } else {
            thumbnailViewModel.presetModel = presetModel
            const fullCfgPath = presetModel.fullCfgPath(user)
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
            // @ts-ignore
            beautifyParamsViewModel = new BeautifyParamsViewModel(null, null, user.userId)
        }
    }

    if (beautifyParamsViewModel) {
        thumbnailViewModel.bindBeautifyParamsViewModel(beautifyParamsViewModel)
    }

    return beautifyParamsViewModel
}

/**
 * 绑定图像调节预设
 * @param thumbnailViewModel
 */
export async function bindPalettePreset(thumbnailViewModel: any): Promise<PaletteParamsViewModel | null> {
    const user = (store.state as any).user
    let { palettePresetId, presetSuitId } = thumbnailViewModel.thumbnailModel!

    let currPalettePresetId = palettePresetId
    const oriPreset = ((store.state as any).presetting).oriPreset

    // 创建原图预设
    const createOriPreset = (thumbnailViewModel: any) => {
        const PaletteParamsVmInstance = new PaletteParamsViewModel({
            imgFormat: thumbnailViewModel.imgFormat,
            userId: user.userId
        })
        const PalettePresetCfgInstance = PalettePresetCfgModel.default()

        PalettePresetCfgInstance.createLink(thumbnailViewModel.thumbnailModel!.id!, thumbnailViewModel.thumbnailModel!.projectId!)

        thumbnailViewModel.setPaletteParamsViewModel(PaletteParamsVmInstance)
        thumbnailViewModel.setPalettePresetCfgModel(PalettePresetCfgInstance)

        return PaletteParamsVmInstance
    }

    // 临时预设 或 云端预设
    if (presetSuitId !== oriPreset.id) {

        // 如果使用套装id
        if (presetSuitId !== PresetSuitIdType.UnSet) {
            const presetSuitModel: PresetSuitModel = await store.dispatch('presetSuit/ACT_GetPresetSpecSuit', presetSuitId)
            currPalettePresetId = presetSuitModel.palettePresetId
        }

        const model = await store.dispatch('presetSuit/ACT_GetPalettePreset', currPalettePresetId)

        const paletteParamsVmInstance = thumbnailViewModel.paletteParamsViewModel() || null
        if (paletteParamsVmInstance) {
            paletteParamsVmInstance.resetViewModelConfig({
                id: model.sourceType === 2 ? model.id : null,
                userId: user.userId
            })
        } else {
            const instance = new PaletteParamsViewModel({
                id: model.sourceType === 2 ? model.id : null,
                imgFormat: thumbnailViewModel.imgFormat,
                userId: user.userId
            })
            thumbnailViewModel.setPaletteParamsViewModel(instance)
        }

        if (model) {
            thumbnailViewModel.setPalettePresetCfgModel(model)
            // 临时预设
            return thumbnailViewModel.paletteParamsViewModel()
        } else {
            console.log(`loadEffectCfgWhenFromDb getPresetModel null,imgPath = ${ thumbnailViewModel.imgPath }`)
            return createOriPreset(thumbnailViewModel)
        }

    } else {
        // ... 无效果
        return createOriPreset(thumbnailViewModel)
    }
}
