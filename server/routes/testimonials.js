const router = require('express').Router();
const { Testimonial } = require('../models');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const items = await Testimonial.find({ active: true }).sort({ order: 1 });
  res.json(items);
});

router.get('/all', auth, async (req, res) => {
  const items = await Testimonial.find().sort({ order: 1 });
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const item = new Testimonial(req.body);
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', auth, async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
