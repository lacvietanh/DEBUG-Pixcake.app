import {IFaceBox, IPersonBio} from "@/qt-ipc/types/refine";

export class PersonBioModel {
    age:number = 0
    faceBox:number[] = [] // 人脸点的坐标
    faceBoxNormalized:number[] = [] //人脸点在原图的比例坐标
    faceLandmarkVisibility:number[] = []
    gender:number = 0
    personType:string = ""
    id:number = -1           //人脸的标识，对应旧的index
    deleted:boolean = false  // 删除人脸
    add:boolean = false      // 新增人脸
    changed:boolean = false  // 性别或年龄有修改
    isManual:boolean = false // 是否是手动添加的
    fbrFileName:string = ""  // 手动的framebuffer文件名
    constructor(param:IPersonBio|null) {
        if (!param){
            return
        }
        this.age = param.age
        this.faceBox = param.faceBox
        this.faceBoxNormalized = param.faceBoxNormalized
        this.faceLandmarkVisibility = param.faceLandmarkVisibility
        this.gender = param.gender
        if (!param.personType){
            if (this.gender === 2 && this.age > 12 && this.age < 55) {
                this.personType = 'Female'
            } else if (this.gender === 1 && this.age > 12 && this.age < 55) {
                this.personType = 'Male'
            } else if (this.age <= 12) {
                this.personType = 'Child'
            } else if (this.age >= 55) {
                this.personType = 'Older'
            }
        }else{
            this.personType = param.personType
        }
        //@ts-ignore
        this.isManual = param?.isManual || false
        //@ts-ignore
        this.deleted = param?.deleted || false
        this.id = param.id
        //@ts-ignore
        this.add = param?.add || false
        //@ts-ignore
        this.changed = param?.changed || false
        //@ts-ignore
        this.fbrFileName = param?.fbrFileName || ""
    }
    getFaceRect():IFaceBox{
        return {x:this.faceBox[0],y:this.faceBox[1],width:this.faceBox[2],height:this.faceBox[3]}
    }
    getFaceBoxNormalizedRect():IFaceBox{
        return {x:this.faceBoxNormalized[0],y:this.faceBoxNormalized[1],width:this.faceBoxNormalized[2],height:this.faceBoxNormalized[3]}
    }
}