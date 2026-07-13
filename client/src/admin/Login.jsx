import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin');
      toast.success('Welcome back!');
    } catch {
      toast.error('Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-crimson-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4">DS</div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Debt Service Inc.</p>
        </div>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input name="username" value={form.username} onChange={handle} required className="input-field" placeholder="admin" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handle} required className="input-field" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Logging in...</> : 'Login to Admin'}
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          <a href="/" className="hover:text-white transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
