// services.js
const express = require('express');
const router1 = express.Router();
const { Service } = require('../models');
const auth = require('../middleware/auth');

router1.get('/', async (req, res) => { res.json(await Service.find({ active: true }).sort({ order: 1 })); });
router1.get('/all', auth, async (req, res) => { res.json(await Service.find().sort({ order: 1 })); });
router1.post('/', auth, async (req, res) => { const s = new Service(req.body); await s.save(); res.status(201).json(s); });
router1.put('/:id', auth, async (req, res) => { res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })); });
router1.delete('/:id', auth, async (req, res) => { await Service.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });

module.exports = router1;
