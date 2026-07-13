import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PlusIcon, TrashIcon, EditIcon, StarIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const empty = { name: '', location: '', rating: 5, text: '', debtReduced: '', active: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => { const r = await api.get('/testimonials/all'); setItems(r.data); };
  useEffect(() => { fetch(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      if (editId) { await api.put(`/testimonials/${editId}`, form); toast.success('Updated'); }
      else { await api.post('/testimonials', form); toast.success('Added'); }
      setForm(empty); setEditId(null); setShowForm(false); fetch();
    } catch { toast.error('Error saving'); }
  };

  const startEdit = (item) => {
    setForm(item); setEditId(item._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/testimonials/${id}`); toast.success('Deleted'); fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-900">Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }} className="btn-primary text-sm py-2 flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-navy-900 mb-4">{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Client Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="input-field" />
            <input placeholder="Location (e.g. Edmonton, AB)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input-field" />
            <input placeholder="Debt Reduced (e.g. $45K → $9,900)" value={form.debtReduced} onChange={e => setForm({...form, debtReduced: e.target.value})} className="input-field" />
            <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="input-field text-gray-600">
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
            <textarea placeholder="Testimonial text *" value={form.text} onChange={e => setForm({...form, text: e.target.value})} required rows={3} className="input-field resize-none sm:col-span-2" />
            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add Testimonial'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className={`bg-white rounded-xl shadow-sm border p-5 ${item.active ? 'border-gray-100' : 'border-red-200 opacity-60'}`}>
            <div className="flex gap-1 mb-2">
              {[...Array(item.rating || 5)].map((_, j) => <StarIcon key={j} className="w-4 h-4 text-gold" />)}
            </div>
            <p className="text-gray-600 text-sm italic mb-3 line-clamp-3">"{item.text}"</p>
            <div className="font-bold text-navy-900 text-sm">{item.name}</div>
            <div className="text-gray-400 text-xs">{item.location}</div>
            {item.debtReduced && <div className="text-crimson-600 font-bold text-xs mt-1">{item.debtReduced}</div>}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => startEdit(item)} className="text-blue-600 p-1.5 hover:bg-blue-50 rounded"><EditIcon /></button>
              <button onClick={() => deleteItem(item._id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded"><TrashIcon /></button>
              <button onClick={async () => { await api.put(`/testimonials/${item._id}`, { active: !item.active }); fetch(); }}
                className={`ml-auto text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {item.active ? 'Active' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
