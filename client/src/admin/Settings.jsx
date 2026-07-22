import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const defaults = {
  businessName: 'Debt Service Inc.',
  phone: '519-835-1210',
  email: 'info@debtservice.ca',
  address: 'Guelph, Ontario N1L 1N2',
  gmailUser: '',
  gmailPassword: '',
  adminEmail: '',
  heroHeadline: 'Reduce Your Debt By Up To 80%',
  heroSubtext: 'A consumer proposal may allow you to settle for less than you owe — with one affordable monthly payment.',
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => {
      setSettings(prev => ({ ...prev, ...r.data }));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/settings/bulk', { settings });
      toast.success('Settings saved!');
    } catch { toast.error('Error saving settings'); }
    finally { setSaving(false); }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={settings[key] || ''}
          onChange={e => setSettings({...settings, [key]: e.target.value})}
          rows={3} placeholder={placeholder}
          className="input-field resize-none"
        />
      ) : (
        <input
          type={type} value={settings[key] || ''}
          onChange={e => setSettings({...settings, [key]: e.target.value})}
          placeholder={placeholder} className="input-field"
        />
      )}
    </div>
  );

  if (loading) return <div className="text-center py-16 text-gray-400">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black text-navy-900">Settings</h1>

      <form onSubmit={save} className="space-y-6">
        {/* Business Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-navy-900 border-b border-gray-100 pb-3">Business Information</h2>
          {field('businessName', 'Business Name')}
          {field('phone', 'Phone Number')}
          {field('email', 'Email Address', 'email')}
          {field('address', 'Address / Location')}
        </div>

        {/* Hero Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-navy-900 border-b border-gray-100 pb-3">Homepage Hero</h2>
          {field('heroHeadline', 'Hero Headline')}
          {field('heroSubtext', 'Hero Subtext', 'textarea')}
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-navy-900 border-b border-gray-100 pb-3">Email Notifications (Gmail)</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
            <p className="font-semibold mb-1">How to set up Gmail notifications:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Go to myaccount.google.com → Security → 2-Step Verification (enable it)</li>
              <li>Go to App Passwords → create password for "Mail"</li>
              <li>Enter the 16-character app password below (not your regular Gmail password)</li>
              <li>These are saved in your server .env file for security</li>
            </ol>
          </div>
          {field('gmailUser', 'Gmail Address', 'email', 'yourname@gmail.com')}
          {field('gmailPassword', 'Gmail App Password (16 chars)', 'password', 'xxxx xxxx xxxx xxxx')}
          {field('adminEmail', 'Notification Recipient Email', 'email', 'where to receive alerts')}
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}
