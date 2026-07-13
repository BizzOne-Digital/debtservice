// Gallery.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PlusIcon, TrashIcon } from '../components/Icons';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'general' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    const r = await api.get('/gallery/all');
    setItems(r.data);
  };
  useEffect(() => { fetch(); }, []);

  const submit = async e => {
    e.preventDefault();
    if (!file) return toast.error('Please select an image');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', file);
      await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Image uploaded!');
      setForm({ title: '', category: 'general' });
      setFile(null);
      e.target.reset();
      fetch();
    } catch { toast.error('Upload failed'); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this image?')) return;
    await api.delete(`/gallery/${id}`);
    toast.success('Deleted');
    fetch();
  };

  const toggleActive = async (item) => {
    await api.put(`/gallery/${item._id}`, { active: !item.active });
    fetch();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-navy-900">Gallery</h1>

      {/* Upload form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-navy-900 mb-4">Upload Image</h2>
        <form onSubmit={submit} className="grid sm:grid-cols-3 gap-4 items-end">
          <input
            placeholder="Image title" value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="input-field"
          />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field text-gray-600">
            {['general', 'office', 'team', 'client', 'event'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2">
            <label className="flex-1 cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
              <div className="input-field text-gray-500 text-center truncate">{file ? file.name : 'Choose image...'}</div>
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 sm:col-span-3">
            <PlusIcon className="w-4 h-4" />{loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item._id} className={`bg-white rounded-xl overflow-hidden shadow-sm border ${item.active ? 'border-gray-100' : 'border-red-200 opacity-60'}`}>
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="text-xs font-medium text-navy-900 truncate">{item.title || 'Untitled'}</div>
              <div className="text-xs text-gray-400 mb-2">{item.category}</div>
              <div className="flex gap-2">
                <button onClick={() => toggleActive(item)} className={`text-xs px-2 py-1 rounded flex-1 ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.active ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => deleteItem(item._id)} className="text-red-500 hover:text-red-700 p-1">
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 text-center py-16 text-gray-400">No images yet. Upload your first image above.</div>
        )}
      </div>
    </div>
  );
}
