import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the current directory, supporting pretty URLs (e.g., /2048 -> /2048.html)
app.use(express.static(__dirname, { extensions: ['html', 'htm'] }));

// Catch-all route to redirect back to index.html for unhandled paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
