import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";


class TowerEventService {
    async getEvents() {
        const response = await api.get('api/events')
        logger.log('Got Events', response.data)
    }

}

export const towerEventService = new TowerEventService()