import Vue from 'vue'
// @ts-ignore
import { aspectScaleToFitSize, getClientHeight, getClientWidth } from '@/utils/utils.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

// @ts-ignore
import { findAll } from '@/universal/datastore/configDao'
import ConfigModel from '@/model/ConfigModel'

import {
    initExportTaskConfig, initOpenCLStatus
} from '@/utils/initGpuStatus'
import { app as APP } from '@/qt-ipc/app'
import path from '@/qt-ipc/path'
import {CLIENT_NAME} from "@/universal/types/config";

const kDiskMinUnit = 1//g计算
const kSystemDiskMinUnit = 0.5//0.5//g计算
export default Vue.extend({
    mixins: [],//[toast, pointsMixin],

    computed: {
        ...mapGetters([
            'userId'
        ]),
        ...mapGetters('config', [
            'diskWarnCondition'
        ]),
        // user() {
        //     return store.state.user
        // },
        //
        // enableOpenGL() {
        //     return store.getters['config/enableOpenGL']
        // },
        //
        // qrcEnableDebug() {
        //     return store.getters['config/qrcEnableDebug']
        // }
    },

    created() {
        // @ts-ignore
        // TSQrc.tsqrc__setIsProduction(process.env.VUE_APP_ENV === 'pro')
        // TSQrc.tsqrc__setEnableOpenGL(this.enableOpenGL)
        // TSQrc.tsqrc__setIsFixAVXError(getIsEnableFixAVXError())
        // TSQrc.tsqrc__setEnableQRCDebug(this.qrcEnableDebug)
        // TSQrc.tsqrc__setAppRootPath(tsFilePathUtils.getAppRootPath())
    },

    mounted() {
        // @ts-ignore
        this.initGlobalConfig().then(_ => {
        })
        // @ts-ignore
        this.listenMemberVipEvent()
        // @ts-ignore
        this.preventGlobalKeydownSpaceEvent()
        // @ts-ignore
        // this.PointClientClose()
    },

    methods: {
        ...mapMutations('config', [
            'initConfig',
            'initExportTaskConfig',
            'initEnableOpenCL'
        ]),

        ...mapActions('config', [
            'initPixCookEnableOpenGLType'
        ]),

        // ...mapMutations(['_SetShowPaySuccess']),
        ...mapActions([
            'asyncLoadServiceInfo',
            'loadVipInfo',
            'asyncOnPaySuccess',
        ]),
        // handleQrcEngineError() {
        //     let fixLib = new FixLostLibrary()
        //     let hasLostFiles = fixLib.hasLostFiles()
        //     let notifyReboot = () => {
        //         this.tsConfirm({
        //             title: '系统提示',
        //             message: '安装成功了，点击确认重新启动',
        //             showCancelButton: false,
        //         }).then(() => {
        //             this.$appRestart()
        //         })
        //     }
        //     let fixLostLibraryFunc = async () => {
        //         await fixLib.repair()
        //     }
        //
        //     let handleProcess = (err: Error) => {
        //         if (this.$isWin) { // 是windows才处理
        //
        //             this.$tsStat.event('cake_error', {
        //                 cake_operate: `engineError:${err}`
        //             })
        //
        //             // if (err){// 显卡驱动不支持
        //             //     const code = (err as any).code || null
        //             //     const sCode = '1073741795'
        //             //     const intCode = 0xc000001d
        //             //     let isAvxError = code === intCode || err.name.indexOf(sCode) >= 0 || err.message.indexOf(sCode) >= 0
        //             //     if (isAvxError){
        //             //         this.tsConfirm({
        //             //             title: '系统提示',
        //             //             message: '初始化失败，此设备的CPU不支持本软件',
        //             //             showCancelButton: false
        //             //         }).then((_: any) => {
        //             //             this.$appQuit()
        //             //         }).catch(()=>{
        //             //             this.$appQuit()
        //             //         })
        //             //         return
        //             //     }
        //             // }
        //             this.tsConfirm({
        //                 title: '系统提示',
        //                 message: '加载底层的引擎库出现异常，是否要进行手动修复?',
        //                 showCancelButton: true,
        //                 cancelButtonText: '退出'
        //             }).then((_: any) => {
        //
        //                 // 進入修復，如果不支持avx，那麽就設置avx fix標志位
        //                 const isSupportAVX = initCPUFeatureAVXStatus()
        //                 if (!isSupportAVX) {
        //                     locs.set(FIX_CPU_FEATURE_UN_SUPPORT_AVX_ID, true)
        //                 }
        //
        //                 // 点击第一次修复失败后，第二次确认按钮修复，使用fix avx模式去加载底层库
        //                 let fixedCount = getFixedLoadQRCNodeFailedCount()
        //                 fixedCount ++
        //                 if (fixedCount >= 2) {
        //                     locs.set(FIX_CPU_FEATURE_UN_SUPPORT_AVX_ID, true)
        //                 } else {
        //                     locs.set(FIX_LOAD_QRC_NODE_FAILED_COUNT, fixedCount)
        //                 }
        //
        //                 let spawn = require('child_process').spawn;
        //                 let vcRedistExe = joinResourcesPath('rutimeLib/VC_redist.x64.exe')
        //                 let loadingInstance = Loading.service({
        //                     background: 'transparent'
        //                 });
        //                 let p = spawn(vcRedistExe, ['/q', '/norestart'])
        //                 p.on('close', async (code: number, signal: string) => {
        //                     loadingInstance.close()
        //                     if (code === 0) {
        //                         if (hasLostFiles) {
        //                             try {
        //                                 await fixLostLibraryFunc()
        //                                 notifyReboot()
        //                             } catch (e) {
        //                                 this.$appQuit()
        //                             }
        //                         } else {
        //                             notifyReboot()
        //                         }
        //                     } else {
        //                         this.$appQuit()
        //                     }
        //                 })
        //             }).catch(() => {
        //                 this.$appQuit()
        //             })
        //         }
        //     }
        //     let handleEngineSuccess = () => {
        //         if (hasLostFiles && this.$isWin) {
        //
        //             this.$tsStat.event('cake_error', {
        //                 cake_operate: `engineError:本地文件库不存在`
        //             })
        //
        //
        //             this.tsConfirm({
        //                 title: '系统提示',
        //                 message: '加载底层的引擎库出现异常，是否要进行手动修复?',
        //                 showCancelButton: true,
        //                 cancelButtonText: '退出'
        //             }).then(async (_: any) => {
        //                 try {
        //                     await fixLib.repair()
        //                     notifyReboot()
        //                 } catch (e) {
        //                     this.$appQuit()
        //                 }
        //             }).catch((e) => {
        //                 this.$appQuit()
        //             })
        //         }
        //     }
        //     TSImageIOManager.shareInstance().setErrorHandler((err: Error) => {
        //         handleProcess(err)
        //     })
        //     TSQrc.setErrorHandle((err: Error) => {
        //         handleProcess(err)
        //     })
        //     TSImageIOManager.shareInstance().setSuccessHandler(handleEngineSuccess)
        //     TSQrc.setSuccessHandle(handleEngineSuccess)
        // },
        getFitSingleColumnSize(): {
            width: number,
            height: number
            } {
            let width = getClientWidth() - 300 - 204
            let height = getClientHeight() - 60
            return aspectScaleToFitSize(width, height, 1, 1)
        },

        async getUserInfo() {
            try {
                await this.loadVipInfo()
            } catch (err) {
                console.log(err)
            }
        },

        async initGlobalConfig() {
            let json = await findAll()
            let config = ConfigModel.create(json)
            // @ts-ignore
            await this.initConfig(config)
            let exportTaskConfig = await initExportTaskConfig()
            this.initExportTaskConfig(exportTaskConfig)

            let enableOpenCl = await initOpenCLStatus();
            this.initEnableOpenCL(enableOpenCl);

            await this.initPixCookEnableOpenGLType()

            let isOnline = await window.$net.isOnline()
            if (isOnline) {
                this.asyncLoadServiceInfo()
            }
        },
        listenMemberVipEvent(): void {
            // ipcRenderer.on(kBroadCastWinEventString(WinType.MemberVipPlan, 'purchase-success'),
            //     (event, msg) => { // msg 为WinIPCMessage对象类型
            //         console.log(`待处理具体业务,收到了，来自订阅成功的消息:${JSON.stringify(msg)}`)
            //         ipcRenderer.send('custom-close', null)
            //         // 显示支付成功弹框
            //         this._SetShowPaySuccess(true)
            //         this.asyncOnPaySuccess()
            //         // 页面数据更新
            //         this.getUserInfo()
            //
            //     })
            // ipcRenderer.on(kBroadCastWinEventString(WinType.MemberVipPlan, 'onClose'),
            //     (event, msg) => { // msg 为WinIPCMessage对象类型
            //         console.log(`待处理具体业务,${WinType.MemberVipPlan}的窗口关闭了`)
            //     })
        },

        /**
         * 拦截空格快捷事件
         */
        preventGlobalKeydownSpaceEvent() {
            document.body.onkeydown = function (event) {
                if (event.code === 'Space') {
                    // @ts-ignore
                    if (['TEXTAREA', 'INPUT'].includes(event.target.nodeName) || event.target.contentEditable === 'true') return
                    const e = window.event || event
                    if (e.preventDefault) {
                        e.preventDefault()
                    } else {
                        // @ts-ignore
                        window.event.returnValue = false
                    }
                }

            }
        },
        getWorkSpaceDiskRoot(): string {
            // let spacePath = WorkspaceUtil.getInstance().workspacePath
            return ''//spacePath
        },
        isInSystemDisk(filePath: string): boolean {
            // let isSystem = false
            // let rootDisk = path.parse(filePath).root.toUpperCase()
            // let systemPath = (process.env.SystemRoot || process.env.windir || process.env.SystemDrive) || 'C:\\'
            // systemPath = systemPath.toUpperCase()
            // isSystem = systemPath.startsWith(rootDisk)
            // return isSystem
            return false
        },

        getSystemDiskRootPath() {
            // let systemPath = ""
            //  if(this.$isWin){
            //      systemPath = (process.env.SystemRoot || process.env.windir || process.env.SystemDrive) || 'C:\\'
            //  }
            //  const rootDisk = path.parse(systemPath).root.toUpperCase()
            //  return rootDisk
            return null
        },
        /*
            返回值是
         */
        getDiskFreeSpaceAsShort(diskInfo: {
            available: number
        }): number {
            let avaliableNums = 0
            if (this.$isWin) {
                avaliableNums = diskInfo.available / 1024 / 1024 / 1024
            } else {
                avaliableNums = diskInfo.available / 1000 / 1000 / 1000  //g的容量 (按制造商的来看)
            }
            return avaliableNums
        },
        /*
            返回值:true，磁盘不足，
            false，磁盘足够
         */
        async checkDiskSpaceIfNeed(onConfirm: () => void): Promise<boolean> {
            let needTip = false

            const diskMinUnit = this.diskWarnCondition.minWorkSpaceFreeCapacity// 20
            const systemDiskMinUnit = this.diskWarnCondition.minSystemDiskFreeCapacity// 10
            console.log(`checkDiskSpaceIfNeed，最小工作空间:${diskMinUnit}g,最小系统盘:${systemDiskMinUnit}g`)

            // 获得工作空间路径
            let workSpacePath = await APP.getWorkSpacePath()
            let workSpaceRootPath = (await path.parse(workSpacePath)).root.toUpperCase()

            let DiskInfo
            if (this.$isWin) {
                //工作空间盘大小
                const workSpaceDiskInfo = await APP.getDiskSize(workSpaceRootPath + ':')

                //系统盘大小
                let systemPath = await APP.getWindowSystemDisk()
                let systemRootPath = (await path.parse(systemPath)).root.toUpperCase()
                let systemDiskInfo = await APP.getDiskSize(systemRootPath + ':')

                if (workSpaceDiskInfo.isValid && systemDiskInfo.isValid) {
                    DiskInfo = workSpaceDiskInfo.available <= systemDiskInfo.available ? workSpaceDiskInfo : systemDiskInfo
                } else if (workSpaceDiskInfo.isValid) {
                    DiskInfo = workSpaceDiskInfo
                } else if (systemDiskInfo.isValid) {
                    DiskInfo = systemDiskInfo
                }
            } else {
                DiskInfo = await APP.getDiskSize(workSpaceRootPath)
            }
            if (DiskInfo && DiskInfo.isValid) {
                // mac 是按512byte来归单元
                let avaliableNums = this.getDiskFreeSpaceAsShort(DiskInfo as any)
                console.log(`获得当前的${DiskInfo.diskPath}:磁盘容量为:${avaliableNums}`)
                needTip = avaliableNums < systemDiskMinUnit //10g

                if (needTip) {
                    this.tsConfirm({
                        title: '系统提示',
                        message: `检测到您的磁盘空间不足，建议您清理磁盘空间后再继续使用${CLIENT_NAME}`,
                        showCancelButton: false
                    }).then(async (_: any) => {
                        if (onConfirm) {
                            onConfirm()
                        }
                    }).catch((e) => {
                    })
                }
            }
            return needTip
        },

        /*
            检查目录是否小于XXX空间
         */
        async checkFreeDiskSpaceIsEnough(strFilePath: string, bytesCapacity: number): Promise<boolean> {
            // const diskRet = await diskusageCheckDisk(strFilePath)
            // let freeBytes = diskRet.available
            // let ret = freeBytes > bytesCapacity
            return true//ret
        }
    }
})
