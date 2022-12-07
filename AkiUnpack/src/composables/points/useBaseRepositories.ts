import { computed, getCurrentInstance, Ref } from 'vue'
// @ts-ignore
import TsStat from '@/utils/TsStat/tsStat'

import { PointRouteMap } from '@/constants/pointsDef'

export interface PointQuery<T> {
    event_id: string,
    data: T
}

interface IUseBaseRepositories {
    formatPointData<T>(event_id: string, data: T): PointQuery<T>
    sendPoint<T>(event_id: string, data?: T): void
    getPointRouteName: () => string
}

export default function useBaseRepositories(): IUseBaseRepositories {
    const that = getCurrentInstance()?.proxy as Vue
    const _routeName = computed(() => that?.$route?.name)

    const pointRouteName = computed(_ => {
        const actionMap = new Map([
            ['index', PointRouteMap.Workbench],
            ['batchRetouch', PointRouteMap.BatchRetouch],
            ['photoFinishing', PointRouteMap.PhotoFinishing],
            ['exportList', PointRouteMap.Export],
            ['importImage', PointRouteMap.EmptyPage],
            ['Login', PointRouteMap.Login],
            ['', '']
        ])
        return actionMap.get(<string>_routeName.value) || ''
    })

    const getPointRouteName = (): string => {
        return pointRouteName.value
    }

    /**
     * 埋点 数据格式化
     * @param event_id
     * @param data
     */
    function formatPointData<T>(event_id: string, data: T): PointQuery<T> {
        return Object.freeze({ event_id, data })
    }

    // 发送埋点数据
    function sendPoint<T>(event_id: string, data?: T): void {
        const tsStat = TsStat.getInstance()
        tsStat.event(event_id, data || {})
    }

    return {
        getPointRouteName,
        formatPointData,
        sendPoint
    }
}
