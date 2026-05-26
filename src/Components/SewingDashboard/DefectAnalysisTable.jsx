import { useFilter } from './FilterContext';

export default function DefectAnalysisTable() {
  const { dashboardData, dataLoading } = useFilter();
  const issues = dashboardData.issueDetails;

  const lineDefectTotals = {};
  issues.forEach(item => {
    const key = `${item.sewingLineId}`;
    lineDefectTotals[key] = (lineDefectTotals[key] || 0) + item.defectQty;
  });

  const rows = issues.map(item => {
    const lineTotal = lineDefectTotals[String(item.sewingLineId)] || 1;
    const pct = ((item.defectQty / lineTotal) * 100).toFixed(1) + '%';
    return [item.sewingLineName, item.buyerStyleName || '', item.operationName, item.issueName, String(item.defectQty), pct];
  });

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
        Defect Analysis Details
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-[11px] min-w-[600px] text-white">
          <thead className="bg-[#11458b] sticky top-0">
            <tr>
              {["Sewing Line", "Style", "Operation", "Issue", "Defects", "% of Line Defects"].map((h) => (
                <th key={h} className="px-2 py-1 border border-white/10 text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataLoading && rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/50">Loading data...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-white/50">No defect data available</td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c]">
                  {r.map((cell, idx) => (
                    <td key={idx} className="px-2 py-1 border border-white/10 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
