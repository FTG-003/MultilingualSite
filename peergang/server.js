/**
 * Simple Express server for PeerGang static site
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Log middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files with caching
app.use(express.static(__dirname, {
  setHeaders: (res, path) => {
    // Set Cache-Control header
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  }
}));

// Handle clean URLs (without .html extension)
app.use((req, res, next) => {
  // Skip if the URL already has an extension
  if (path.extname(req.url)) {
    return next();
  }
  
  // Try to find a matching HTML file
  const htmlPath = path.join(__dirname, `${req.url}.html`);
  fs.access(htmlPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // HTML file exists, serve it
      return res.sendFile(htmlPath);
    }
    
    // Check if it's a directory and has an index.html
    const indexPath = path.join(__dirname, req.url, 'index.html');
    fs.access(indexPath, fs.constants.F_OK, (err) => {
      if (!err) {
        // index.html exists, serve it
        return res.sendFile(indexPath);
      }
      // Continue to the next middleware if nothing matches
      next();
    });
  });
});

// Custom 404 page
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you requested does not exist.</p>');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Current directory: ${__dirname}`);
});