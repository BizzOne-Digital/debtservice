import { useState } from 'react';
import LeadForm from '../components/LeadForm';
import { PhoneIcon, MailIcon, LocationIcon, ClockIcon } from '../components/Icons';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [msg, setMsg] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = e => setMsg({ ...msg, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', msg);
      setSent(true);
      toast.success('Message sent!');
    } catch {
      toast.error('Error sending message.');
    } finally { setLoading(false); }
  };

  return (
    <div className="pt-24">
      <div className="hero-gradient py-20 text-center">
        <Reveal className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">Reach out for a free, confidential consultation. No judgment. No pressure.</p>
        </Reveal>
      </div>

      <section className="py-20 bg-white">
        <Reveal delay={100} className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-navy-900 mb-6">Get In Touch</h2>
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-crimson-100 rounded-xl flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-6 h-6 text-crimson-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 mb-1">Phone</p>
                  <a href="tel:5878921200" className="text-gray-600 hover:text-crimson-600 transition-colors">587-892-1200 (NAVJOT)</a>
                  <p className="text-xs text-gray-400 mt-0.5">Call or text anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-crimson-100 rounded-xl flex items-center justify-center shrink-0">
                  <MailIcon className="w-6 h-6 text-crimson-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 mb-1">Email</p>
                  <a href="mailto:info@debtservice.ca" className="text-gray-600 hover:text-crimson-600 transition-colors">info@debtservice.ca</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-crimson-100 rounded-xl flex items-center justify-center shrink-0">
                  <LocationIcon className="w-6 h-6 text-crimson-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 mb-1">Location</p>
                  <p className="text-gray-600">Alberta, Canada</p>
                  <p className="text-xs text-gray-400">Serving all of Alberta</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-crimson-100 rounded-xl flex items-center justify-center shrink-0">
                  <ClockIcon className="w-6 h-6 text-crimson-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 mb-1">Hours</p>
                  <p className="text-gray-600">Monday – Saturday: 9am – 7pm</p>
                  <p className="text-gray-600">Sunday: By appointment</p>
                </div>
              </div>
            </div>

            {/* Contact Message Form */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy-900 mb-4">Send Us a Message</h3>
              {sent ? (
                <p className="text-green-600 font-medium py-4 text-center">Thank you! We'll get back to you shortly.</p>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input name="name" value={msg.name} onChange={handle} required placeholder="Your Name" className="input-field" />
                  <input name="email" type="email" value={msg.email} onChange={handle} placeholder="Email" className="input-field" />
                  <input name="phone" value={msg.phone} onChange={handle} placeholder="Phone" className="input-field" />
                  <textarea name="message" value={msg.message} onChange={handle} rows={4} required placeholder="Your message..." className="input-field resize-none" />
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Lead Form */}
          <div className="bg-navy-900 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-2">Request Free Consultation</h2>
            <p className="text-gray-400 mb-6 text-sm">Tell us about your debt situation and we'll show you your options — for free.</p>
            <div className="[&_.input-field]:bg-white/10 [&_.input-field]:border-white/20 [&_.input-field]:text-white [&_.input-field::placeholder]:text-gray-400">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
