// About.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import api from '../utils/api';
import { CheckIcon, ArrowIcon, PhoneIcon, StarIcon } from '../components/Icons';
import Reveal from '../components/Reveal';

const defaultTestimonials = [
  { name: 'Sarah M.', location: 'Edmonton, AB', text: 'I was drowning in $45,000 of credit card debt. The team at Debt Service reduced it by 78%. I can finally sleep at night again.', debtReduced: '$45K → $9,900', rating: 5 },
  { name: 'James T.', location: 'Calgary, AB', text: 'They were professional and compassionate from day one. The collection calls stopped within 48 hours of filing.', debtReduced: '$32K → $7,040', rating: 5 },
  { name: 'Maria L.', location: 'Red Deer, AB', text: 'I was skeptical at first but they walked me through every single step. Best financial decision I ever made.', debtReduced: '$28K → $5,600', rating: 5 },
];

export default function About() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    api.get('/testimonials').then(r => { if (r.data?.length > 0) setTestimonials(r.data); }).catch(() => {});
  }, []);

  return (
    <div className="pt-24">
      {/* Header */}
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About Debt Service Inc.</h1>
          <p className="text-lg text-gray-300">We believe every Canadian deserves a path to financial freedom — regardless of how much debt they carry.</p>
        </Reveal>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <Reveal delay={100} className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-crimson-600 font-bold text-sm uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="section-title">We Help You Escape the Debt Cycle</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you're overwhelmed by debt, we help you explore legal options that can reduce your financial burden. Depending on your situation and eligibility, debt relief solutions such as a consumer proposal may allow you to settle your unsecured debts for less than the full amount owed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team explains your options, guides you through the process, and connects you with licensed professionals who can help you work toward a fresh financial start.
            </p>
            <ul className="space-y-3">
              {['Licensed and experienced professionals', 'Confidential and judgment-free consultations', 'Thousands of Canadians helped', 'Serving Alberta and surrounding provinces'].map(i => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-crimson-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckIcon className="w-4 h-4 text-crimson-600" />
                  </span>{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80" alt="Team" className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="section-title">Why Choose Debt Service Inc.?</h2>
          </Reveal>
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Reduce Debt Up To 80%', desc: 'A consumer proposal is the most powerful legal tool to reduce what you owe without declaring bankruptcy.' },
              { title: 'Stop Creditor Calls', desc: 'Once your proposal is filed, all collection calls and legal actions from creditors must stop immediately.' },
              { title: 'One Affordable Payment', desc: 'Combine all your debt into a single monthly payment based on what you can comfortably afford.' },
              { title: 'Zero Interest', desc: 'Unlike debt consolidation loans, consumer proposals carry no interest on the remaining balance.' },
              { title: 'Protect Your Assets', desc: 'Keep your home, car, and other assets while resolving your unsecured debts.' },
              { title: 'Fresh Financial Start', desc: 'Complete your proposal and begin rebuilding your credit toward a stable financial future.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-crimson-500 font-black text-sm mb-4">0{i + 1}</div>
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="section-title">What Our Clients Say</h2>
          </Reveal>
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating || 5)].map((_, j) => <StarIcon key={j} className="w-4 h-4 text-gold" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.location}</div>
                  </div>
                  {t.debtReduced && (
                    <div className="text-right">
                      <div className="text-crimson-600 font-bold text-sm">{t.debtReduced}</div>
                      <div className="text-gray-400 text-xs">debt reduced</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 text-center">
        <Reveal className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Take the First Step?</h2>
          <p className="text-gray-400 mb-8">Call us today for a completely free and confidential consultation. There's no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5878921200" className="btn-primary flex items-center justify-center gap-2">
              <PhoneIcon className="w-5 h-5" />587-892-1200
            </a>
            <Link to="/contact" className="btn-outline flex items-center justify-center gap-2">
              Contact Us <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
