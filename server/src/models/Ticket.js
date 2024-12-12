import mongoose from "mongoose"

const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
})

TicketSchema.virtual('event', {
    localField: 'eventId', // what do i have
    ref: 'TowerEvent', // where do i look
    foreignField: '_id', // what do they have
    justOne: true,
})