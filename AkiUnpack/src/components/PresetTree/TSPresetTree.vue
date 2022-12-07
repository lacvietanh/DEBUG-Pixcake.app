<template>
    <div class="presetTreeCla global__scroll-style scroller-box" :style="{height:height}">
        <TsTree
            v-show="isTreeDataLoadSuccess"
            ref="tsTree"
            :treeData="treeData"
            :strictlyRlx="true"
            :currentNodeId="currentNodeId"
            :defaultExpandedKeys="preset_defaultExpend_keys"
            :allow-drag="handleAllowDrag"
            :allow-drop="handleAllowDrop"
            @click-parentNode="handleClickParent"
            @click-childNode="handleClickChild"
            @click-shift-parentNode="handleClickShiftParent"
            @click-shift-childNode="handleClickShiftChild"
            @click-right-parentNode="handleClickRightParent"
            @click-right-childNode="handleClickRightChild"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            @node-drop="handleNodeDrop"
        >
        </TsTree>
        <renameProjectDialog
            :value="showRenameDialog"
            @onClose="showRenameDialog = false"
            :text="inputRenameText"
            :maxLength="presetNameMaxLen"
            @onConfirm="onRenameConfirm"
        >
        </renameProjectDialog>

        <SharePresetTokenDialog
			:bottom-tip-msg="shareWarningTipMsg"
            :is-show="showPresetTokenDialog"
            :content-msg="buildShareToken()"
            @onClose="showPresetTokenDialog = false"
            v-if="sharedItem.sharedToken">
        </SharePresetTokenDialog>

        <!--预设未加载出来时，出现-->
        <div v-show="!isTreeDataLoadSuccess">
            <el-button @click="reloadPresetData"
                       class="reloadBtn"
                       icon="el-icon-refresh-left">
              重新载入
            </el-button>
        </div>

    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SharePresetTokenDialog from '@/views/PhotoFinishing/Components/SharePresetTokenDialog'
import { Loading } from 'element-ui'
import toast from '@/mixins/toast'
import TsTree from '@/components/TsTree/index'
import Menu from '@/qt-ipc/utils/menu'
import {
    deletePresetClassByApi,
    updatePresetClassByApi,
    batchSharePresetByApi,
    updatePresetName,
    getSharePresetToken,
    updatePresetClassOrder,
    updatePresetItemOrder
} from '@/api/settingApi'
import renameProjectDialog from '@/views/Home/components/renameProjectDialog'
import PresetSuitManager from '@/utils/preset/PresetSuitManager'
import importIdPhotoMaterialRpc from '@/qt-ipc/business/import-idphoto-material'


export default {
    name: 'TSPresetTree',
    components: { TsTree, renameProjectDialog, SharePresetTokenDialog },
    mixins: [toast],
    props: {
        height: {
            type: String,
            value: '0px'
        }
    },
    data() {
        return {
			shareWarningTipMsg:"",
            selectedNode: [],
            showRenameDialog: false,
            inputRenameText: null,
            renameType: 0, // 0:presetClass 1:presetItem
            inputRenameClass: null,
            sharedItem: {
                sharedToken: null,
                sharedName: null,
                sharedNum: 0
            },
            currentNodeId: -1,     //当前选中的节点
            showPresetTokenDialog: false,
            timer: null,
            presetNameMaxLen: 20 // 预设名称最长的长度
        }
    },
    computed: {
        ...mapGetters([
            'userId',
            'preset_defaultExpend_keys',
            'isLoadPresetSuccess'
        ]),
        treeData() {
            return JSON.parse(JSON.stringify(this.$store.getters.presetTree))
        },
        isHasPresetClass() { //预设分类
            let presetClass = this.$store.getters.getPreClass
            return presetClass && presetClass.length > 0
        },
        isHasPresetItem() { //预设子类
            let presetItem = this.$store.getters.getPreItems //预设子类
            return presetItem && presetItem.length > 0
        },
        isHasTreeData() {
            return this.treeData && this.treeData.length > 0
        },
        isTreeDataLoadSuccess() { //预设树数据是否加载成功
            if (this.isHasPresetClass && this.isLoadPresetSuccess && this.isHasTreeData) {
                return true
            } else {
                console.log("[TsPresetTree] isHasPresetClass: ", this.isHasPresetClass)
                console.log("[TsPresetTree] isHasTreeData: ",this.isHasTreeData)
                console.log("[TsPresetTree] isHasPresetItem: ",this.isHasPresetItem)
                return false
            }

        },
    },
    watch: {},
    async mounted() {
        let isExpandFirstPhoto = this.$store.getters.isExpandFirstPhoto
        if (isExpandFirstPhoto) {
            this.$store.commit('setIsExpandFirstPhoto', false)
            setTimeout(()=> {
                this.addExpandNode()
            },600)
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    },
    methods: {
        ...mapMutations(['setSelectPreset']),
        ...mapActions([
            'deletePreset',
            'batchDeletePresetStore',
            'getPresetClass',
            'loadPresetsFromDb',
            'loadAllPresents'
        ]),
        ...mapActions('presetSuit', [
            'ACT_UpdatePresetSuit',
            'ACT_BatchUpdatePresetSuit'
        ]),
        reloadPresetData() {
            if (!this.isHasPresetClass) {
                this.$store.dispatch('getPresetClass')
                console.log('[TsPresetTree] reload presetClass')
            }
            if (!this.isHasTreeData || !this.isHasPresetItem) {
                let userId = this.$store.state.user.userId
                this.$store.dispatch('loadAllPresents', { userId, loadDb: true })
                console.log('[TsPresetTree] reload presetItem')
            }
        },

        /**
         * 节点展开，记录到默认展开数组
         */
        nodeExpand(args) {
            this.$store.commit('addPresetDefaultExpendKeys', args.id)
        },

        /**
         * 节点收起，从默认展开数组中移除
         */
        nodeCollapse(args) {
            this.$store.commit('removePresetDefaultExpendKeys', args.id)
        },

        /**
         * 添加展开节点,并设置节点的选中状态
         */
        addExpandNode(val = this.currentNodeId) {
            let expandedId = null
            this.treeData.forEach(item => {
                item.children.forEach(i => {
                    if (val == i.id) {
                        expandedId = item.id
                    }
                })
            })
            this.$store.commit('addPresetDefaultExpendKeys', Number(expandedId))
            this.$refs.tsTree.handleSetCurrentKey(this.currentNodeId)
            // 保存最近一次应用的预设(过滤无效果预设)
            if (val != -1) this.setSelectPreset(val)
        },

        addExpandNodeByPresetId(val) {
            this.$nextTick(_ => {
                this.currentNodeId = val
                this.addExpandNode(this.currentNodeId)
            })
        },

        /**
         * 获取所有预设
         */
        getPresetGather() {
            let content = this.$store.state.presetting.recommendPreItems
            let oriPreset = this.$store.state.presetting.oriPreset
            let myPreItems = this.$store.state.presetting.preItems
            return content.concat(myPreItems).concat(oriPreset)
        },
        handleClickParent(args) {
            this.$refs.tsTree.handleSetCurrentKey(this.currentNodeId)
        },
        handleClickShiftParent(args) {
            this.handleClickParent(args)
        },
        handleClickChild(args) {

            this.selectedNode = []
            //   if(!this.selectedNode.includes(args[0].id)){
            //     this.selectedNode.push(args[0].id)
            //   }

            this.$refs.tsTree.handleSetCheckedNodes('byKey', this.selectedNode, true)
            this.currentNodeId = args[0].id
            this.applyPresetClick(args)
        },
        handleSetCheckedNodes(id) {
            let isHad = false
            this.treeData.forEach((item, index) => {
                item.children.filter((i, idx) => {
                    if (id == i.id) {
                        isHad = true
                    }
                })
            })
            if (isHad) {
                this.$refs.tsTree.handleSetCurrentKey(id)
            } else {
                this.$refs.tsTree.handleSetCurrentKey(null)
            }
            this.currentNodeId = id
        },
        handleClickShiftChild(args) {

            //   this.handleClickChild(args)

            if (args[1].parent.data.type === 1) {
                return false
            }
            if (!this.selectedNode.includes(args[0].id)) {
                this.selectedNode.push(args[0].id)
            }

            this.$refs.tsTree.handleSetCheckedNodes('byKey', this.selectedNode, true)
            this.$refs.tsTree.handleSetCurrentKey(this.currentNodeId)

        },
        handleClickRightParent(args) {
            if (args[1].type === 1) {
                return false
            } else {
                this.presetClassRightClick(args)
            }
        },
        handleClickRightChild(args) {
            if (args[2].parent.data.type === 1) {
                return false
            }
            if (this.selectedNode.length > 1 && this.selectedNode.includes(args[1].id)) {
                this.presetBatchSet(args)
            } else {
                this.presetItemSet(args)
            }
        },

        handleAllowDrag(node) {
            if (node.data.type === 1 || node.data.id === -9999 || node.parent.data.type === 1) {
                console.debug('handleAllowDrag: current node is not allow drag!', node)
                return false
            }
            return true
        },

        handleAllowDrop(...args) {
            if ((args[0].isLeaf && !args[1].isLeaf)
                || (!args[0].isLeaf && !args[1].isLeaf && args[2] === 'inner')
                || !args[0].isLeaf && args[1].isLeaf
                || args[1].data.type === 1
                || args[1].isLeaf && args[2] === 'inner'
                || args[1].parent.data.type === 1) {
                console.debug('handleAllowDrop: current node is not allow drop!', args)
                return false
            }
            return true
        },

        /**
         * 拖拽成功时触发的回调（更新位置/order）
         */
        async handleNodeDrop(...args) {
            this.$refs.tsTree.handleSetCurrentKey(this.currentNodeId)

            // 服务端区分预设分类和预设提供不同接口
            if (!args[0].isLeaf) {
                // 拖拽预设分类
                const json_info_presetClass = this.treeData.map((item, index) => {
                    return {
                        id: item.id,
                        order: index + 1
                    }
                })
                await updatePresetClassOrder(JSON.stringify(json_info_presetClass))
                await this.getPresetClass(true)
            } else {
                console.log(this.treeData)
                // 拖拽预设
                let json_info_presetClass = []
                let json_info_presetClass2 = []

                this.treeData.forEach((item, index) => {
                    if (item.type != 1) {
                        const class_item = item.children.map((i, idx) => {
                            return {
                                class_id: Number(item.id),
                                id: Number(i.id),
                                order: idx + 1
                            }
                        })
                        const class_item2 = item.children.map((i, idx) => {
                            return {
                                data: {
                                    classId: Number(item.id),
                                    id: Number(i.id),
                                    orderId: idx + 1
                                },
                                keys: ['classId', 'orderId']
                            }
                        })
                        json_info_presetClass = json_info_presetClass.concat(class_item)
                        json_info_presetClass2 = json_info_presetClass2.concat(class_item2)

                    }
                })
                json_info_presetClass = json_info_presetClass.filter(item => {
                    return item.id != -9999
                })
                await updatePresetItemOrder(JSON.stringify(json_info_presetClass))
                // 更新本地数据库
                await this.ACT_BatchUpdatePresetSuit(json_info_presetClass2)

                await this.loadPresetsFromDb({ userId: this.userId })
            }
        },
        /**
         * 右键点击预设分类
         */
        presetClassRightClick(args) {
            const menu = new Menu()
            // 区分预设分类下如果没有预设则不显示批量分享
            if (args[1].children[0].id !== -9999) {
                menu.push({
                    label: '批量分享',
                    action: 'class-batch-share',
                    disabled: false,
                    data: null,
                    callback: () => {
                        const ids = args[1].children.map(item => ({ id: Number(item.id) }))
                        this.batchSharePreset(args, JSON.stringify(ids), 'preset_class')
                    }
                })
            }

            menu.push({
                label: '重命名',
                action: 'class-rename',
                disabled: false,
                data: null,
                callback: () => {
                    this.renameType = 0
                    this.inputRenameText = args[1].label
                    this.inputRenameClass = args[1].id
                    this.showRenameDialog = true
                }
            }).push({
                label: '删除分类',
                action: 'class-delete',
                disabled: false,
                data: null,
                callback: () => this.deletePresetClass(args)
            }).show()
        },
        /**
         * 右键批量处理预设
         */
        presetBatchSet(args) {
            const menu = new Menu()
            const ids = this.selectedNode.map(item => ({ id: Number(item) }))
            menu.push({
                label: '批量分享',
                action: 'batch-share',
                disabled: false,
                data: null,
                callback: () => this.batchSharePreset(args, JSON.stringify(ids), 'preset_itemBatch')
            }).push({
                label: '批量删除',
                action: 'batch-delete',
                disabled: false,
                data: null,
                callback: () => this.batchDeletePreset(args, JSON.stringify(ids))
            }).show()
        },
        /**
         * 右键单个处理预设
         */
        presetItemSet(args) {
            const menu = new Menu()
            menu.push({
                label: '分享预设',
                action: 'item-share',
                disabled: false,
                data: null,
                callback: () => this.batchSharePreset(args)
            }).push({
                label: '重命名',
                action: 'item-rename',
                disabled: false,
                data: null,
                callback: () => {
                    this.renameType = 1
                    this.inputRenameText = args[1].label
                    this.inputRenameClass = args[1].id
                    this.showRenameDialog = true
                }
            }).push({
                label: '删除预设',
                action: 'item-delete',
                disabled: false,
                data: null,
                callback: () => this.batchDeletePreset(args)
            }).show()
        },
        /**
         * 应用预设
         */
        applyPresetClick(args) {
            let presetChooseItem = null
            const content = this.getPresetGather()
            console.log('=======>应用预设')
            presetChooseItem = content.filter((item) => {
                return args[0].id == item.id
            })
            this.$emit('onItemClick', presetChooseItem)
        },

        deletePresetClass(args) {
            this.tsConfirm({
                title: '确认删除该分类',
                customMessageStyle: 'textAlign: center',
                message: '同时将删除该分类下所有的预设'
            }).then(_ => {
                deletePresetClassByApi(args[1].id).then(async (res) => {
                    this.tsNotify('删除分类成功～')
                    await this.getPresetClass(true)
                }).catch(e => {
                    console.log(e)
                })
            }).catch(() => {

            })
        },
        async onRenameConfirm(name) {
            if (name == null || name.length == 0) {
                this.tsNotify({
                    type: 'error',
                    message: '文件名称不能为空！'
                })
                return
            }

            //命名如果没改变，直接返回
            if (name === this.inputRenameText) {
                this.showRenameDialog = false
                return
            }

            try {
                const params = {
                    id: this.inputRenameClass,
                    name: name
                }
                if (this.renameType === 0) {
                    updatePresetClassByApi(params).then(async (res) => {
                        this.inputRenameText = null
                        this.inputRenameClass = null
                        this.showRenameDialog = false
                        await this.getPresetClass(true)
                        this.tsNotify({
                            message: '重命名成功！'
                        })
                    })
                } else if (this.renameType === 1) {
                    updatePresetName(params).then(async (res) => {
                        // 更新本地数据库
                        await this.ACT_UpdatePresetSuit({
                            data: {
                                name: name,
                                id: parseInt(this.inputRenameClass)
                            },
                            keys: ['name']
                        })

                        await this.loadPresetsFromDb({ userId: this.userId })

                        this.inputRenameText = null
                        this.inputRenameClass = null
                        this.showRenameDialog = false
                        this.tsNotify({
                            message: '重命名成功！'
                        })
                    })
                }
            } catch (e) {
            }
        },
        buildShareToken() {
            switch (this.shareTokenType) {
                case 1:
                    return `“${this.sharedItem.sharedName}”预设的分享口令「${this.sharedItem.sharedToken}」已复制,快粘贴分享给协作者吧`
                case 2:
                    return `“${this.sharedItem.sharedName}”等${this.sharedItem.sharedNum}个预设的分享口令「${this.sharedItem.sharedToken}」已复制,快粘贴分享给协作者吧`
                case 3:
                    return `“${this.sharedItem.sharedName}”下所有预设的分享口令「${this.sharedItem.sharedToken}」已复制,快粘贴分享给协作者吧`
                default:
                    break
            }
        },
        /**
         * 预设批量分享
         * @param args node
         * @param ids id集合
         */
        async batchSharePreset(args, ids, type) {
            this.sharedItem.sharedName = args[1].label
            this.sharedItem.sharedNum = ids ? JSON.parse(ids).length : 1

            let loadingInstance = Loading.service({
                background: 'transparent',
                customClass: 'mini'
            })
            try {
                let data = null
                if (ids) {
                    this.shareTokenType = type == 'preset_itemBatch' ? 2 : 3
                    data = await batchSharePresetByApi(ids)
                } else {
                    this.shareTokenType = 1
                    data = await getSharePresetToken(args[1].id)
                }

				let fmtIds = []
				if (this.shareTokenType == 1){
					fmtIds = [args[1].id]
				}else{
					const jsonIds = JSON.parse(ids)
					for (const jsonId of jsonIds) {
						fmtIds.push(jsonId.id)
					}
				}
                const hasOfflineMineIdPhoto = await importIdPhotoMaterialRpc.presetHasOfflineMineIdPhoto(fmtIds)
				this.shareWarningTipMsg = ""
				if (hasOfflineMineIdPhoto){
					this.shareWarningTipMsg = "本次分享预设中不包含上传的证件照背景效果"
				}
                this.sharedItem.sharedToken = data.share_token
                this.showPresetTokenDialog = true
                loadingInstance.close()

                // 写入剪贴板
                let mg = new PresetSuitManager()
                if (type === 'preset_class') {
                    // 针对于预设分类，区分分享提示和分享口令显示不同
                    const shareName = args[2].childNodes[0].label
                    mg.writePresetToken(this.sharedItem.sharedToken, shareName, this.sharedItem.sharedNum)
                } else {
                    mg.writePresetToken(this.sharedItem.sharedToken, this.sharedItem.sharedName, this.sharedItem.sharedNum)
                }


                // 写入store
                this.$store.commit('presetSuit/_SetPresetShareToken', {
                    userId: this.userId,
                    token: this.sharedItem.sharedToken
                })

            } catch (e) {
                console.error(e)
                this.tsNotify(e.message)
                loadingInstance.close()
            }
        },
        async batchDeletePreset(args, ids) {
            try {
                if (ids) {
                    this.tsConfirm({
                        title: '确认批量删除选中预设',
                        customMessageStyle: 'textAlign: left'
                    }).then(async _ => {
                        // @ts-ignore
                        await this.batchDeletePresetStore({ ids: ids, })
                        await this.loadAllPresents({ userId: this.userId, loadDb: true, backstageLoad: false })
                        this.tsNotify('批量删除预设成功～')
                    }).catch(() => {

                    })
                } else {
                    this.tsConfirm({
                        title: '确认删除选中预设',
                        customMessageStyle: 'textAlign: left'
                    }).then(async _ => {
                        // @ts-ignore
                        await this.deletePreset({ id: args[1].id })
                        await this.loadAllPresents({ userId: this.userId, loadDb: true, backstageLoad: false })
                        this.tsNotify('删除预设成功～')
                    }).catch(() => {

                    })
                }
            } catch (e) {
            }
        }
    }
}
</script>

<style scoped lang="scss">
.presetTreeCla {
    background: transparent;
    // min-height: 130px;
    overflow-y: overlay;
    overflow-x: hidden;
    position: relative;

    .el-tree {
        background: transparent;

        /deep/ .custom-tree-node {
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /deep/ .is-checked {
            background: #1D1D1D;
        }

    }

    /deep/ .el-tree > .el-tree-node > .el-tree-node__content {
        background: #282828;
        height: 32px;
        padding-left: 8px !important;
    }
    .reloadBtn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>
