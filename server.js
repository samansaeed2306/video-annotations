const http = require('http-server');
const path = require('path');

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