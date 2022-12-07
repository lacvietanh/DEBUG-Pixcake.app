<template>
    <el-dialog
        top="40vh"
        width="370px"
        align="center"
        title=""
        custom-class="common-dialog import-progress-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <div class="container">
            <div class="info">{{ message }}</div>
            <div class="claProgressItem">
                <el-progress
                    :show-text="false"
                    text-inside
                    :stroke-width="5"
                    :percentage="percentage > 100?100:percentage"
                />

                <el-button
                    v-if="showCancelBtn && canShowCancelBtn"
                    icon="el-icon-close"
                    class="claCloseBtn"
                    @click="onCancelClick">
                </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>

import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import toast from '@/mixins/toast'
import { ImportProgressStatus } from '@/constants'

import { Dialog, Progress } from 'element-ui'
import { delay } from '@/universal/utils/common'
import NodeApi from '@/qt-ipc/node-api'
import TsDialog from '@/components/TsDialog/ts-dialog'
import useHomeItemPointsRepositories from '@/composables/points/useHomeItemPointsRepositories'

const path = NodeApi.path
const process = require('process')

export default defineComponent({
    name: 'import-progress-dialog',
    mixins: [toast],
    components: {
        'el-dialog': TsDialog,
        'el-progress': Progress,

    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: ImportProgressStatus.Start
        },
        data: {
            type: Object,
            default: () => {
            }
        },
        // 导入的文件路径列表
        importFilePaths: {
            type: Array,
            default: () => {
                return []
            }
        },
        showCancelBtn: {
            type: Boolean,
            default: true
        },
        importName:{
            type: String,
            default: ""
        }
    },
    setup() {
        const { PointHomeItem } = useHomeItemPointsRepositories()

        return {
            PointHomeItem
        }
    },
    data() {
        return {
            loading: false,
            visible: this.value,
            loadingTimer: null,
            uploadPercent: 0,
            isCancel: false,
            canShowCancelBtn: true,
            hasImportDbStatus: false
        }
    },
    filters: {},
    computed: {
        ...mapGetters('finishing', []),
        // 计算文本的像素宽度
        ...mapGetters('thumbnail', [
            'cancelImport'
        ]),
        message() {
            let name = this.importName
            const maxTextPixLen = 312
            const strTemplateMsg = '正在导入${n}下选择的图片'
            const strFixMsg = strTemplateMsg.replace('${n}', '')
            const innerMaxTextPixLen = maxTextPixLen - this.calcTextPixLen(strFixMsg)
            const namePixLen = this.calcTextPixLen(name)

            if (name && namePixLen > innerMaxTextPixLen) {
                const nameLen = name.length
                const lastLen = 10
                const strLastTen = name.substr(name.length - lastLen, lastLen)
                const lastTenPixLen = this.calcTextPixLen(strLastTen)
                const aPixLen = namePixLen / nameLen
                let preLen = (innerMaxTextPixLen - aPixLen * 2 - lastTenPixLen)
                let strPrefix = ''
                for (let i = 0; i < nameLen; i++) {
                    strPrefix += name[i]
                    const nextPixLen = this.calcTextPixLen(strPrefix)
                    if (nextPixLen > preLen) {
                        break
                    }
                }
                name = `${strPrefix}...${strLastTen}`
            }
            let strMsg = `正在导入选择的图片`
            if (name) {
                strMsg = strTemplateMsg.replace('${n}', name)
            }
            if (this.status == ImportProgressStatus.ImportingToDB || this.hasImportDbStatus) {
                strMsg = `正在载入数据库，请稍后…`
            }

            return strMsg
        },
        formatMessage(strInput) {
            return strInput
        },
        percentage() {
            const actions = {
                [ImportProgressStatus.Start]: 2,
                [ImportProgressStatus.ImportOver]: 100,
                [ImportProgressStatus.CancelImport]: 19,
                [ImportProgressStatus.ImportEmpty]: 39,
                [ImportProgressStatus.RequestZeroError]: 31
            }

            if (this.status === ImportProgressStatus.Start || this.status === ImportProgressStatus.Importing) {
                const { over, total } = this.data
                if (over === undefined || total === undefined) {
                    return 0
                }
                const per = over / total * 100
                let progress = parseInt(per)

                console.log('per : ', progress, ' status : ', this.status)
                return progress
            }

            if (this.status === ImportProgressStatus.Start) {
                let begin = actions[ImportProgressStatus.Start]
                const { over, total } = this.data
                const per = over / total
                begin += parseInt(40 * per)
                return this.uploadPercent + begin
            } else if (this.status === ImportProgressStatus.RequestZero) {
                return this.uploadPercent + 2
            } else if (this.status === ImportProgressStatus.Importing) {
                const { over, total } = this.data
                const per = over / total
                return 40 + parseInt(60 * per)
            } else {
                return actions[this.status] || 0
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val
            },
            immediate: true
        },
        visible(val) {
            if (!val) {
                this.hasImportDbStatus = false
            }
            this.$emit('input', val)
        },
        status(val) {
            if (val == ImportProgressStatus.ImportingToDB) {
                this.canShowCancelBtn = false
                this.hasImportDbStatus = true
            }
            const closes = [
                ImportProgressStatus.ImportOver,
                ImportProgressStatus.CancelImport,
                ImportProgressStatus.ImportEmpty,
                ImportProgressStatus.ImportRepet,
                ImportProgressStatus.RequestZeroError
            ]
            if (val === ImportProgressStatus.RequestZero) {
                this.autoAddPercentage()
            } else {
                clearTimeout(this.loadingTimer)
                if (closes.includes(val)) {
                    delay(val === ImportProgressStatus.ImportOver ? 300 : 1000).then(() => {
                        this.visible = false
                    })
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        ...mapMutations([]),
        async getInputRootName() {
            console.log(`getInputRootName`, process)
            const strHome = process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH
            const filePaths = this.importFilePaths
            const rootSysDisk = await path.parse(strHome).root.toUpperCase()

            const winSysDefDir = [
                strHome,
                await path.join(rootSysDisk, '/Public')
            ]
            const macSysDefDir = [
                '/Applications',
                '/Users/Shared',
                strHome
            ]

            const groupRootPathByPath = async (inputFilePaths) => {
                const groupMap = new Map()
                for (const inputFilePath of inputFilePaths) {
                    let curSysDefDir = this.$isWin ? winSysDefDir : macSysDefDir
                    let foundKey = null
                    for (const it of curSysDefDir) {
                        if (inputFilePath.startsWith(it)) {
                            foundKey = it
                            break
                        }
                    }
                    if (foundKey) {
                        let foundItem = groupMap.get(foundKey)
                        if (!foundItem) {
                            foundItem = []
                        }
                        foundItem.push(inputFilePath)
                        groupMap.set(foundKey, foundItem)
                    }

                    if (this.$isWin) { // 如果是win,没找到，则可能是其他盘符
                        if (!foundKey) {
                            const rootDisk = await path.parse(inputFilePath).root.toUpperCase()
                            groupMap.set(rootDisk, inputFilePath)
                        }
                    }
                }
                return groupMap
            }

            const filterGroup = groupRootPathByPath(filePaths)
            const groupSize = filterGroup.size
            let name = null
            if (groupSize === 1) { // 找不到特定的约定的目录，则归为others
                name = filterGroup.keys().next().value
                if (name.startsWith(strHome)) { // 是家目录下面的，要区分具体的名称
                    const dstList = filterGroup.get(name)
                    const firstItem = dstList[0]
                    const sep = await path.sep()
                    const fHome = await path.join(strHome, sep)
                    const beginIndex = fHome.length
                    let firstDirPath = fHome
                    for (let i = beginIndex; i < firstItem.length; i++) {
                        const a = firstItem[i]
                        if (a === sep) {
                            break
                        }
                        firstDirPath += a
                    }
                    let isFound = true
                    for (const nextItem of dstList) {
                        if (!nextItem.startsWith(firstDirPath)) {
                            isFound = false
                            break
                        }
                    }
                    name = isFound ? firstDirPath : null
                }
            }
            if (!name) {
                return null
            }
            let retName = await path.basename(name)
            if (!retName || retName.length === 0) {
                retName = name
            }
            return retName
        },
        calcTextPixLen(text) {
            let result = 0

            let ele = document.createElement('span')
            //字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
            //str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
            ele.innerText = text
            //不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
            ele.style.fontSize = '14px'
            ele.style.fontWeight = 'normal'

            //由于父节点的样式会影响子节点，这里可按需添加到指定节点上
            document.documentElement.append(ele)

            result = ele.offsetWidth
            document.documentElement.removeChild(ele)
            return result
        },
        autoAddPercentage() {
            console.log('autoAddPercentage')
            if (this.status === ImportProgressStatus.CancelImport || !this.visible || this.cancelImport) {
                clearTimeout(this.loadingTimer)
                this.loadingTimer = null
                console.log(`kill autoAddPercentage()`)
                return
            }
            if (this.loadingTimer) clearTimeout(this.loadingTimer)
            this.loadingTimer = setTimeout(_ => {
                if (this.status === ImportProgressStatus.CancelImport || !this.visible || this.cancelImport) {
                    clearTimeout(this.loadingTimer)
                    this.loadingTimer = null
                    console.log(`kill autoAddPercentage()`)
                    return
                }
                if (this.uploadPercent < 38) {
                    this.uploadPercent += 1
                    this.autoAddPercentage()
                }
            }, 100)
        },
        onCancelClick() {
            this.PointHomeItem("import_close")
            this.$emit('onCancelled', null)
        }
    }
})
</script>

<style lang="scss">
.import-progress-dialog {
    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        padding: 40px 28px !important;
    }
}
</style>

<style lang="scss" scoped>
.import-progress-dialog {
    /deep/ {
        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding: 40px 28px;
        }
    }

    .container {
        text-align: left;
        color: #D9D9D9;

        .info {
            margin-bottom: 8px;
        }

        .claProgressItem {
            display: flex;
            flex-direction: row;
            align-items: center;

            .claCloseBtn {
                background: #4E4E4E;
                width: 18px;
                height: 18px;
                border-radius: 9px;
                padding: 0px;
                flex-shrink: 1;
            }

            /deep/ .el-progress {
                flex: 1;
                margin-right: 12px;
                font-size: 14px;
            }
        }
    }
}

</style>
