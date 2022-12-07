<template>
    <el-tree
        ref="refsTree"
        node-key="id"
        :data="treeData"
        :empty-text="emptyText"
        :icon-class="icon"
        :draggable="draggable"
        :check-strictly="strictlyRlx"
        :allow-drag="allowDrag"
        :allow-drop="allowDrop"
        :default-expanded-keys="defaultExpandedKeys || []"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        @node-contextmenu="handleNodeRightClick"
        @node-drop="$emit('node-drop', $event)"
        @node-expand="$emit('node-expand', $event)"
        @node-collapse="$emit('node-collapse', $event)"
    >
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.children" class="iconfont"></span>
            <img v-else-if="node.isCurrent" :src="data.icon_selected" class="icon_tree" alt="">
            <img v-else :src="data.icon" class="icon_tree" alt="">
            <el-tooltip
                offset="100"
                effect="dark"
                placement="bottom-start"
                :open-delay="500"
                :visible-arrow="false"
                :disabled="node.data.tipType !== 2"
            >
                <div slot="content">
                    <div>创建时间：{{ node.data.created_at | moment('MM月DD日 HH:mm:ss') }}</div>
                    <div>更新时间：{{ node.data.updated_at | moment('MM月DD日 HH:mm:ss') }}</div>
                </div>
                <span>{{ node.label }}</span>
            </el-tooltip>
            <span class="icon_preset_default" v-if="data.type===1">默认</span>
        </span>
    </el-tree>
</template>
<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

import { Tooltip } from 'element-ui'

export default {
    name: 'TsTree',
    components: {
        'el-tooltip': Tooltip
    },
    props: {
        defaultExpandedKeys: Array,
        allowDrag: Function,
        allowDrop: Function,
        items: {
            type: Array,
            value: []
        },
        treeData: {
            type: Array,
            value: []
        },
        // 是否严格父子不相关联（多选）
        strictlyRlx: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: true
        },
        icon: {
            type: String,
            default: 'el-icon-arrow-right'
        },
        emptyText: {
            type: String,
            default: '预设载入中'
        },
        currentNodeId: {
            value: -1 // 当前选中节点
        }
    },
    setup(props, { emit }) {
        const isShiftKeydown = ref(false)


        const refsTree = ref()
        const handleSetCurrentKey = (id) => {
            nextTick(() => {
                refsTree.value.setCurrentKey(id)
            })
        }

        /**
         * 设置当前勾选的节点
         */
        const handleSetCheckedNodes = (type = 'byKey', gatherList, leafOnly = false) => {
            if (type === 'byNode') {
                refsTree.value.setCheckedNodes(gatherList)
            } else if (type === 'byKey') {
                nextTick(() => {
                    refsTree.value.setCheckedKeys(gatherList, leafOnly)
                })

            }
        }

        /**
         * 获取当前选择的节点
         */
        const handleGetCheckedNodes = (type = 'byKey', leafOnly = true) => {
            if (type === 'byNode') {
                return refsTree.value.getCheckedNodes(leafOnly)
            } else if (type === 'byKey') {
                return refsTree.value.getCheckedKeys(leafOnly)
            }
        }

        /**
         * 获取当前节点,注意区分checked
         */
        const handleGetCurrentNodes = (type = 'byKey') => {
            if (type === 'byNode') {
                return refsTree.value.getCurrentNode()
            } else if (type === 'byKey') {
                return refsTree.value.getCurrentKey()
            }
        }


        /**
         * filter过滤规则函数
         * @illus 下面规则为简单label匹配
         */
        const filterNode = (value, data, node) => {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        }

        /**
         * 节点筛选（搜索）
         * @param {any} val  ==>该参数会在filter-node-method中作为第一个参数
         */
        const handleFilter = (val) => {
            refsTree.value.filter(val)
        }

        /**
         * 通过key设置子节点
         * @param {any} key 节点key
         * @param {any} data 节点数据的数组
         */
        const handleUpdateKeyChildren = (key, data) => {
            refsTree.value.updateKeyChildren(key, data)
        }

        /**
         * 删除一个节点
         * @param {any} data 要删除的key/data/node
         * @note 官网说明文档说传参是data或者node，并没有说key也可以，经验证key也是可以的
         */
        const handleRemoveNode = (data) => {
            refsTree.value.remove(data)
        }

        /**
         * 为一个node追加节点（子节点或兄弟节点）
         * @param {any} type 追加类型
         * @param {any} data 要追加的节点data
         * @param {any}  (data/key/node) 被追加的节点
         */
        const handleAddNode = (type, data, key) => {
            switch (type) {
                case 'append': {    // 追加一个子节点
                    refsTree.value.append(data, key)
                    break
                }
                case 'insertBefore': {  // 在前边插入一个节点
                    refsTree.value.insertBefore(data, key)
                    break
                }
                case 'insertAfter': {   // 在后边插入一个节点
                    refsTree.value.insertAfter(data, key)
                    break
                }
            }
        }

        /**
         * 节点被点击
         * 参数（3）：传递给data属性的数组中该节点对应的对象、节点对应的Node、节点组件本身
         */
        const handleNodeClick = (...args) => {
            if (!args[0].disabled) {
                if (!isShiftKeydown.value) {
                    if (!args[1].isLeaf) {
                        // 单击父节点
                        emit('click-parentNode', args)
                    } else {
                        // 单击子节点
                        emit('click-childNode', args)
                    }
                } else {
                    if (!args[1].isLeaf) {
                        // shift+单击父节点
                        emit('click-shift-parentNode', args)
                    } else {
                        // shift+单击子节点
                        emit('click-shift-childNode', args)
                    }
                }
            } else {
                handleSetCurrentKey(props.currentNodeId)
                return false
            }
        }

        /**
         * 右键点击节点
         * 参数（4）：event、传递给data属性的数组中该节点对应的对象、节点对应的Node、节点组件本身
         */
        const handleNodeRightClick = (...args) => {
            if (!args[1].disabled) {
                if (!args[2].isLeaf) {
                    // 父节点
                    emit('click-right-parentNode', args)
                } else {
                    // 子节点
                    emit('click-right-childNode', args)
                }
            }
        }

        const cancelShift = () => {
            console.log('blur')
            isShiftKeydown.value = false
        }

        const windowKeydown = (e) => {
            if (e.key === 'Shift') {
                isShiftKeydown.value = true
            }
        }

        const windowKeyup = (e) => {
            if (e.key === 'Shift') {
                cancelShift()
            }
        }

        const allEventListener = (isDestroy = false) => {
            if (!isDestroy) {
                window.addEventListener('keydown', windowKeydown)
                window.addEventListener('keyup', windowKeyup)
                window.addEventListener('blur', cancelShift)
            } else {
                window.removeEventListener('keydown', windowKeydown)
                window.removeEventListener('keyup', windowKeyup)
                window.removeEventListener('blur', cancelShift)
            }
        }

        onMounted(() => {
            allEventListener()
        })

        onUnmounted(() => {
            allEventListener(true)
        })

        return {
            refsTree,

            isShiftKeydown,

            handleSetCurrentKey,
            handleSetCheckedNodes,
            handleGetCheckedNodes,
            handleGetCurrentNodes,

            filterNode,
            handleFilter,
            handleUpdateKeyChildren,

            handleNodeClick,
            handleNodeRightClick,
            handleRemoveNode,
            handleAddNode
        }
    }
}
</script>

<style scoped lang="scss">
.icon_tree {
    width: 16px;
    margin-right: 6px;
    vertical-align: middle;
}

.icon_preset_default {
    display: inline-block;
    width: 28px;
    margin-left: 6px;
    height: 12px;
    text-align: center;
    line-height: 12px;
    border: solid 0.5px #9a9494;
    border-radius: 2px;
    color: #333;
    font-size: 9px;
    background: rgba(255, 255, 255, 0.60);
    vertical-align: middle;
    font-weight: 500;
}

/deep/ .el-tree-node__children .is-current .custom-tree-node {
    color: #eecc28
}

/deep/ .is-checked .custom-tree-node {
    //  color: rgb(238, 24, 40)
}

</style>
