// contact.js
const router = require('express').Router();
const { Contact } = require('../models');
const auth = require('../middleware/auth');
const { contactNotification } = require('../utils/mailer');

router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    await contactNotification(contact);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 });
  res.json(items);
});

router.put('/:id/read', auth, async (req, res) => {
  const item = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
