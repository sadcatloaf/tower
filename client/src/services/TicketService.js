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

    async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('Created Ticket', response.data)
        const ticket = new Ticket(response.data)
        AppState.ticketAttendees.push(ticket)
    }
}

export const ticketService = new TicketService()