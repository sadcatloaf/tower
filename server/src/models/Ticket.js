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
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true,
})