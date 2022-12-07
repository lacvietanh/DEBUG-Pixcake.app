import Vue, { ref, getCurrentInstance, reactive } from 'vue'
import store from '@/store'

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import NodeApi from '@/qt-ipc/node-api'
import ImageIOManager from '@/qt-ipc/imageIOManager'
import DBIpcRender from '@/irender/DBIpcRender'

// @ts-ignore
import { ALLOCATED_PAY_FUNDS_LACK, PAY_FUNDS_LACK } from '@/api/payApi'

import { debounce } from 'lodash'

// @ts-ignore
import eventbus from '@/utils/eventbus'

import useRechargeRepositories from '@/views/Layout/composables/useRechargeRepositories'

import pointsMixin from '@/mixins/pointsMixin'
// @ts-ignore
import toastMixin from '@/mixins/toast'

import { CUR_PRESET_VERSION } from '@/constants/preset-def'
import { PROJECT_TABLE, IS_CLIENT_PIX_PIE } from '@/universal/types/config'

import UserModel from '@/universal/model/UserModel'

// @ts-ignore
import ExportSettingDialog from '@/views/Layout/components/ExportSettingDialog'
// @ts-ignore
import { gallery } from '@/qt-ipc/gallery'
import useExportPointsRepositories from '@/composables/points/useExportPointsRepositories'

// @ts-ignore
export default {
    name: 'ExportBtn',
    mixins: [pointsMixin, toastMixin],
    components: {
        ExportSettingDialog
    },
    setup(props: any) {
        const that = getCurrentInstance()?.proxy as Vue as any

        const ToastMixinConstructor = Vue.extend(toastMixin)
        const toast = new ToastMixinConstructor()

        const { PointExportContinue, PointExportRecharge, PointExportClick } = useExportPointsRepositories()

        const showExportSelectDialog = ref(false)
        const fullscreenLoading = ref(false)
        let exportSetting = reactive({
            exportTimes: -1,
            currentProject: {
                id: -1,
                exportTimes: -1
            },

            isNoePresetNumber: -1,
            totalNumber: -1,
            isRawNumber: -1,
            needShowSelectPreset: false,

            exportSubDirPath: '',
            exportDirPath: '',
            savePath: '',
            temporaryStoragePath: ''
        })

        // 套餐不足提示
        const { showFundLackView } = useRechargeRepositories()
        const accountFundsLack = (message = '套餐剩余可用张数不足，无法成功导出，请及时充值哦'): void => {
            store.commit('changeDownloadStatus', { status: true })
            showFundLackView(message, {
                onSuccess: () => fullscreenLoading.value = false,
                onCancel: () => fullscreenLoading.value = false
            })
        }

        // 导出逻辑
        function exportFunc(savePath: string, exportDirName: string, createNewDir: string, project: any): void {
            let payload = {
                exportDirPath: savePath,
                exportDirName: exportDirName,
                createNewDir: createNewDir,
                project: project,
                success(data: any) {
                    if (data) {
                        const activeProject = store.getters['project/activeProject']
                        activeProject.exportTimes = data.exportTimes
                        DBIpcRender.updateByKeys(PROJECT_TABLE, activeProject, ['exportTimes'])
                        store.commit('presetSuit/_CLEAR_PALETTE_PRESET_CACHE')
                        store.commit('project/_UpdateProject', activeProject)
                    }

                    fullscreenLoading.value = false
                    eventbus.$emit('export-succeed')

                    const timeout = setTimeout(() => {
                        toast.tsNotify({
                            message: '正在导出中，可以在导出列表中查看进度。',
                            type: 'success'
                        })
                        store.commit('changeDownloadStatus', { status: true })
                        clearTimeout(timeout)
                    }, 500)
                },
                fail(data: any) {
                    fullscreenLoading.value = false
                    const timeout = setTimeout(() => {
                        store.commit('changeDownloadStatus', { status: true })

                        clearTimeout(timeout)
                    }, 500)
                    if (data) {
                        if (data.code === PAY_FUNDS_LACK) {
                            accountFundsLack()
                        } else if (data.code === ALLOCATED_PAY_FUNDS_LACK) {
                            accountFundsLack('剩余可用张数不足，请联系贵司管理员补充张数哦')
                        } else {
                            toast.tsNotify({
                                type: 'error',
                                message: data.msg

                            })
                        }
                    } else {
                        console.error('exportFunc : ', data)
                        toast.tsNotify({
                            type: 'error',
                            message: '创建导出订单失败，请重试'
                        })
                    }
                }
            }
            store.dispatch('asyncPrePay', payload)
        }

        const onDownloadClick = debounce(async function (savePath, createNewDir) {
            let totalNumber = exportSetting.totalNumber
            // let isRawNumber = exportSetting.isRawNumber
            // let jpgNumber = totalNumber - isRawNumber
            // let cakeValue = `${ totalNumber }_j${ jpgNumber }_r${ isRawNumber }`
            // that?.PointExportClick(cakeValue, exportSetting)

            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                toast.tsNotify({
                    type: 'error',
                    message: '当前无网络,不支持下载，请检查网络。'
                })
                return
            }
            fullscreenLoading.value = true

            store.commit('changeDownloadStatus', { status: false })
            eventbus.$emit('onExportClick')

            try {
                await store.dispatch('loadVipInfo')
            } catch (e) {
                fullscreenLoading.value = false
                store.commit('changeDownloadStatus', { status: true })
                toast.tsNotify({
                    type: 'error',
                    message: '用户信息获取失败, 确认网络是否稳定'
                })
                return
            }

            let user = that.user
            if (user) {
                if (user.leftNum === 0) {
                    // accountFundsLack()
                    const timeOut = setTimeout(() => {
                        // @ts-ignore
                        exportFunc(savePath, exportSetting.exportSubDirPath, createNewDir, exportSetting.currentProject)
                        clearTimeout(timeOut)
                    }, 200)

                } else if ((user.leftNum < totalNumber)) {
                    const isAllowTopUp = await UserModel.getInstance().getIsAllowTopUp()
                    const title = `当前套餐剩余${user.leftNum}张，本次导出预计消耗${totalNumber}张，这批照片将无法全部成功导出，`

                    let message = title + '建议您充值后再导出哦~'
                    if (!isAllowTopUp) {
                        message = title + (IS_CLIENT_PIX_PIE ? '请联系管理员' : '请联系贵司管理员补充张数哦')
                    }

                    toast.tsConfirm({
                        title: message,
                        cancelButtonText: '继续导出',
                        confirmButtonText: '马上充值',
                        showConfirmButton: isAllowTopUp,
                        closeOnClickModal: false,
                        distinguishCancelAndClose: true,
                        beforeClose: function (action: string, instance: any, done: () => void) {
                            if (action === 'cancel') {
                                // @ts-ignore
                                PointExportContinue()
                                exportFunc(savePath, exportSetting.exportSubDirPath, createNewDir, exportSetting.currentProject)
                            }
                            const timeOut = setTimeout(() => {
                                fullscreenLoading.value = false
                                store.commit('changeDownloadStatus', { status: true })
                                clearTimeout(timeOut)
                            }, 200)
                            done()
                        }
                    }).then(() => {
                        PointExportRecharge()
                        fullscreenLoading.value = false
                        that?.PointMemberPriceClick()
                        ipcRenderer.send('open-member-plan-window', null)
                        const timeOut = setTimeout(() => {
                            store.commit('changeDownloadStatus', { status: true })
                            clearTimeout(timeOut)
                        }, 200)
                    }).catch((action: string) => {
                    })
                } else {
                    const timeOut = setTimeout(() => {
                        // @ts-ignore
                        exportFunc(savePath, exportSetting.exportSubDirPath, createNewDir, exportSetting.currentProject)
                        clearTimeout(timeOut)
                    }, 200)

                }
            } else {
                fullscreenLoading.value = false
                store.commit('changeDownloadStatus', { status: true })
                toast.tsNotify({
                    type: 'error',
                    message: '用户信息获取失败, 确认网络是否稳定'
                })
            }
        }, 200)

        // 接收所选预设类型并应用预设，然后再导出
        async function exportSettingCallback(param: any) {

            let [savePath, preItem, createNewDir] = param
            if (preItem) {
                const that = getCurrentInstance()?.proxy as Vue as any
                //应用预设
                const preSet = preItem[0]
                let presetVersion = Number(preSet.version)
                if (presetVersion && presetVersion > CUR_PRESET_VERSION) {
                    toast.tsConfirm({
                        title: '系统提示',
                        message: '需要升级最新版本才能使用该预设哦~',
                        showCancelButton: false
                    }).then(() => {
                    })
                    return
                }

                let { isFromRefineTab, refineOrGalleryUUID } = store.getters['exportEffectCfg']
                //应用预设
                if (isFromRefineTab) {
                    // @ts-ignore
                    await NodeApi.refine.applyAllPreset(refineOrGalleryUUID, {
                        presetSuitId: preSet.id,
                        palettePresetId: preSet.palettePresetId,
                        presetId: preSet.beautifyPresetId
                    })
                } else {
                    // @ts-ignore
                    await NodeApi.gallery.applyAllPreset(refineOrGalleryUUID, {
                        presetSuitId: preSet.id,
                        palettePresetId: preSet.palettePresetId,
                        presetId: preSet.beautifyPresetId
                    })
                }

                // 应用预设后更新页面
                if (that?.$route.name == 'photoFinishing') {
                    eventbus.$emit('initloadPhotoFinishing')
                } else if (that?.$route.name == 'batchRetouch') {
                    eventbus.$emit('initloadBatchRetouch')
                }

            }
            showExportSelectDialog.value = false
            onDownloadClick(savePath, createNewDir)
        }

        function onChangeShowExportSelectDialog(val: boolean) {
            showExportSelectDialog.value = val
        }

        const readyExport = async (data: string) => {
            const tmpSetting = {
                exportTimes: -1,
                currentProject: {
                    id: -1,
                    exportTimes: -1
                },

                isNoePresetNumber: -1,
                totalNumber: -1,
                isJpgNumber: -1,
                isPngNumber: -1,
                isRawNumber: -1,
                isTiffNumber: -1,
                rawNumberData: '',
                needShowSelectPreset: false,

                exportSubDirPath: '',
                exportDirPath: '',
                savePath: '',
                temporaryStoragePath: ''
            }

            const exportResult = await ImageIOManager.getExportSettingData()
            // @ts-ignore
            let {
                exportDirPath,
                exportSubDirPath,
                exportTimes,
                currentProject,
                needShowSelectPreset,
                isNoePresetNumber,
                isJpgNumber,
                isPngNumber,
                isRawNumber,
                isTiffNumber,
                rawNumberData,
                totalNumber,
                selectValidNumber,
                temporaryStoragePath
            } = exportResult
            if (selectValidNumber === 0) {
                toast.tsNotify({
                    type: 'error',
                    message: '请选择有效支持的图片格式进行导出～'
                })
                return
            }

            tmpSetting.exportSubDirPath = exportSubDirPath
            tmpSetting.exportTimes = exportTimes
            tmpSetting.exportDirPath = exportDirPath
            tmpSetting.currentProject = currentProject
            tmpSetting.temporaryStoragePath = temporaryStoragePath

            // @ts-ignore
            let configModel = store.state.config.configModel
            if (configModel) {
                if (configModel.setDefaultPath) {
                    tmpSetting.savePath = configModel.defaultSavePath
                } else {
                    tmpSetting.savePath = exportDirPath
                }
            }

            tmpSetting.needShowSelectPreset = needShowSelectPreset
            tmpSetting.isNoePresetNumber = isNoePresetNumber
            tmpSetting.totalNumber = totalNumber
            tmpSetting.isJpgNumber = isJpgNumber
            tmpSetting.isPngNumber = isPngNumber
            tmpSetting.rawNumberData = rawNumberData
            tmpSetting.isTiffNumber = isTiffNumber

            let effectCount = totalNumber - isNoePresetNumber

            let rowData = ''
            let rowParam = JSON.parse(tmpSetting.rawNumberData)
            const param = rowParam.rowType
            for (const item of param) {
                rowData += item.type + '_' + item.times + '\n'
            }
            if (rowData == '') {
                rowData = 'CR2_0\n'
            }
            let clickData = {
                cake_position: data,
                cake_value: totalNumber + '_' + data + '\nJPEG_' + isJpgNumber + '\nPNG_' + isPngNumber + '\n' + rowData + 'TIFF_' + isTiffNumber,
                cake_feature: totalNumber + '_xgt' + effectCount + '_yt' + isNoePresetNumber
            }
            PointExportClick(clickData)

            Object.assign(exportSetting, tmpSetting)

            // 配置导出的相关设置
            showExportSelectDialog.value = true

        }

        return {
            showExportSelectDialog,
            fullscreenLoading,
            exportSetting,

            exportSettingCallback,
            onChangeShowExportSelectDialog,
            readyExport
        }
    }
}
