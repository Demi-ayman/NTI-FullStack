const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/myPortfolio')
  .then(() => console.log("Database connected"));

const aboutmeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  image: { type: String }
});

const AboutMe = mongoose.model('about', aboutmeSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads/')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Serve uploads folder
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GET all AboutMe
router.get('/', async (req, res) => {
  try {
    const about = await AboutMe.find();
    res.status(200).json(about);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE AboutMe
router.post('/', async (req, res) => {
  try {
    const { name, desc, image } = req.body; // image can be optional URL
    const about = new AboutMe({ name, desc, image });
    const saved = await about.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE AboutMe by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await AboutMe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// DELETE AboutMe by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await AboutMe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "About info not found" });
    res.status(200).json({ message: "Deleted successfully", deleted });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPLOAD image
router.post('/uploads', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
