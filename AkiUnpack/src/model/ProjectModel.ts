// @ts-ignore
import { countOf as countOfThumbnail, getProjectAlbumIconPaths } from '@/universal/datastore/thumbnailDao'
import { Optional } from '@/universal/types/foundation'

export default class Project {

    id: number = 0
    userId: number = 0
    templateSuitId = 0
    name: string | null = null
    projectIcon: Optional<Array<string>> = null
    path: any = []// 路径支持数组类型
    type = 0 // 0 代表是空的，1
    created_time = 0
    update_time = 0

    projectRes = null

    disable = false
    thumbnailCounts = 0     //项目拥有的图片数量
    importTimes = 0 // 因创建工程时，没有马上导入图片，此时计数应是0
    visit_time = 0
    exportTimes = 0
    thumbnailMaxWidth = 0
    thumbnailMaxHeight = 0
    temporaryStoragePath = ''

    constructor(userId: number, name: string) {

        this.userId = userId
        this.name = name

        if (userId != null) {
            this.type = 1
        }
        this.disable = false
        this.created_time = new Date().getTime()
        this.update_time = new Date().getTime()
    }

    setId(id: number) {
        this.id = id
    }

    setName(name: string) {
        this.name = name
    }


    setTemplateSuitId(value: number) {
        this.templateSuitId = value
    }

    updatePath(path: string, pathIcon: Optional<Array<string>>, iconRes: any) {
        this.path = path
        this.projectIcon = pathIcon
        this.projectRes = iconRes
    }

    // 获得缩略图数量
    async thumbnailCount() {
        this.thumbnailCounts = await countOfThumbnail(this.id)
        return this.thumbnailCounts
    }

    async getProjectAlbumIconPaths() {
        let paths = await getProjectAlbumIconPaths(this.id)
        return paths
    }

    // async thumbnail

    static createProject(item: any) {
        if (item == null || item.userId == null) {
            return null
        }

        try {
            if (item.path != null && typeof item.path === 'string') {
                item.path = item.path.split(',')
            }
            if (item.projectIcon != null && typeof item.projectIcon === 'string') {
                item.projectIcon = item.projectIcon == '' ? [] : item.projectIcon.split(',')
            }
        } catch (e) {
            debugger
        }

        let project = new Project(item.userId, item.name)
        project.projectIcon = item.projectIcon
        project.projectRes = item.projectRes
        project.id = item.id
        project.created_time = item.created_time
        project.update_time = item.update_time
        project.templateSuitId = item.templateSuitId
        project.type = item.type
        project.userId = item.userId
        project.path = item.path
        project.disable = item.disable
        project.importTimes = item.importTimes
        project.visit_time = item.visit_time
        project.thumbnailCounts = item.thumbnailCounts || 0
        project.exportTimes = item.exportTimes
        project.thumbnailMaxWidth = item.thumbnailMaxWidth
        project.thumbnailMaxHeight = item.thumbnailMaxHeight
        project.temporaryStoragePath = item.temporaryStoragePath

        return project
    }
}
