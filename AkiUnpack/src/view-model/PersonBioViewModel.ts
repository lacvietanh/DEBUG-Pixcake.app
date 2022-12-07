import {PersonBioModel} from "@/model/PersonBioModel";
import {IFaceBox, IPersonBio} from "@/qt-ipc/types/refine";
export enum PersonBioItemStatus {
    None = 0,
    Init = 1,   // 初始化，添加瞬间的状态(出现框上的提示和打钩、打X)
    Pending = 2,// 出现打钩、打叉
    Approved = 3, // 通过
    Cancelled = 4 // 取消
}

export class PersonBioViewModel {
    _status:PersonBioItemStatus = PersonBioItemStatus.None
    _isSelected:boolean = false
    _bioModel:PersonBioModel|null = null

    static Create():PersonBioViewModel{
        let dataModel = new PersonBioModel(null)
        let instance = new PersonBioViewModel(dataModel)
        return instance
    }

    static CreateFbrFileName(){
        const { v4: uuidv4 } = require('uuid');
        const time = (new Date()).getTime()
        let fileName = `${uuidv4()}_${time}`
        fileName = fileName.replaceAll('-','')
        return fileName
    }

    constructor(bioModel:PersonBioModel) {
        this._bioModel = bioModel
    }

    /*
        新增人脸框，确认时候，返回的数据绑定
     */
    bindFromConfirm(faceJson:IPersonBio){
        this.faceBoxNormalized = faceJson.faceBoxNormalized
        this.gender = faceJson.gender
        this.age = faceJson.age
        this.personType = faceJson.personType
        this.id = faceJson.id
    }

    set age(age:number){
        this._bioModel!.age = age
    }
    get age():number{
        return this._bioModel!.age
    }

    set faceBox(faceBox:number[]){
        this._bioModel!.faceBox = faceBox
    }
    get faceBox():number[]{
        return this._bioModel!.faceBox
    }

    set faceBoxNormalized(faceBoxNormalized:number[]){
        this._bioModel!.faceBoxNormalized = faceBoxNormalized
    }
    get faceBoxNormalized():number[]{
        return this._bioModel!.faceBoxNormalized
    }


    set gender(gender:number){
        this._bioModel!.gender = gender
    }
    get gender():number{
        return this._bioModel!.gender
    }

    set personType(personType:string){
        this._bioModel!.personType = personType
    }
    get personType():string{
        return this._bioModel!.personType
    }

    set id(id:number){
        this._bioModel!.id = id
    }
    get id():number{
        return this._bioModel!.id
    }

    set status(status:number){
        this._status = status
    }

    get status():number{
        return  this._status
    }

    set isSelected(isSelected:boolean){
        this._isSelected = isSelected
    }
    get isSelected():boolean{
        return  this._isSelected
    }

    getFaceRect():IFaceBox{
        return this._bioModel!.getFaceRect()
    }

    getFaceBoxNormalizedRect():IFaceBox{
        return this._bioModel!.getFaceBoxNormalizedRect()
    }

    set deleted(deleted:boolean){
        this._bioModel!.deleted = deleted
    }

    get deleted():boolean{
        return this._bioModel!.deleted
    }

    set isManual(isManual:boolean){
        this._bioModel!.isManual = isManual
    }

    get isManual():boolean{
        return this._bioModel!.isManual
    }

    set add(isManual:boolean){
        this._bioModel!.add = isManual
    }

    get add():boolean{
        return this._bioModel!.add
    }

    set changed(changed:boolean){
        this._bioModel!.changed = changed
    }

    get changed():boolean{
        return this._bioModel!.changed
    }

    set fbrFileName(fbrFileName:string){
        this._bioModel!.fbrFileName = fbrFileName
    }

    get fbrFileName():string{
        return this._bioModel!.fbrFileName
    }

    toJson(){
        return {
            ...this._bioModel,
            isSelected:this._isSelected,
            status:this._status
        }
    }
}