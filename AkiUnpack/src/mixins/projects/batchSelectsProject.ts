import Project from '@/model/ProjectModel'
import Vue from 'vue'
import { Optional } from '@/universal/types/foundation'
// @ts-ignore
import SwcPlugin from '@/components/CollectionView/drag'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'

Vue.use(SwcPlugin)

/*
    判断矩形是否相交
 */
function isRectIntersect(rect0: any, rect1: any): boolean {
    let minX = Math.min(rect0.x, rect1.x)
    let maxX = Math.max(rect0.x + rect0.w, rect1.x + rect1.w)
    let diffX = Math.abs(maxX - minX)

    let minY = Math.min(rect0.y, rect1.y)
    let maxY = Math.max(rect0.y + rect0.h, rect1.y + rect1.h)
    let diffY = Math.abs(maxY - minY)

    let maxW = rect0.w + rect1.w
    let maxH = rect0.h + rect1.h
    if (diffX < maxW && diffY < maxH) {
        return true
    }
    return false
}

export const batchSelectsProject = Vue.extend({
    data(): {
        selectProjects: Map<number, Project>,
        lastSelectedIndex: Optional<number>,
        swipeChooseRef: any,
        canMouseDragSelection: boolean,
        //el
        allProjects: Map<number, Project>,
        isOnDragMouseDown: boolean
        } {
        return {
            selectProjects: new Map<number, Project>(),
            lastSelectedIndex: null,
            swipeChooseRef: null,
            canMouseDragSelection: true,
            allProjects: new Map<number, Project>(),
            isOnDragMouseDown: false
        }
    },
    watch: {
        '$store.state.project.projects': {
            handler: function (val) {
                this.allProjects.clear()
                for (const item of val) {
                    this.allProjects.set(item.id, item)
                }
                if (this.swipeChooseRef)
                    this.swipeChooseRef.reset()
            },
            immediate: true
        },
        showResetProjectName: {
            handler: function (val) {
            },
            immediate: true
        },
        showRenameDialog: {
            handler: function (val) {
            },
            immediate: true
        }
    },
    computed: {
        findNextProjectIndex(): number {
            let lastSelectedIndex = this.lastSelectedIndex
            if (lastSelectedIndex == null) {
                // @ts-ignore
                for (let i = this.projects.length - 1; i >= 0; i--) {
                    // @ts-ignore
                    let proj = this.projects[i]
                    let isSelected = this.isSelected(proj)
                    if (isSelected) {
                        lastSelectedIndex = i
                        break
                    }
                }
            }
            return lastSelectedIndex!
        }
    },
    methods: {
        forceUpdate() {
            let ref = this.$refs['virtualCollectionRef']
            if (!ref) {
                return
            }
            //@ts-ignore
            ref.$forceUpdate()
        },
        installShortcuts() {
            this.registerShortcut()
            this.registerMouseSelectEvents()
        },
        removeShortcuts() {
            this.unregisterShortcut()
        },
        // 快捷键注册
        registerShortcut() {
            ipcRenderer?.on('onKeyboardShortcutInvoked', (event: any, args: { name: string }) => {
                // console.log(`收到快捷键事件:${args}`)
                if (args.name == 'CommandOrControl+A') {
                    this.selectedAll(true)
                    return
                }
                if (args.name == 'CommandOrControl+D') {
                    this.selectedAll(false)
                    return
                }
                if (args.name == 'DeleteOrBackspace') {
                    if (this.selectProjects.size === 1) {
                        let removeItem: Project
                        for (const item of this.selectProjects) {
                            let [key, val] = item
                            removeItem = val
                        }
                        //@ts-ignore
                        this.remove(removeItem)
                        return
                    } else if (this.selectProjects.size > 1) {
                        //@ts-ignore
                        this.batchRemove(this.selectProjects)
                        return

                    }

                }
            })
            ipcRenderer?.send('registerKeyboardShortcut')
        },
        unregisterShortcut() {
            console.log(`注销快捷键事件:}`)
            ipcRenderer?.removeAllListeners('onKeyboardShortcutInvoked')
            this.activeShortcut(false)
        },
        activeShortcut(isActive: Boolean) {
            let event = isActive ? 'registerKeyboardShortcut' : 'unRegisterKeyboardShortcut'
            ipcRenderer?.send(event)
        },
        // 处理选中状态
        selectedAll(selected: Boolean) {
            if (selected) {
                // @ts-ignore
                const list = this.projects
                for (let it of list) {
                    this.setSelected(it, true)
                }
                this.lastSelectedIndex = list.length - 1
            } else {
                if (!this.isOnDragMouseDown) {
                    this.clearSelects()
                    this.lastSelectedIndex = null
                }
                this.isOnDragMouseDown = false
            }
            this.forceUpdate()
        },
        /*
            isMeta:表示键盘按键，按下的释放是meta按钮
         */
        isSelected(project: Project) {
            let item = this.selectProjects.get(project.id)
            return item !== null && item !== undefined
        },
        setSelected(project: Project, isSelected: Boolean) {
            if (isSelected) {
                this.selectProjects.set(project.id, project)
            } else {
                this.selectProjects.delete(project.id)
            }
        },
        clearSelects() {
            this.selectProjects.clear()
            this.forceUpdate()
        },
        onLeftMouseClick(project: Project, idx: number) {
            this.selectProjects.clear()
            this.selectProjects.set(project.id, project)
            this.lastSelectedIndex = idx - 1
            this.forceUpdate()
        },
        onLeftMouseShiftClick(project: Project, projectIndex: number) {
            let lastIndex = this.findNextProjectIndex
            if (lastIndex == null) {
                return
            }
            let nextIndex = projectIndex - 1
            let min = Math.min(nextIndex, lastIndex)
            let max = Math.max(nextIndex, lastIndex)
            for (let i = min; i <= max; i++) {
                // @ts-ignore
                let project = this.projects[i]
                this.setSelected(project, true)
            }
            this.forceUpdate()
        },
        onCommandLeftMouseClick(isMeta: Boolean, project: Project, projectIndex: number) {
            if ((isMeta && this.$isWin) || (!isMeta && this.$isMac)) {
                return
            }
            let projIndex = projectIndex - 1
            let isSelected = this.isSelected(project)
            this.setSelected(project, !isSelected)
            this.lastSelectedIndex = !isSelected ? projIndex : null
            this.forceUpdate()
        },
        /*
            鼠标拖动选择项目
         */
        registerMouseSelectEvents() {

        },
        /*
            鼠标拖动滑动区域内的选中
         */
        setSelectItemsInRect(rect: { x: number, y: number, w: number, h: number }) {
            this.selectProjects.clear()
            // projectCardRef此项注入到card里面的引用
            let virtualCollectionRef = this.$refs['virtualCollectionRef']
            if (!virtualCollectionRef) {
                return
            }
            let nextNodes = (virtualCollectionRef as any).$children
            if (!nextNodes || nextNodes.length === 0) {
                return
            }
            let projectVmItems = nextNodes[0].$children as any
            if (!projectVmItems || !Array.isArray(projectVmItems)) {
                return
            }
            for (const projectVmItem of projectVmItems) {
                let bounds = projectVmItem.$el.getBoundingClientRect()
                let itemBounds = {
                    x: bounds.x,
                    y: bounds.y + this.$el.scrollTop, // 此处需加上scrollTop的偏移值
                    w: bounds.width,
                    h: bounds.height
                }
                const isIntersect = isRectIntersect(rect, itemBounds)
                if (isIntersect) {
                    let projectId = projectVmItem.$vnode.data.attrs.id
                    if (projectId) {
                        const proj: Project = this.allProjects.get(projectId)!
                        this.selectProjects.set(proj.id, proj)
                    }
                }
            }
        },
        /*
            增加鼠标拖拽选中处理
         */
        closeContextMenu() {
            if (!this.swipeChooseRef) {
                return
            }
            this.canMouseDragSelection = true
            this.swipeChooseRef.$props.canMouseDown = true
        },
        onContextMenuItemClick(action: any) {
            if (!this.swipeChooseRef) {
                return
            }
            this.canMouseDragSelection = true
            this.swipeChooseRef.$props.canMouseDown = true
        },
        showContextMenu() {
            if (!this.swipeChooseRef) {
                return
            }
            this.canMouseDragSelection = false
            this.swipeChooseRef.$props.canMouseDown = false
        },
        addSwipeChooseComponent() {
            let acceptEl = (this.$refs['virtualCollectionRef'] as any).$el
            let component = this.$swipeChooseShow(this.$el as HTMLElement, {
                acceptEl: { 'el': acceptEl },
                eventEl: null,
                canMouseDown: this.canMouseDragSelection,
                isCustomScroll: false
            })
            /*
                接受鼠标滑动选中的事件，rect:{x:number,y:number,w:number,h:number}
             */
            let that = this
            this.swipeChooseRef = component
            // startPoint mousedown的位置
            component.$on('onSelectionChanged', (rect: { x: number, y: number, w: number, h: number }, startPoint: {
                x: number,
                y: number
            }) => {
                let { x, y, w, h } = rect
                if (x == null || w == null) {
                    return
                }
                that.isOnDragMouseDown = true
                that.setSelectItemsInRect(rect)
                that.forceUpdate()
            })
        }
    },
    mounted() {
        // this.addSwipeChooseComponent()
    }
})
