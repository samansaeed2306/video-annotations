import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import annotationRoutes from './routes/annotationRoutes.js';
import { connectToDb } from './db/connect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // For parsing application/json

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

connectToDb();

// API routes
app.use('/api', annotationRoutes);

// Handle 404 for unknown routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});


// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
