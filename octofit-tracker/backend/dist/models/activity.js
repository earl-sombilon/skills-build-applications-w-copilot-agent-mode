import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    userEmail: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
