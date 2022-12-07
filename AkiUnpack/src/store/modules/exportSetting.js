import { getSetting as getSettingFromApi } from '@/api/settingApi'
// import { check as diskusageCheckDisk } from 'diskusage';

export default {
    state: {
        id: -1,
        exportSettingModel: null,
        macDiskSize: -1,
        winDiskSize: -1,
        rootPath: null

    },
    getters: {
        diskSize: (state) => state.diskSize
    },
    mutations: {
        initExportSetting(state, model) {
            state.exportSettingModel = model.info
            state.id = model.id
        },
        // setDiskSize(state, { workSpaceDiskInfo, isWin }) {
        //     let diskSize = 0
        //     if (isWin) {
        //         diskSize = workSpaceDiskInfo.available / 1024 / 1024 / 1024
        //     } else {
        //         diskSize = workSpaceDiskInfo.available / 1000 / 1000 / 1000  //g的容量 (按制造商的来看)
        //     }
        //     state.diskSize = diskSize //单位g
        //     debugger
        // },
        setDiskSize(state, val) {
            state.macDiskSize = val
        },
        setWinDiskSize(state, val) {
            state.winDiskSize = val
        },
        setRootPath(state, val) {
            let newRootPath = val.slice(0, 2)
            state.rootPath = newRootPath
        }
    },

    actions: {

        asyncInitExportSetting(context) {
            // 先拉取个人的，如果个人的为空
            getSettingFromApi(1, false).then(res => {
                if (res == null) {
                    getSettingFromApi(1, true).then(res => {
                        if (res != null && res.length > 0) {
                            context.commit('initExportSetting', res[0])
                        }
                    })
                } else {
                    if (res.length > 0) {
                        context.commit('initExportSetting', res[0])
                    }
                }
            })
        },

        //导出时计算文件夹所在磁盘空间大小
        async checkWindowDiskSpace({ state, commit, dispatch }, finalSavePath) {
            let rootDisk = finalSavePath.slice(0, 3)
            // const sysDiskInfo = await diskusageCheckDisk(rootDisk)
            const sysDiskInfo = { available: 1024 * 1024 * 1024 * 500 }
            let WindowDiskSize = JSON.parse(JSON.stringify(sysDiskInfo)).available / 1024 / 1024 / 1024
            commit('setWinDiskSize', WindowDiskSize)
            commit('setRootPath', finalSavePath)
        }
    }

}
