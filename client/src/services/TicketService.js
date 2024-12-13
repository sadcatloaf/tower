import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";


class TicketService {
    async getMyTickets() {
        const response = await api.get('account/tickets')
        logger.log('Got tickets I purchased', response.data)

    }
}

export const ticketService = new TicketService()