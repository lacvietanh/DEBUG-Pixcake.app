// config
import { insert as insertToDictionary } from '@/universal/datastore/dictionaryDao'
import {
    CONFIG_TABLE,
    ENABLE_OPENCL_ID,
    ENABLE_OPENGL_ID,
    ENABLE_QRC_DEBUG_ID,
    EXPORT_TASK_NUMBER,
    SYSTEM_DISK_MIN_CAPACITY,
    WORKSPACE_DISK_MIN_CAPACITY,
    DICTIONARY_TABLE,
    SHOWED_NOVICE_GUIDE,
    FIRST_TIME_INVITE,
    FIRST_EXPORT_TIME_INVITE,
    OpenGLAttribute,
    OPENGL_ATTRIBUTE_KEY,
    EXPORT_JPG_LEVEL,
    SEND_GTAG_NUMBER, IS_CLIENT_PixCake_EXPO
} from '#/types/config'
import { previewAreaSizeList } from '@/constants'

import locs from '@/utils/locs'
import { PREVIEW_CACHE_SWITCH } from '@/universal/types/config'
import DBIpcRender from '@/irender/DBIpcRender'
import { ShareObjectModel } from '#/model/ShareObjectModel/ShareObjectModel'
import ipcRenderer from "qt/Ipc-renderer";
import NodeApi from 'qt/node-api'
import Pixcookengine from 'qt/pixcookengine'
import {find as findFromDictionary } from "#/datastore/dictionaryDao"
import {ExportBridgeImpl} from "qt/bridge/impl/ExportBridgeImpl";
import LocalConfigModel from "#/model/LocalConfigModel";

let debugEnv = process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'beta'

// 读取本地文件 获取debug配置
// if (debugEnv) {
//     const instance = LocalConfigModel.getInstance()
//     if (instance.isExist()) {
//         instance.readJsonFromLocal()
//
//         if (instance.switch) {
//             debugEnv = instance.debug
//         }
//     }
// }

//屏幕物理分辨率
const getDefaultPreviewSize = () => {
    let size = window.screen.width * 2//屏幕物理分辨率
    if (process.platform === 'win32') {
        if (size <= 2500) {
            return 2500
        } else {
            return 3000
        }
    } else {
        if (size <= 3000) {
            return 3000
        } else {
            return 4000
        }
    }
}

const defaultPreviewSize = getDefaultPreviewSize()

function readMinCapacityItem(key, defaultVal) {
    let strItem = localStorage.getItem(key)
    let val = defaultVal
    if (strItem) {
        val = parseInt(strItem)
    }
    return val
}

export default {
    namespaced: true,
    state: {
        configModel: null,
        canDebugEffect: false,
        canDebugExportEffect: false,
        isEnableSkeletonPoint: false,
        isEnableFacePoint: false,
        isDebugEnv: debugEnv,
        removeResolutionLimit: false,
        isEnableCheckFaceIsBlack: false,
        enableOpenCL: true,
        enableOpenGL: true,//initOpenGLStatus(),
        exportTaskConfig: null,
        previewAreaSizeList: [{
            name: `自动（${defaultPreviewSize}）`,
            value: 0,
            size: defaultPreviewSize
        }].concat(previewAreaSizeList.filter(item => item.size !== defaultPreviewSize)),
        previewAreaValue: 0,
        //
        inviteConfig: { // url动态链接配置
            inviteUrl: null, // 邀请链接(提示邀请)
            inviteDetailUrl: null // 邀请详情链接(可查看邀请多少人)
        },
        previewCacheStatus: false,//initPreviewCacheStatus(),
        //磁盘检测项用于非pro环境
        diskWarnCondition: {
            minWorkSpaceFreeCapacity: readMinCapacityItem(WORKSPACE_DISK_MIN_CAPACITY, 2), //已G为单位
            minSystemDiskFreeCapacity: readMinCapacityItem(SYSTEM_DISK_MIN_CAPACITY, 2) // 系统盘最小的单位G
        },
        isShowNoviceGuide: null,
        guideStep: 0,
        dialogTotal: 0,
        // 压测配置:
        importNoNavigate:false, //工作台导入不跳转路由(进入下个页面)
        gpuAttribute: OpenGLAttribute.UseOpenGLES,
        exportJPGFormatVal: 12,
        sendGtagNumber: {
            number: readMinCapacityItem(SEND_GTAG_NUMBER, 40)
        },
        enableOpenGLType: 0,
        defaultGpuAttribute:  OpenGLAttribute.UseSoftwareOpenGL,
        photoshopPath:"",
        // 菜单栏上面是否可显示手动导入的按钮
        canShowManualImportButton:false
    },

    getters: {
        diskWarnCondition: (state) => state.diskWarnCondition,
        canDebugEffect: (state) => state.canDebugEffect,
        canDebugExportEffect: (state) => state.canDebugExportEffect,
        isEnableFacePoint: (state) => state.isEnableFacePoint,
        isEnableSkeletonPoint: (state) => state.isEnableSkeletonPoint,
        isDebugEnv: (state) => state.isDebugEnv,
        removeResolutionLimit: (state) => state.removeResolutionLimit,
        isEnableCheckFaceIsBlack: (state) => state.isEnableCheckFaceIsBlack,
        enableOpenCL: (state) => state.enableOpenCL,
        enableOpenGL: (state) => state.enableOpenGL,
        exportTaskConfig: (state) => state.exportTaskConfig,
        previewAreaValue: (state) => state.previewAreaValue,
        previewAreaSizeList: (state) => state.previewAreaSizeList,
        usePreviewSize: (state) => {
            if (state.removeResolutionLimit) {
                return 0
            }

            const obj = state.previewAreaSizeList.find(item => item.value === state.previewAreaValue)
            if (obj) {
                return obj.size
            }

            return defaultPreviewSize
        },
        appConfigModel: (state) => state.configModel,
        previewCacheStatus: (state) => state.previewCacheStatus,
        isShowNoviceGuide: (state) => state.isShowNoviceGuide,
        guideStep: (state) => state.guideStep,
        importNoNavigate:(state)=>state.importNoNavigate,
        gpuGlAttribute:(state)=>state.gpuAttribute,
        sendGtagNumber:(state)=>state.sendGtagNumber,
        enableOpenGLType: (state) => state.enableOpenGLType,
        defaultGpuAttribute: (state) => state.defaultGpuAttribute,
        photoshopPath:(state)=>state.photoshopPath,
        canShowManualImportButton:(state)=>state.canShowManualImportButton
    },

    mutations: {
        SetCanShowManualImportButton(state){
            // 关闭自动时，才显示手动的按钮
            const canSwitch = LocalConfigModel.getInstance().switch
            const exhibitionConfig = LocalConfigModel.getInstance().exhibitionConfig
            const enableAutoImport = !exhibitionConfig || Object.keys(exhibitionConfig).length == 0 || exhibitionConfig.switch == 0
            const enable = IS_CLIENT_PixCake_EXPO && canSwitch == true && enableAutoImport
            state.canShowManualImportButton = enable
        },
        _SetPhotoshopPath(state, value) {
            state.photoshopPath = value
            ExportBridgeImpl.instance().setPhotoShopPath(value).then(()=>{})
        },
        changeImportNoNavigate(state){
            state.importNoNavigate = !state.importNoNavigate
        },
        //页面更新，保存导出路径
        async initConfig(state, config) {
            state.configModel = config
            let res = await DBIpcRender.insertToDB(CONFIG_TABLE, state.configModel.toJson())
            state.configModel.id = res.id

            const item = await findFromDictionary(EXPORT_JPG_LEVEL)
            if (item) {
                let {value} =item
                state.exportJPGFormatVal = parseInt(value)
            } else {
                insertToDictionary(EXPORT_JPG_LEVEL, 12)
            }
        },
        initExportTaskConfig(state, config) {
            state.exportTaskConfig = config
            ShareObjectModel.instance().setDefaultExportTaskNumber(config.defaultNumber)
            ShareObjectModel.instance().setMaxExportTaskNumber(config.maxNumber)
        },
        initEnableOpenCL(state, enable) {
            state.enableOpenCL = enable
        },
        async updateConfig(state, {
            buildCLKernel,
            onVipPlanClick,
            previewSize,
            defaultCacheNumber,
            showEffectThumb,
            showImageDescription
        }) {
            if (buildCLKernel !== undefined) {
                state.configModel.buildCLKernel = buildCLKernel
            }
            if (onVipPlanClick !== undefined) {
                state.configModel.onVipPlanClick = onVipPlanClick
            }
            if (previewSize) {
                state.configModel.previewSize = previewSize
            }
            if (defaultCacheNumber) {
                state.configModel.defaultCacheNumber = defaultCacheNumber
            }
            if (showEffectThumb !== undefined) {
                state.configModel.showEffectThumb = showEffectThumb
                state.configModel.changeSETSwitch = true
            }
            if (showImageDescription !== undefined) {
                state.configModel.showImageDescription = showImageDescription
            }
            let res = await DBIpcRender.insertToDB(CONFIG_TABLE, state.configModel.toJson())
            state.configModel.id = res.id
        },
        //更新previewSize
        updateConfigPreviewSize(state, size) {
            state.configModel.previewSize = size
        },
        //插入数据
        async updateConfigModel(state, { data }) {
            state.configModel = data
            let res = await DBIpcRender.insertToDB(CONFIG_TABLE, state.configModel.toJson())
            state.configModel.id = res.id
        },
        //此API可以不用了
        //二级弹窗多个的情况下，对快捷键的屏蔽操作；第一个弹窗出来的时候，屏蔽快捷键；最后一个弹窗关闭的时候，打开快捷键
        sendKeyboardWithSecondDialog(state,isShowDialog) {
            if (isShowDialog)
            {
                state.dialogTotal = state.dialogTotal + 1;
            }
            else
            {
                state.dialogTotal = state.dialogTotal - 1;
            }


            if ( (isShowDialog === true && state.dialogTotal >= 1) ||
                (isShowDialog === false && state.dialogTotal <= 0) )
            {
                ipcRenderer.send('qt_switch_changed', { 'event': 'keyboard', 'enable': !isShowDialog })
            }
        },

        changeDebugEffectStatus(state) {
            state.canDebugEffect = !state.canDebugEffect
            ShareObjectModel.instance().setCanDebugEffect(state.canDebugEffect)
        },

        changeExportDebugEffectStatus(state) {
            state.canDebugExportEffect = !state.canDebugExportEffect
            ShareObjectModel.instance().setCanDebugExportEffect(state.canDebugExportEffect)
        },

        changeFacePointStatus(state) {
            state.isEnableFacePoint = !state.isEnableFacePoint
            ShareObjectModel.instance().setIsEnableFacePoint(state.isEnableFacePoint)
        },

        changeSkeletonPointStatus(state) {
            state.isEnableSkeletonPoint = !state.isEnableSkeletonPoint
            ShareObjectModel.instance().setIsEnableSkeletonPoint(state.isEnableSkeletonPoint)
        },

        changeRemoveResolutionLimitMode(state) {
            state.removeResolutionLimit = !state.removeResolutionLimit
            ShareObjectModel.instance().setRemoveResolutionLimit(state.removeResolutionLimit)
        },

        changeFaceIsBlackStatus(state) {
            state.isEnableCheckFaceIsBlack = !state.isEnableCheckFaceIsBlack
            ShareObjectModel.instance().setIsEnableCheckFaceIsBlack(state.isEnableCheckFaceIsBlack)
        },

        changePreviewCacheStatus(state, bool) {
            state.previewCacheStatus = typeof bool === 'boolean' ? bool : !state.previewCacheStatus
            locs.set(PREVIEW_CACHE_SWITCH, state.previewCacheStatus)
            ShareObjectModel.instance().setPreviewCacheStatus(state.previewCacheStatus)
        },

        changeEnableOpenCLStatus(state, bool) {
            state.enableOpenCL = typeof bool === 'boolean' ? bool : !state.enableOpenCL
            insertToDictionary(ENABLE_OPENCL_ID, state.enableOpenCL)
        },

        changeEnableOpenGLStatus(state, bool) {
            state.enableOpenGL = typeof bool === 'boolean' ? bool : !state.enableOpenGL
            locs.set(ENABLE_OPENGL_ID, state.enableOpenGL)
        },

        changeExportTaskNumber(state, number) {
            state.exportTaskConfig.defaultNumber = number
            insertToDictionary(EXPORT_TASK_NUMBER, number)
            ShareObjectModel.instance().setDefaultExportTaskNumber(number)
        },

        _SetPreviewAreaValue(state, value) {
            state.previewAreaValue = value
        },
        _SetDiskWarnCondition(state, { minWorkSpaceFreeCapacity, minSystemDiskFreeCapacity }) {
            state.diskWarnCondition = {
                minWorkSpaceFreeCapacity: minWorkSpaceFreeCapacity,
                minSystemDiskFreeCapacity: minSystemDiskFreeCapacity
            }
            localStorage.setItem(WORKSPACE_DISK_MIN_CAPACITY, `${minWorkSpaceFreeCapacity}`)
            localStorage.setItem(SYSTEM_DISK_MIN_CAPACITY, `${minSystemDiskFreeCapacity}`)
        },
        _SetSendGtagNumber(state, { number }) {
            state.sendGtagNumber = {
                number: number,
            }
            localStorage.setItem(SEND_GTAG_NUMBER, `${number}`)
        },
        _SetIsShowNoviceGuide(state, flag) {
            state.isShowNoviceGuide = flag
        },
        _SetGuideStep(state, step) {
            state.guideStep = step
        },
        setOpenglAttribute(state,attribute){
            state.gpuAttribute = attribute
        },
        setExportJFPFormatVal(state, val) {
            state.exportJPGFormatVal = val
            insertToDictionary(EXPORT_JPG_LEVEL, val)
        },

        _SetEnableOpenGLType(state, val) {
            state.enableOpenGLType = val
        },
        setDefaultOpenglAttribute(state, attribute) {
            state.defaultGpuAttribute = attribute
        },
        changeExportLogStatus(state, canPrintExportLog) {
            ShareObjectModel.instance().setCanPrintExportLog(canPrintExportLog)
        }
    },
    actions: {
        async readOpenglAttribute({ state, commit, dispatch }){

            const defaultRes = await  Pixcookengine.getDefaultOpenGlAttribute()
            if (defaultRes) {
                commit('setDefaultOpenglAttribute', defaultRes)
            } else {
                commit('setDefaultOpenglAttribute', OpenGLAttribute.UseSoftwareOpenGL)
            }

            const res = await Pixcookengine.getOpenGlAttribute()
            if (res){
                commit('setOpenglAttribute',res)
            }else{
                commit('setOpenglAttribute',OpenGLAttribute.UseOpenGLES)
            }
        },

        async initPixCookEnableOpenGLType({ commit }){
            try {
                const res = await Pixcookengine.getEnableOpenGLType()
                commit('_SetEnableOpenGLType', res)
            } catch (e) {
                console.error(e)
            }
        },

        async saveOpenglAttribute({ state, commit, dispatch },value){
            commit('setOpenglAttribute',value)
            await insertToDictionary(OPENGL_ATTRIBUTE_KEY,value)
        },
        /**
         * 写入第一次导出时的标识
         * @param state
         * @param commit
         * @param dispatch
         * @returns {Promise<void>}
         */
        async saveFirstExportFlag({ state, commit, dispatch }) {
            let key = `${FIRST_EXPORT_TIME_INVITE}`
            let result = await DBIpcRender.insertToDB(DICTIONARY_TABLE, {
                keyword: key,
                value: '1'
            })
            console.log('saveFirstExportFlag,result', result)
        },

        async isNotFirstExportInvite() { // 不是首次导出
            try {
                let ret = await findFromDictionary(`${FIRST_EXPORT_TIME_INVITE}`)
                if (!ret) {
                    return false
                }
                let { keyword, value } = ret
                if (value === '1') {
                    return true
                }
            } catch (e) {
                return false
            }
            return false

        },
        async isNotFirstTimeInvite() { // 不是首次邀请
            try {
                let ret = await findFromDictionary(`${FIRST_TIME_INVITE}`)
                if (!ret) {
                    return false
                }
                let { keyword, value } = ret
                if (value === '1') {
                    return true
                }
            } catch (e) {
                return false
            }
            return false
        },
        // 要和userId一起关联起来，保存邀请是否首次的标记
        async saveInvitedFlag() {
            let key = `${FIRST_TIME_INVITE}`
            let result = await DBIpcRender.insertToDB(DICTIONARY_TABLE, {
                keyword: key,
                value: '1'
            })
            console.log('saveInvitedFlag,result', result)
        },
        async readPhotoShopPath({ state, commit, dispatch }){
            const ret = await findFromDictionary('photoShopPath')
            if (ret)
            commit('_SetPhotoshopPath', ret.value)
        },
    }
}
