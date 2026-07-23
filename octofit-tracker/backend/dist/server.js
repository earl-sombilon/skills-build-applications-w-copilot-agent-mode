import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        baseUrl,
    });
});
app.use('/api', apiRoutes);
export async function startServer() {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB at', mongoUri);
        app.listen(port, () => {
            console.log(`Octofit backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start Octofit backend:', error);
        process.exit(1);
    }
}
export default app;
