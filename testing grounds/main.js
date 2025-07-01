// server.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const db = new sqlite3.Database('recipes.db');

// Initialize table
db.run(`CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT
)`);

// Handle file upload and parsing
app.post('/upload', upload.single('pdf'), async (req, res) => {
  const fileBuffer = fs.readFileSync(req.file.path);
  const pdfData = await pdfParse(fileBuffer);
  
  const title = req.file.originalname.replace('.pdf', '');
  const content = pdfData.text;

  db.run(`INSERT INTO recipes (title, content) VALUES (?, ?)`, [title, content], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Recipe uploaded and saved!' });
  });

  fs.unlinkSync(req.file.path); // cleanup
});

// Serve frontend
app.use(express.static('public'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
