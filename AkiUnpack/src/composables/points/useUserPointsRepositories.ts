import useBaseRepositories, { PointQuery } from './useBaseRepositories'
import { PointEvent, PointHelpOperate } from '@/constants/pointsDef'

interface IData {
    cake_operate: string,
    cake_position: string
}

interface useUserPointsRepositories {
    PointLogin: (operate: string) => void

    PointHelpIcon: () => void
    PointHotKey: () => PointQuery<IData>
    PointCustomerService: () => PointQuery<IData>
    PointHelpMenuClick: (menuKey: string) => void
    PointUserMenuClick: (menuKey: string) => void
    PointNavMenuClick: (menuKey: string) => void

    PointUserInfo: (operate: string) => void
    PointContentUs: (isVip: boolean) => void
    PointLogout: (isVip: boolean) => void
}

export default function useUserPointsRepositories(): useUserPointsRepositories {
    const { sendPoint, formatPointData, getPointRouteName } = useBaseRepositories()

    function PointLogin(operate: string) {
        sendPoint('cake_login', { cake_operate: operate })
    }

    function PointUserInfo(operate: string) {
        sendPoint(PointEvent.CakeAvatar, { cake_operate: operate })
    }

    function PointContentUs(isVip: boolean) {
        const member = isVip ? 'member' : 'non_member'
        sendPoint(PointEvent.CakeAvatar, { cake_operate: 'click_about_us_' + member })
    }

    function PointLogout(isVip: boolean) {
        const member = isVip ? 'member' : 'non_member'
        sendPoint(PointEvent.CakeAvatar, { cake_operate: 'click_sign_out_' + member })
    }

    return {
        PointLogin,

        PointNavMenuClick: (menuKey: string) => sendPoint(PointEvent.CakeNavMenu, {
            cake_operate: menuKey,
            cake_position: getPointRouteName()
        }),

        PointHelpIcon: () => {
            sendPoint(PointEvent.CakeHelp, {
                cake_operate: PointHelpOperate.HelpIcon,
                cake_position: getPointRouteName()
            })
        },

        PointHotKey() {
            return formatPointData(PointEvent.CakeHelp, {
                cake_operate: PointHelpOperate.HotKey,
                cake_position: getPointRouteName()
            })
        },

        PointCustomerService: () => formatPointData(PointEvent.CakeHelp, {
            cake_operate: PointHelpOperate.CustomerService,
            cake_position: getPointRouteName()
        }),

        PointHelpMenuClick: (menuKey: string) => sendPoint(PointEvent.CakeHelp, {
            cake_operate: menuKey,
            cake_position: getPointRouteName()
        }),

        PointUserMenuClick: (menuKey: string) => sendPoint(PointEvent.CakeAvatar, {
            cake_operate: 'click_user_menu_' + menuKey,
            cake_position: getPointRouteName()
        }),

        PointUserInfo,
        PointContentUs,
        PointLogout
    }
}
