import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
async function startServer() {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB at', mongoUri);
        app.listen(port, () => {
            console.log(`Octofit backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start Octofit backend:', error);
        process.exit(1);
    }
}
startServer();
