import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Event } from "@/models/TowerEvent.js";


class TowerEventService {
    async getEvents() {
        const response = await api.get('api/events')
        logger.log('Got Events', response.data)
        const events = response.data.map(eventPOJO => new Event(eventPOJO))
        AppState.events = events
    }

    async getEventsById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        logger.log('Got Events by Id', response.data)
        const event = new Event(response.data)
        AppState.activeEvent = event
    }

    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('Created Event', response.data)
    }

}

export const towerEventService = new TowerEventService()