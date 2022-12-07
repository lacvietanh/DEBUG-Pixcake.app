const defaultSingleRatio = 5 / 200
const defaultDoubleRatio = 10 / 200

export const paletteParamLayout = {
    whiteBalanceParamCfg: [
        {
            'label': '色温',
            'key': 'EnhanceEditColorTemperatureRelative', // 0.025 五步到达最大
            'alias': 'EnhanceEditColorTemperature',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio / 2,
            doubleRatio: defaultDoubleRatio / 2
        },
        {
            'label': '色调',
            'key': 'EnhanceEditHueRelative',  // 0.0125 五步到达最大
            'alias': 'EnhanceEditHue',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio / 2,
            doubleRatio: defaultDoubleRatio / 2
        }
    ],
    colorParamCfg: [
        {
            'label': '曝光度',
            'key': 'EnhanceEditExposure',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: 6 / 200,
            doubleRatio: 10 / 200
        },
        {
            'label': '对比度',
            'key': 'EnhanceEditContrast',
            // 是否展示此处底部的分割线
            'showSeparatorLine': true,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '高光',
            'key': 'EnhanceEditHighlight',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '阴影',
            'key': 'EnhanceEditShadow',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '白色',
            'key': 'EnhanceEditWhite',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '黑色',
            'key': 'EnhanceEditBlack',
            'showSeparatorLine': true,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '清晰度',
            'key': 'EnhanceEditCameraRawSharpen',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '鲜艳度',
            'key': 'EnhanceEditCameraRawVibrance',
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        },
        {
            'label': '饱和度',
            'key': 'EnhanceEditSaturation',
            'showSeparatorLine': true,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: defaultSingleRatio,
            doubleRatio: defaultDoubleRatio
        }
    ]
}
