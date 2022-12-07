export enum WinType {
    Main = 'main',
    MemberVipPlan = 'memberVipPlan',
    AutoUpdate = 'autoUpdate',
    TsGtag = 'tsGtag',
    Launch = 'launch',
    Activity = 'activity' // 活动窗口,
}

export class WinIPCMessage {
    from: WinType
    to: Array<WinType> | WinType[]
    content: any

    constructor(from: WinType, to: Array<WinType> | WinType[], content: any) {
        this.from = from
        this.to = to
        this.content = content
    }

    toJson() {
        return {
            from: this.from,
            to: this.to,
            content: this.content
        }
    }
}

/*
    渲染进程间通信使用
    winType标识消息的窗口来源;
    kBroadCastWinEventString,作为订阅的channel
 */
export function kBroadCastWinEventString(winType: WinType, eventName: string) {
    return `${ winType }#${ eventName }`
}
