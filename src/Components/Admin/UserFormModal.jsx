import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../apis/api';

export default function UserFormModal({ user, onClose, onSaved }) {
  const isEdit = !!user;
  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    mobile: '',
    email: '',
    passwordHash: '',
    userTypeId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        userName: user.username || '',
        mobile: user.mobile || '',
        email: user.email || '',
        passwordHash: '',
        userTypeId: user.userTypeId || 0,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim() || !form.userName.trim()) {
      setError('Name and username are required');
      return;
    }
    setLoading(true);

    const body = {
      fullName: form.fullName.trim(),
      userName: form.userName.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      passwordHash: form.passwordHash,
      userTypeId: form.userTypeId,
      createdBy: 0,
    };

    const res = isEdit ? await updateUser(body) : await createUser(body);
    setLoading(false);

    if (res && res.message) {
      onSaved();
      onClose();
    } else {
      setError('Operation failed. Please try again.');
    }
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-[#0a1f3d] border border-white/15 rounded-lg w-[420px] max-h-[90vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#11458b]">
          <h2 className="text-sm font-bold uppercase text-white">{isEdit ? 'Edit User' : 'Create User'}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">&times;</button>
        </div>

        {error && (
          <div className="mx-4 mt-3 px-3 py-2 rounded bg-red-500/20 border border-red-500/30 text-red-400 text-xs">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {[
            { label: 'Full Name', field: 'fullName', type: 'text', required: true },
            { label: 'Username', field: 'userName', type: 'text', required: true },
            { label: 'Email', field: 'email', type: 'email' },
            { label: 'Mobile', field: 'mobile', type: 'text' },
            { label: 'Password', field: 'passwordHash', type: 'password' },
          ].map(item => (
            <div key={item.field}>
              <label className="block text-white/60 text-[10px] font-medium mb-1 uppercase tracking-wide">{item.label}</label>
              <input
                type={item.type}
                value={form[item.field]}
                onChange={e => update(item.field, e.target.value)}
                className="w-full px-3 py-2 bg-[#0c2647] border border-white/15 rounded-md text-white text-xs placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors"
                placeholder={item.label}
                required={item.required}
              />
            </div>
          ))}

          <div>
            <label className="block text-white/60 text-[10px] font-medium mb-1 uppercase tracking-wide">User Type</label>
            <select
              value={form.userTypeId}
              onChange={e => update('userTypeId', Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#0c2647] border border-white/15 rounded-md text-white text-xs focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value={0}>Select User Type</option>
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-xs text-white bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center gap-1.5">
              {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
