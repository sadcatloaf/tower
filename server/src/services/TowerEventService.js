import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class TowerEventService {
    async createTowerEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator', 'name coverImg')
        await event.populate('ticketCount')
        return event
    }

    async getAllEvents() {
        const events = (await dbContext.TowerEvent.find().populate('creator', 'name coverImg').populate('ticketCount'))
        return events
    }

    async getEventsById(eventId) {
        const event = (await (await dbContext.TowerEvent.findById(eventId)).populate('creator', 'name coverImg')).populate('ticketCount')
        return event
    }

    async editEvents(eventId, updateData, userId) {
        const event = await dbContext.TowerEvent.findById(eventId)
        if (!event) throw new Error(`Can not edit this: ${eventId}`)
        if (userId != event.creatorId) throw new Forbidden("Can't update this creators event")
        if (updateData.description) event.description = updateData.description
        event.description = updateData.description ?? event.description
        if (updateData.name) event.name = updateData.name
        event.name = updateData.name ?? event.name
        await event.save()
        return event
    }

    async cancelEvent(eventId) {
        const eventToCancel = await this.getEventsById(eventId)
        eventToCancel.isCanceled = !eventToCancel.isCanceled
        await eventToCancel.save()
        return eventToCancel
    }
}
export const towerEventService = new TowerEventService()