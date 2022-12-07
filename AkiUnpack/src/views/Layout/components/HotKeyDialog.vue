<template>
    <el-dialog
        append-to-body
        top="10vh"
        width="489px"
        align="center"
        title="快捷键指南"
        custom-class="setting-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
    >
        <div class="container">
            <div class="group">
                <div class="type-title">文件夹快捷键</div>

                <el-form class="info" label-position="left" label-width="120px">

                    <el-form-item label="图片全选：">
                        <span class="hot-key-box">{{ platformKey }} + A</span>
                    </el-form-item>

                    <el-form-item label="图片取消全选：">
                        <span class="hot-key-box">{{ platformKey }} + D</span>
                    </el-form-item>

                    <el-form-item label="图片多选：">
                        <span class="hot-key-box">
                            <span>Shift + 点击</span>
                            <span style="padding: 0 10px">或</span>
                            <span>{{ platformKey }} + 点击</span>
                        </span>
                    </el-form-item>

                    <el-form-item label="图片取消选中：">
                        <span class="hot-key-box">{{ platformKey }} + 点击</span>
                    </el-form-item>

                    <el-form-item label="上一张/下一张:">
                        <span class="hot-key-box">{{ '向上箭头' }}</span>
                        <span style="margin-left: 8px;margin-right: 8px;color: #A6A6A6;font-size: 14px">/</span>
                        <span class="hot-key-box">{{ '向下箭头' }}</span>
                    </el-form-item>

                    <el-form-item label="删除：">
                        <span class="hot-key-box">{{ "Backspace / Del" }}</span>
                    </el-form-item>
                </el-form>
            </div>

            <div class="group">
                <div class="type-title">图片快捷键</div>

                <el-form class="info" label-position="left" label-width="110px">
                    <el-form-item label="图片放大：">
                         <span class="hot-key-box">
                            <span>{{ platformKey }} + "+"</span>
                            <span style="padding: 0 10px">或</span>
                            <span>鼠标滚轮向上</span>
                        </span>
                    </el-form-item>

                    <el-form-item label="图片缩小：">
                         <span class="hot-key-box">
                            <span>{{ platformKey }} + "-"</span>
                            <span style="padding: 0 10px">或</span>
                            <span>鼠标滚轮向下</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="复制效果：">
                        <span class="hot-key-box">
                          <span>{{ platformKey }} + "C"</span>
                        </span>
                    </el-form-item>

                    <el-form-item label="粘贴效果：">
                        <span class="hot-key-box">
                          <span>{{ platformKey }} + "V"</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="恢复默认尺寸：">
                        <span class="hot-key-box">{{ platformKey }} + "0"</span>
                    </el-form-item>

                    <el-form-item label="查看对比：">
                        <span class="hot-key-box">{{ '~' }}</span>
                    </el-form-item>

                    <el-form-item label="撤销：">
                        <span class="hot-key-box">{{ platformKey }} + "Z"</span>
                    </el-form-item>

                    <el-form-item label="重做：">
                        <span v-if="!isWin32" class="hot-key-box">{{ platformKey }} + "shift" + "Z"</span>
                        <span v-if="isWin32" class="hot-key-box">{{ platformKey }} + "shift" + "Z" 或者 {{ platformKey }} + "Y" </span>
                    </el-form-item>

                    <el-form-item label="图片移动：">
                        <span class="hot-key-box">空格 + 鼠标左键</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import toast from '@/mixins/toast'

import { Dialog, Form, FormItem } from 'element-ui'
import TsDialog from '@/components/TsDialog/ts-dialog'

export default {
    name: 'HotKeyDialog',
    mixins: [toast],
    components: {
        'el-dialog': TsDialog,
        'el-form': Form,
        'el-form-item': FormItem
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            visible: this.value,
            form: {
                name: '预设1'
            }
        }
    },
    filters: {},
    computed: {
        ...mapGetters('finishing', []),
        platformKey() {
            return this.$platform === 'win32' ? 'Ctrl' : 'Command'
        },
        isWin32() {
            return this.$platform === 'win32'
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
            this.$emit('input', val)
        }
    },
    mounted() {
        this.initIcons()
        // this.visible = true
    },
    methods: {
        ...mapMutations([]),
        async initIcons() {
        },
        async submit() {
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    min-height: 300px;
    text-align: left;
    padding-bottom: 15px;

    .group {
        margin-top: 32px;

        &:first-child {
            margin-top: 12px;
        }

        /deep/ {
            .el-form-item {
                margin-bottom: 16px;
            }

            .el-form-item__label {
                color: #A6A6A6;
            }
        }


        .type-title {
            margin-bottom: 19px;
            height: 24px;
            font-size: 14px;
            line-height: 24px;
            font-weight: 600;
        }

        .info {
            .hot-key-box {
                line-height: 32px;
                padding: 6px 12px;
                border: 1px solid #434343;
                border-radius: 4px;
                font-size: 14px;
            }


            .or {
                margin: 0 12px;
            }
        }
    }
}
</style>
