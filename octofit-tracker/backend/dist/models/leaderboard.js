import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
