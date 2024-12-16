import { Schema } from "mongoose"
import { AccountSchema } from "./Account"

export const CommentSchema = new Schema(
    {
        body: { type: String, required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
        eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    // ref: 'Profile',
    ref: 'Account',
    foreignField: '_id',
    justOne: true,
})

// CommentSchema.virtual('creator', {
//     localField: 'eventId',
//     ref: 'TowerEvent',
//     foreignField: '_id',
//     justOne: true,
// })