import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

/*
* 背景增强
* */

export const getBackgroundEnhance = (bgCleanModeDefault: number = -1, bgCleanMooreModeDefault: number = -1): any => {
    const initDefaultMode = bgCleanModeDefault === -1 // 未根据图片初始化默认值

    return [
        {
            name: '纯色背景祛瑕疵',
            key: EffectParamEnum.BgCleanSwitch,
            value: 0,
            max: 1,
            cType: 'switch',
            tip: ['纯色背景祛瑕疵是专门针对纯色背景', '研发的一键祛瑕疵功能。开启后，AI', '会自动识别纯色背景并祛除瑕疵，非', '纯色背景无效果。'
            ],
            beta: true
        },

        {
            name: '背景调整',
            cType: 'select',
            key: EffectParamEnum.BgCleanMode,
            hiddenName: true,
            loading: initDefaultMode,
            loadingText: '自动识别中...',
            disabled: initDefaultMode,
            value: bgCleanModeDefault,
            options: [{
                name: `${ bgCleanModeDefault === 1 ? '自动识别：' : '' }纯色背景`,
                label: '纯色背景',
                parent: '祛瑕疵',
                value: 1
            },
            {
                name: `${ bgCleanModeDefault === 0 ? '自动识别：' : '' }非纯色背景（无效果）`,
                label: '非纯色背景（无效果）',
                parent: '祛瑕疵',
                value: 0
            }],
            textColor: '#A6A6A6',
            visible: (data: any): boolean => {
                const value = data[EffectParamEnum.BgCleanSwitch]
                return value === 1
            }
        },

        {
            name: '纯色背景祛色彩断层',
            key: EffectParamEnum.BgCleanMooreSwitch,
            value: 0,
            max: 1,
            cType: 'switch',
            tip: ['纯色背景祛色彩断层是专门针对纯色背景研发的一键祛除色彩断层（摩尔纹/色块/波纹等）的功能。开启后，AI会自动识别纯色背景并祛除色彩断层，非纯色背景无效果。'],
            tipStyle: { width: '200px' },
            beta: true
        },

        {
            name: '背景调整',
            cType: 'select',
            key: EffectParamEnum.BgCleanMooreMode,
            hiddenName: true,
            disabled: initDefaultMode,
            value: bgCleanMooreModeDefault,
            options: initDefaultMode
                ? [{ name: '自动识别中...', value: 0 }, { name: '自动识别中...', value: 1 }, { name: '自动识别中...', value: -1 }]
                : [{
                    name: `${ bgCleanMooreModeDefault === 1 ? '自动识别：' : '' }纯色背景`,
                    label: '纯色背景',
                    parent: '祛色彩断层',
                    value: 1
                },
                {
                    name: `${ bgCleanMooreModeDefault === 0 ? '自动识别：' : '' }非纯色背景（无效果）`,
                    label: '非纯色背景（无效果）',
                    parent: '祛色彩断层',
                    value: 0
                }],
            textColor: '#A6A6A6',
            visible: (data: any): boolean => {
                const value = data[EffectParamEnum.BgCleanMooreSwitch]
                return value === 1
            },
            line: true
        },

        {
            name: '背景增强',
            key: EffectParamEnum.BackgroundEnhance,
            realtime: RealtimeType.EnableByGpu,
            value: 0,
            tip: ['通过AI自动调色增强背景的饱和度、对比度等。', '适用于不想过多改变原图色调，又想提升画面', '色彩氛围的情况。'],
        }
    ]
}
