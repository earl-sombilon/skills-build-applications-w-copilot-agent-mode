import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, unique: true },
    focus: { type: String, required: true },
    duration: { type: String, required: true },
    difficulty: { type: String, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
