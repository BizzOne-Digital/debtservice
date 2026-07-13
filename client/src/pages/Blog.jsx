// Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowIcon } from '../components/Icons';
import Reveal from '../components/Reveal';

const defaultPosts = [
  { _id: '1', title: "Consumer Proposal vs Bankruptcy: What's the Difference?", excerpt: "Understanding your options is the first step to financial freedom. We break down both paths and help you decide which is best for your situation.", imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80', createdAt: '2025-01-15' },
  { _id: '2', title: "How to Stop Collection Calls Legally in Canada", excerpt: "Learn your rights and the fastest, most legal way to stop creditors from calling you at home or at work — starting today.", imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80', createdAt: '2025-02-03' },
  { _id: '3', title: "5 Signs You Need Professional Debt Help Now", excerpt: "Struggling to make minimum payments? Missing bills? Here are the warning signs that it's time to get professional debt relief help.", imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80', createdAt: '2025-03-10' },
  { _id: '4', title: "What Is a Consumer Proposal and How Does It Work?", excerpt: "A consumer proposal is one of Canada's best-kept financial secrets. Here's everything you need to know about how it works.", imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80', createdAt: '2025-03-22' },
  { _id: '5', title: "Can I Keep My Car and House in a Consumer Proposal?", excerpt: "One of the biggest concerns people have is losing their assets. The good news is a consumer proposal usually lets you keep both.", imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80', createdAt: '2025-04-08' },
  { _id: '6', title: "Rebuilding Credit After Debt Relief: A Step-by-Step Guide", excerpt: "Completing a consumer proposal isn't the end — it's the beginning. Here's how to rebuild your credit score starting from day one.", imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80', createdAt: '2025-05-01' },
];

export default function Blog() {
  const [posts, setPosts] = useState(defaultPosts);
  useEffect(() => {
    api.get('/blog').then(r => { if (r.data?.length > 0) setPosts(r.data); }).catch(() => {});
  }, []);

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Debt Relief Insights</h1>
          <p className="text-lg text-gray-300">Education is the first step toward financial freedom.</p>
        </Reveal>
      </div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => (
              <div key={p._id} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img src={p.imageUrl || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{new Date(p.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <h3 className="font-bold text-navy-900 mb-2 group-hover:text-crimson-600 transition-colors leading-snug">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.excerpt}</p>
                  <span className="text-crimson-600 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Read More <ArrowIcon className="w-4 h-4" /></span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
