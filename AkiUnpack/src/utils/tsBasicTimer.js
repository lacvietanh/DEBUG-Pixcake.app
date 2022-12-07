export class tsBasicTimer {
    constructor() {
        this.startTime = Date.now()
        this.lastTime = this.startTime
    }

    reset() {
        this.startTime = Date.now()
        this.lastTime = this.startTime
    }

    updateAndGetDelta() {
        let currentTime = Date.now()
        let ret = currentTime - this.lastTime
        this.lastTime = currentTime
        return ret
    }

    updateAndGetTotal() {
        let currentTime = Date.now()
        let ret = currentTime - this.startTime
        this.lastTime = currentTime
        return ret
    }
}


export default tsBasicTimer
