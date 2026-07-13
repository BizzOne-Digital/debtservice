const router = require('express').Router();
const { Lead } = require('../models');
const auth = require('../middleware/auth');
const { leadNotification } = require('../utils/mailer');

// Public: Submit a lead
router.post('/', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    await leadNotification(lead);
    res.status(201).json({ message: 'Lead submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get all leads
router.get('/', auth, async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};
  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
  const total = await Lead.countDocuments(filter);
  res.json({ leads, total, pages: Math.ceil(total / limit) });
});

// Admin: Update lead status
router.put('/:id', auth, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});

// Admin: Delete lead
router.delete('/:id', auth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Admin: Stats
router.get('/stats/summary', auth, async (req, res) => {
  const total = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({ status: 'new' });
  const contacted = await Lead.countDocuments({ status: 'contacted' });
  const qualified = await Lead.countDocuments({ status: 'qualified' });
  const closed = await Lead.countDocuments({ status: 'closed' });
  const thisMonth = await Lead.countDocuments({ createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } });
  res.json({ total, newLeads, contacted, qualified, closed, thisMonth });
});

module.exports = router;
