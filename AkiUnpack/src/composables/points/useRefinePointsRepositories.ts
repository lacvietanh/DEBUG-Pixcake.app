import useBaseRepositories from './useBaseRepositories'
import {PointEvent, PointGuideOperate, PointRefineOperate} from '@/constants/pointsDef'
import { SelectTypeEnum } from '@/constants/refine'

interface IUseUpdatePointsRepositories {
    PointPortraitBeautification: () => void
    PointImageAdjustment: () => void
    PointBackgroundAdjustment: () => void
    PointOperationHistory: () => void
    PointCropIcon: () => void

    PointFileNotExit: () => void
    PointFileCopyPath: () => void

    PointHistoryStep: () => void
    PointHistoryReset: () => void
    PointHistoryScroll: () => void

    PointGuideImgAdjust: () => void
    PointGuideBackground: () => void
    PointGuideHistory: () => void
    PointGuideCrop: () => void
    PointGuidePresetSettings: () => void

    PointPreviewClick: () => void
    PointPreviewExit: () => void
    PointPreviewInit: () => void
    PointPreviewColorMode: () => void
    PointPreviewFullMode: () => void

    PointSavePresetSubmit1: (operate: number) => void,
    PointSavePresetSubmit2: (data: string, operate: number) => void,
    PointSavePresetCover: (data: string, operate: number) => void
    PointSynchronizeSettings: (operate: number) => void

    PointAddAFace: () => void
    PointAddAFaceFinish: (value: string) => void

    PointClickLiquefaction: () => void
    PointLiquefactionCancel: () => void
    PointLiquefactionConfirm: () => void
}

export default function useRefinePointsRepositories(): IUseUpdatePointsRepositories {
    const { sendPoint } = useBaseRepositories()

    function PointFileNotExit(){
        sendPoint(PointEvent.CakeRefine,{cake_operate: 'file_not_exist_close'})
    }

    function PointFileCopyPath(){
        sendPoint(PointEvent.CakeRefine,{cake_operate: 'file_not_exist_copy'})
    }

    function PointHistoryStep(){
        let operate = 'history_any_step'
        sendPoint(PointEvent.CakeRefine,{cake_operate: operate})
    }

    function PointHistoryReset(){
        let operate = 'history_reset'
        sendPoint(PointEvent.CakeRefine,{cake_operate: operate})
    }

    function PointHistoryScroll() {
        let operate = 'history_reset_scroll'
        sendPoint(PointEvent.CakeRefine, {cake_operate: operate})
    }

    function  PointGuideImgAdjust(){
        sendPoint(PointEvent.CakeUpgradeGuide,{cake_position: PointGuideOperate.InitImgAdjustmentGuide})
    }

    function PointGuideBackground(){
        sendPoint(PointEvent.CakeUpgradeGuide,{cake_position: PointGuideOperate.InitBackgroundGuide})
    }

    function PointGuideHistory(){
        sendPoint(PointEvent.CakeUpgradeGuide,{cake_position: PointGuideOperate.InitHistoryGuide})
    }

    function PointGuideCrop(){
        sendPoint(PointEvent.CakeUpgradeGuide,{cake_position: PointGuideOperate.InitCropGuide})
    }

    function PointGuidePresetSettings(){
        sendPoint(PointEvent.CakeUpgradeGuide,{cake_position: PointGuideOperate.InitPresetSettingGuide})
    }

    function PointPreviewClick(){
        sendPoint(PointEvent.CakeImageAdjustment, {cake_position: PointRefineOperate.ClickPreview})
    }

    function PointPreviewExit(){
        sendPoint(PointEvent.CakeImageAdjustment, {cake_position: PointRefineOperate.ExitPreview})
    }

    function PointPreviewInit(){
        sendPoint(PointEvent.CakeImageAdjustment, {cake_position: PointRefineOperate.InitPreview})
    }

    function PointPreviewColorMode(){
        sendPoint(PointEvent.CakeImageAdjustment, {cake_position: PointRefineOperate.ColorMode})
    }

    function PointPreviewFullMode(){
        sendPoint(PointEvent.CakeImageAdjustment, {cake_position: PointRefineOperate.FullEffectMode})
    }

    const PresetSettingsObj = {
        [SelectTypeEnum.Default]: 'preset_default',
        [SelectTypeEnum.Spec]: 'preset_adjusted',
        [SelectTypeEnum.All]: 'preset_all',
        [SelectTypeEnum.Custom]: 'preset_customize',
        [SelectTypeEnum.Cancel]: 'preset_none'
    }
    //保存预设，保存按钮
    function PointSavePresetSubmit1(operate: number){
        if (!PresetSettingsObj[operate]) return
        sendPoint(PointEvent.CakeRefine, {
            cake_position: PointRefineOperate.SavePresetSubmit1,
            cake_feature: PresetSettingsObj[operate],
        })
    }

    //保存预设，创建新预设按钮
    function PointSavePresetSubmit2(data: string, operate: number){
        if (!PresetSettingsObj[operate]) return
        sendPoint(PointEvent.CakeRefine, {
            cake_position: PointRefineOperate.SavePresetSubmit2,
            cake_feature: PresetSettingsObj[operate],
            cake_new_preset2: data
        })
    }

    //保存预设,覆盖预设按钮
    function PointSavePresetCover(data: string, operate: number){
        if (!PresetSettingsObj[operate]) return
        sendPoint(PointEvent.CakeRefine, {
            cake_position: PointRefineOperate.SavePresetCover,
            cake_feature: PresetSettingsObj[operate],
            cake_override_preset: data
        })
    }

    const SyncPresetSettingsObj = {
        [SelectTypeEnum.Default]: 'synchronize_default',
        [SelectTypeEnum.Spec]: 'synchronize_adjusted',
        [SelectTypeEnum.All]: 'synchronize_all',
        [SelectTypeEnum.Custom]: 'synchronize_customize',
        [SelectTypeEnum.Cancel]: 'synchronize_none'
    }
    // 同步预设设置保存
    function PointSynchronizeSettings(operate: number) {
        if (!SyncPresetSettingsObj[operate]) return
        sendPoint(PointEvent.CakeRefine, {
            cake_operate: 'synchronize_settings',
            cake_feature: SyncPresetSettingsObj[operate],
        })
    }

    function PointAddAFace(){
        sendPoint(PointEvent.CakeRefine, { cake_operate: 'add_a_face' })
    }

    function PointAddAFaceFinish(value: string) {
        sendPoint(PointEvent.CakeRefine, {
            cake_operate: 'add_a_face_finish',
            cake_feature: value
        })
    }

    function PointClickLiquefaction() {
        sendPoint(PointEvent.CakeRefine, { cake_operate: 'click_liquefaction' })
    }

    function PointLiquefactionCancel() {
        sendPoint(PointEvent.CakeRefine, { cake_operate: 'liquefaction_cancel' })
    }

    function PointLiquefactionConfirm() {
        sendPoint(PointEvent.CakeRefine, { cake_operate: 'liquefaction_confirm' })
    }

    return {
        PointPortraitBeautification: () => sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.PortraitBeautification }),
        PointImageAdjustment: () => sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ImageAdjustment }),
        PointBackgroundAdjustment: () => sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.BackgroundAdjustment }),
        PointOperationHistory: () => sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.OperationHistory }),
        PointCropIcon: () => sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.CropIcon }),

        PointFileNotExit,
        PointFileCopyPath,

        PointHistoryStep,
        PointHistoryReset,
        PointHistoryScroll,

        PointGuideImgAdjust,
        PointGuideBackground,
        PointGuideHistory,
        PointGuideCrop,
        PointGuidePresetSettings,

        PointPreviewClick,
        PointPreviewExit,
        PointPreviewInit,
        PointPreviewColorMode,
        PointPreviewFullMode,

        PointSavePresetSubmit1,
        PointSavePresetSubmit2,
        PointSavePresetCover,

        PointSynchronizeSettings,

        PointAddAFace,
        PointAddAFaceFinish,

        PointClickLiquefaction,
        PointLiquefactionCancel,
        PointLiquefactionConfirm,
    }
}
