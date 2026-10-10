const http = require('http');
const fs = require('fs');
const path = require('path');

let orderCount = 0;

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer((req, res) => {
    console.log('order:', orderCount++, req.url);
  const urlPath = req.url.split('?')[0];
  const file = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(__dirname, file);

  if (!filePath.startsWith(__dirname)) { res.writeHead(403); res.end(); return; }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'text/plain' });
    res.end(data);
  });
}).listen(3000, () => console.log('Open http://localhost:3000'));