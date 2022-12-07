<template>
    <div>
        <el-popover
            content=""
            width="220"
            trigger="click"
            placement="bottom"
            transition="el-zoom-in-bottom"
            popper-class="is-dark user-operation-popover"
            :visible-arrow="false">
            <div class="user" slot="reference">
                <slot></slot>
            </div>

            <div class="debug-info">
                <ul class="operation-menu">
                    <el-divider class="divider"></el-divider>
                    <li class="menu-item">
                        <div class="label">控制台显示追踪对象</div>
                        <div class="btn">
                            <el-button @click="onPrintMemoryTrackClick">点击</el-button>
                        </div>
                    </li>
                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <el-button
                            size="mini"
                            type="text"
                            @click="openWorkspace('work')">
                            工作空间路径
                        </el-button>

                        <el-divider class="divider" direction="vertical"></el-divider>

                        <div class="btn">
                            <el-button
                                size="mini"
                                type="text"
                                @click="openWorkspace('user')">
                                用户数据路径
                            </el-button>
                        </div>
                    </li>

                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <div class="label">预览效果调试</div>
                        <div class="btn">
                            <el-switch :value="canDebugEffect" @click.native="onDebugEffectEnvSwitch"></el-switch>
                        </div>
                    </li>

                    <li class="menu-item">
                        <div class="label">导出效果调试</div>
                        <div class="btn">
                            <el-switch :value="canDebugExportEffect" @click.native="onDebugExportEffectEnvSwitch"></el-switch>
                        </div>
                    </li>

                    <li class="menu-item">
                        <div class="label">人脸点开关</div>
                        <div class="btn">
                            <el-switch :value="isEnableFacePoint" @click.native="onFacePointSwitch"></el-switch>
                        </div>
                    </li>

                    <li class="menu-item">
                        <div class="label">骨骼点开关</div>
                        <div class="btn">
                            <el-switch :value="isEnableSkeletonPoint" @click.native="onSkeletonPointSwitch"></el-switch>
                        </div>
                    </li>

                    <li class="menu-item">
                        <div class="label">校验脸部黑块开关</div>
                        <div class="btn">
                            <el-switch :value="isEnableCheckFaceIsBlack" @click.native="onCheckFaceIsBlackSwitch"></el-switch>
                        </div>
                    </li>


                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <div class="label">去除精修分辨率限制</div>
                        <div class="btn">
                            <el-switch :value="removeResolutionLimit"
                                       @click.native="onRemoveResolutionLimitSwitch"></el-switch>
                        </div>
                    </li>
                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <div class="label">主进程崩溃test</div>
                        <el-button @click="onCrashTestClick">点击奔溃</el-button>
                    </li>
                    <li class="menu-item">
                        <div class="label">主进程崩溃上报</div>
                        <el-button @click="onReportCrashClick">点击上报</el-button>
                    </li>
                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <div class="label">导出进程崩溃test</div>
                        <el-button @click="onExportCrashTestClick">点击奔溃</el-button>
                    </li>
                    <el-divider class="divider"></el-divider>

                    <li class="menu-item">
                        <div class="label">预览缓存开关</div>
                        <div class="btn">
                            <el-switch :value="previewCacheStatus"
                                       @click.native="onPreviewCacheSwitch"></el-switch>
                        </div>
                    </li>
                    <li class="menu-item">
                        <div class="label">工作台导入不进入二级页面</div>
                        <div class="btn">
                            <el-switch :value="importNoNavigate"
                                       @click.native="onImportNoNavigate"></el-switch>
                        </div>
                    </li>
                    <el-divider class="divider"></el-divider>
                    <li class="menu-item">
                        <div class="label">工作空间最小容量</div>
                        <el-input type="number" v-model="diskWarnCondition.minWorkSpaceFreeCapacity"
                                  @change="_SetDiskWarnCondition(diskWarnCondition)"
                                  :style="{width:'100px',height:'20px'}"></el-input>
                    </li>
                    <li class="menu-item">
                        <div class="label">系统盘最小容量</div>
                        <el-input type="number" v-model="diskWarnCondition.minSystemDiskFreeCapacity"
                                  @change="_SetDiskWarnCondition(diskWarnCondition)"
                                  :style="{width:'100px',height:'20px'}"></el-input>
                    </li>
                    <li class="menu-item" style="margin-top: 10px">
                      <div class="label">Ga上报</div>
                      <el-input type="number" v-model="sendGtagNumber.number"
                                @change="_SetSendGtagNumber(sendGtagNumber)"
                                :style="{width:'70px',height:'20px'}"></el-input>
                      <el-button @click="updateCacheMessageCount">确认</el-button>
                    </li>
                    <el-divider class="divider"></el-divider>
                    <li class="menu-item">
                        ...
                    </li>
                    <el-divider class="divider"></el-divider>
                    <li class="menu-item">
                        <div class="label">查看GPU配置</div>
                        <el-button @click="onViewGpuClick">点击查看</el-button>
                    </li>
                    <el-divider class="divider"></el-divider>
                    <li class="menu-item">
                        <div class="label">查看CPU型号</div>
                        <el-button @click="onGetCpuInfoClick">点击查看</el-button>
                    </li>
                    <li class="menu-item">
                      <div class="label">导出数据输出</div>
                      <div class="btn">
                        <el-switch :value="canPrintExportLog"
                                   @click.native="onExportLogSwitch"></el-switch>
                      </div>
                    </li>

                    <li class="menu-item">
                        <div class="label">批量导出</div>
                        <div class="btn">
                            <el-input type="test" v-model="batchExportPath"
                                      :style="{width:'100px',height:'20px'}"></el-input>
                            <el-button @click="onBatchExportClick">执行</el-button>
                        </div>
                    </li>
                </ul>
            </div>

        </el-popover>
    </div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Popover, Divider, Switch, Select, Option } from 'element-ui'
import { debounce } from 'lodash'
import toast from '@/mixins/toast'
import { openItemInFolder } from '@/utils/findLocalPath'
import { WorkspaceUtil } from '@/qt-ipc/WorkspaceUtil'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import {app as APP} from '@/qt-ipc/app'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import NodeApi from '@/qt-ipc/node-api'
export default {
    mixins: [toast],
    components: {
        'el-popover': Popover,
        'el-divider': Divider,
        'el-switch': Switch,
        'el-select': Select,
        'el-option': Option
    },
    props: {},
    data() {
        return {
          canPrintExportLog: false,
          batchExportPath: ''
        }
    },

    computed: {
        ...mapGetters('config', [
            'canDebugEffect',
            'canDebugExportEffect',
            'isEnableFacePoint',
            'isEnableSkeletonPoint',
            'isEnableCheckFaceIsBlack',
            'removeResolutionLimit',
            'previewAreaValue',
            'previewAreaSizeList',
            'previewCacheStatus',
            'diskWarnCondition',
            'importNoNavigate',
            'sendGtagNumber'
        ])
    },
    methods: {
        ...mapMutations('config', [
            'changeDebugEffectStatus',
            'changeExportDebugEffectStatus',
            'changeFacePointStatus',
            'changeSkeletonPointStatus',
            'changeFaceIsBlackStatus',
            'changeRemoveResolutionLimitMode',
            '_SetPreviewAreaValue',
            'changePreviewCacheStatus',
            '_SetDiskWarnCondition',
            'updateConfig',
            'changeImportNoNavigate',
            '_SetSendGtagNumber',
            'changeExportLogStatus'
        ]),
        ...mapActions(['asyncPrintExportInfo']),
        onPrintMemoryTrackClick() {
            MemoryMonitor.shareInstance().print()
        },
        onDebugEffectEnvSwitch: debounce(function () {
            this.changeDebugEffectStatus()
            let canDebugEffect = this.canDebugEffect
            const message = canDebugEffect ? '预览debug 模式已经开启～' : '预览debug 模式已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),

        onDebugExportEffectEnvSwitch: debounce(function () {
            this.changeExportDebugEffectStatus()
            let canDebugExportEffect = this.canDebugExportEffect
            const message = canDebugExportEffect ? '导出debug 模式已经开启～' : '导出debug 模式已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),


        onFacePointSwitch: debounce(function () {
            this.changeFacePointStatus()
            let isEnableFacePoint = this.isEnableFacePoint
            const message = isEnableFacePoint ? '人脸点已经打开～' : '人脸点已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),

        onSkeletonPointSwitch: debounce(function () {
            this.changeSkeletonPointStatus()
            let isEnableSkeletonPoint = this.isEnableSkeletonPoint
            const message = isEnableSkeletonPoint ? '骨骼点已经打开～' : '骨骼点已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),

        onCheckFaceIsBlackSwitch: debounce(function () {
            this.changeFaceIsBlackStatus()
            let isEnableCheckFaceIsBlack = this.isEnableCheckFaceIsBlack
            const message = isEnableCheckFaceIsBlack ? '校验脸部黑块已经打开～' : '校验脸部黑块已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),

        onRemoveResolutionLimitSwitch: debounce(function () {
            this.changeRemoveResolutionLimitMode()
            let removeResolutionLimit = this.removeResolutionLimit
            const message = removeResolutionLimit ? '去除分辨率限制预计打开～' : '去除分辨率限制已经关闭～'
            this.tsNotify({
                type: 'success',
                message
            })
        }, 300),

        onImportNoNavigate: debounce(function () {
            this.changeImportNoNavigate()
        }, 300),
        onPreviewCacheSwitch: debounce(function () {
            this.changePreviewCacheStatus()

        }, 300),
        printExportInfo: debounce(function () {
            this.asyncPrintExportInfo()
        }, 500),
        onExportLogSwitch: debounce(function () {
            this.canPrintExportLog = !this.canPrintExportLog
            this.changeExportLogStatus(this.canPrintExportLog)
        }, 500),

        onBatchExportClick: debounce(function () {
            NodeApi.getExport().onBatchExportClick(this.batchExportPath)
        }, 500),

        openWorkspace: debounce(async function (type) {
            if (type === 'work') {
                const path = await APP.getWorkSpacePath()
                console.log('Workspace: ', path)
                await openItemInFolder(path)
            } else if (type === 'user') {
                const path = await APP.getPath('userData')
                console.log('userData: ', path)
                await openItemInFolder(path)
            }
        }, 500),

        onViewGpuClick(){
            ipcRenderer.send("on-show-webgpu")
        },

        onCrashTestClick(){
            ipcRenderer.send("on-crash-test")
        },

        onExportCrashTestClick(){
            NodeApi.getExport().asyncTestCrash()
        },
        onReportCrashClick(){
            NodeApi.getExport().asyncReportCrash()
        },
        async onGetCpuInfoClick(){
            let cpuObj = await APP.getCpuInfo()
            console.log("cpuObj originCpuName: ", cpuObj.originCpuName)
            console.log("cpuObj cpuName: ", cpuObj.cpuName)
        },
        async updateCacheMessageCount() {
            await ipcRenderer.send("update_cacheMessage_count", { count: Number(this.sendGtagNumber.number) })
        }
    }
}
</script>

<style lang="scss" scoped>
.debug-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    .operation-menu {
        width: 100%;
        flex: 1;

        .menu-item {
            position: relative;
            height: 30px;
            line-height: 30px;
            width: 100%;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }

        .divider {
            margin: 10px 0 5px;
        }
    }
}
</style>