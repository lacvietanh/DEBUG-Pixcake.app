// @ts-ignore
import {IdPhotoMaterialSourceType, MATERIAL_ID_PHOTO_TABLE} from '@/universal/types/config'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel.ts'
import DBIpcRender from '@/irender/DBIpcRender'
import {IdPhotoMaterialModel} from "@/model/MaterialsModel/idPhotoMaterialModel";

const table = MATERIAL_ID_PHOTO_TABLE

export async function findMineIdPhotoMaterials(userId:string,limitCount:number|null) {
    //sourceType为2的为临时预设，临时预设不需要查出来'
    let objs:any = []
    if (limitCount == null ){
        objs = await DBIpcRender.findGroupByExpression(table, `  user_id = ${userId}
                                AND  source_type = ${IdPhotoMaterialSourceType.Mime}
                            order by update_time desc `)
    }else{
        objs = await DBIpcRender.findGroupByExpression(table, `  user_id = ${userId}
                                AND  source_type = ${IdPhotoMaterialSourceType.Mime}
                            order by update_time desc limit ${limitCount}`)
    }

    return IdPhotoMaterialModel.initFromJsonArray(objs as any)
}

export async function deleteMineIdPhotoMaterials(ids:[any]){
    // @ts-ignore
    if (!ids || ids.length == 0){
        return
    }
    if (ids.length > 1){
        await DBIpcRender.batchDelete(table,"local_material_id",ids)
    }else{
        await DBIpcRender.delete(table,"local_material_id",ids[0])
    }
}

