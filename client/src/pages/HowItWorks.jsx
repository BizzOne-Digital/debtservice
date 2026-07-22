import { Link } from 'react-router-dom';
import { CheckIcon, PhoneIcon, ArrowIcon } from '../components/Icons';
import LeadForm from '../components/LeadForm';
import Reveal from '../components/Reveal';

const steps = [
  {
    step: '01', title: 'Free Consultation',
    desc: 'Contact us by phone or online form. We review your full financial situation — debts, income, and assets — at absolutely no cost and no obligation to you.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    bullets: ['No cost, no obligation', 'Completely confidential', 'We review all debts and income', 'Options explained clearly'],
  },
  {
    step: '02', title: 'Review Your Options',
    desc: 'We present all legal debt relief options available to you, from consumer proposals to credit counselling. We explain the pros and cons of each so you can make an informed decision.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    bullets: ['All options on the table', 'No pressure to decide', 'Honest, clear explanations', 'Tailored to your situation'],
  },
  {
    step: '03', title: 'File Your Proposal',
    desc: 'Once you choose your path, we connect you with a Licensed Insolvency Trustee who files your consumer proposal. Creditor action stops immediately upon filing.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    bullets: ['Filed by licensed professionals', 'Creditor calls stop immediately', 'Legal protection begins', 'Creditors notified within days'],
  },
  {
    step: '04', title: 'Start Your Fresh Start',
    desc: 'Make one affordable monthly payment over up to 5 years with no interest. When complete, the remaining debt is legally forgiven forever.',
    img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
    bullets: ['One monthly payment', 'Zero interest', 'Remaining debt forgiven', 'Begin rebuilding credit'],
  },
];

export default function HowItWorks() {
  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">How It Works</h1>
          <p className="text-lg text-gray-300">A clear, simple path from overwhelming debt to financial freedom.</p>
        </Reveal>
      </div>

      <section className="py-20 bg-white">
        <Reveal delay={100} className="max-w-7xl mx-auto px-4 space-y-20">
          {steps.map((s, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center">
                    <span className="text-crimson-500 font-black text-xl">{s.step}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-navy-900">{s.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-center gap-3 text-gray-700 text-sm">
                      <span className="w-5 h-5 bg-crimson-100 rounded-full flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3 h-3 text-crimson-600" />
                      </span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`rounded-2xl overflow-hidden shadow-xl aspect-video ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CTA + Form */}
      <section className="bg-navy-900 py-16">
        <Reveal className="max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6">Call NAVJOT or fill out the form to begin your free consultation today.</p>
            <a href="tel:5198351210" className="btn-primary inline-flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />519-835-1210
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <LeadForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
