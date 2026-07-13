require('dotenv').config();
const mongoose = require('mongoose');
const { Blog } = require('./models');

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const defaultPosts = [
  {
    title: "Consumer Proposal vs Bankruptcy: What's the Difference?",
    excerpt: "Understanding your options is the first step to financial freedom. We break down both paths and help you decide which is best for your situation.",
    content: "Understanding your options is the first step to financial freedom. We break down both paths and help you decide which is best for your situation.",
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80',
    published: true,
    createdAt: new Date('2025-01-15'),
  },
  {
    title: "How to Stop Collection Calls Legally in Canada",
    excerpt: "Learn your rights and the fastest, most legal way to stop creditors from calling you at home or at work — starting today.",
    content: "Learn your rights and the fastest, most legal way to stop creditors from calling you at home or at work — starting today.",
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
    published: true,
    createdAt: new Date('2025-02-03'),
  },
  {
    title: "5 Signs You Need Professional Debt Help Now",
    excerpt: "Struggling to make minimum payments? Missing bills? Here are the warning signs that it's time to get professional debt relief help.",
    content: "Struggling to make minimum payments? Missing bills? Here are the warning signs that it's time to get professional debt relief help.",
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80',
    published: true,
    createdAt: new Date('2025-03-10'),
  },
  {
    title: "What Is a Consumer Proposal and How Does It Work?",
    excerpt: "A consumer proposal is one of Canada's best-kept financial secrets. Here's everything you need to know about how it works.",
    content: "A consumer proposal is one of Canada's best-kept financial secrets. Here's everything you need to know about how it works.",
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80',
    published: true,
    createdAt: new Date('2025-03-22'),
  },
  {
    title: "Can I Keep My Car and House in a Consumer Proposal?",
    excerpt: "One of the biggest concerns people have is losing their assets. The good news is a consumer proposal usually lets you keep both.",
    content: "One of the biggest concerns people have is losing their assets. The good news is a consumer proposal usually lets you keep both.",
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80',
    published: true,
    createdAt: new Date('2025-04-08'),
  },
  {
    title: "Rebuilding Credit After Debt Relief: A Step-by-Step Guide",
    excerpt: "Completing a consumer proposal isn't the end — it's the beginning. Here's how to rebuild your credit score starting from day one.",
    content: "Completing a consumer proposal isn't the end — it's the beginning. Here's how to rebuild your credit score starting from day one.",
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80',
    published: true,
    createdAt: new Date('2025-05-01'),
  },
].map(p => ({ ...p, slug: slugify(p.title) }));

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/debtservice');

  const existing = await Blog.countDocuments();
  if (existing > 0) {
    console.log(`Blog collection already has ${existing} document(s). Skipping seed to avoid duplicates.`);
    process.exit(0);
  }

  await Blog.insertMany(defaultPosts);
  console.log(`Seeded ${defaultPosts.length} blog posts.`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
