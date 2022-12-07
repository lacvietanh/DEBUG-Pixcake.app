// 功能权限
export default {

    state: {
        hasDownloadPermission: false, // 下载权限
        hasDownloadActive: false
    },
    mutations: {
        changeDownloadPermission(state, hasPermission) {
            state.hasDownloadPermission = hasPermission
        },

        changeDownloadActive(state, isActive) {
            state.hasDownloadActive = isActive
        }
    }

}
