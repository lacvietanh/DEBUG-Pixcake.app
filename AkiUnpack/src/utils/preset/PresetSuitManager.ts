import clipboard from '@/qt-ipc/clipboard'
import { CLIENT_NAME_EN, CLIENT_NAME } from '@/universal/types/config'
export function presetCheckHasMineIdPhoto(beautifyJson:any):boolean{
    if (!beautifyJson){
        return false
    }
    const effects = beautifyJson.Effects
    for (const effect of effects) {
        const {EffectName,Path} = effect
        if (EffectName == "BgReplace" && Path.indexOf("/id_photo/") >0){
            return true
        }
    }
    return false
}
export default class PresetSuitManager {
    // 模板
    template = `好友给你分享了{num}个预设-{name}等「{token}」，快复制口令打开${ CLIENT_NAME_EN }导入吧~`

    // 正则检测
    templateReg = new RegExp(`(?<=(好友给你分享了.+个预设-.+等「))(\\w+)(?=」，快复制口令打开(${ CLIENT_NAME_EN }|${ CLIENT_NAME })导入吧~)`, 'gi')

    templateRegOld = new RegExp(`(?<=(好友给你分享了预设-.+「))(\\w+)(?=」，快复制口令打开(${ CLIENT_NAME_EN }|${ CLIENT_NAME })导入吧~)`, 'gi')


    isCorrectText(value: string) {
        if (!value) return false

        const result = value.match(this.templateReg)
        const resultOld = value.match(this.templateRegOld)

        if (result && result[0]) {
            return result[0]
        }
        if (resultOld && resultOld[0]) {
            return resultOld[0]
        }

        return false
    }

    async findPresetToken() {
        let readText = await clipboard.readText('clipboard')
        if (!readText || !readText.trim()) return null


        const result = this.isCorrectText(readText)

        if (result) {
            console.log('[PresetSuitManager] content is find：', result)
            return result
        } else {
            console.log(`[PresetSuitManager] content is Correct: `, readText)
            return null
        }
    }

    writePresetToken(token: string, name: string, num: any) {
        if (!token) {
            console.log(`[writePresetToken] content is Correct!`)
            return
        }
        let template = this.template
        template = template.replace('{token}', token)
        template = template.replace('{name}', name)
        template = template.replace('{num}', num)

        clipboard.writeText(template)
    }

    /*
        情况剪贴板
     */
    clearPresetToken() {
        clipboard.writeText(`   `)
    }

    clearPlaceholder(value: string) {
        const result = this.isCorrectText(value)
        console.log('[clearPlaceholder] value: ', value, ' isCorrect: ', result)

        if (result) {
            return result
        } else {
            const trimValue = value.trim()
            const reg = /(?<=^「)(\w+)(?=」$)/gi
            if (reg.test(trimValue)) {
                const result = trimValue.match(reg)
                return result ? result[0] || value : value
            }
            return value
        }
    }
}
