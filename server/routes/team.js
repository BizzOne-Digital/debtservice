const router = require('express').Router();
const { Team } = require('../models');
const auth = require('../middleware/auth');
const multer = require('multer');
const { makeStorage } = require('../utils/cloudinary');

const upload = multer({ storage: makeStorage('team') });

router.get('/', async (req, res) => { res.json(await Team.find({ active: true }).sort({ order: 1 })); });
router.get('/all', auth, async (req, res) => { res.json(await Team.find().sort({ order: 1 })); });
router.post('/', auth, upload.single('image'), async (req, res) => {
  const m = new Team({ ...req.body, imageUrl: req.file ? req.file.path : req.body.imageUrl });
  await m.save(); res.status(201).json(m);
});
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const update = { ...req.body };
  if (req.file) update.imageUrl = req.file.path;
  res.json(await Team.findByIdAndUpdate(req.params.id, update, { new: true }));
});
router.delete('/:id', auth, async (req, res) => { await Team.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });

module.exports = router;
