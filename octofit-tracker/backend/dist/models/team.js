import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    goal: { type: String, required: true },
    activityScore: { type: Number, required: true },
}, { timestamps: true });
export const Team = model('Team', teamSchema);
