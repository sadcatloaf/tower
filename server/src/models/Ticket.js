import mongoose from "mongoose"

const Schema = mongoose.Schema

export const ValueSchema = new Schema(
    {
        accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

ValueSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
})

ValueSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true,
})