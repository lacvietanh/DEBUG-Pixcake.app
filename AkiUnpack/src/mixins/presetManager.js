// 预设管理类
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ImportPresetDialog from '@/views/PhotoFinishing/Components/ImportPresetDialog'
import NewPresetTypeDialog from '@/views/PhotoFinishing/Components/NewPresetTypeDialog'

import SharePresetTokenDialog from '@/views/PhotoFinishing/Components/SharePresetTokenDialog'
import DetectClipBoardPresetDialog from '@/views/PhotoFinishing/Components/DetectClipBoardPresetDialog'
import { getSharePresetToken } from '@/api/settingApi'
import { Loading } from 'element-ui'
import PresetSuitManager from '@/utils/preset/PresetSuitManager'
import Menu from '@/qt-ipc/utils/menu'

export default {
    components: {
        SharePresetTokenDialog,
        ImportPresetDialog,
        NewPresetTypeDialog,
        DetectClipBoardPresetDialog
    },
    data() {
        return {
            // 预设新增的业务处理
            sharedItem: {
                sharedToken: null,
                sharedName: null
            },
            showPresetTokenDialog: false,
            showImportPresetDialog: false,
            showNewPresetTypeDialog: false
        }
    },

    computed: {
        ...mapGetters([
            'userId'
        ])
    },

    ...mapActions([
        'loadAllPresents',
        'deletePreset',
        'loadAllPresents'
    ]),

    ...mapMutations('presetSuit', ['_SetPresetShareToken']),

    methods: {
        buildShareToken() {
            return `“${this.sharedItem.sharedName}”预设的分享口令「${this.sharedItem.sharedToken}」已复制,快粘贴分享给协作者吧`
        },
        async onShareClick(presetItem) {
            this.sharedItem.sharedName = presetItem.name
            let loadingInstance = Loading.service({
                background: 'transparent',
                customClass: 'mini'
            })

            try {
                const data = await getSharePresetToken(presetItem.id)
                this.sharedItem.sharedToken = data.share_token
                this.showPresetTokenDialog = true
                loadingInstance.close()

                // 写入剪贴板
                let mg = new PresetSuitManager()
                mg.writePresetToken(data.share_token, presetItem.name)


                // 写入store,用于过滤自己的分享
                // this._SetPresetShareToken({
                //     userId: this.userId,
                //     token: data.share_token
                // })
                //
                this.$store.commit('presetSuit/_SetPresetShareToken', {
                    userId: this.userId,
                    token: data.share_token
                })
            } catch (e) {
                console.error(e)
                this.tsNotify(e.message)
                loadingInstance.close()
            }
        },
        onPresetMenuRightClick(data) {
            if (data.classifyType == 1) {
                return
            }
            const menu = new Menu()
            // menu.push({
            //     label: '移到最前',
            //     action: 'batchretouch-my-preset-move',
            //     disabled: false,
            //     data: data
            // }).push({
            //     label: '重命名',
            //     action: 'batchretouch-my-preset-rename',
            //     disabled: false,
            //     data: data
            // })
            menu.push({
                label: '分享预设',
                action: 'batchretouch-my-preset-share',
                disabled: false,
                data: data,
                callback: this.onShareClick
            }).push({
                label: '删除预设',
                action: 'batchretouch-my-preset-delete',
                disabled: false,
                data: data,
                callback: this.remove
            }).show()
        }
    },

    remove(presetItem) {
        let _that = this
        // @ts-ignore
        let userId = this.$store.state.user.userId
        // @ts-ignore
        this.tsConfirm({
            title: '确认删除该预设',
            customMessageStyle: 'textAlign: left'
        }).then(async _ => {
            // @ts-ignore
            await this.deletePreset({presetItem: presetItem})
            await this.loadAllPresents({ userId: this.userId, loadDb: true, backstageLoad: false })

        })
    }
}
