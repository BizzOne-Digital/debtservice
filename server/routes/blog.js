const router = require('express').Router();
const { Blog } = require('../models');
const auth = require('../middleware/auth');
const multer = require('multer');
const { makeStorage } = require('../utils/cloudinary');

const upload = multer({ storage: makeStorage('blog') });

router.get('/', async (req, res) => { res.json(await Blog.find({ published: true }).sort({ createdAt: -1 })); });
router.get('/all', auth, async (req, res) => { res.json(await Blog.find().sort({ createdAt: -1 })); });
router.get('/:slug', async (req, res) => {
  const post = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});
router.post('/', auth, upload.single('image'), async (req, res) => {
  const slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const post = new Blog({ ...req.body, slug, imageUrl: req.file ? req.file.path : req.body.imageUrl });
  await post.save();
  res.status(201).json(post);
});
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const update = { ...req.body };
  if (req.file) update.imageUrl = req.file.path;
  res.json(await Blog.findByIdAndUpdate(req.params.id, update, { new: true }));
});
router.delete('/:id', auth, async (req, res) => { await Blog.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });

module.exports = router;
