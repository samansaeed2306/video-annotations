import http from 'http-server';
import path from 'path';

import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer({
    root: path.join(__dirname, 'public'),
    cors: false,
    cache: 3600,
    showDir: true,
    autoIndex: true,
    ext: 'html'
});

server.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});