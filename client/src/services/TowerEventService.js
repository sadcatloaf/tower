import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { TowerEvent } from "@/models/TowerEvent.js";


class TowerEventService {
    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        logger.log('Canceled Event', response.data)
        const event = new TowerEvent(response.data)
        AppState.activeEvent = event
    }
    async getEvents() {
        const response = await api.get('api/events')
        logger.log('Got Events', response.data)
        const events = response.data.map(eventPOJO => new TowerEvent(eventPOJO))
        AppState.events = events
    }

    async getEventsById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        logger.log('Got Events by Id', response.data)
        const event = new TowerEvent(response.data)
        AppState.activeEvent = event
    }

    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('Created Event', response.data)
        const event = new TowerEvent(response.data)
        AppState.events.unshift(event)
        return event
    }

}

export const towerEventService = new TowerEventService()