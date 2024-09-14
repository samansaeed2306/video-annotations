import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import annotationRoutes from './routes/annotationRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { connectToDb } from './db/connect.js';
import cors from 'cors'; 
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); 


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Enable CORS for frontend (adjust to your public IP if needed)
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://174.138.56.121:3000'
//   ],
//   credentials: true
// }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/uploads')));

connectToDb();

app.use('/api', annotationRoutes);
app.use('/api/media', mediaRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Serve test file
app.get('/test-file', (req, res) => {
  res.sendFile(path.join(__dirname, '../uploads/test.mp4'));
});

// Set the server to listen on all available interfaces (0.0.0.0)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and accessible at http://0.0.0.0:${PORT}`);
});
