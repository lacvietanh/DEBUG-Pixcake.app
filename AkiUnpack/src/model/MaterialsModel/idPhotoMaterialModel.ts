import {IdPhotoMaterialSourceType} from "@/universal/types/config";
import {app as APP} from '@/qt-ipc/app'

export class IdPhotoMaterialModel {
    path:string = ""
    name:string = ""
    localMaterialId:string = ""
    userId:string = ""
    sourceType:IdPhotoMaterialSourceType = IdPhotoMaterialSourceType.System
    disable:boolean = false
    createTime:number = 0
    updateTime:number = 0
    isOriginal:boolean = false
    iconPath:string = ""
    isSelected:boolean = false
    static initFromJsonArray(list:[any]){
        let results:[IdPhotoMaterialModel] = [] as any
        for (const item of list) {
            results.push(new IdPhotoMaterialModel((item)))
        }
        return results
    }
    constructor(param:any) {
        this.path = param.path
        if (this.path.startsWith("/")){
            this.path = this.path.replace("/","") //替换第一个/
        }
        this.name = param.name
        this.localMaterialId = param.local_material_id
        this.sourceType = param.source_type
        this.userId = param.user_id
        this.disable = param.disable
        this.createTime = param.created_time || 0
        this.updateTime = param.update_time || 0
        this.isOriginal = param.isOriginal || false
        this.iconPath = param.iconPath || ""
        this.isSelected = param.isSelected || false
    }

    get fullIconPath(){
        if (this.isOriginal){
            return this.iconPath
        }
        const sep = APP.workSpacePath.endsWith("/") ? "":"/"
        return `${APP.workSpacePath}${sep}${this.path}/cover.png`
    }

    /*
        参数效果路径，用于设置到底层的美化效果json文件内
     */
    get fullEffectPath(){
        if (this.sourceType == IdPhotoMaterialSourceType.System){
            return this.path
        }
        const sep = APP.workSpacePath.endsWith("/") ? "":"/"
        return `${APP.workSpacePath}${sep}${this.path}/effect`
    }

    get shortEffectPath(){
        if (this.sourceType == IdPhotoMaterialSourceType.System){
            return this.path
        }
        if (!this.path || this.path.length == 0){
            return ''
        }
        return `${this.path}/effect`
    }

    toJson(){
        return {
            path:this.path,
            name:this.name,
            local_material_id:this.localMaterialId,
            sourceType:this.sourceType,
            user_id:this.userId,
            disable:this.disable,
            created_time:this.createTime,
            update_time:this.updateTime,
            isSelected:this.isSelected,
            iconPath:this.iconPath
        }
    }
}