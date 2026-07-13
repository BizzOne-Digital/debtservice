import { useEffect, useState } from 'react';
import api from '../utils/api';
import { TrashIcon, EyeIcon } from '../components/Icons';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetch = async () => {
    const r = await api.get('/contact');
    setMessages(r.data);
  };
  useEffect(() => { fetch(); }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    fetch();
  };

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    toast.success('Deleted');
    setSelected(null);
    fetch();
  };

  const openMsg = (m) => {
    setSelected(m);
    if (!m.read) markRead(m._id);
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-navy-900">Messages</h1>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 font-bold text-navy-900">Inbox ({messages.filter(m => !m.read).length} unread)</div>
          <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="p-5 text-gray-400 text-sm">No messages yet.</p>
            ) : messages.map(m => (
              <div
                key={m._id}
                onClick={() => openMsg(m)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === m._id ? 'bg-blue-50' : ''} ${!m.read ? 'border-l-2 border-crimson-500' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{m.name}</div>
                    <div className="text-gray-500 text-xs">{m.email || m.phone}</div>
                    <div className="text-gray-600 text-xs mt-1 line-clamp-1">{m.message}</div>
                  </div>
                  <div className="text-right shrink-0">
                    {!m.read && <span className="text-xs bg-crimson-100 text-crimson-700 font-semibold px-2 py-0.5 rounded-full block mb-1">New</span>}
                    <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {selected ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-navy-900 text-lg">{selected.name}</h2>
                  <p className="text-gray-500 text-sm">{selected.email} · {selected.phone}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => deleteMsg(selected._id)} className="text-red-500 hover:text-red-700 p-2">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-gray-700 text-sm leading-relaxed">
                {selected.message}
              </div>
              <div className="mt-4 flex gap-2">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="btn-primary text-sm py-2 px-4 flex items-center gap-1">
                    Call Now
                  </a>
                )}
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="btn-outline bg-navy-900 text-sm py-2 px-4">
                    Reply by Email
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <EyeIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
