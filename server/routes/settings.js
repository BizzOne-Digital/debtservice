const router = require('express').Router();
const { Settings } = require('../models');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const settings = await Settings.find();
  const obj = {};
  settings.forEach(s => { obj[s.key] = s.value; });
  res.json(obj);
});

router.put('/:key', auth, async (req, res) => {
  const setting = await Settings.findOneAndUpdate(
    { key: req.params.key },
    { value: req.body.value },
    { new: true, upsert: true }
  );
  res.json(setting);
});

router.post('/bulk', auth, async (req, res) => {
  const { settings } = req.body;
  const ops = Object.entries(settings).map(([key, value]) => ({
    updateOne: { filter: { key }, update: { value }, upsert: true }
  }));
  await Settings.bulkWrite(ops);
  res.json({ message: 'Settings updated' });
});

module.exports = router;
