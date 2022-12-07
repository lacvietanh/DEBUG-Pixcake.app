export default class OrderModel {
    private id: number = 0
    private org_id: number = 0
    private name: null = null
    private type: number = 0
    private price: number = 0
    private total_price: number = 0
    private duration: null = null
    private count: number = 0
    private state: number = 0
    private order: number = 10
    private tag: null = null
    private desc: null = null
    private style: number = 0

    static createOrder(json: any): OrderModel {
        let order = new OrderModel()
        order.id = json.id
        order.org_id = json.org_id
        order.name = json.name
        order.type = json.type
        order.price = json.price
        order.total_price = json.total_price
        order.duration = json.duration
        order.count = json.count
        order.state = json.state
        order.order = json.order
        order.tag = json.tag
        order.desc = json.desc
        order.style = json.style
        return order
    }
}
