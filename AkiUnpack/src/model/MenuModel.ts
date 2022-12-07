import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { IMenuConfig } from '@/types/api/user'

enum LinkType {
    Dialog = 1,
    InlineLink = 2,
    OutsideLink = 3
}

export default class MenuModel {
    key: string = ''
    url: string = ''
    _show: boolean
    linkType: number

    vHtml?: string
    name?: string
    icon?: string
    showIcon: boolean
    _showName: boolean

    constructor(props: IMenuConfig) {
        const { key, url, show, name, icon, show_icon = true, show_name = true, v_html, link_type = 1 } = props

        this.key = key
        this.url = url
        this._show = show
        this.linkType = link_type

        this.name = name || ''
        this.icon = icon
        this.vHtml = v_html

        this.showIcon = show_icon
        this._showName = show_name
    }

    get show(): boolean {
        return !!(this._show && (this.name || this.icon || this.vHtml))
    }

    get showName(): boolean {
        return this._showName && !!this.name
    }

    openLink(): void {
        console.log('openLink', this)
        switch (this.linkType) {
            case LinkType.OutsideLink:
                ipcRenderer.send('open-external-link', { href: this.url })
                break

            case LinkType.Dialog:
                ipcRenderer.send('open-alink-dialog', {
                    title: this.name,
                    href: this.url
                })
                break

            case LinkType.InlineLink:
            default:
                ipcRenderer.send('open-alink-blank', {
                    type: 'Outside',
                    title: this.name,
                    href: this.url
                })
                break
        }
    }
}
