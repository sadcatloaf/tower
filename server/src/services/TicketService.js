import { dbContext } from "../db/DbContext";


class TicketService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile', 'name coverImg')
        await ticket.populate('event')
        return ticket
    }

    async getMyTicketsById(userId) {
        const tickets = await dbContext.Ticket.find({ accountId: userId }).populate('event')
        return tickets


    }
}

export const ticketService = new TicketService()