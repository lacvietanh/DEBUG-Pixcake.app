import BaseToolControl from './BaseToolControl'

import { Tool } from './contants/config'
import BaseTool from './impl/BaseTool'
import LiquefyTool from './impl/LiquefyTool'
import { bindMany } from '@/view-model/photoControl/utils/commonUtil'

export default class LiquefyToolControl extends BaseToolControl<BaseTool> {
    static instance: LiquefyToolControl
    _tool: Tool = Tool.Liquefy

    constructor() {
        super()
        bindMany(this, '_addKeyDownEvent', 'emit')
    }

    static getInstance(): LiquefyToolControl {
        if (!this.instance) {
            this.instance = new LiquefyToolControl()
        }
        return this.instance
    }

    _addKeyDownEvent(event: KeyboardEvent): void {
        if (this.tool !== Tool.Liquefy) {
            return
        }
        switch (event.code) {
            case 'BracketLeft':
            case 'BracketRight':
                const eventCode = event.code
                const m_nDiameterSize = this.activeTool?.size || 0

                let nStep = 10
                let isPlus = eventCode === 'BracketRight'

                // 1～10：0.2
                // 10～20：0.5
                // 20～35：1
                // 35～55：2
                // 55～75：2.5
                // 75～95：4
                // 95～125：6
                // 125～225：10
                // 225～300：15

                if (1 <= m_nDiameterSize && m_nDiameterSize < 10) {
                    nStep = 0.2
                } else if (10 < m_nDiameterSize && m_nDiameterSize < 20) {
                    nStep = 0.5
                } else if (20 < m_nDiameterSize && m_nDiameterSize < 35) {
                    nStep = 1
                } else if (35 < m_nDiameterSize && m_nDiameterSize < 55) {
                    nStep = 2
                } else if (55 < m_nDiameterSize && m_nDiameterSize < 75) {
                    nStep = 2.5
                } else if (75 < m_nDiameterSize && m_nDiameterSize < 95) {
                    nStep = 4
                } else if (95 < m_nDiameterSize && m_nDiameterSize < 125) {
                    nStep = 6
                } else if (125 < m_nDiameterSize && m_nDiameterSize < 225) {
                    nStep = 10
                } else if (225 < m_nDiameterSize && m_nDiameterSize < 300) {
                    nStep = 15
                }


                if (m_nDiameterSize === 10) {
                    nStep = isPlus ? 0.5 : 0.2
                } else if (m_nDiameterSize === 20) {
                    nStep = isPlus ? 1 : 0.5
                } else if (m_nDiameterSize === 35) {
                    nStep = isPlus ? 2 : 1
                } else if (m_nDiameterSize === 55) {
                    nStep = isPlus ? 2.5 : 2
                } else if (m_nDiameterSize === 75) {
                    nStep = isPlus ? 4 : 2.5
                } else if (m_nDiameterSize === 95) {
                    nStep = isPlus ? 6 : 4
                } else if (m_nDiameterSize === 125) {
                    nStep = isPlus ? 10 : 6
                }else if (m_nDiameterSize === 225) {
                    nStep = isPlus ? 15 : 10
                } else if (m_nDiameterSize === 300) {
                    nStep = 15
                }

                this.activeTool?.increaseSize(isPlus ? nStep : -nStep)
                this.emit('on-update')
                break
        }
    }

    initTools(): Map<Tool, BaseTool> {
        const toolMap = new Map()
        toolMap.set(Tool.Liquefy, new LiquefyTool())
        return toolMap
    }
}