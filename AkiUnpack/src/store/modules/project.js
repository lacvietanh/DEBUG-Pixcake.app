import locs from '@/utils/locs'
import {
    PALETTE_PRESETS_CFG_TABLE,
    PROJECT_ID,
    PROJECT_NAME,
    PROJECT_TABLE,
    THUMBNAIL_TABLE
} from '@/universal/types/config'
import {
    findAll as findAllProjectFromDao,
    findBatchProjects as findBatchProjectsFromDao
} from '@/universal/datastore/projectDao'
import Project from '@/model/ProjectModel'
import Vue from 'vue'
import DBIpcRender from '@/irender/DBIpcRender'
import { postAddProject as addProjectToAPi } from '@/api/projectApi'
import {
    findByProjectId as thumbnailFindByProjectId,
    findPalettePresetIdByProjectId,
    findPresetIdByProjectId,
    findPresetIdsByThumbIds
} from '@/universal/datastore/thumbnailDao'
import { printCallStack } from '@/universal/utils/common'
// import { filterExtendPresetIds } from '@/universal/datastore/presettingDao';
// import { filterExtendPresetSuitIds } from '@/universal/datastore/presetSuitDao';

const localProjectKey = '_SetActiveProjectId'

function distinctProjects(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i.id]) {
            result.push(i)
            obj[i.id] = 1
        }
    }

    return result
}

export default {
    namespaced: true,

    state: {
        projects: [], //已加载的项目列表
        // projectCountsMap: null,
        activeProjectId: Number(locs.get(PROJECT_ID)) || -1,
        lastProjectUpdateTime: null,
        entryProjectCache: {},
        filtersSelectCache: {}, // 滤镜选择缓存
        skySelectCache:{},
        thumbnailSelectNumber: 0,
        refineUUID: ''
    },

    getters: {
        previewRouterName: (state) => {
            if (state.entryProjectCache.hasOwnProperty(state.activeProjectId)) {
                const routeName = state.entryProjectCache[state.activeProjectId]
                return routeName || 'photoFinishing'
            }

            return 'photoFinishing'
        },
        projects: (state) => state.projects,
        activeProject: (state) => {
            if (state.activeProjectId > 0) {
                return state.projects.find(item => item.id === state.activeProjectId)
            } else {
                return {
                    id: -1,
                    name: ''
                }
            }
        },
        activeProjectId: (state) => state.activeProjectId,
        // projectCountsMap: (state) => state.projectCountsMap || new Map(),
        lastProjectUpdateTime: (state) => state.lastProjectUpdateTime,

        thumbnailSelectNumber: (state) => state.thumbnailSelectNumber,

        filterPathCache: (state, getters, rootState) => {
            const projectId = state.activeProjectId
            const imgPath = rootState.thumbnail.activeThumbnail.imgPath
            return state.filtersSelectCache[`${projectId}_${imgPath}`] || {}
        },

        skyPathCache: (state, getters, rootState) => {
            const projectId = state.activeProjectId
            const imgPath = rootState.thumbnail.activeThumbnail.imgPath
            return state.skySelectCache[`${projectId}_${imgPath}`] || {}
        },

        refineUUID: (state) => state.refineUUID
    },

    mutations: {
        _SetLastProjectUpdateTime(state, updateTime) {
            state.lastProjectUpdateTime = updateTime
        },

        _SetThumbnailSelectNumber(state, number) {
            state.thumbnailSelectNumber = number
        },

        _SetActiveProjectId(state, id) {
            state.activeProjectId = Number(id)
            locs.set(PROJECT_ID, id)
        },

        _SetProjectList(state, list) {
            if (state.projects == null || state.projects.length === 0) {
                state.projects = list
            }
        },

        _AddProjectList(state, list) {
            if (state.projects == null || state.projects.length === 0) {
                state.projects = []
            }

            state.projects = distinctProjects(state.projects, list) //.push.apply(state.projects,list)
        },

        _AddProject(state, project) {
            state.projects.unshift(project)
        },

        // _SetProjectCountsMap(state, map) {
        //     if (state.projectCountsMap == null || state.projectCountsMap.size() == 0) {
        //         state.projectCountsMap = map
        //     }
        // },

        _UpdateProjectCount(state, data) {
            let count = data.count
            let project = { ...data.project }
            const newProject = Project.createProject(project)
            newProject.thumbnailCounts = count
            const index = state.projects.findIndex(item => item.id === project.id)
            Vue.set(state.projects, index, newProject)
        },

        // 更新项目
        _UpdateProject(state, project) {
            const newProject = Project.createProject(project)
            const index = state.projects.findIndex(item => item.id === project.id)

            Vue.set(state.projects, index, newProject)
        },

        _RemoveProject(state, id) {
            const index = state.projects.findIndex(item => item.id === id)
            state.projects.splice(index, 1)
        },

        _BindTemplateSuit(state, templateSuit) {
            if (state.activeProjectId === -1) return
            const project = state.projects.find(item => item.id === activeProjectId)
            project.setTemplateSuitId(templateSuit.id)
        },

        _ClearProjectData(state) {
            locs.set(localProjectKey, -1)
            state.activeProjectId = -1
        },

        _ClearProjectInfo(state) {
            state.projects = []
            // state.projectCountsMap = null
            state.activeProjectId = -1
        },
        _SortProjectsWithUpdateTime(state) { //根据时间戳对所有的项目进行排序
            let len = state.projects.length
            for (let j = 0; j < len; j++) {
                let nowUpdateTime = state.projects[j].update_time
                let nIndex = j
                for (let i = j + 1; i < len; i++) {
                    let tempUpdateTime = state.projects[i].update_time
                    if (tempUpdateTime > nowUpdateTime) {
                        nowUpdateTime = tempUpdateTime
                        nIndex = i
                    }
                }
                if (nIndex !== j) {
                    state.projects[j] = state.projects.splice(nIndex, 1, state.projects[j])[0]
                }
            }
        },

        _SetEntryProjectCache(state, routeName) {
            Vue.set(state.entryProjectCache, state.activeProjectId, routeName)
        },

        _SetFiltersSelectCache(state, data) {
            if (!state.filtersSelectCache[data.key]) {
                Vue.set(state.filtersSelectCache, data.key, {})
            }
            Vue.set(state.filtersSelectCache[data.key], data.path, data.value)
        },

        _SetSkySelectCache(state,data){
            if (!state.skySelectCache[data.key]) {
                Vue.set(state.skySelectCache, data.key, {})
            }
            Vue.set(state.skySelectCache[data.key], data.path, data.value)
        },

        _SetRefineUUID(state, value) {
            state.refineUUID = value
        }
    },

    actions: {
        /** 读取 图像调节预设
         * @param data
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_GetProjectList({ commit, rootGetters }, data) {
            return new Promise((resolve, reject) => {
                findAllProjectFromDao(rootGetters.userId).then(async res => {
                    if (res == null || res.length === 0) {
                        resolve({ list: [] })
                        return
                    }

                    let projectList = []

                    res.forEach((item, index) => {
                        let project = Project.createProject(item)
                        projectList.push(project)
                    })


                    for (const project of projectList) {
                        await project.thumbnailCount()
                    }


                    commit('_SetProjectList', projectList)
                    resolve({ list: projectList })
                })
            })
            //     .then(res => {
            //     new Promise(async (resolve, reject) => {
            //         let projects = res.list
            //         let projectCountsMap = new Map()
            //         for (const project of projects) {
            //             projectCountsMap[project.id] = await project.thumbnailCount()
            //         }
            //         resolve({ map: projectCountsMap })
            //     }).then(res => {
            //         commit('_SetProjectCountsMap', res.map);
            //     })
            // })
        },

        /**
         * 请求接口 并插入项目数据库
         * @param project
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_InsertProject({ commit, state }, project) {
            let res = null
            try {
                res = await addProjectToAPi(project.name)

                project.id = res.project_id
                if (project.id === null || project.id === undefined){
                    console.error("request remote projectId name:",project.name," error!!!")
                    return Promise.reject("生成工程id出错了")
                }
                await DBIpcRender.insertToDB(PROJECT_TABLE, project)
                commit('_AddProject', project)
                return Promise.resolve(project)
            } catch (e) {
                return Promise.reject(e)
            }
        },

        /**
         * 更新项目信息
         * @param data
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_UpdateProject({ commit, state }, data) {
            const { id, modify } = data
            const project = { ...state.projects.find(item => item.id === id) }

            let keys = []
            if (modify && Object.keys(modify).length > 0) {
                for (const key in modify) {
                    if (project.hasOwnProperty(key)) {
                        keys.push(key)
                        project[key] = modify[key]
                    }
                }
            }
            let result = await DBIpcRender.updateByKeys(PROJECT_TABLE, project, keys)

            if (result) {
                const tempProject = { ...project }
                // tempProject.update_time = result.update_time
                // tempProject.visit_time = result.visit_time
                commit('_UpdateProject', tempProject)

                console.log('==> updateProject res: ', result)
            } else {
                console.log('==> updateProject err: ', result)
            }
        },

        // 异步更新项目
        ACT_AsyncUpdateProject({ commit, dispatch, state }, data) {
            return new Promise(async (resolve, reject) => {
                console.log(`asyncUpdateProject: ${JSON.stringify(data)}`)

                const { id, path, importTimes, thumbnailPaths, thumbnailNumber } = data
                let project = state.projects.find(item => item.id === id)

                // 清空所有缩略图
                if (path === null || path === undefined) {
                    await dispatch('ACT_UpdateProject', {
                        id,
                        modify: {
                            path: '',
                            projectIcon: '',
                            importTimes: 0
                        }
                    })
                    resolve(path)
                    return
                }

                let albumIcons = thumbnailPaths || []
                let modifyParam = {
                    path,
                    importTimes: importTimes
                }

                if (modifyParam.importTimes == null || modifyParam.importTimes == undefined) {
                    delete modifyParam.importTimes
                }

                // 如果存在缩略图路径，则拼上
                if (albumIcons && albumIcons.length) {
                    modifyParam.projectIcon = albumIcons.join(',')
                }


                if (thumbnailNumber && thumbnailNumber > 0) {

                    commit('_UpdateProjectCount', { project: project, count: thumbnailNumber })

                }
                await dispatch('ACT_UpdateProject', { id, modify: modifyParam })


                resolve(path)
            })
        },

        /**
         * 删除项目信息
         * @param id
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_DeleteProject({ commit, state, dispatch }, id) {
            console.log(`ACT_DeleteProject.....begin`)
            printCallStack()
            for (const project of state.projects) {
                if (project.id === id) {
                    let res = await DBIpcRender.updateByKeys(PROJECT_TABLE, {
                        ...project,
                        disable: true
                    }, ['disable'])
                    if (res) {
                        // 删除缩略图数据及关联的预设
                        const dataItems = await findPalettePresetIdByProjectId(id)
                        if (dataItems) {
                            const paletteIds = dataItems.map(item => item.palettePresetId)
                            await dispatch('presetSuit/ACT_BatchDeletePalettePreset', { ids: paletteIds }, { root: true })
                        }
                        await DBIpcRender.delete(THUMBNAIL_TABLE, 'projectId', id)
                    }
                    break
                }
            }
            commit('_RemoveProject', id)
        },
        /**
         * 删除工程下面的缩略图、预设等资源
         */
        async ACT_DeleteResInProject({ commit, state, dispatch }, { id, canDelSuitAndBeautifyPreset }) {
            // 删除缩略图数据及关联的预设
            const dataItems = await findPresetIdByProjectId(id)
            if (dataItems) {
                let paletteIds = []
                let beautifyIds = []
                let suitIds = []
                for (const it of dataItems) {
                    paletteIds.push(it.palettePresetId)
                    beautifyIds.push(it.presetId)
                    suitIds.push(it.presetSuitId)
                }
                dispatch('presetSuit/ACT_BatchDeletePalettePreset', { ids: paletteIds }, { root: true })
                if (canDelSuitAndBeautifyPreset) {
                    // 可删除临时预设
                    // =2为临时预设
                    暂时屏蔽预设相关
                    let ret = await filterExtendPresetIds(beautifyIds, 'sourceType=2')
                    beautifyIds = ret.map(it => it.extendId)
                    await dispatch('presetSuit/ACT_BatchDeleteBeautifyPreset', {
                        ids: beautifyIds,
                        key: 'extendId'
                    }, { root: true })
                    ret = await filterExtendPresetSuitIds(suitIds, 'sourceType=2')
                    suitIds = ret.map(it => it.extendId)
                    await dispatch('presetSuit/ACT_BatchDeleteSuitPreset', {
                        ids: suitIds,
                        key: 'extendId'
                    }, { root: true })
                }
            }
            await DBIpcRender.delete(THUMBNAIL_TABLE, 'projectId', id)
        },
        /**
         * 二次导入的删除工程下面的缩略图、预设等资源
         */
        async ACT_DeleteResInProjectByThumbIds({ commit, state, dispatch }, {
            thumbIds,
            projectId,
            canDelSuitAndBeautifyPreset // 删除临时美化和套装预设
        }) {
            const idList = await findPresetIdsByThumbIds(thumbIds, projectId)
            const palettePresetIds = []
            let beautifyPresetIds = []
            let presetSuitIds = []
            for (const it of idList) {
                palettePresetIds.push(it.palettePresetId)
                beautifyPresetIds.push(it.presetId)
                presetSuitIds.push(it.presetSuitId)
            }
            await dispatch('presetSuit/ACT_BatchDeletePalettePreset', { ids: palettePresetIds }, { root: true })
            // 删除临时的套装和美化预设

            if (canDelSuitAndBeautifyPreset) {
                // 可删除临时预设
                // =2为临时预设
                let ret = await filterExtendPresetIds(beautifyPresetIds, 'sourceType=2')
                beautifyPresetIds = ret.map(it => it.extendId)
                await dispatch('presetSuit/ACT_BatchDeleteBeautifyPreset', {
                    ids: beautifyPresetIds,
                    key: 'extendId'
                }, { root: true })
                ret = await filterExtendPresetSuitIds(presetSuitIds, 'sourceType=2')
                presetSuitIds = ret.map(it => it.extendId)
                await dispatch('presetSuit/ACT_BatchDeleteSuitPreset', {
                    ids: presetSuitIds,
                    key: 'extendId'
                }, { root: true })
            }
            await dispatch('thumbnail/ACT_BatchDeleteThumbnail', { ids: thumbIds }, { root: true })
        },
        /**
         * 滤镜选择缓存
         * @param commit
         * @param state
         * @param rootState
         * @param data
         * @returns {Promise<void>}
         * @constructor
         */
        ACT_SetFiltersSelectCache({ commit, state, rootState }, data) {
            if (data && data.path) {
                const projectId = state.activeProjectId
                const imgPath = rootState.thumbnail.activeThumbnail.imgPath
                commit('_SetFiltersSelectCache', { key: `${projectId}_${imgPath}`, path: data.path, value: data.value })
                console.log('filtersSelectCache', state.filtersSelectCache)
            }
        },

        ACT_SetSkySelectCache({ commit, state, rootState }, data) {
            if (data && data.path) {
                const projectId = state.activeProjectId
                const imgPath = rootState.thumbnail.activeThumbnail.imgPath
                commit('_SetSkySelectCache', { key: `${projectId}_${imgPath}`, path: data.path, value: data.value })
                console.log('skySelectCache', state.skySelectCache)
            }
        },
        /** 读取 图像调节预设
         * @param data
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_GetBatchProjects({ commit, rootGetters }, data) {
            // rowUpdateTime为更新时间戳做游标，pageCount为单页内的记录数
            let { rowUpdateTime, pageCount } = data
            return new Promise((resolve, reject) => {
                findBatchProjectsFromDao(rootGetters.userId, {
                    rowUpdateTime,
                    pageCount
                }).then(async res => {
                    if (res == null || res.length === 0) {
                        resolve({ list: [] })
                        return
                    }

                    let projectList = []

                    res.forEach((item, index) => {
                        let project = Project.createProject(item)
                        projectList.push(project)
                    })


                    for (const project of projectList) {
                        await project.thumbnailCount()
                    }

                    commit('_AddProjectList', projectList)
                    resolve({ list: projectList })
                })
            })
        }
    }
}
