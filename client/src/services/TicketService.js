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

    async getTicketProfilesByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('Got ticket profile', response.data)
        const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
        AppState.ticketAttendees = tickets
    }

    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('Delete Ticket', response.data)
        const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketId)
        AppState.tickets.splice(ticketIndex, 1)
    }
}

export const ticketService = new TicketService()