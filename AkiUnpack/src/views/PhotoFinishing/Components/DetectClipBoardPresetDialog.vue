<template>
    <div v-if="false"></div>
</template>

<script>
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { NodeChannelEvent } from '@/qt-ipc/node-api'

import Vue, {
    ref,
    computed,
    onMounted,
    onUnmounted,
    reactive,
    getCurrentInstance
} from 'vue'
import store from '@/store'
import { mapActions } from 'vuex'

import toast from '@/mixins/toast'
import { getSharePresetInfo, importSharePreset } from '@/api/settingApi'
import PresetSuitManager from '@/utils/preset/PresetSuitManager'
import { CUR_PRESET_VERSION } from '@/constants/preset-def'

import { Loading } from 'element-ui'

export default Vue.extend({
    name: 'DetectClipBoardPresetDialog',
    mixins: [
        toast
    ],

    methods: {
        ...mapActions([
            'getPresetClass',
            'loadAllPresents'
        ])
    },

    setup(props, { emit }) {
        const that = getCurrentInstance().proxy
        const userId = store.getters['userId']
        const visible = ref(false)

        const sharedItem = reactive({
            isWaitingImport: false,
            fromName: '测试预设...', // 来自于谁
            presetName: '',// 预设名字
            presetVersion: null, // 预设版本
            presetToken: null,// 预设令牌
            setting_total_count: 0
        })

        const title = computed(() => {
            let name = sharedItem.fromName
            if (!name) {
                return ''
            }
            return `${name.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')} 给你分享了预设`
        })

        const content = computed(() => {
            let presetName = sharedItem.presetName
            if (!presetName) {
                return ''
            }
            let h = that?.$createElement
            let customTitleEl = null
            let style = { style: 'font-size: 16px;font-weight: 500; margin: 12px 0 16px' }
            let numStyle = { style: 'font-size: 15px;font-weight: 500; margin: 12px 2px 16px 2px;color:#F5D228' }

            if (sharedItem.setting_total_count === 1) {
                customTitleEl = h('div', style, [
                    h('span', style, '检测到“'),
                    h('span', numStyle, `${presetName}`),
                    h('span', style, '”预设，是否导入？')
                ])
                return customTitleEl
            } else {
                customTitleEl = h('div', style, [
                    h('span', style, '检测到“'),
                    h('span', numStyle, `${presetName}`),
                    h('span', style, '”等'),
                    h('span', style, `${sharedItem.setting_total_count}个预设，是否导入？`)
                ])
                return customTitleEl
            }
        })

        const clearToken = () => {
            let mg = new PresetSuitManager()
            mg.clearPresetToken()
            emit('onClose')
        }

        const onSubmit = () => {
            let loadingInstance = Loading.service({
                background: 'transparent',
                customClass: 'mini'
            })

            const presetName = sharedItem.presetName
            importSharePreset(sharedItem.presetToken, CUR_PRESET_VERSION).then(async (data) => {
                loadingInstance.close()
                await that?.getPresetClass(true)
                await that?.loadAllPresents({ userId, loadDb: true })
                if (data.setting_total_count === 1) {
                    that?.tsNotify(`“${presetName}”预设已导入`, { duration: 1000 })
                } else {
                    that?.tsNotify(`“${presetName}”等${data.setting_total_count}个预设已导入`, { duration: 1000 })
                }
            }).catch(async e => {
                loadingInstance.close()
                switch (e.data.code) {
                    case 37: {
                        that?.tsNotify('分享口令的预设不存在～', { duration: 1000 })
                        visible.value = false
                        break
                    }
                    case 38: {
                        that?.tsNotify('口令来源于自己分享的预设，导入失败～', { duration: 1000 })
                        visible.value = false
                        break
                    }
                    case 39: {
                        that?.tsNotify('当前导入预设已存在～')
                        visible.value = false
                        break
                    }
                    case 41: {
                        try {
                            await that?.tsConfirm({
                                title: `${e.data.data.fail_info.imcompatible_list[0]}等${e.data.data.fail_info.not_exist_count}个预设无法导入`,
                                message: '当前导入预设与当前软件版本不兼容，请升级至最新版本后再试',
                                confirmButtonText: '立即更新'
                            })

                            ipcRenderer.send('app-client-update-check')
                            visible.value = false
                        } catch (err) {
                        }
                        break
                    }
                    default:
                        that?.tsNotify(e.data.message, { duration: 1000 })
                        visible.value = false
                }
            })
        }

        async function checkAndShow() {
            if (sharedItem.isWaitingImport) return
            let mg = new PresetSuitManager()
            let findToken = await mg.findPresetToken()
            if (findToken) {
                let presetShortInfo = null
                try {
                    presetShortInfo = await getSharePresetInfo(findToken)
                } catch (e) {
                    presetShortInfo = null
                }
                if (presetShortInfo) {
                    const { share_user_phone, share_user_id, settings_info, setting_total_count } = presetShortInfo
                    sharedItem.presetToken = findToken
                    sharedItem.fromName = share_user_phone
                    sharedItem.presetName = settings_info[0].name
                    sharedItem.setting_total_count = setting_total_count

                    if (Number(share_user_id) === userId) return

                    sharedItem.isWaitingImport = true

                    that?.tsConfirm({
                        title: title.value,
                        customMessageEl: content.value,
                        message: null,
                        showCancelButton: true
                    }).then(() => {
                        sharedItem.isWaitingImport = false
                        clearToken()
                        onSubmit()
                    }).catch(e => {
                        sharedItem.isWaitingImport = false
                        clearToken()
                    })
                }
            }
        }

        onMounted(() => {
            checkAndShow()
            ipcRenderer.on(NodeChannelEvent.appState, (event, args) => {
                const { state } = args
                console.log('application state changed:', state)
                if (state) {
                    checkAndShow()
                }
            })
        })

        onUnmounted(() => {
            ipcRenderer.removeAllListeners(NodeChannelEvent.appState)
        })

        return {
            title,
            content,

            clearToken,
            onSubmit
        }
    }
})
</script>
