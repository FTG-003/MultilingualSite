/**
 * Simple server for PeerGang static site
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Normalize URL to prevent directory traversal
  let url = req.url;
  
  // Handle root path
  if (url === '/') {
    url = '/index.html';
  }
  
  // Remove query parameters if present
  const urlWithoutQuery = url.split('?')[0];
  
  // Construct file path
  const filePath = path.join(__dirname, urlWithoutQuery);
  
  // Get file extension
  const ext = path.extname(filePath).toLowerCase();
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If file doesn't exist, check if it's a directory route without trailing slash
      if (err.code === 'ENOENT') {
        // Try adding .html extension
        const htmlFilePath = `${filePath}.html`;
        fs.stat(htmlFilePath, (err, stats) => {
          if (err) {
            // If HTML file doesn't exist either, try index.html in directory
            const indexPath = path.join(filePath, 'index.html');
            fs.stat(indexPath, (err, stats) => {
              if (err) {
                // If that doesn't exist either, return 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
                return;
              }
              serveFile(indexPath, res);
            });
            return;
          }
          serveFile(htmlFilePath, res);
        });
        return;
      }
      
      // For other errors, return 500
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Internal Server Error</h1>');
      return;
    }
    
    // Handle directory without trailing slash
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err, stats) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
          return;
        }
        serveFile(indexPath, res);
      });
      return;
    }
    
    // Serve the file
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Set content type header
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Internal Server Error</h1>');
      return;
    }
    
    // Set headers
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    });
    
    // Send file content
    res.end(data);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Current directory: ${__dirname}`);
});