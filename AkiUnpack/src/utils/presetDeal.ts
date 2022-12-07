import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
// @ts-ignore
import { find as findBeautifyPresetFromDao } from '@/universal/datastore/presettingDao'
// @ts-ignore
import { findByUserId as findPalettePresetFromDao } from '@/universal/datastore/palletePresetCfgDao'

/**
 * 根据order插值排序
 * @returns {Array}
 */
const insertSort = (arr: any[]) => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].order < arr[i - 1].order) {
            let current = arr[i]
            let j = i - 1
            while (j >= 0 && current.order < arr[j].order) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = current
        }
    }
    return arr
}

/**
 * 格式化预设树
 * @param presetClass
 * @param presetItem
 * @returns {Array}
 */
export const presetTreeModuleDeal = (presetClass: any[], presetItem: any[]) => {
    const icon_recommend = require('@/assets/icons/dark/yuse_icon_recommend@3x.png')
    const icon_ordinary = require('@/assets/icons/dark/yuseh_icon_ordinary@3x.png')
    const icon_recommend_selected = require('@/assets/icons/dark/yuse_icon_recommend_selected@3x.png')
    const icon_ordinary_selected = require('@/assets/icons/dark/yuseh_icon_ordinary_selected@3x.png')
    let presetClassArr: any = []
    presetClass.forEach((item: any, index: number) => {
        let presetItemArr = []

        presetItem.forEach((i: any, idx: number) => {
            if (item.id == i.classId) {
                presetItemArr.push({
                    id: i.id,
                    label: i.name,
                    icon: item.type === 1 ? icon_recommend : icon_ordinary,
                    class_id: i.classId,
                    type: i.type,
                    order: i.orderId,
                    icon_selected: item.type === 1 ? icon_recommend_selected : icon_ordinary_selected,
                    tipType: item.type,
                    updated_at: i.updated_at,
                    created_at: i.created_at === 0 ? i.updated_at : i.created_at

                })
            }
        })

        if (presetItemArr.length === 0) {
            presetItemArr.push({
                id: -9999, // 无预设的id
                label: '该分类下暂无预设',
                disabled: true
                // icon: ,
            })
        }
        presetClassArr.push({
            id: item.id,
            label: item.name,
            order: item.order,
            type: item.type,
            children: presetItemArr
        })
    })

    presetClassArr = insertSort(presetClassArr)
    presetClassArr.forEach((item: any, index: number) => {
        if (item.type === 1) {
            // item.children.unshift({
            //     order: -1,
            //     id: -1,
            //     label: '无效果',
            //     icon: icon_recommend,
            //     class_id: item.class_id,
            //     type: 2,
            // })
            if (index !== 0) {
                presetClassArr.splice(index, 1)
                presetClassArr.unshift(item)
            }
        }
    })
    presetClassArr.forEach((item: any) => {
        item.children = insertSort(item.children)
    })
    return presetClassArr
}

/**
 * 格式化预设套装模型
 * @param presets
 * @param userId
 */
export const formatPresetsModel = async (presets: any[] = [], userId: number) => {
    const presetModels: any[] = []
    for (let item of presets) {
        if (item.disable) {
            continue
        }
        // if (!item.beautifyModel) {
        //     if (item.beautifyPresetId === '-1') {
        //         item.beautifyModel = PresetSuitModel.noneBeautifyEffectModel(userId)
        //     } else {
        //         item.beautifyModel = await findBeautifyPresetFromDao(item.beautifyPresetId, userId)
        //     }
        // }
        //
        // if (!item.paletteModel) {
        //     if (item.palettePresetId === '-1') {
        //         item.paletteModel = PresetSuitModel.nonePaletteEffectModel(userId)
        //     } else {
        //         item.paletteModel = await findPalettePresetFromDao(item.palettePresetId, userId)
        //     }
        // }
        presetModels.push(item)
    }

    return presetModels
}
