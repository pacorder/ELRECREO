import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Request logging middleware to help diagnose routing issues
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Custom explicit resolver for root-level HTML files (e.g., /sudoku, /sudoku.html)
app.get('/:page', (req, res, next) => {
  const pageParam = req.params.page;
  
  // If requesting a file with an extension that is not .html, let static middleware handle it
  if (pageParam.includes('.') && !pageParam.endsWith('.html')) {
    return next();
  }

  const cleanName = pageParam.endsWith('.html') ? pageParam : `${pageParam}.html`;
  const filePath = path.join(__dirname, cleanName);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    console.log(`[SERVING FILE] ${filePath}`);
    return res.sendFile(filePath);
  }
  
  next();
});

// Catch-all route to redirect back to index.html for unhandled paths
app.get('*', (req, res) => {
  console.log(`[CATCH-ALL] Serving index.html for ${req.url}`);
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

