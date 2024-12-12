import { dbContext } from "../db/DbContext";


class TicketService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile', 'name coverImg')
        await ticket.populate('event')
        return ticket
    }
}

export const ticketService = new TicketService()