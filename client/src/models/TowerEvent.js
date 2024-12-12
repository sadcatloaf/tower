export class TowerEvent {

    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.capacity = data.capacity
        this.coverImg = data.coverImg
        this.createdAt = data.createdAt
        this.isCanceled = data.isCanceled
        this.location = data.location
        this.startDate = data.startDate
        this.type = data.type
        this.updatedAt = data.updatedAt
        this.creator = data.creator
    }

}