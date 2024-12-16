import { Account } from "./Account.js"


export class Commented {
    constructor(data) {
        this.id = data.id
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.body = data.body
        this.creator = data.creator
    }

}