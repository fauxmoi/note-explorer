const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.use(cors({ origin: 'http://localhost:5173' })); // change if your dev port differs
app.use(express.json());

// serve uploaded files directly
app.use('/uploads', express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname}`.replace(/[^\w.\-]/g, '_');
    cb(null, safeName);
  },
});

const upload = multer({ storage });

function isPreviewable(mimeType, originalName) {
  return (
    mimeType.startsWith('image/') ||
    mimeType === 'application/pdf' ||
    mimeType.startsWith('text/') ||
    /\.(txt|md|csv|json|log|js|jsx|ts|tsx|html|css|xml|svg)$/i.test(originalName)
  );
}

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const parentId = req.body.parentId || null;

  res.json({
    id: Date.now().toString(),
    type: 'file',
    name: req.file.originalname,
    parentId,
    createdAt: new Date().toLocaleDateString(),
    storedName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    previewable: isPreviewable(req.file.mimetype, req.file.originalname),
  });
});

app.get('/api/files/:storedName', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.storedName);
  if (!fs.existsSync(filePath)) return res.status(404).send('Not found');

  if (req.query.download === '1') {
    return res.download(filePath);
  }

  return res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`File server running on http://localhost:${PORT}`);
});