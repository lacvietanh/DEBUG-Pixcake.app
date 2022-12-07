import NodeApi from '@/qt-ipc/node-api'
import { ShareObjectModel } from '@/universal/model/ShareObjectModel/ShareObjectModel'

const TokenKey = 'PixCake'

export async function getCookie(key: string): Promise<string | undefined> {
    // 主webview的调用这个
    if (NodeApi.cookies) {
        return NodeApi.cookies.get(key)
    } else {
        // 嵌入的webview页面的调用这个，window.getCookie是外部注入的
        //@ts-ignore
        return window.getCookie(key)
    }
}

export function getToken(): Promise<string | undefined> {
    return ShareObjectModel.instance().getPlainToken()
}

export function setToken(token: string): Promise<void | undefined> {
    return ShareObjectModel.instance().setPlainToken(token)
}

export function removeToken(): Promise<void> {
    return NodeApi.cookies.remove(TokenKey)
}
