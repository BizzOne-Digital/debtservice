const mongoose = require('mongoose');

// Lead Model
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  debtAmount: String,
  message: String,
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

// Contact Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Gallery Model
const gallerySchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: { type: String, default: 'general' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Testimonial Model
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  rating: { type: Number, default: 5, min: 1, max: 5 },
  text: { type: String, required: true },
  debtReduced: String,
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Service Model
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String,
  features: [String],
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

// Blog Model
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: String,
  excerpt: String,
  imageUrl: String,
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Team Member Model
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  bio: String,
  imageUrl: String,
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

// Settings Model
const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed,
});

module.exports = {
  Lead: mongoose.model('Lead', leadSchema),
  Contact: mongoose.model('Contact', contactSchema),
  Gallery: mongoose.model('Gallery', gallerySchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  Service: mongoose.model('Service', serviceSchema),
  Blog: mongoose.model('Blog', blogSchema),
  Team: mongoose.model('Team', teamSchema),
  Settings: mongoose.model('Settings', settingsSchema),
};
