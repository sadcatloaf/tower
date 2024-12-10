import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        name: { type: String, minLength: 3, maxLength: 50, required: true },
        description: { type: String, minLength: 15, maxLength: 1000, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, minLength: 1, maxLength: 500 },
        capacity: { type: Number, minLength: 1, maxLength: 5000, required: true },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)