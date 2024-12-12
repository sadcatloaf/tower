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

    async getTicketsById(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId }).populate('profile', 'name coverImg')
        return tickets
    }

    async deleteTicket(ticketId, userId) {
        const ticketToDelete = await dbContext.Ticket.findById(ticketId)

        if (ticketToDelete == null) {
            throw new Error(`Invalid ticket Id ${ticketId}`)
        }
        if (ticketToDelete.accountId != userId) {
            throw new Error("You are not allowed to delete someone elses ticket")
        }
        await ticketToDelete.deleteOne()
        return 'No longer has a ticket'
    }
}

export const ticketService = new TicketService()