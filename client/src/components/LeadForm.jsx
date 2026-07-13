import { useState } from 'react';
import api from '../utils/api';
import { PhoneIcon, MailIcon, UserIcon, ArrowIcon } from './Icons';
import toast from 'react-hot-toast';

export default function LeadForm({ variant = 'default' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', debtAmount: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leads', form);
      setSent(true);
      toast.success('We received your request! We will contact you shortly.');
    } catch {
      toast.error('Something went wrong. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) return (
    <div className="text-center py-10">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-2">Thank You!</h3>
      <p className="text-gray-500">Our team will reach out to you within 24 hours for a free consultation.</p>
      <a href="tel:5878921200" className="mt-4 inline-flex items-center gap-2 text-crimson-600 font-semibold hover:underline">
        <PhoneIcon className="w-4 h-4" />Call now: 587-892-1200
      </a>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <UserIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input name="name" value={form.name} onChange={handle} required
            placeholder="Full Name" className="input-field pl-10" />
        </div>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input name="phone" value={form.phone} onChange={handle} required
            placeholder="Phone Number" className="input-field pl-10" />
        </div>
      </div>
      <div className="relative">
        <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input name="email" type="email" value={form.email} onChange={handle} required
          placeholder="Email Address" className="input-field pl-10" />
      </div>
      <select name="debtAmount" value={form.debtAmount} onChange={handle} className="input-field text-gray-500">
        <option value="">Total Debt Amount (optional)</option>
        <option>$5,000 - $15,000</option>
        <option>$15,000 - $30,000</option>
        <option>$30,000 - $50,000</option>
        <option>$50,000 - $100,000</option>
        <option>Over $100,000</option>
      </select>
      <textarea name="message" value={form.message} onChange={handle} rows={3}
        placeholder="Tell us briefly about your situation..." className="input-field resize-none" />
      <button type="submit" disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
        ) : (
          <>Get Free Consultation <ArrowIcon className="w-4 h-4" /></>
        )}
      </button>
      <p className="text-xs text-center text-gray-400">100% confidential. No obligation. Licensed professionals.</p>
    </form>
  );
}
