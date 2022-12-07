export const RatioType = 22 // 自由比例
export const DefaultIdPhotoType = 28
export const FixedRatioType = 29 // 固定比例
export const OriginType = 0

export const cropTypeOptions = [
    {
        label: '固定比例',
        type: FixedRatioType,
    },
    {
        label: '长 x 宽 x 分辨率',
        type: DefaultIdPhotoType,
        line: true
    },
    {
        label: '自由尺寸',
        type: RatioType,
        line: true
    },
]

export const recommendRadioOptions = [
    {
        label: '1 : 1',
        type: 23,
        valid: ['1:1'],
        size: {
            width: 1,
            height: 1
        }
    },
    {
        label: '4 : 5',
        type: 24,
        valid: ['4:5', '5:4'],
        size: {
            width: 4,
            height: 5
        }
    },
    {
        label: '5 : 7',
        type: 25,
        valid: ['5:7', '7:5'],
        size: {
            width: 5,
            height: 7
        }
    },
    {
        label: '2 : 3',
        type: 26,
        valid: ['2:3', '3:2'],
        size: {
            width: 2,
            height: 3
        }
    },
    {
        label: '16 : 9',
        type: 27,
        valid: ['16:9', '9:16'],
        line: true,
        size: {
            width: 16,
            height: 9
        }
    }
]

// 证件照类型
export const idPhotoOptions = [
    {
        label: '证件照大图',
        size: {
            width: 8.47,
            height: 8.47
        },
        type: 17,
        faceNum: [1,2]
    },
    {
        label: '1寸',
        size: {
            width: 2.54,
            height: 3.56
        },
        type: 5,
        faceNum: [1,2]
    },
    {
        label: '2寸',
        size: {
            width: 3.3,
            height: 4.8
        },
        type: 6,
        faceNum: [1,2]
    },
    {
        label: '结婚登记大图',
        size: {
            width: 15,
            height: 10
        },
        type: 16,
        faceNum: [2] // 仅支持2个人
    },
    {
        label: '结婚登记',
        size: {
            width: 6,
            height: 4
        },
        type: 15,
        faceNum: [2]
    },
    {
        label: '结婚登记',
        size: {
            width: 5.3,
            height: 3.5
        },
        type: 10,
        faceNum: [2]
    },
    {
        label: '身份证',
        size: {
            width: 2.6,
            height: 3.2
        },
        type: 4,
        faceNum: [1,2]
    },
    {
        label: '驾驶证',
        size: {
            width: 2.2,
            height: 3.2
        },
        type: 2,
        faceNum: [1,2]
    },
    {
        label: '入学照',
        size: {
            width: 1.97,
            height: 2.57
        },
        type: 1,
        faceNum: [1,2]
    },
    {
        label: '公务员考试',
        size: {
            width: 2.5,
            height: 3.5
        },
        type: 3,
        faceNum: [1,2]
    },
    {
        label: '司法考试',
        size: {
            width: 3.5,
            height: 5.3
        },
        type: 9,
        faceNum: [1,2]
    },
    {
        label: '学信网',
        size: {
            width: 4.06,
            height: 5.42
        },
        type: 13,
        faceNum: [1,2]
    },
    {
        label: '护照',
        size: {
            width: 3.3,
            height: 4.8
        },
        type: 7,
        faceNum: [1,2]
    },
    {
        label: '马来西亚签证',
        size: {
            width: 3.5,
            height: 5
        },
        type: 11,
        faceNum: [1,2]
    },
    {
        label: '美国签证',
        size: {
            width: 5.1,
            height: 5.1
        },
        type: 14,
        faceNum: [1,2]
    },
    {
        label: '欧洲签证',
        size: {
            width: 3.5,
            height: 4.5
        },
        type: 8,
        faceNum: [1,2]
    },
    {
        label: '日本签证',
        size: {
            width: 4.5,
            height: 4.5
        },
        type: 12,
        faceNum: [1,2]
    },
]

export const recommendRadioTypes = recommendRadioOptions.map(item => item.type)
export const idPhotoTypes = idPhotoOptions.map(item => item.type)
export const needSetRecommendCropType = [OriginType, FixedRatioType].concat(recommendRadioTypes)

export const cropTypes = [OriginType, FixedRatioType, RatioType].concat(recommendRadioTypes)
export const allIdPhotoTypes = [DefaultIdPhotoType].concat(idPhotoTypes)

// 显示比例输入框的类型
export const showRatioInputTypes = [OriginType, FixedRatioType].concat(recommendRadioTypes)

export default [
    {
        label: '原始尺寸',
        type: OriginType,
    },
    ...cropTypeOptions,
    ...recommendRadioOptions,
    ...idPhotoOptions.map(item => {
        item.label = `${item.label} ${item.size?`(${item.size.width}x${item.size.height}CM)`: ''}`
        return item
    })
]
