import { useEffect, useState } from 'react';
import api from '../utils/api';
import { PlusIcon, TrashIcon, EditIcon } from '../components/Icons';
import toast from 'react-hot-toast';

const empty = { title: '', excerpt: '', content: '', imageUrl: '', tags: '', published: false };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => { const r = await api.get('/blog/all'); setPosts(r.data); };
  useEffect(() => { fetch(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('image', file);
      if (editId) { await api.put(`/blog/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Updated'); }
      else { await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Post created!'); }
      setForm(empty); setEditId(null); setFile(null); setShowForm(false); fetch();
    } catch { toast.error('Error saving post'); }
  };

  const startEdit = (post) => {
    setForm({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : '' });
    setEditId(post._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/blog/${id}`); toast.success('Deleted'); fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-navy-900">Blog Posts</h1>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null); }} className="btn-primary text-sm py-2 flex items-center gap-2">
          <PlusIcon className="w-4 h-4" />New Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-navy-900 mb-4">{editId ? 'Edit Post' : 'New Blog Post'}</h2>
          <form onSubmit={submit} className="space-y-4">
            <input placeholder="Post Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="input-field" />
            <input placeholder="Excerpt (short summary)" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="input-field" />
            <textarea placeholder="Full content..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className="input-field resize-none" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="input-field" />
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
                <div className="input-field text-gray-500 text-sm">{file ? file.name : 'Or upload image...'}</div>
              </label>
            </div>
            <input placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="input-field" />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-4 h-4 accent-crimson-600" />
                Publish immediately
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">{editId ? 'Update Post' : 'Create Post'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Title', 'Excerpt', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No posts yet.</td></tr>
            ) : posts.map(post => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy-900 max-w-xs">
                  <div className="line-clamp-1">{post.title}</div>
                </td>
                <td className="px-4 py-3 text-gray-500 max-w-xs">
                  <div className="line-clamp-1 text-xs">{post.excerpt}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(post)} className="text-blue-600 hover:text-blue-800 p-1"><EditIcon /></button>
                    <button onClick={() => deletePost(post._id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
