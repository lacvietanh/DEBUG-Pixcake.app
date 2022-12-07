import useBaseRepositories from './useBaseRepositories'
import { delay } from '@/universal/utils/common'
import { facialRefineTransformEnum } from '@/constants/presetParams/facial-refine-transform-enum'
import { PoseRefineTransformEnum} from '@/constants/presetParams/pose-refine-transform-enum'
import { isEqual } from 'lodash'
import {
    MakeUpSuitClickMap,
    MakeUpTabClickMap,
    PointEvent,
    PointParamOperate,
    PointParamsFeatureMap, PointRefineOperate, PointRouteMap
} from '@/constants/pointsDef'
import { EffectAlgoVersion, EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import { PresetClassifyType } from '@/constants/constants'
import { CropType, SelectTypeEnum } from '@/constants/refine'
import CropTypes, {
    DefaultIdPhotoType,
    FixedRatioType,
    idPhotoTypes,
    RatioType,
    recommendRadioTypes
} from '@/constants/crop-types'

interface IUseUpdatePointsRepositories {
    batchSendGtag: (data: any[], origin: string, { beautifyParams }: { beautifyParams: { [key: string]: string | number } }) => void
    PointRightParams: (operate: string) => void
    PointRightPreset: (model: PresetSuitModel) => void
    PointAddPresetSort: () => void
    PointAddPresetIcon: () => void
    PointRightMakeupTheme: (data: string) => void
    PointRightMakeupItem: (tab: string, item: string) => void
    PointPreset: (isRecommend: boolean, cakeId: number) => void
    PointBatchPalette: (operate: string) => void
    PointSkyChoose: (operate: string) => void
    PointLiquefyOperate: (operate: string) => void
    PointSelectIdPhotoBackground: (data: any) => void
    PointCropFinish: (data: any) => void
}

export default function useParamsPointsRepositories(): IUseUpdatePointsRepositories {
    const { sendPoint, getPointRouteName } = useBaseRepositories()

    const skinPointKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideBeautyRod] || {})
    const faceKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideFaceliftRod] || {})
    const bodyKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideBodyRod] || {})
    const makeupKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.MakeupSuit] || {})
    const colorKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideColorRod] || {})
    const backgroundKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SliderBackground] || {})
    const removeDefectsKeys = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideRemoveDefects] || {})
    const skyAdjustment = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideSkyAdjustmentRod] ||{})
    const skySceneryAdjustment = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideSkySceneryAdjustmentRod] || {})
    const skyWaterAdjustment = Object.keys(PointParamsFeatureMap[PointParamOperate.SlideSkyWaterAdjustmentRod] || {})

    /**
     * 参数埋点汇总
     * @param key {string}
     * @param value
     * @param beautifyParams
     * @param origin
     */
    function gaJudge(key: string, value: string | number, { beautifyParams = {}, origin = 'beautify' }) {
        const isBeautify = origin === 'beautify'
        const isColor = origin === 'color'
        let cakeFeature = null
        let cakeOperate = null

        if (isBeautify && makeupKeys.includes(key)) {
            cakeOperate = PointParamOperate.MakeupSuit
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if (isBeautify && skinPointKeys.includes(key)) {
            cakeOperate = PointParamOperate.SlideBeautyRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if (isBeautify && bodyKeys.includes(key)) {
            cakeOperate = PointParamOperate.SlideBodyRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if (isBeautify && removeDefectsKeys.includes(key)) {
            cakeOperate = PointParamOperate.SlideRemoveDefects
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if (isColor && colorKeys.includes(key)) {
            cakeOperate = PointParamOperate.SlideColorRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if (isBeautify && faceKeys.includes(key)) {
            cakeOperate = PointParamOperate.SlideFaceliftRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]

            // 是否是对称液化
            const isSymmetry = [
                EffectParamEnum.SymmetryReshapeSwitch,
                EffectParamEnum.SymmetryReshapeBody,
                EffectParamEnum.SymmetryReshapeFace
            ].includes(key as EffectParamEnum)

            if (!isSymmetry) {
                // 支持切换面部重塑版本埋点
                // @ts-ignore
                const faceSurgeryVersion = beautifyParams[EffectAlgoVersion.FaceSurgery] || 'V1'
                if (faceSurgeryVersion !== 'V1') {
                    cakeFeature += `_${ faceSurgeryVersion }`
                }
            }
        }


        if (isBeautify && backgroundKeys.includes(key)) {
            cakeOperate = PointParamOperate.SliderBackground
            // @ts-ignore
            const mapping = PointParamsFeatureMap[cakeOperate][key]
            // @ts-ignore
            const value = beautifyParams[key]

            if (typeof mapping === 'object') {
                cakeFeature = mapping[value]
            } else {
                cakeFeature = mapping
            }
        }

        if(skyAdjustment.includes(key)){
            console.log('current is beautify: ', isBeautify)
            console.log('current is beautify: ', key)
            cakeOperate = PointParamOperate.SlideSkyAdjustmentRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if(skySceneryAdjustment.includes(key)){
            cakeOperate = PointParamOperate.SlideSkySceneryAdjustmentRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        if(skyWaterAdjustment.includes(key)){
            cakeOperate = PointParamOperate.SlideSkyWaterAdjustmentRod
            // @ts-ignore
            cakeFeature = PointParamsFeatureMap[cakeOperate][key]
        }

        // 面部重塑脸型版本切换
        if (key === EffectAlgoVersion.FaceSurgery) {
            cakeOperate = PointParamOperate.Facelift
            cakeFeature = value
        }

        if (cakeFeature && cakeOperate) {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: cakeOperate,
                cake_feature: cakeFeature
            })
        }
    }

    /**
     * 面部重塑->双滑竿在锁定状态下 将左右两个参数通过map进行转换成单滑竿参数
     */
    function formatFacialRefineTransformParams(data: any[]) {
        let transformKeys = null
        let transformKey = null
        const keys = data.map((item) => item.key)
        const formatKeys = keys.map(v => {
            const res = v.split('_')
            return res[0]
        })
        facialRefineTransformEnum.forEach((value, mapKeys) => {
            if (isEqual(mapKeys, formatKeys)) {
                transformKeys = keys
                transformKey = value
            }
        })

        //add pose refine(Neck)
        if(transformKeys == null && transformKey == null){
            PoseRefineTransformEnum.forEach((value, mapKeys) => {
                if (isEqual(mapKeys, formatKeys)) {
                    transformKeys = keys
                    transformKey = value
                }
            })
        }

        return {
            transformKeys,
            transformKey
        }
    }

    function batchSendGtag(data: any[], origin = 'beautify', { beautifyParams }: { beautifyParams: { [key: string]: string | number } }) {
        delay(10).then(() => {
            if (data.length === 2) {
                const { transformKey, transformKeys } = formatFacialRefineTransformParams(data)
                if (transformKey && transformKeys) {
                    const value = data.find((item) => item.key === transformKeys![0]).value
                    return gaJudge(transformKey!, value, {
                        beautifyParams,
                        origin
                    })
                }
            }

            data.forEach(({ key, value }) => {
                const baseKey = origin === 'color' ? key : key.split('_')[0]
                gaJudge(baseKey, value, {
                    beautifyParams,
                    origin
                })
            })
        })
    }

    function PointRightParams(operate: string) {
        sendPoint(PointEvent.CakeRefine, { cake_operate: operate })
        //sendOperateData(data)
        //发送操作记录信息
        // console.log('current data is: -> cake_operate:'+data['cake_operate'])
        // console.log('current data is: -> cake_id:'+data['cake_id'])
        // console.log('current data is: -> 预设:'+data['cake_name'])
    }


    // 精修预设点击
    function PointRightPreset(model: PresetSuitModel) {
        let cakeOperate = 'click_my_preset'
        if (model.classifyType === PresetClassifyType.System) {
            cakeOperate = 'click_recommend_preset'
        }

        sendPoint(PointEvent.CakeRefine, {
            cake_operate: cakeOperate,
            cake_id: model.id
            // cake_name: model.name,
            // cake_component: '预设'
        })
    }

    function PointRightMakeupTheme(data: string) {
        const makeupKeys = Object.keys(MakeUpTabClickMap)
        if (makeupKeys.includes(data)) {
            let theme = MakeUpTabClickMap[data]
            sendPoint(PointEvent.CakeRefine, { cake_operate: theme })
        }
    }

    function PointRightMakeupItem(tab: string, item: string) {
        const makeupKeys = Object.keys(MakeUpSuitClickMap)
        if (makeupKeys.includes(tab)) {
            let theme = MakeUpSuitClickMap[tab]
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: theme,
                cake_makeup_feature: item
            })
        }
    }

    // 图库预设点击
    function PointPreset(isRecommend: boolean, cakeId: number) {
        const operate = isRecommend ? 'click_recommend_preset' : 'click_my_preset'
        sendPoint(PointEvent.CakeGallery, { cake_operate: operate, cake_id: cakeId })
    }

    function PointBatchPalette(operate: string) {
        if (operate == 'delete') {
            let currentRout = getPointRouteName()
            if (currentRout == PointRouteMap.BatchRetouch) {
                sendPoint(PointEvent.CakeGallery, { cake_operate: operate })
            } else if (currentRout == PointRouteMap.PhotoFinishing) {
                sendPoint(PointEvent.CakeRefine, { cake_operate: operate })
            }
        } else {
            sendPoint(PointEvent.CakeGallery, { cake_operate: operate })
        }
    }

    function PointSkyChoose(feature: string){
        sendPoint(PointEvent.CakeRefine, {cake_operate:'select_sky_material', cake_feature: feature})
    }

    function PointAddPresetSort(): void {
        sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddPresetSort })
    }

    function PointAddPresetIcon () {
        sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddPresetIcon })
    }

    function PointLiquefyOperate(type: string) {
        const  optObj = {
            'size': PointRefineOperate.LiquefactionSize,
            'density': PointRefineOperate.LiquefactionDensity,
            'pressure':PointRefineOperate.LiquefactionPressure,
            'edges':PointRefineOperate.ClickLiquefactionFixedEdge
        }
        const cake_feature = optObj[type]
        if (!cake_feature) {
            return
        }
        sendPoint(PointEvent.CakeRefine, {
            cake_operate: PointParamOperate.SlideLiquefyRod,
            cake_feature
        })
    }

    function PointSelectIdPhotoBackground(data: any): void {
        if (!data) return
        sendPoint(PointEvent.CakeRefine, {
            cake_operate: PointRefineOperate.SelectIdPhotoBackground,
            // 本地自定义背景图
            cake_feature: data.sourceType && data.sourceType === 1
                ? 'customize'
                : (data && data.name) || ''
        })
    }

    function PointCropFinish(data: any) {
        let type = 'original'
        if (data.type === DefaultIdPhotoType) {
            type = 'print'
        } else if (idPhotoTypes.includes(data.type)) {
            type = `idphoto${data.type}`
        } else if (recommendRadioTypes.includes(data.type)) {
            type = `${data.width}${data.height}`
        } else if ([RatioType, FixedRatioType].includes(data.type)) {
            type = 'proportion'
        }
        const rotate = data.rotate
        const flip = `${data.flipX}${data.flipY}`
        sendPoint(PointEvent.CakeRefine, {
            cake_operate: 'crop_finish',
            cake_feature: `crop_${type}_rotate_${rotate}_flip_${flip}`
        })
    }

    return {
        batchSendGtag,
        PointRightParams,
        PointRightPreset,
        PointAddPresetSort,
        PointAddPresetIcon,
        PointRightMakeupTheme,
        PointRightMakeupItem,
        PointPreset,
        PointBatchPalette,
        PointSkyChoose,
        PointLiquefyOperate,
        PointSelectIdPhotoBackground,

        PointCropFinish
    }
}
