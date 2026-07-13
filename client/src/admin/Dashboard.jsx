import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { PhoneIcon, MailIcon, UserIcon, ChartIcon, ArrowIcon } from '../components/Icons';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get('/leads/stats/summary').then(r => setStats(r.data)).catch(() => {});
    api.get('/leads?limit=5').then(r => setRecentLeads(r.data.leads || [])).catch(() => {});
    api.get('/contact').then(r => setMessages(r.data?.slice(0, 5) || [])).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats?.total ?? '—', color: 'bg-navy-900', icon: <UserIcon className="w-6 h-6" /> },
    { label: 'New Leads', value: stats?.newLeads ?? '—', color: 'bg-crimson-600', icon: <PhoneIcon className="w-6 h-6" /> },
    { label: 'This Month', value: stats?.thisMonth ?? '—', color: 'bg-blue-600', icon: <ChartIcon className="w-6 h-6" /> },
    { label: 'Closed / Won', value: stats?.closed ?? '—', color: 'bg-green-600', icon: <MailIcon className="w-6 h-6" /> },
  ];

  const statusColors = {
    new: 'bg-crimson-100 text-crimson-700',
    contacted: 'bg-blue-100 text-blue-700',
    qualified: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of your leads and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-white mb-3`}>{s.icon}</div>
            <div className="text-2xl font-black text-navy-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Recent Leads</h2>
            <Link to="/admin/leads" className="text-crimson-600 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 ? (
              <p className="p-5 text-gray-400 text-sm">No leads yet.</p>
            ) : recentLeads.map(lead => (
              <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{lead.name}</div>
                    <div className="text-gray-500 text-xs">{lead.phone} · {lead.email}</div>
                    {lead.debtAmount && <div className="text-xs text-gray-400 mt-0.5">Debt: {lead.debtAmount}</div>}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Recent Messages</h2>
            <Link to="/admin/messages" className="text-crimson-600 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {messages.length === 0 ? (
              <p className="p-5 text-gray-400 text-sm">No messages yet.</p>
            ) : messages.map(m => (
              <div key={m._id} className={`p-4 hover:bg-gray-50 transition-colors ${!m.read ? 'border-l-2 border-crimson-500' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{m.name}</div>
                    <div className="text-gray-500 text-xs">{m.email || m.phone}</div>
                    <div className="text-gray-600 text-xs mt-1 line-clamp-2">{m.message}</div>
                  </div>
                  {!m.read && <span className="text-xs bg-crimson-100 text-crimson-700 font-semibold px-2 py-0.5 rounded-full shrink-0">New</span>}
                </div>
                <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-navy-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Manage Leads', to: '/admin/leads', color: 'bg-crimson-50 text-crimson-700 hover:bg-crimson-100' },
            { label: 'Upload Gallery', to: '/admin/gallery', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
            { label: 'Add Testimonial', to: '/admin/testimonials', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
            { label: 'Write Blog Post', to: '/admin/blog', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
          ].map(a => (
            <Link key={a.to} to={a.to} className={`${a.color} rounded-lg px-4 py-3 text-sm font-semibold transition-colors text-center`}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
