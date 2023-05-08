import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    guests: { type: [mongoose.Schema.Types.ObjectId], ref: 'guests', required: false },
    key: { type: String, required: true }
}, { timestamps: true });