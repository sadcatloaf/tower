import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";


class TowerEventService {
    async getEvents() {
        const response = await api.get('api/events')
        logger.log('Got Events', response.data)
        const events = response.data.map(eventPOJO => new Event(eventPOJO))
        AppState.events = events
    }

}

export const towerEventService = new TowerEventService()