// routes/sounds.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// destination folder: workspace root / frontend / public / sounds
const uploadDir = path.resolve(__dirname, '..', '..', 'frontend', 'public', 'sounds');
// ensure folder exists
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // sanitize filename
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-\_]/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/sounds/upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const url = `/sounds/${req.file.filename}`;
  return res.json({ success: true, filename: req.file.filename, url });
});

module.exports = router;
