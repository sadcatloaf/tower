import { dbContext } from "../db/DbContext";

class TowerEventService {
    async createTowerEvent(eventData) {
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator', 'name coverImg')
        return event
    }

    async getAllEvents() {
        const events = await dbContext.TowerEvent.find().populate('creator', 'name coverImg')
        return events
    }
}
export const towerEventService = new TowerEventService()