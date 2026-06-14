import { useState } from 'react';
import { createUserType } from '../../apis/api';

export default function UserTypeFormModal({ onClose }) {
  const [form, setForm] = useState({ typeCode: '', typeName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.typeCode.trim() || !form.typeName.trim()) {
      setError('Both fields are required');
      return;
    }
    setLoading(true);
    const res = await createUserType({
      typeCode: form.typeCode.trim(),
      typeName: form.typeName.trim(),
      isActive: true,
      isDeleted: false,
    });
    setLoading(false);
    if (res && res.message) {
      setSuccess('User type created successfully');
      setForm({ typeCode: '', typeName: '' });
    } else {
      setError('Failed to create user type');
    }
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-[#0a1f3d] border border-white/15 rounded-lg w-[380px] shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#11458b]">
          <h2 className="text-sm font-bold uppercase text-white">Create User Type</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">&times;</button>
        </div>

        {error && <div className="mx-4 mt-3 px-3 py-2 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-xs">{error}</div>}
        {success && <div className="mx-4 mt-3 px-3 py-2 rounded bg-green-500/20 border border-green-500/30 text-green-400 text-xs">{success}</div>}

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-white/60 text-[10px] font-medium mb-1 uppercase tracking-wide">Type Code</label>
            <input
              type="text"
              value={form.typeCode}
              onChange={e => update('typeCode', e.target.value)}
              className="w-full px-3 py-2 bg-[#0c2647] border border-white/15 rounded-md text-white text-xs placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="e.g. Admin"
              required
            />
          </div>
          <div>
            <label className="block text-white/60 text-[10px] font-medium mb-1 uppercase tracking-wide">Type Name</label>
            <input
              type="text"
              value={form.typeName}
              onChange={e => update('typeName', e.target.value)}
              className="w-full px-3 py-2 bg-[#0c2647] border border-white/15 rounded-md text-white text-xs placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="e.g. Administrator"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-xs text-white bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1.5">
              {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
