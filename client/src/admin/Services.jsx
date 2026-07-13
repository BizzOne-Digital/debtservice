// Services.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PlusIcon, TrashIcon, EditIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const empty = { title: '', description: '', features: '', icon: 'ShieldIcon', active: true, order: 0 };
const iconOptions = ['ShieldIcon', 'HandshakeIcon', 'ChartIcon', 'DollarIcon', 'ClockIcon', 'LeafIcon'];

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => { const r = await api.get('/services/all'); setItems(r.data); };
  useEffect(() => { fetch(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form, features: form.features.split('\n').filter(Boolean) };
      if (editId) { await api.put(`/services/${editId}`, payload); toast.success('Updated'); }
      else { await api.post('/services', payload); toast.success('Service added!'); }
      setForm(empty); setEditId(null); setShowForm(false); fetch();
    } catch { toast.error('Error saving'); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/services/${id}`); toast.success('Deleted'); fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-900">Services</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }} className="btn-primary text-sm py-2 flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={submit} className="space-y-4">
            <input placeholder="Service Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="input-field" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="input-field resize-none" />
            <textarea placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={4} className="input-field resize-none" />
            <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="input-field">
              {iconOptions.map(name => <option key={name} value={name}>{name.replace('Icon', '')}</option>)}
            </select>
            <input placeholder="Display order (number)" type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} className="input-field" />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add Service'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-navy-900">{item.title}</div>
              <div className="text-gray-500 text-sm mt-1">{item.description}</div>
              {item.features?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.features.slice(0, 3).map(f => (
                    <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                  {item.features.length > 3 && <span className="text-xs text-gray-400">+{item.features.length - 3} more</span>}
                </div>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setForm({...item, features: (item.features || []).join('\n')}); setEditId(item._id); setShowForm(true); }} className="text-blue-600 p-1.5 hover:bg-blue-50 rounded"><EditIcon /></button>
              <button onClick={() => deleteItem(item._id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded"><TrashIcon /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
