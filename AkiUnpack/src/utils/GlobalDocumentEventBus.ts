import eventbus from "@/utils/eventbus";

export default class GlobalDocumentEventBus{
    static addEventListener(eventName:string,func:((event:any)=>void)){
        let callBack = document[eventName]
        if (!callBack){
            callBack = (e:any)=>{
                eventbus.$emit(eventName,e)
            }
            document[eventName] = callBack
        }
        eventbus.$on(eventName,func)
    }

    static removeEventListener(eventName:string,func:((event:any)=>void)){
        eventbus.$off(eventName,func)
    }
}