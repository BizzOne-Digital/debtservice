import { useEffect, useState } from 'react';
import api from '../utils/api';
import Reveal from '../components/Reveal';

const defaultImages = [
  { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', title: 'Professional Consultation', category: 'office' },
  { _id: '2', imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', title: 'Financial Planning', category: 'office' },
  { _id: '3', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80', title: 'Debt Review', category: 'office' },
  { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', title: 'Client Meeting', category: 'client' },
  { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', title: 'Credit Recovery', category: 'client' },
  { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', title: 'Fresh Start', category: 'general' },
];

export default function Gallery() {
  const [images, setImages] = useState(defaultImages);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get('/gallery').then(r => { if (r.data?.length > 0) setImages(r.data); }).catch(() => {});
  }, []);

  const categories = ['all', ...new Set(images.map(i => i.category).filter(Boolean))];
  const filtered = filter === 'all' ? images : images.filter(i => i.category === filter);

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Gallery</h1>
          <p className="text-lg text-gray-300">A look into how we work and the results we deliver.</p>
        </Reveal>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${
                  filter === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >{c}</button>
            ))}
          </div>

          {/* Grid */}
          <Reveal delay={100} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div
                key={img._id}
                onClick={() => setLightbox(img)}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-300 flex items-end">
                  {img.title && (
                    <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{img.title}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            {lightbox.title && <p className="text-white text-center mt-3 font-medium">{lightbox.title}</p>}
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-gray-300">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
