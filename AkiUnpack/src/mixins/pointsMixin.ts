import { defineComponent } from 'vue'
import {
    PointEvent,
    PointExportOperate,
    PointHelpOperate,
    PointRefineOperate,
    PointRouteMap,
    PointSettingOperate,
    PointExportListOperate,
    PointGuideOperate, PointManualOperate,
    PointCakeAvatarOperate
} from '@/constants/pointsDef'

// @ts-ignore
import TsStat from '@/utils/TsStat/tsStat'
import { Optional } from '@/universal/types/foundation'
// import ipcRenderer from '@/qt-ipc/Ipc-renderer'
const ipcRenderer: any = null

interface PointQuery<T> {
    event_id: string,
    data: T
}

/**
 * 埋点 数据格式化
 * @param event_id
 * @param data
 */
function formatPointData<T>(event_id: string, data: T): PointQuery<T> {
    return Object.freeze({ event_id, data })
}

// 发送埋点数据
function sendPoint<T>(event_id: string, data: T): void {
    const tsStat = TsStat.getInstance()
    tsStat.event(event_id, data)
}

// @ts-ignore
export default defineComponent({
    data() {
        return {}
    },

    computed: {
        routeName(): string {
            // @ts-ignore
            return this.$route.name || ''
        },

        _pointRouteName(): string {
            const actionMap = new Map([
                ['index', PointRouteMap.Workbench],
                ['batchRetouch', PointRouteMap.BatchRetouch],
                ['photoFinishing', PointRouteMap.PhotoFinishing],
                ['exportList', PointRouteMap.Export],
                ['importImage', PointRouteMap.EmptyPage],
                ['', '']
            ])
            // @ts-ignore
            return actionMap.get(this.routeName) || ''
        },

        _distFigureEvent(): string {
            // @ts-ignore
            if ([PointRouteMap.PhotoFinishing, PointRouteMap.BatchRetouch].includes(this._pointRouteName)) {
                // @ts-ignore
                return this._pointRouteName === PointRouteMap.PhotoFinishing
                    ? PointEvent.CakeRefine
                    : PointEvent.CakeGallery
            }
            return ''
        },

        // 二次导入
        PointAddSecond() {
            if (this._distFigureEvent) {
                // @ts-ignore
                return formatPointData(this._distFigureEvent, {
                    cake_operate: PointRefineOperate.AddSecond
                })
            }
            return false
        },
        // 点击1:1图标就统计
        PointClickOriginal: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickOriginal }),
        // 点击合适图标就统计
        PointClickFit: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickFit }),
        PointSwitchGender: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.SwitchGender }),
        PointAddPresetButton: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddPresetButton }),
        // PointAddPresetIcon: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddPresetIcon }),
        PointAddApplyButton: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddApplyButton }),
        PointImageAdjustment: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ImageAdjustment }),
        PointPortraitBeautification: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.PortraitBeautification }),
        PointBackgroundAdjustment: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.BackgroundAdjustment }),
        PointModifyGender: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ModifyGender }),
        //问题反馈
        PointFeedbackChoose: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.FeedbackChooseCategory }), //--点击分类
        PointFeedbackInputContent: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.FeedbackInputContent }),//--点击输入
        // PointFeedbackCancel: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.FeedbackCancel }),//--点击取消
        // PointFeedbackConfirm: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.FeedbackConfirm }),//--点击提交


        // 设置
        PointClickSetting: () => formatPointData(PointEvent.CakeSetting, { cake_operate: PointSettingOperate.ClickSetting }),
        PointClickSettingReturn: () => formatPointData(PointEvent.CakeSetting, { cake_operate: PointSettingOperate.ClickReturn }),

        PointExportSelectPath: () => formatPointData(PointEvent.CakeExport, { cake_operate: PointExportOperate.SelectPath }),

        // PointExportListExportedTab: () => formatPointData(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.ExportedTab }),
        // PointExportListExportingTab: () => formatPointData(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.ExportingTab }),
        PointClickBackstage: () => formatPointData(PointEvent.CakeAvatar, { cake_operate: PointCakeAvatarOperate.ClickBackstage }),

        // 涂抹埋点
        PointClickSmear: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmear }),
        PointClickPreservation: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmearPreservation }),
        PointClickSmearCancel: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmearCancel }),
        PointClickSmearReset: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmearReset }),
        PointClickSmearHistoryBack: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmearHistoryBack, cake_position: PointRefineOperate.ClickHistory }),
        PointDoubleClickDot: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.DoubleClickDot }),
        PointDoubleClickTitle: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.DoubleClickTitle }),
        PointPresetReset: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.PresetReset }),
    //    PointParameterAdjustmentReset: () => formatPointData(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ParameterAdjustmentReset })
    },

    mounted() {
    },

    methods: {
        // PointAddPresetSort(): void {
        //     sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.AddPresetSort })
        // },

        PointAddStar(data: any): void {
            if (data.isFavourite) {
                // @ts-ignore
                const eventId = this.routeName === 'photoFinishing' ? PointEvent.CakeRefine : PointEvent.CakeGallery
                sendPoint(eventId, { cake_operate: PointRefineOperate.AddStar })
            }
        },

        PointCheckOriginalPhoto(): void {
            if (this._distFigureEvent) {
                // @ts-ignore
                sendPoint(this._distFigureEvent, { cake_operate: PointRefineOperate.CheckOriginalPhoto })
            }
        },

        PointDeleteThumbnail(): void {
            if (this._distFigureEvent) {
                // @ts-ignore
                sendPoint(this._distFigureEvent, { cake_operate: PointRefineOperate.Delete })
            }
        },

        PointDeleteAllThumbnail(): void {
            if (this._distFigureEvent) {
                // @ts-ignore
                sendPoint(this._distFigureEvent, { cake_operate: PointRefineOperate.DeleteAll })
            }
        },
        //右键点击问题上报埋点
        PointFeedbackClick(): void {
            if (this._distFigureEvent) {
                // @ts-ignore
                sendPoint(this._distFigureEvent, { cake_operate: PointRefineOperate.Feedback })
            }
        },
        //点击问题上报提交按钮
        PointFeedbackConfirm(data: any): void {
            // @ts-ignore
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.FeedbackConfirm,
                cake_feedback: JSON.stringify(data)
            })
        },
        //点击问题上报取消按钮
        PointFeedbackCancel(): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.FeedbackCancel
            })
        },

        //保存预设，保存按钮
        PointSavePresetSubmit1(): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.SavePresetSubmit1
            })
        },
        //保存预设，创建新预设按钮
        PointSavePresetSubmit2(data: string): void{
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.SavePresetSubmit2,
                cake_new_preset2: data
            })
        },
        //保存预设,覆盖预设按钮
        PointSavePresetCover(data: string): void{
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.SavePresetCover,
                cake_override_preset: data
            })
        },

        PointSelectOne(): void {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.SelectOne })
        },

        PointSelectFilter(data: any): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.SelectFilter,
                cake_feature: (data && data.name) || ''
            })
        },

        PointClickSettingClose(): void {
            sendPoint(PointEvent.CakeSetting, { cake_operate: PointSettingOperate.ClickClose })
        },

        PointClickSettingConfirm(data: { threads: number, cache: number, previewsize: number, areanetwork?: boolean }): void {
            sendPoint(PointEvent.CakeSetting, {
                cake_operate: PointSettingOperate.ClickConfirm,
                cake_value: JSON.stringify(data)
            })
        },

        PointExportAdvancedSetting(val: string | []): void {
            if (val && val.length > 0) {
                sendPoint(PointEvent.CakeExport, { cake_operate: PointExportOperate.AdvancedSettings })
            }
        },

        PointExportCancel(): void {
            sendPoint(PointEvent.CakeExport, { cake_operate: PointExportOperate.Cancel })
        },

        PointShowOriginThumb(): void {
            sendPoint(PointEvent.CakeSetting, { cake_operate: PointExportOperate.OriginThumb })
        },
        PointShowEffectThumb(): void {
            sendPoint(PointEvent.CakeSetting, { cake_operate: PointExportOperate.EffectThumb })
        },

        PointExportConfirm(data: { newfile: boolean; defaultpath: boolean; keepfolder: boolean }, id?: string): void {
            sendPoint(PointEvent.CakeExport, {
                cake_operate: PointExportOperate.Confirm,
                cake_setting_value: JSON.stringify(data),
                cake_name: id
            })
        },

        PointExportClick(cakeValue: string, exportSetting: any): void {
            // @ts-ignore
            const name = this._pointRouteName
            const cakeFeature = `${ exportSetting.totalNumber }_xgt${ exportSetting.totalNumber - exportSetting.isNoePresetNumber }_yt${ exportSetting.isNoePresetNumber }`
            sendPoint(PointEvent.CakeExport, {
                cake_operate: PointExportOperate.ExportButton,
                cake_setting_value: `${ cakeValue }_${ name }`,
                cake_position: name,
                cake_feature: cakeFeature
            })
        },
        PointMemberPriceClick(source: Optional<string>): void {
            sendPoint(PointEvent.CakeH5MemberPrice, {
                cake_operate: 'init_source',
                // @ts-ignore
                source: source ? source : this._pointRouteName
            })
        },
        PointMemberCloseClick(): void {
            sendPoint(PointEvent.CakeH5MemberPrice, {
                cake_operate: 'close'
            })
        },

        PointDragPanel(): void {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.DragPanel })
        },

        PointSwipeSelect(): void {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.SwipeSelect })
        },

        PointParameterAdjustmentReset() {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ParameterAdjustmentReset })
        },

        /**
         * 滑竿数值手动修改完成
         */
        PointManualModifyComplete(): void {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointManualOperate.clickEffectValue })
        },

        // 注意 为何不放在v-gtag-event里面处理:因为 此处混入在FuncHeader或MainFuncHeader里面读取到的this指针是vuecomponent的构造器，所以参数从外部传入。
        PointInviteActivityClick(param: any) {
            sendPoint('activity_entrance_click', { ...param })
        },

        PointInviteActivityExposure(param: { source_position: string }) {
            sendPoint('Invitation_exposure', { ...param })
        },

        PointCakeImport(val: string): void {
            sendPoint(PointEvent.CakeImport, { cake_value: val })
        },

        PointExportSelectPreset(): void {
            sendPoint(PointEvent.CakeExport, { cake_operate: PointExportOperate.SelectPreset })
        },

        // PointExportListBillingRulesPopup(): void {
        //     sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.BillingRulesPopup })
        // },

        PointExportListDeleteBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.DeleteBtn })
        },
        PointExportListRetryBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.RetryBtn })
        },
        PointExportListPauseBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.PauseBtn })
        },
        PointExportListStartBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.StartBtn })
        },
        PointExportListPauseAllBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.PauseAllBtn })
        },
        PointExportListStartAllBtn(): void {
            sendPoint(PointEvent.CakeExportList, { cake_operate: PointExportListOperate.StartAllBtn })
        },

        /**
         * 新手引导
         */
        PointInitGuide(step: number): void {
            let operateStep = null
            switch (step) {
                case 1:
                    operateStep = PointGuideOperate.InitWorkbenchGuide
                    break
                case 2:
                    operateStep = PointGuideOperate.InitPresetGuide
                    break
                case 3:
                    operateStep = PointGuideOperate.InitSlideGuide
                    break
                case 4:
                    operateStep = PointGuideOperate.InitSelectGuide
                    break
                case 5:
                    operateStep = PointGuideOperate.InitSynchronizeGuide
                    break
                case 6:
                    operateStep = PointGuideOperate.InitExportGuide
                    break
                default:
                    operateStep = PointGuideOperate.InitWorkbenchGuide
                    break
            }
            sendPoint(PointEvent.CakeNewuserGuide, { cake_operate: operateStep })
        },
        PointClickQuit(step: number): void {
            sendPoint(PointEvent.CakeNewuserGuide, { cake_operate: `${ PointGuideOperate.ClickQuit }_${ step }` })
        },

        PointFillInfo(): void {
            sendPoint(PointEvent.CakeFillinfo, {})
        },

        /**
         * 模拟退出程序页面
         */
        PointClientClose() {
            ipcRenderer.on('gtag_page_close', (event: any, args: string) => {
                const tsStat = TsStat.getInstance()

                if (args === 'close') {
                    tsStat.pageview({
                        path: '/quit',
                        name: 'Quit',
                        title: '退出程序'
                    })
                } else if (args === 'return') {
                    const to = this.$route as any
                    tsStat.pageview({
                        path: to.path,
                        name: to.name,
                        title: to.meta.title // 上报当前页面 PV
                    })
                }
            })
        },

        PointClickSmearTool(toolKey: string, sliderKey: string): void {
            const positionMap: { [key: string]: string } = {
                brush: 'smear_paint_brush',
                eraser: 'smear_eraser'
            }

            const sliderMap: { [key: string]: string } = {
                size: 'smear_size',
                feather: 'smear_emergence',
                opacity: 'smear_opacity'
            }

            const position = positionMap[toolKey]
            const feature = sliderMap[sliderKey]

            if (!position || !feature) return

            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.ClickSmearTool,
                cake_position: position,
                cake_feature: feature
            })
        },

        PointClickSmearClose(): void {
            sendPoint(PointEvent.CakeRefine, { cake_operate: PointRefineOperate.ClickSmearClose })
        },

        PointZoomCompare(position: string): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: 'zoom_compare',
                cake_position: position
            })
        },

        // PointSelectIdPhotoBackground(data: any): void {
        //     sendPoint(PointEvent.CakeRefine, {
        //         cake_operate: PointRefineOperate.SelectIdPhotoBackground,
        //         cake_feature: (data && data.name) || ''
        //     })
        // },

        PointSelectIdPhotoSize(data: any): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.SelectIdPhotoSize,
                cake_feature: (data && data.label) || ''
            })
        },

        PointModifyPhotoDPI(data: { typeDPI: number, type: string }): void {
            sendPoint(PointEvent.CakeRefine, {
                cake_operate: PointRefineOperate.ModifyDPI,
                cake_value: `dpi_${data.typeDPI}_${data.type}`
            })
        },
    }
})
