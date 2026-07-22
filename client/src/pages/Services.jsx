import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ShieldIcon, HandshakeIcon, ChartIcon, DollarIcon, ClockIcon, LeafIcon, CheckIcon, ArrowIcon, PhoneIcon } from '../components/Icons';
import LeadForm from '../components/LeadForm';
import Reveal from '../components/Reveal';

export const iconMap = {
  ShieldIcon, HandshakeIcon, ChartIcon, DollarIcon, ClockIcon, LeafIcon,
};

const defaultServices = [
  {
    _id: '1',
    icon: 'ShieldIcon',
    title: 'Consumer Proposal',
    description: 'The most powerful debt relief tool in Canada. A consumer proposal lets you legally settle your unsecured debts for a fraction of what you owe — with zero interest.',
    features: ['Reduce debt by up to 80%', 'Single monthly payment', 'No interest on remaining balance', 'Stop all collection activity', 'Keep your assets', 'Discharge in as little as 5 years'],
  },
  {
    _id: '2',
    icon: 'HandshakeIcon',
    title: 'Debt Negotiation',
    description: 'We negotiate directly with your creditors on your behalf to reduce balances, waive interest, and create manageable repayment arrangements.',
    features: ['Direct creditor negotiation', 'Reduced interest rates', 'Waived late fees', 'Structured payment plans', 'Stop harassing calls', 'Written agreements'],
  },
  {
    _id: '3',
    icon: 'DollarIcon',
    title: 'Debt Consolidation (Alternative)',
    description: 'Instead of high-interest consolidation loans, we show you better alternatives that actually reduce what you owe rather than just rearranging it.',
    features: ['No new high-interest loans', 'One combined payment', 'Lower than consolidation loan rates', 'Better credit impact', 'Suitable for multiple debts', 'Personalized plan'],
  },
  {
    _id: '4',
    icon: 'ChartIcon',
    title: 'Credit Counselling',
    description: 'Understand your complete financial picture and build a recovery plan. We explain every option honestly so you can make the best decision for your future.',
    features: ['Full financial assessment', 'All options explained', 'No pressure or judgment', 'Budgeting support', 'Financial education', 'Ongoing guidance'],
  },
  {
    _id: '5',
    icon: 'LeafIcon',
    title: 'Fresh Start Program',
    description: 'After completing your debt relief program, we help you rebuild your credit and establish healthy financial habits for long-term stability.',
    features: ['Post-proposal support', 'Credit rebuilding plan', 'Financial habit coaching', 'Banking guidance', 'Secured credit advice', 'Progress tracking'],
  },
  {
    _id: '6',
    icon: 'ClockIcon',
    title: 'Emergency Debt Relief',
    description: 'Facing wage garnishment, frozen accounts, or imminent legal action? We move fast to protect you and stop creditor action immediately.',
    features: ['Same-day consultations available', 'Stop wage garnishment', 'Unfreeze bank accounts', 'Halt legal proceedings', 'Emergency filing available', 'Immediate creditor notification'],
  },
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    api.get('/services').then(r => { if (r.data?.length > 0) setServices(r.data); }).catch(() => {});
  }, []);

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Our Debt Relief Services</h1>
          <p className="text-lg text-gray-300">Every financial situation is unique. We match you with the right solution.</p>
        </Reveal>
      </div>

      <section className="py-20 bg-white">
        <Reveal delay={100} className="max-w-7xl mx-auto px-4 space-y-12">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || ShieldIcon;
            return (
              <div key={s._id || i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-navy-900 rounded-2xl flex items-center justify-center text-crimson-500 mb-5">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-3">{s.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-5">{s.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(s.features || []).map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-crimson-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-5xl font-black text-navy-900 mb-2">
                    {i === 0 ? '80%' : i === 4 ? '5★' : i === 5 ? '24h' : `0${i + 1}`}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {i === 0 ? 'Average debt reduction for qualified clients' :
                     i === 4 ? 'Client satisfaction rating' :
                     i === 5 ? 'Emergency response time' :
                     'Proven debt relief option'}
                  </p>
                  <Link to="/contact" className="mt-6 btn-primary inline-flex items-center gap-2 text-sm">
                    Learn More <ArrowIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <Reveal className="max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-4">Not Sure Which Option Is Right for You?</h2>
            <p className="text-gray-400 mb-4">That's exactly what we're here for. Our free consultation walks through your entire financial situation and recommends the best path forward.</p>
            <a href="tel:5198351210" className="btn-primary inline-flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />Call 519-835-1210
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-navy-900 mb-4">Get Your Free Consultation</h3>
            <LeadForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
