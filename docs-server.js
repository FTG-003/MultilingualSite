/**
 * Simple Express server for serving the static site from /docs
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Set the current directory for logging purposes
console.log('Current directory:', __dirname);

// Serve static files from the /docs directory
app.use(express.static(path.join(__dirname, 'docs')));

// Log all requests to the server
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});