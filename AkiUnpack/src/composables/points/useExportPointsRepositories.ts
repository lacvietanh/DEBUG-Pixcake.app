import useBaseRepositories from './useBaseRepositories'
import { PointEvent, PointExportListOperate, PointExportOperate } from '@/constants/pointsDef'

interface IPointsRepositories {
    PointExportTable: (operate: string) => void
    PointInitExportTable: (isVip: boolean) => void
    PointExport: (data: any) => void
    PointExportClick: (data: any) => void
    PointExportThumbnail: (isEffect: boolean) => void
    PointExportContinue: () => void
    PointExportRecharge: () => void

    // 导出列表
    PointExportListExportedTab: () => void
    PointExportListExportingTab: () => void
    PointExportListBillingRulesPopup: () => void

    PointClickExportDetail: () => void
}

export default function useExportPointsRepositories(): IPointsRepositories {
    const { sendPoint, getPointRouteName } = useBaseRepositories()

    function PointExportTable(operate: string) {
        sendPoint(PointEvent.CakeExportList, { cake_operate: operate })
    }

    function PointInitExportTable(isVip: boolean) {
        const vipState = isVip ? 'member' : 'non_member'
        const param = 'init_' + getPointRouteName() + '_' + vipState
        sendPoint(PointEvent.CakeExportList, { cake_operate: param })
    }

    function PointExport(data: any) {
        sendPoint(PointEvent.CakeExport,{cake_operate: data['cake_operate']})
    }

    function PointExportClick(data: any){
        sendPoint(PointEvent.CakeExport, data)
    }

    function PointExportThumbnail(isEffect: boolean){
        const operate = isEffect ? PointExportOperate.EffectThumb : PointExportOperate.OriginThumb
        sendPoint(PointEvent.CakeExport,{cake_operate: operate})
    }

    function PointExportContinue(){
        sendPoint(PointEvent.CakeExport,{cake_operate: 'not_enough_sheets_continue'})
    }

    function PointExportRecharge(){
        sendPoint(PointEvent.CakeExport,{cake_operate: 'not_enough_sheets_recharge'})
    }

    // 通用埋点
    function commonExportListPoint(cakeOperate: PointExportListOperate) {
        return () => sendPoint(PointEvent.CakeExportList, { cake_operate: cakeOperate })
    }


    function PointExportListExportedTab(){
        sendPoint(PointEvent.CakeExportList,{ cake_operate: PointExportListOperate.ExportedTab })
    }

    function PointExportListExportingTab(){
        sendPoint(PointEvent.CakeExportList,{ cake_operate: PointExportListOperate.ExportingTab })
    }

    function PointExportListBillingRulesPopup(){
        sendPoint(PointEvent.CakeExportList,{ cake_operate: PointExportListOperate.BillingRulesPopup })
    }


    return {
        PointExportTable,
        PointInitExportTable,
        PointExport,
        PointExportThumbnail,
        PointExportClick,
        PointExportContinue,
        PointExportRecharge,

        PointExportListExportedTab,
        PointExportListExportingTab,
        PointExportListBillingRulesPopup,

        PointClickExportDetail: commonExportListPoint(PointExportListOperate.ClickExportDetail)
    }
}
