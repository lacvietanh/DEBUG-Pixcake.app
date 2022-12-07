/**
 * 设置相关API
 */
import { createInstance, getBaseURL, provideInterceptors, throwError } from '@/utils/http'
import { get } from 'lodash'
import { CUR_PRESET_VERSION } from '@/constants/preset-def'

let instance = null

export function getInstance() {
  if (!instance) {
    instance = provideInterceptors(
      createInstance({
        baseURL: getBaseURL() + '/v1/api/settings',
        crossDomain: false,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }), { request: true }
    )
  }
  return instance
}


// 预设分类
let instance1 = null

export function getInstance1() {
  if (!instance1) {
    instance1 = provideInterceptors(
      createInstance({
        baseURL: getBaseURL() + '/v1/api/preset_class',
        crossDomain: false,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }), { request: true }
    )
  }
  return instance1
}



// 获取预设v2
let instance2 = null
export function getInstance2() {
  if (!instance2) {
    instance2 = provideInterceptors(
      createInstance({
        baseURL: getBaseURL() + '/v2/api/settings',
        crossDomain: false,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }), { request: true }
    )
  }
  return instance2
}


/**
 * 获取设置
 * @param type 设置类型 1：导出设置 2：预设， ext...
 * @param isSystem 是否是系统设置, false 就是当前类型自己的设置
 * @returns {Promise<void>}
 */
export async function getSetting(type, isSystem) {
  try {
    let params = {
      type: type,
      is_system: isSystem
    }
    const response = await getInstance().get('/get', { params })
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

//------Preset set correlation------
/**
 *
 * Get the preset settings
 * @param isSystem
 * @param min_version:最小版本号 int 类型
 *
 */
export async function getPresetSuit(isSystem, min_version) {
  try {
    let params = {
      type: 2,
      is_system: isSystem,
      // min_version: min_version
      min_version: min_version // 获取所有预设
    }
    const response = await getInstance().get('/get', { params })
    return get(response, 'data.data', {})
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'Parameter error'
        default: {
        }
      }
    })
  }
}

/**
 * 创建设置
 * @param json 设置的内容
 * @param settingName 设置的命名
 * @returns {Promise<void>}
 * 预设对象json:{
 *    beautify:{},
 *    palette:{},
 *    cover:'http://****.jpg'
 * }
 */
export async function createPresetSuit(jsonObject, settingName, class_id, created_at = null) {
  try {
    let { beautify, palette, cover } = jsonObject
    let params = {
      type: 2,
      info: JSON.stringify(beautify),
      info1: JSON.stringify(palette),
      name: settingName,
      class_id: class_id,
      min_version: CUR_PRESET_VERSION
    }
    if (created_at) {
      params.created_at = created_at
    }
    const response = await getInstance().post('/create', params)
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'Parameter error'
        default: {
        }
      }
    })
  }
}

/**
 * 更新设置
 * @param settingId 设置ID
 * 预设对象json:{
 *    beautify:{},
 *    palette:{},
 *    cover:'http://****.jpg'
 * }
 * @param settingName 设置的命名
 * @returns {Promise<void>}
 */
// export async function updatePresetSuit(settingId, jsonObject, settingName) {
//     try {
//         let { beautify, palette, cover } = jsonObject
//         let params = {
//             setting_id: parseInt(settingId),
//             info: JSON.stringify(beautify),
//             info1: JSON.stringify(palette),
//             name: settingName
//         }
//         const response = await getInstance().post('/update', params)
//         const res = get(response, 'data.data', {})
//         return res
//     } catch (err) {
//         throwError(err, code => {
//             console.log(code)
//             switch (code) {
//                 case 400:
//                     return 'parameter Err'
//                 default:
//                     {}
//             }
//         })
//     }
// }


/**
 * 更新设置
 * @param settingId 设置ID
 * 预设对象json:{
 *    beautify:{},
 *    palette:{},
 *    cover:'http://****.jpg'
 * }
 * @param settingName 设置的命名
 * @returns {Promise<void>}
 */
export async function updatePresetName(data) {
  try {
    let params = {
      setting_id: parseInt(data.id),
      name: data.name
    }
    const response = await getInstance().post('/update', params)
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'Parameter error'
        default: {
        }
      }
    })
  }
}


/**
 * 创建设置
 * @param type 设置类型 1：导出设置 2：预设， ext...
 * @param json 设置的内容
 * @param settingName 设置的命名
 * @returns {Promise<void>}
 */
export async function createSetting(type, json, settingName) {
  try {
    let params = {
      type: type,
      info: json,
      name: settingName
    }
    const response = await getInstance().post('/create', params)
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 更新设置
 * @param settingId 设置ID
 * @param json 设置的内容
 * @param settingName 设置的命名
 * @returns {Promise<void>}
 */
export async function updateSetting(settingId, json, settingName) {
  try {
    let params = {
      setting_id: parseInt(settingId),
      info: json,
      name: settingName
    }

    const response = await getInstance().post('/update', params)
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}


/**
 * 删除一个预设
 * @param projectId
 * @param imageId
 * @returns {Promise<any>}
 */
export async function deleteSettingByApi(settingId) {
  try {
    let params = {
      setting_id: parseInt(settingId)
    }

    const response = await getInstance().delete('/delete', {
      data: params
    })
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/*
    预设分享和导入相关的api
 */

// 分享
export async function getSharePresetToken(settingId) {
  try {
    let params = {
      setting_id: parseInt(settingId)
    }
    const response = await getInstance().post('/share', params)
    return get(response, 'data.data', {})
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/*
    获得分享的详情
 */
export async function getSharePresetInfo(share_token) {
  try {
    //todo 需要看下instance2的地址错误问题
    const response = await getInstance2().get('/share/info', { params: { share_token: share_token } })

    return get(response, 'data.data', {})
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/*
    mini_version:为预设的最小版本号
    获得分享的详情
    code为0代表导入成功，返回用户当前所有预设
    code为37，分享口令不存在
    code为38，来源自己的分享的预设
    code为39，重复导入
    code为40，分享口令对应的设置不存在（有可能已被删除）
    code其他，内部错误
 */

export async function importSharePreset(share_token, mini_version) {
  try {
    const response = await getInstance2().post('/import/from_token', {
      share_token: share_token,
      setting_version: mini_version
    })
    return get(response, 'data.data', [])
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 新建一个预设分类
 * @param name
 * @returns {Promise<any>}
 */
export async function createPresetClass(data) {
  try {
    const response = await getInstance1().post('/create', {
      name: data
    })
    return get(response, 'data.data', [])
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 获取预设分类
 * @returns {Promise<any>}
 */
export async function getPresetClass(data) {
  try {
    const response = await getInstance1().get('/get')
    return get(response, 'data.data', [])
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 获取分类下的预设
 * @returns {Promise<any>}
 */
export async function getPresetItem(id) {
  try {
    let params = {
      type: 2,
      class_id: id || ''
    }
    const response = await getInstance2().get('/get', { params })
    return get(response, 'data.data', [])
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 删除一个预设分类
 * @param projectId
 * @param imageId
 * @returns {Promise<any>}
 */
export async function deletePresetClassByApi(id) {
  try {
    let params = {
      id: parseInt(id)
    }

    const response = await getInstance1().delete('/delete', {
      data: params
    })
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      console.log(code)
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 更新预设分类名称（重命名）
 * @param id
 * @param name
 * @returns {Promise<any>}
 */
export async function updatePresetClassByApi(args) {
  try {
    let params = {
      id: parseInt(args.id),
      name: args.name
    }

    const response = await getInstance1().post('/update', params)
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 批量分享
 * @param ids_info 批量分享的预设id的json信息
 * @returns {Promise<any>}
 */
export async function batchSharePresetByApi(id_json) {
  try {
    let params = {
      ids_info: id_json
    }

    const response = await getInstance().post('/batch/share', params)
    const res = get(response, 'data.data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 批量删除
 * @param ids_info 批量删除的预设id的json信息
 * @returns {Promise<any>}
 */
export async function batchDeletePresetByApi(id_json) {
  try {
    let params = {
      ids_info: id_json
    }

    const response = await getInstance().delete('/batch/delete', {
      data: params
    })
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 更新分类排序
 * @param order_info 排序后的json信息
 * @returns {Promise<any>}
 */
export async function updatePresetClassOrder(order_info) {
  try {
    let params = {
      order_info: order_info
    }

    const response = await getInstance1().post('/update_order', params)
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}

/**
 * 更新预设排序
 * @param order_info 排序后的json信息
 * @returns {Promise<any>}
 */
export async function updatePresetItemOrder(order_info) {
  try {
    let params = {
      order_info: order_info
    }

    const response = await getInstance().post('/update_order', params)
    const res = get(response, 'data', {})
    return res
  } catch (err) {
    throwError(err, code => {
      switch (code) {
        case 400:
          return 'parameter Err'
        default: {
        }
      }
    })
  }
}
