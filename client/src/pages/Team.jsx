import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PhoneIcon, ArrowIcon } from '../components/Icons';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const defaultTeam = [
  {
    _id: '1',
    name: 'Navjot',
    role: 'Debt Relief Specialist',
    bio: 'With years of experience helping Canadians overcome financial hardship, Navjot leads every consultation with honesty, compassion, and results.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
];

export default function Team() {
  const [team, setTeam] = useState(defaultTeam);

  useEffect(() => {
    api.get('/team').then(r => { if (r.data?.length > 0) setTeam(r.data); }).catch(() => {});
  }, []);

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Our Team</h1>
          <p className="text-lg text-gray-300">Real people who genuinely care about your financial future.</p>
        </Reveal>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member._id} className="card text-center overflow-hidden group">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-900 text-white text-5xl font-black">
                      {member.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-navy-900 mb-1">{member.name}</h3>
                  <p className="text-crimson-600 font-semibold text-sm mb-3">{member.role}</p>
                  {member.bio && <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>}
                </div>
              </div>
            ))}
          </Reveal>

          {/* CTA */}
          <Reveal delay={200} className="mt-16 bg-navy-900 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Talk to Our Team Today</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get a free, no-obligation consultation. Our team will review your situation and explain all your options.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:5878921200" className="btn-primary flex items-center justify-center gap-2">
                <PhoneIcon className="w-5 h-5" />587-892-1200
              </a>
              <Link to="/contact" className="btn-outline flex items-center justify-center gap-2">
                Get Free Consultation <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
