require('dotenv').config();
const mongoose = require('mongoose');
const { Gallery } = require('./models');

const defaultImages = [
  { title: 'Professional Consultation', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', category: 'office', order: 0 },
  { title: 'Financial Planning', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', category: 'office', order: 1 },
  { title: 'Debt Review', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80', category: 'office', order: 2 },
  { title: 'Client Meeting', imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', category: 'client', order: 3 },
  { title: 'Credit Recovery', imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', category: 'client', order: 4 },
  { title: 'Fresh Start', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', category: 'general', order: 5 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/debtservice');

  const existing = await Gallery.countDocuments();
  if (existing > 0) {
    console.log(`Gallery collection already has ${existing} document(s). Skipping seed to avoid duplicates.`);
    process.exit(0);
  }

  await Gallery.insertMany(defaultImages);
  console.log(`Seeded ${defaultImages.length} gallery images.`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
