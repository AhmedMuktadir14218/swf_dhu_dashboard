import { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Search, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { getUsers, deleteUser } from '../../apis/api';
import UserFormModal from '../../components/Admin/UserFormModal';
import UserAssignModal from '../../components/Admin/UserAssignModal';
import UserTypeFormModal from '../../components/Admin/UserTypeFormModal';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const pageSize = 10;

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(null);
  const [showAssign, setShowAssign] = useState(null);
  const [showUserType, setShowUserType] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const params = { pageNumber: page, pageSize };
    if (search.trim()) params.search = search.trim();
    const res = await getUsers(params);
    if (res) {
      setUsers(res.data || []);
      setTotalCount(res.totalCount || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleDelete = async (userId) => {
    const res = await deleteUser(userId);
    if (res) {
      setDeleteConfirm(null);
      fetchUsers();
    }
  };

  return (
    <div className="h-full overflow-auto p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#11458b]/50">
            <h1 className="text-sm font-bold uppercase text-white">User Management</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUserType(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-md transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                User Type
              </button>
              <button
                onClick={() => setShowCreateUser(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-md transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Create User
              </button>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-white/10">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-3 py-1.5 bg-[#0c2647] border border-white/15 rounded-md text-white text-xs placeholder-white/30 focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="Search users..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-white">
              <thead className="bg-[#0c2647]">
                <tr>
                  {['ID', 'Name', 'Username', 'Email', 'Mobile', 'Roles', 'Assignments'].map(h => (
                    <th key={h} className="px-3 py-2 border-b border-white/10 text-left text-white/60 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                  <th className="px-3 py-2 border-b border-white/10 text-right text-white/60 font-medium uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-white/40">Loading...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-white/40">No users found</td></tr>
                ) : users.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-[#13325c] transition-colors">
                    <td className="px-3 py-2 text-white/50">{u.id}</td>
                    <td className="px-3 py-2 font-semibold">{u.fullName}</td>
                    <td className="px-3 py-2">{u.username}</td>
                    <td className="px-3 py-2 text-white/60">{u.email || '-'}</td>
                    <td className="px-3 py-2 text-white/60">{u.mobile || '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1 flex-wrap">
                        {(u.roles || []).map(r => (
                          <span key={r} className="px-1.5 py-0.5 bg-sky-500/20 text-sky-400 rounded text-[10px] font-medium">{r}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1 flex-wrap max-w-xs">
                        {(u.userAssigns || []).slice(0, 3).map((a, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-white/5 text-white/60 rounded text-[10px] whitespace-nowrap">
                            {a.factoryName?.split(' ')[0]}-{a.unitName}-{a.sewingLineName}
                          </span>
                        ))}
                        {(u.userAssigns || []).length > 3 && (
                          <span className="text-[10px] text-white/30">+{u.userAssigns.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setShowAssign(u)}
                          className="p-1.5 text-sky-400 hover:bg-sky-500/10 rounded transition-colors"
                          title="Manage Assignments"
                        >
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setShowEditUser(u)}
                          className="p-1.5 text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(u.id)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-white/40">Showing {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, totalCount)} of {totalCount}</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-1.5 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                      p === page ? 'bg-sky-500 text-white' : 'text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-1.5 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateUser && <UserFormModal onClose={() => setShowCreateUser(false)} onSaved={fetchUsers} />}
      {showEditUser && <UserFormModal user={showEditUser} onClose={() => setShowEditUser(null)} onSaved={fetchUsers} />}
      {showAssign && <UserAssignModal user={showAssign} onClose={() => setShowAssign(null)} onSaved={fetchUsers} />}
      {showUserType && <UserTypeFormModal onClose={() => setShowUserType(false)} />}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#0a1f3d] border border-white/15 rounded-lg p-6 w-80 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-white mb-2">Delete User</h3>
            <p className="text-xs text-white/50 mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
