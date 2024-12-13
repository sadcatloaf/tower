import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Ticket } from "@/models/Ticket.js";
import { AppState } from "@/AppState.js";


class TicketService {
    async getMyTickets() {
        const response = await api.get('account/tickets')
        logger.log('Got tickets I purchased', response.data)
        const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
        AppState.tickets = tickets
    }
}

export const ticketService = new TicketService()