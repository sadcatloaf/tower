import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Comment {
    constructor(data) {
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.event = data.event ? new TowerEvent(data.event) : null
        this.profile = data.profile ? new Account(data.profile) : null
    }

}