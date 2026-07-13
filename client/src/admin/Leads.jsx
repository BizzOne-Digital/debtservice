import { useEffect, useState } from 'react';
import api from '../utils/api';
import { TrashIcon, EditIcon, PhoneIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const statusColors = {
  new: 'bg-crimson-100 text-crimson-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-green-100 text-green-700',
};

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await api.get(`/leads${filter ? `?status=${filter}` : ''}`);
      setLeads(r.data.leads || []);
    } catch { toast.error('Failed to load leads'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [filter]);

  const updateLead = async (id) => {
    try {
      await api.put(`/leads/${id}`, editData);
      toast.success('Lead updated');
      setEditId(null);
      fetch();
    } catch { toast.error('Update failed'); }
  };

  const deleteLead = async (id) => {
    if (!confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    toast.success('Deleted');
    fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Leads</h1>
          <p className="text-gray-500 text-sm">Manage all consultation requests</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['', 'new', 'contacted', 'qualified', 'closed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === s ? 'bg-navy-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="table-responsive">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Name', 'Phone', 'Email', 'Debt Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No leads found.</td></tr>
              ) : leads.map(lead => (
                <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                  {editId === lead._id ? (
                    <>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 text-xs w-full" value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 text-xs w-full" value={editData.phone || ''} onChange={e => setEditData({...editData, phone: e.target.value})} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 text-xs w-full" value={editData.email || ''} onChange={e => setEditData({...editData, email: e.target.value})} /></td>
                      <td className="px-4 py-2">{lead.debtAmount || '—'}</td>
                      <td className="px-4 py-2">
                        <select className="border rounded px-2 py-1 text-xs" value={editData.status || lead.status} onChange={e => setEditData({...editData, status: e.target.value})}>
                          {['new', 'contacted', 'qualified', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-1">
                          <button onClick={() => updateLead(lead._id)} className="bg-green-600 text-white text-xs px-2 py-1 rounded">Save</button>
                          <button onClick={() => setEditId(null)} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-navy-900">{lead.name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${lead.phone}`} className="text-crimson-600 hover:underline flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3" />{lead.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.debtAmount || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditId(lead._id); setEditData(lead); }} className="text-blue-600 hover:text-blue-800">
                            <EditIcon />
                          </button>
                          <button onClick={() => deleteLead(lead._id)} className="text-red-500 hover:text-red-700">
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
