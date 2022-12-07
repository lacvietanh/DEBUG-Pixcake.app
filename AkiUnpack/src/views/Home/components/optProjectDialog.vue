<template>
    <el-dialog
        top="30vh"
        width="440px"
        custom-class="common-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <div class="title">创建新项目</div>

        <div class="container">
            <el-input
                placeholder="请输入项目名称"
                @change="handleNameChange"
                v-model="form.name"
                ref="inputProjectName"
                maxlength="30"
                @keydown.native.enter="submit">

            </el-input>
        </div>

        <div class="footer">
            <el-button
                type="primary"
                :loading="loading"
                :disabled="form.name == null || form.name == ''"
                @click="submit">
                保存
            </el-button>
        </div>
    </el-dialog>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import toast from '@/mixins/toast'

import { Dialog, Input } from 'element-ui'
import Project from '@/model/ProjectModel.ts'
import TsDialog from '@/components/TsDialog/ts-dialog'


export default {
    name: 'optProjectDialog',
    mixins: [toast],
    components: {
        'el-dialog': TsDialog,
        'el-input': Input
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
                name: ''
            },
            ifInconClose: true
        }
    },
    filters: {},
    computed: {
        ...mapGetters([
            'userId'
        ])
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val

                if (val) {
                    this.$nextTick(() => {
                        this.$refs.inputProjectName.focus()
                    })
                }
            },
            immediate: true
        },
        visible(val) {
            if (!val && this.ifInconClose == true) {
                this.$tsStat?.event('cake_workbench', {
                    cake_operate: 'add_popup_close'
                })
            }
            this.$emit('input', val)
            this.ifInconClose == false
        }
    },
    mounted() {
        this.ifInconClose = true


        // this.initData()
    },
    methods: {
        ...mapActions('project', ['ACT_InsertProject']),

        // async initData() {},
        async submit() {
            this.$tsStat?.event('cake_workbench', {
                cake_operate: 'add_popup_save'
            })
            let name = this.form.name.trim()  //去除左右两边的空格
            name = name.replace(/ +/g, ' ') //中间的多个空格变一个
            if (!name) {
                this.tsNotify({
                    type: 'warning',
                    message: '请输入项目名称'
                })
                return
            }
            if (name.byteLength() > 60) {
                this.tsNotify({
                    type: 'warning',
                    message: '最多可支持输入30个汉字~'
                })
                return
            }

            this.loading = true
            this.ifInconClose = false

            try {
                const newProjectInfo = new Project(this.userId, name, null)
                newProjectInfo.visit_time = new Date().getTime()
                await this.ACT_InsertProject(newProjectInfo)
                this.form.name = ''
                this.visible = false
                this.$emit('onAddedProject', newProjectInfo)
            } catch (err) {
                this.tsNotify({
                    type: 'error',
                    message: err.message
                })
                this.form.name = ''
                this.visible = false
            }
            this.loading = false
        },
        handleNameChange() {
            this.$tsStat?.event('cake_workbench', {
                cake_operate: 'add_popup_input_text'
            })
        }

    }
}
</script>

<style lang="scss" scoped>
</style>
