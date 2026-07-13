import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import { CheckIcon, ShieldIcon, PhoneIcon, StarIcon, ArrowIcon } from '../components/Icons';
import Reveal from '../components/Reveal';
import api from '../utils/api';
import { iconMap } from './Services';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { value: 80, suffix: '%', label: 'Average Debt Reduced' },
  { value: 5, suffix: ' YRS', label: 'Flexible Repayment' },
  { value: 1000, suffix: '+', label: 'Canadians Helped' },
  { value: 100, suffix: '%', label: 'Free Consultation' },
];

const serviceColors = ['bg-navy-900', 'bg-crimson-600', 'bg-navy-700', 'bg-crimson-600'];

const defaultServices = [
  { _id: '1', icon: 'ShieldIcon', title: 'Consumer Proposal', description: 'Legally reduce your unsecured debt by up to 80%. One affordable payment, no interest.' },
  { _id: '2', icon: 'HandshakeIcon', title: 'Debt Negotiation', description: 'We negotiate directly with your creditors to stop collection calls and reduce what you owe.' },
  { _id: '3', icon: 'ChartIcon', title: 'Credit Counselling', description: 'Understand your options and build a plan that actually works for your financial situation.' },
  { _id: '4', icon: 'DollarIcon', title: 'Debt Consolidation', description: 'Combine all your debts into one manageable monthly payment without high-interest loans.' },
];

const steps = [
  { step: '01', title: 'Free Consultation', desc: 'Call us or fill out the form. We review your financial situation at no cost or obligation.' },
  { step: '02', title: 'Get Your Options', desc: 'We explain all legal debt relief options available to you, including consumer proposals.' },
  { step: '03', title: 'File Your Proposal', desc: 'Licensed professionals file your consumer proposal and notify creditors immediately.' },
  { step: '04', title: 'Start Fresh', desc: 'Make one affordable monthly payment and work toward a debt-free life within 5 years.' },
];

const defaultTestimonials = [
  { _id: '1', name: 'Sarah M.', location: 'Edmonton, AB', text: 'I was drowning in $45,000 of credit card debt. Debt Service reduced it by 78%. I can finally breathe again.', debtReduced: '$45K → $9,900', rating: 5 },
  { _id: '2', name: 'James T.', location: 'Calgary, AB', text: 'The team was professional and compassionate. They stopped all the collection calls within days.', debtReduced: '$32K → $7,040', rating: 5 },
  { _id: '3', name: 'Maria L.', location: 'Red Deer, AB', text: 'I was skeptical at first but they walked me through every step. Best decision I made.', debtReduced: '$28K → $5,600', rating: 5 },
];

const defaultPosts = [
  {
    _id: '1', slug: '',
    title: 'Consumer Proposal vs Bankruptcy: What\'s the Difference?',
    excerpt: 'Understanding your options is the first step. We break down both paths and help you decide what\'s best.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80',
    createdAt: '2025-01-01',
  },
  {
    _id: '2', slug: '',
    title: 'How to Stop Collection Calls Legally in Canada',
    excerpt: 'Learn your rights and the fastest, most legal way to stop creditors from calling you at home or work.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
    createdAt: '2025-02-01',
  },
  {
    _id: '3', slug: '',
    title: '5 Signs You Need Professional Debt Help Now',
    excerpt: 'Struggling to make minimum payments? Missing bills? Here are the warning signs and what to do next.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80',
    createdAt: '2025-03-01',
  },
];

export default function Home() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    api.get('/services').then(r => { if (r.data?.length > 0) setServices(r.data.slice(0, 4)); }).catch(() => {});
    api.get('/testimonials').then(r => { if (r.data?.length > 0) setTestimonials(r.data.slice(0, 3)); }).catch(() => {});
    api.get('/blog').then(r => { if (r.data?.length > 0) setPosts(r.data.slice(0, 3)); }).catch(() => {});
  }, []);

  const c1 = useCounter(80, 1800, statsVisible);
  const c2 = useCounter(5, 1000, statsVisible);
  const c3 = useCounter(1000, 2000, statsVisible);
  const c4 = useCounter(100, 1500, statsVisible);
  const counts = [c1, c2, c3, c4];

  return (
    <div>
      {/* HERO */}
      <section
        className="min-h-screen flex items-start lg:items-center pt-32 lg:pt-24 pb-12 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-crimson-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-crimson-600/20 border border-crimson-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-crimson-500 rounded-full animate-pulse" />
                <span className="text-crimson-400 text-sm font-semibold tracking-wide">Licensed Debt Relief Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Reduce Your Debt<br />
                <span className="text-crimson-500">By Up To 80%</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-xl">
                If you're overwhelmed by debt, a consumer proposal may allow you to settle for less than you owe — with one affordable monthly payment and zero interest.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link to="/contact" className="btn-primary text-center flex items-center justify-center gap-2">
                  Get Free Consultation <ArrowIcon className="w-4 h-4" />
                </Link>
                <a href="tel:5878921200" className="btn-outline text-center flex items-center justify-center gap-2">
                  <PhoneIcon className="w-4 h-4" />Call 587-892-1200
                </a>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {['Stop collection calls today', 'No interest payments', 'Licensed professionals', 'Free consultation'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckIcon className="w-4 h-4 text-crimson-400" />{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-xl font-bold text-navy-900 mb-1">Start Your Free Consultation</h2>
              <p className="text-sm text-gray-500 mb-6">No obligation. 100% confidential. Results in 24 hours.</p>
              <LeadForm />
            </div>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator opacity-50" />
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="bg-navy-800 py-16">
        <Reveal className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-6">
                <div className="stat-number">
                  {counts[i]}{s.suffix}
                </div>
                <div className="text-gray-400 text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* BANNER / TRUST STRIP */}
      <section className="bg-crimson-600 py-4">
        <Reveal className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-white font-semibold text-sm text-center">
          <span>✦ Stop Collection Calls Immediately</span>
          <span>✦ Reduce Debt Up To 80%</span>
          <span>✦ One Affordable Monthly Payment</span>
          <span>✦ No Interest. No Hidden Fees.</span>
          <span>✦ Licensed Professionals</span>
        </Reveal>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 bg-white">
        <Reveal className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-crimson-600 font-bold text-sm uppercase tracking-widest mb-3">About Debt Service Inc.</p>
            <h2 className="section-title">A Smarter Alternative to Debt Consolidation Loans</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most debt consolidation loans simply move your debt around — at high interest rates. If your credit is already struggling, you end up paying even more.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              A consumer proposal is different. It legally reduces what you owe, freezes interest, and gives you one manageable monthly payment based on what you can actually afford.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Reduce unsecured debt by up to 80%',
                'Pay based on what you can afford',
                'Stop all creditor calls and legal action',
                'Protect your assets',
                'Rebuild your credit from a clean slate',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-crimson-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckIcon className="w-4 h-4 text-crimson-600" />
                  </span>{item}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80"
              alt="Professional debt consultation"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-crimson-600 font-bold text-sm uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="section-title">Our Debt Relief Services</h2>
            <p className="section-sub">Every situation is different. We find the right solution for yours.</p>
          </Reveal>
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || ShieldIcon;
              return (
                <div key={s._id || i} className="card p-6 group hover:-translate-y-1 transition-transform duration-300">
                  <div className={`w-14 h-14 ${serviceColors[i % serviceColors.length]} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </Reveal>
          <div className="text-center mt-8">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              View All Services <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-crimson-600 font-bold text-sm uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Four straightforward steps to financial freedom.</p>
          </Reveal>
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-crimson-100 z-0" />
                )}
                <div className="relative z-10 w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-crimson-500 font-black text-xl">{s.step}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-crimson-400 font-bold text-sm uppercase tracking-widest mb-3">Real Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Hundreds of Canadians have taken back control of their finances with our help.</p>
          </Reveal>
          <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t._id || i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <StarIcon key={j} className="w-4 h-4 text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.location}</div>
                  </div>
                  {t.debtReduced && (
                    <div className="text-right">
                      <div className="text-crimson-400 font-bold text-sm">{t.debtReduced}</div>
                      <div className="text-gray-500 text-xs">debt reduced</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
          <div className="text-center mt-8">
            <Link to="/about" className="btn-outline inline-flex items-center gap-2">
              Read More Stories <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-crimson-600 py-16">
        <Reveal className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Reduce Your Debt by Up To 80%?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Call NAVJOT today for a free, no-obligation consultation. We'll review your situation and show you your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5878921200" className="bg-white text-crimson-600 font-black text-lg py-4 px-10 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
              <PhoneIcon className="w-5 h-5" />587-892-1200
            </a>
            <Link to="/contact" className="btn-outline text-lg py-4 px-10">
              Fill Out The Form
            </Link>
          </div>
        </Reveal>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <p className="text-crimson-600 font-bold text-sm uppercase tracking-widest mb-2">Resources</p>
              <h2 className="section-title mb-0">Debt Relief Insights</h2>
            </div>
            <Link to="/blog" className="text-crimson-600 font-semibold hover:underline flex items-center gap-1">
              View All Articles <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link key={post._id || i} to={post.slug ? `/blog/${post.slug}` : '/blog'} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  <h3 className="font-bold text-navy-900 mb-2 group-hover:text-crimson-600 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
