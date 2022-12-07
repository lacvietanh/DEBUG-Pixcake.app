import Vue from 'vue'
import { mapActions } from 'vuex'
// @ts-ignore
import toast from '@/mixins/toast'

// @ts-ignore
import {
    bindBeautifyPreset as beautifyPresetDataBinding,
    bindPalettePreset as palettePresetDataBinding
} from '@/mixins/thumbnailDataBinding'

import { PresetSuitIdType } from '@/constants/constants'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'

// import ThumbnailViewModel from '@/viewModel/thumbnailViewModel';
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'

export default Vue.extend({
    mixins: [toast],
    methods: {
        ...mapActions('thumbnail', [
            'ACT_BatchUpdateThumbnailByKey'
        ]),
        /**
         * 绑定人像美化预设
         * @param thumbnailViewModel
         * @param forceCreate
         */
        async bindBeautifyPreset(thumbnailViewModel: any, forceCreate: boolean = false): Promise<BeautifyParamsViewModel | null> {
            return beautifyPresetDataBinding(thumbnailViewModel, forceCreate)
        },

        /**
         * 绑定图像调节预设
         * @param thumbnailViewModel
         */
        async bindPalettePreset(thumbnailViewModel: any): Promise<PaletteParamsViewModel | null> {
            return palettePresetDataBinding(thumbnailViewModel)
        }

        /**
         * 应用预设至图片
         * @param viewModels
         * @param presetSuitModel
         */
        // applyPresetToThumbs(viewModels: Array<any>, presetSuitModel: PresetSuitModel): { paths: any[]; ids: any[] } {
        //
        //     let paths = []
        //     let ids = []
        //
        //     let isNotEffect = presetSuitModel.id === PresetSuitIdType.NoEffect
        //     let bindPresetSuitId = presetSuitModel.id
        //     let bindBeautifyPresetId = presetSuitModel.beautifyPresetId
        //
        //     for (const viewModel of viewModels) {
        //         if (!viewModel.thumbnailModel) continue
        //         if (viewModel.thumbnailModel.presetSuitId === bindPresetSuitId) continue
        //
        //         if (isNotEffect) {
        //             viewModel.resetOpterateStatus()
        //         } else {
        //             viewModel.changeOpterateStatus()
        //         }
        //
        //         const { thumbnailModel } = viewModel
        //         ids.push(thumbnailModel.id)
        //         paths.push(thumbnailModel.originalImagePath)
        //
        //         // @ts-ignore
        //         viewModel.thumbnailModel.presetSuitId = bindPresetSuitId
        //         viewModel.thumbnailModel.presetId = bindBeautifyPresetId
        //         viewModel.thumbnailModel.presetModel = presetSuitModel.beautifyModel || null
        //
        //         if (viewModel.paletteParamsViewModel()) {
        //             viewModel.paletteParamsViewModel().resetViewModelConfig({
        //                 // @ts-ignore
        //                 id: null, from: presetSuitModel.palettePresetId,
        //                 imgFormat: viewModel.imgFormat
        //             })
        //             // @ts-ignore
        //             viewModel.setPalettePresetCfgModel(presetSuitModel.paletteModel)
        //         }
        //
        //         viewModel.hasNewerCache = false
        //         viewModel.setIsWaitImageData(true)
        //     }
        //
        //     console.log('[applyPresetToThumbs] PresetSuitModel: ', presetSuitModel, ', ids: ', ids, ', paths', paths)
        //
        //     if (ids.length > 0) {
        //         this.ACT_BatchUpdateThumbnailByKey({
        //             ids,
        //             updateKeys: ['presetSuitId', 'presetId', 'optStatus'],
        //             data: { presetSuitId: bindPresetSuitId, presetId: bindBeautifyPresetId, optStatus: isNotEffect ? 0 : 1 },
        //             viewModelKeys: paths
        //         })
        //     }
        //
        //     return { ids, paths }
        // }
    }
})
