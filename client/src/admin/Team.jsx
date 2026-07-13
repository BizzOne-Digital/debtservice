// Team.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PlusIcon, TrashIcon, EditIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const empty = { name: '', role: '', bio: '', imageUrl: '', active: true };

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => { const r = await api.get('/team/all'); setItems(r.data); };
  useEffect(() => { fetch(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('image', file);
      if (editId) { await api.put(`/team/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Updated'); }
      else { await api.post('/team', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Added!'); }
      setForm(empty); setEditId(null); setFile(null); setShowForm(false); fetch();
    } catch { toast.error('Error saving'); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/team/${id}`); toast.success('Deleted'); fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-900">Team Members</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }} className="btn-primary text-sm py-2 flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="input-field" />
            <input placeholder="Role/Title" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" />
            <textarea placeholder="Bio" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} className="input-field resize-none sm:col-span-2" />
            <input placeholder="Photo URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="input-field" />
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
              <div className="input-field text-gray-500 text-sm">{file ? file.name : 'Or upload photo...'}</div>
            </label>
            <div className="flex gap-2 sm:col-span-2">
              <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add Member'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
              {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> :
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">{item.name?.charAt(0)}</div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-navy-900">{item.name}</div>
              <div className="text-crimson-600 text-sm">{item.role}</div>
              <div className="text-gray-500 text-xs mt-1 line-clamp-2">{item.bio}</div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setForm(item); setEditId(item._id); setShowForm(true); }} className="text-blue-600 p-1 hover:bg-blue-50 rounded"><EditIcon /></button>
                <button onClick={() => deleteItem(item._id)} className="text-red-500 p-1 hover:bg-red-50 rounded"><TrashIcon /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
