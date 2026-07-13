// gallery.js
const router = require('express').Router();
const { Gallery } = require('../models');
const auth = require('../middleware/auth');
const multer = require('multer');
const { makeStorage } = require('../utils/cloudinary');

const upload = multer({ storage: makeStorage('gallery'), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  const items = await Gallery.find({ active: true }).sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.get('/all', auth, async (req, res) => {
  const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const item = new Gallery({
    ...req.body,
    imageUrl: req.file ? req.file.path : req.body.imageUrl,
  });
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const update = { ...req.body };
  if (req.file) update.imageUrl = req.file.path;
  const item = await Gallery.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
