import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import annotationRoutes from './routes/annotationRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { connectToDb } from './db/connect.js';
import cors from 'cors'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000' 
}));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/uploads')));
connectToDb();



app.use('/api', annotationRoutes);
app.use('/api/media', mediaRoutes);
// app.use('/', videoRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});
app.get('/test-file', (req, res) => {
  res.sendFile(path.join(__dirname, '../uploads/test.mp4'));
});



const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(__dirname);
});
