import { useState, useEffect, useMemo } from 'react';
import { Search, X, Check, Loader2 } from 'lucide-react';
import { getLineUnitPlant, getUserAssigns, createUserAssign, updateUserAssign } from '../../apis/api';

const makeKey = (fId, uId, lId) => `${fId}-${uId}-${lId}`;

export default function UserAssignModal({ user, onClose, onSaved }) {
  const [rawData, setRawData] = useState([]);
  const [existingAssigns, setExistingAssigns] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [plantData, assignData] = await Promise.all([
        getLineUnitPlant(),
        getUserAssigns(user.id)
      ]);
      if (plantData) setRawData(plantData);
      if (assignData && Array.isArray(assignData)) {
        setExistingAssigns(assignData);
        const keys = new Set(assignData.map(a => makeKey(a.factoryId, a.unitId, a.sewingLineId)));
        setCheckedKeys(keys);
      }
      setLoading(false);
    };
    load();
  }, [user.id]);

  const existingKeys = useMemo(
    () => new Set(existingAssigns.map(a => makeKey(a.factoryId, a.unitId, a.sewingLineId))),
    [existingAssigns]
  );

  const existingMap = useMemo(() => {
    const map = new Map();
    existingAssigns.forEach(a => map.set(makeKey(a.factoryId, a.unitId, a.sewingLineId), a.id));
    return map;
  }, [existingAssigns]);

  const allKeys = useMemo(
    () => rawData.map(item => makeKey(item.factoryId, item.unitId, item.sewingLineId)),
    [rawData]
  );

  const filteredData = useMemo(() => {
    if (!search.trim()) return rawData;
    const q = search.toLowerCase();
    return rawData.filter(item =>
      (item.factoryName || '').toLowerCase().includes(q) ||
      (item.unitName || '').toLowerCase().includes(q) ||
      (item.sewingLineName || '').toLowerCase().includes(q)
    );
  }, [rawData, search]);

  const filteredKeys = useMemo(
    () => filteredData.map(item => makeKey(item.factoryId, item.unitId, item.sewingLineId)),
    [filteredData]
  );

  const allFilteredSelected = filteredKeys.length > 0 && filteredKeys.every(k => checkedKeys.has(k));

  const toggleLine = (key) => {
    setCheckedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const toggleSelectAllFiltered = () => {
    if (allFilteredSelected) {
      setCheckedKeys(prev => {
        const next = new Set(prev);
        filteredKeys.forEach(k => next.delete(k));
        return next;
      });
    } else {
      setCheckedKeys(prev => {
        const next = new Set(prev);
        filteredKeys.forEach(k => next.add(k));
        return next;
      });
    }
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);

    const toCreate = [];
    const toDelete = [];

    checkedKeys.forEach(key => {
      if (!existingKeys.has(key)) {
        const [factoryId, unitId, sewingLineId] = key.split('-').map(Number);
        toCreate.push({ factoryId, unitId, sewingLineId });
      }
    });

    existingKeys.forEach(key => {
      if (!checkedKeys.has(key)) {
        const id = existingMap.get(key);
        if (id) toDelete.push({ id, isDeleted: true, factoryId: 0, unitId: 0, sewingLineId: 0 });
      }
    });

    let success = true;

    if (toCreate.length > 0) {
      const res = await createUserAssign({ userId: user.id, assignments: toCreate, createdBy: 0 });
      if (!res || !res.message) success = false;
    }

    if (toDelete.length > 0) {
      const res = await updateUserAssign({ userId: user.id, updatedBy: 0, assignments: toDelete });
      if (!res || !res.message) success = false;
    }

    setSaving(false);

    if (success) {
      onSaved();
      onClose();
    } else {
      setError('Failed to save assignments');
    }
  };

  return (
    <>
      <style>{`
        .assign-scroll::-webkit-scrollbar { width: 5px; }
        .assign-scroll::-webkit-scrollbar-track { background: #121214; border-radius: 10px; }
        .assign-scroll::-webkit-scrollbar-thumb { background: #A855F7; border-radius: 10px; }
        .assign-scroll::-webkit-scrollbar-thumb:hover { background: #A855F7; }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray/70 backdrop-blur-sm" onClick={onClose}>
        <div
          className="bg-[#121214] border border-black rounded-xl w-[620px] max-h-[85vh] flex flex-col shadow-2xl shadow-black/60"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-black">
            <h2 className="text-sm font-bold text-white tracking-wide">Assign: {user.fullName}</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 pt-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#1a1a1e] border border-black rounded-lg text-white text-xs placeholder-white/25 focus:outline-none focus:border-[#A855F7]/40 transition-colors"
                placeholder="Search sewing lines..."
              />
            </div>
          </div>

          {/* Select Row */}
          <div className="flex items-center justify-between px-5 pb-3">
            <span className="text-xs text-white font-medium">Select Sewing Lines</span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={toggleSelectAllFiltered}
                className="px-3 py-1 text-[10px] font-semibold rounded-full border border-[#A855F7]/30 text-[#A855F7] hover:bg-[#A855F7]/10 transition-colors tracking-wide"
              >
                Select All
              </button>
              <span className="text-[10px] font-semibold text-[##A855F7] tabular-nums">
                {checkedKeys.size} selected
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-y-auto min-h-0 assign-scroll">
            <table className="w-full text-xs text-white">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#1a1a1e] border-b border-black">
                  <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-white/40">Factory</th>
                  <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-white/40">Unit</th>
                  <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-white/40">Sewing Line</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/40">Select</th>
                  <th className="px-5 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/40">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <Loader2 className="w-5 h-5 animate-spin text-[#A855F7]/50 mx-auto mb-2" />
                      <span className="text-white/25 text-xs">Loading lines...</span>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center text-white/25 text-xs">No sewing lines found</td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => {
                    const key = makeKey(item.factoryId, item.unitId, item.sewingLineId);
                    const isChecked = checkedKeys.has(key);

                    return (
                      <tr
                        key={key}
                        className={`border-b border-black/5 transition-colors hover:bg-white/[0.03] cursor-pointer ${
                          idx % 2 === 1 ? 'bg-white/[0.01]' : ''
                        }`}
                        onClick={() => toggleLine(key)}
                      >
                        <td className="px-5 py-2.5 text-white/80 font-medium whitespace-nowrap">{item.factoryName}</td>
                        <td className="px-5 py-2.5 text-white/50 whitespace-nowrap">{item.unitName}</td>
                        <td className="px-5 py-2.5 text-white/70 whitespace-nowrap">{item.sewingLineName}</td>
                        <td className="px-5 py-2.5 text-center">
                          <div
                            className={`w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center mx-auto transition-all duration-150 ${
                              isChecked
                                ? 'border-[#A855F7] bg-[#A855F7] shadow-[0_0_8px_rgba(255,122,0,0.2)]'
                                : 'border-[#A855F7]/20 bg-transparent hover:border-[#A855F7]/30'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                          </div>
                        </td>
                        <td className="px-5 py-2.5 text-center">
                          <span className={`inline-block px-2.5 py-[3px] rounded-full text-[10px] font-medium tracking-wide ${
                            isChecked
                              ? 'bg-[#A855F7]/12 text-[#A855F7] border border-[#A855F7]/20'
                              : 'bg-white/[0.04] text-white/30 border border-[#A855F7]/20'
                          }`}>
                            {isChecked ? 'Assigned' : 'Unassigned'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 px-5 py-3.5 border-t border-black bg-[#121214]">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-medium text-white/60 bg-[#1a1a1e] border border-black rounded-lg hover:text-white hover:bg-white/[0.08] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="px-6 py-2 text-xs font-semibold text-white bg-[#A855F7] hover:bg-[#ff8c1a] disabled:bg-[#A855F7]/30 disabled:cursor-not-allowed rounded-lg transition-all shadow-lg shadow-[#A855F7]/15 hover:shadow-[#A855F7]/25 flex items-center gap-1.5"
            >
              {saving ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Check className="w-3 h-3" />
              )}
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
