import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, required: true },
    weeklyGoal: { type: String, required: true },
    team: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
