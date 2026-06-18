import { useState, useCallback } from 'react';
import { useFilter } from './FilterContext';
import PoDetailsModal from './PoDetailsModal';

const getStatusColor = (actualEff, targetEff) => {
  if (targetEff === 0) return 'bg-gray-500 shadow-[0_0_6px_#6b7280]';
  const ratio = actualEff / targetEff;
  if (ratio >= 0.9) return 'bg-green-500 shadow-[0_0_6px_#22c55e]';
  if (ratio >= 0.7) return 'bg-yellow-400 shadow-[0_0_6px_#facc15]';
  return 'bg-red-500 shadow-[0_0_6px_#ef4444]';
};

const getTextColor = (val) => {
  const num = parseFloat(val);
  if (num >= 100) return "text-lime-400";
  if (num >= 85) return "text-yellow-400";
  return "text-red-400";
};

const formatNum = (n) => {
  if (n === null || n === undefined) return '0';
  return n.toLocaleString('en-US');
};

export default function LinePerformanceTable() {
  const { dashboardData, dataLoading, filters, filterOptions } = useFilter();
  const rows = dashboardData.lineWiseDetails;
  const [showPoModal, setShowPoModal] = useState(false);

  const exportCSV = useCallback(() => {
    const plantNames = filters.plant.map(id => filterOptions.plants.find(p => String(p.id) === id)?.name).filter(Boolean).join(', ');
    const unitNames = filters.unit.map(id => filterOptions.units.find(u => String(u.id) === id)?.name).filter(Boolean).join(', ');
    const lineNames = filters.sewingLine.map(id => filterOptions.sewingLines.find(l => String(l.id) === id)?.name).filter(Boolean).join(', ');

    const headerInfo = [
      `Date From,${filters.dateFrom}`,
      `Date To,${filters.dateTo}`,
      `Factory,${plantNames}`,
      `Unit,${unitNames}`,
      `Line,${lineNames}`,
      '',
    ];

    const headers = ['Sewing Line', 'Day Target', 'IE Target',  'Output','A.W. Qty', 'Defect', 'Reject', 'Target Eff %', 'Actual Eff %', 'DHU %', 'Man Power', 'Working Hours', 'Status'];

    const statusText = (actualEff, targetEff) => {
      if (targetEff === 0) return 'N/A';
      const ratio = actualEff / targetEff;
      if (ratio >= 0.9) return 'On Track';
      if (ratio >= 0.7) return 'Warning';
      return 'Critical';
    };

    const csvRows = rows.map(r => [
      r.sewingLineName,
      r.dayTarget,
      r.ieTargetQty,
      r.pass,
      r.defectQty,
      r.rejectQty,
      r.targetEff.toFixed(2),
      r.actualEff.toFixed(2),
      r.dhu.toFixed(2),
      r.manPower,
      r.workingHours,
      statusText(r.actualEff, r.targetEff),
    ]);

    const escape = (val) => {
      const str = String(val ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [
      ...headerInfo,
      headers.map(escape).join(','),
      ...csvRows.map(row => row.map(escape).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LinePerformance_${filters.dateFrom}_${filters.dateTo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filters, filterOptions, rows]);

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
      <div className="px-3 py-1.5 border-b border-white/10 text-sm font-extrabold uppercase text-white">
        Line Performance Matrix
      </div>
      <div className="flex items-center gap-2">
       {/* <button onClick={() => setShowPoModal(true)} className="px-2 py-1 bg-blue-500 hover:bg-blue-600 uppercase text-white text-sm font-medium rounded-md transition-colors">
          PO Details
        </button> */}
        <button onClick={exportCSV} disabled={dataLoading || rows.length === 0} className="px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-green-600/40 disabled:cursor-not-allowed uppercase text-white text-sm font-medium rounded-md transition-colors flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          Export CSV
        </button>
        </div>
     </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs min-w-[950px] text-white">
          <thead className="bg-[#11458b] sticky top-0 z-10">
            <tr>
              {["Sewing Line", "Day Target", "IE Target",  "Output", "A.W. Qty", "Defect", "Reject", "Target Eff", "Actual Eff", "DHU %", "Man Power","Working Hours", "Status"].map((head) => (
                <th key={head} className="px-2 py-1.5 border border-white/10 text-left whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataLoading && rows.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-6 text-center text-white/50">Loading data...</td>
              </tr>
            ) : (
              rows.map((r, i) => {
                const totalOutput = r.pass + r.defectQty + r.rejectQty;
                return (
                  <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c] transition-colors">
                    <td className="px-2 py-1 border border-white/10 font-bold">{r.sewingLineName}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.dayTarget)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.ieTargetQty)}</td>
                    
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.pass)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.afterWashQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center text-yellow-400 font-bold">{formatNum(r.defectQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.rejectQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{r.targetEff.toFixed(2)}%</td>
                    <td className={`px-2 py-1 border border-white/10 text-center font-bold ${getTextColor(r.actualEff)}`}>{r.actualEff.toFixed(2)}%</td>
                    <td className="px-2 py-1 border border-white/10 text-center text-orange-400 font-bold">{r.dhu.toFixed(2)}%</td>
                  
                  
                    <td className="px-2 py-1 border border-white/10 text-center">{r.manPower}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{formatNum(r.workingHours)}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(r.actualEff, r.targetEff)}`} />
                    </td>
                  </tr>

                );
              })
            )}
          </tbody>
        </table>
      </div>
      {showPoModal && <PoDetailsModal filters={filters} onClose={() => setShowPoModal(false)} />}
    </div>
  );
}
