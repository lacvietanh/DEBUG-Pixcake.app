import { getOrderByApi, createOrderByApi } from '@/api/orderApi'
import { fetchServiceIcons } from '@/api/commonApi'
import OrderModel from '@/model/OrderModel'
import { IS_CLIENT_PIX_PIE } from '#/types/config'
import { OrderType } from '@/constants'

export default {
    state: {
        list: [],
        serviceUrl: null,
        vipCardDesc: '',
        selectVipCardId: '',
        showPaySuccess: false
    },
    getters: {
        vipCardDesc: (state) => state.vipCardDesc
    },
    mutations: {

        initOrder(state, list) {
            state.list = list
        },

        _initService(state, data) {
            state.serviceUrl = data.url
            if (data.json_info) {
                try {
                    const json = JSON.parse(data.json_info) || {}
                    console.log('_initService', json)
                    state.vipCardDesc = json.desc || ''
                } catch (e) {
                }
            }
        },

        _SetSelectVipCardId(state, id) {
            state.selectVipCardId = id
        },
        _SetShowPaySuccess(state, status) {
            state.showPaySuccess = status
        }
    },
    actions: {

        asyncLoadServiceInfo({ commit, state }) {
            if (state.serviceUrl && state.vipCardDesc) {
                return
            }
            fetchServiceIcons().then(res => {
                if (res && res.length > 0) {
                    commit('_initService', res[0] || {})
                }
            })
        },

        asyncLoadOrders({ commit }) {
            getOrderByApi().then(res => {
                if (res && res.length > 0) {
                    const list = []
                    res.forEach(jsonItem => {
                        // 仅显示商务
                        if (IS_CLIENT_PIX_PIE && jsonItem.type !== OrderType.Business) return
                        const orderItem = OrderModel.createOrder(jsonItem)
                        list.push(orderItem)
                    })
                    commit('initOrder', list)
                }
            })
        }
    }
}
