export class TowerEvent {

    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.capacity = data.capacity
        this.coverImg = data.coverImg
        this.createdAt = new Date(data.createdAt)
        this.isCanceled = data.isCanceled
        this.location = data.location
        this.startDate = new Date(data.startDate)
        this.type = data.type
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator
        // this.event = data.event
    }

}