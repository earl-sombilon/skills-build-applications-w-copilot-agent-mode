import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        await User.insertMany([
            {
                name: 'Avery Stone',
                email: 'avery@example.com',
                fitnessLevel: 'advanced',
                weeklyGoal: 'Run 4 times this week',
                team: 'Velocity',
            },
            {
                name: 'Jordan Lee',
                email: 'jordan@example.com',
                fitnessLevel: 'intermediate',
                weeklyGoal: 'Complete 3 strength sessions',
                team: 'Momentum',
            },
            {
                name: 'Morgan Chen',
                email: 'morgan@example.com',
                fitnessLevel: 'advanced',
                weeklyGoal: 'Hit 150 active minutes',
                team: 'Velocity',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Velocity',
                members: 4,
                goal: 'Weekly distance challenge',
                activityScore: 92,
            },
            {
                name: 'Momentum',
                members: 5,
                goal: 'Strength consistency',
                activityScore: 89,
            },
        ]);
        await Activity.insertMany([
            {
                type: 'Run',
                durationMinutes: 35,
                calories: 280,
                userEmail: 'avery@example.com',
                date: new Date('2026-07-21T07:30:00.000Z'),
            },
            {
                type: 'Cycling',
                durationMinutes: 45,
                calories: 320,
                userEmail: 'jordan@example.com',
                date: new Date('2026-07-22T18:15:00.000Z'),
            },
            {
                type: 'Yoga',
                durationMinutes: 30,
                calories: 120,
                userEmail: 'morgan@example.com',
                date: new Date('2026-07-23T06:00:00.000Z'),
            },
        ]);
        await Leaderboard.insertMany([
            { rank: 1, name: 'Avery Stone', points: 980, streak: 8 },
            { rank: 2, name: 'Jordan Lee', points: 920, streak: 6 },
            { rank: 3, name: 'Morgan Chen', points: 855, streak: 5 },
        ]);
        await Workout.insertMany([
            {
                title: 'HIIT Sprint Circuit',
                focus: 'Cardio',
                duration: '20 min',
                difficulty: 'Advanced',
            },
            {
                title: 'Core Stability Flow',
                focus: 'Strength',
                duration: '15 min',
                difficulty: 'Beginner',
            },
            {
                title: 'Recovery Mobility Session',
                focus: 'Mobility',
                duration: '12 min',
                difficulty: 'Easy',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
