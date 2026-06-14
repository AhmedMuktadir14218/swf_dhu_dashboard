import { useFilter } from './FilterContext';

const HEADER_H = 28;
const COL_W = 80;

function buildRowSpans(rows) {
  const spans = rows.map(() => [1, 1, 1, 1]);
  const mergeCount = 4;
  for (let col = 0; col < mergeCount; col++) {
    let i = 0;
    while (i < rows.length) {
      let j = i + 1;
      while (j < rows.length && rows[j][col] === rows[i][col]) {
        spans[j][col] = 0;
        j++;
      }
      spans[i][col] = j - i;
      i = j;
    }
  }
  return spans;
}

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

  const spans = buildRowSpans(rows);

  const isSticky = (rowIdx, colIdx) => colIdx < 4 && spans[rowIdx][colIdx] > 1;

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
        Defect Analysis Details
      </div>
      <div className="overflow-auto flex-1 scroll-smooth snap-y snap-mandatory">
        <table className="w-full text-[11px] min-w-[600px] text-white">
          <thead className="bg-[#11458b] sticky top-0 z-30">
            <tr>
              {["Sewing Line", "Style", "Operation", "Issue", "Defects", "% of Line Defects"].map((h, idx) => (
                <th
                  key={h}
                  className={`px-2 py-1 border border-white/10 text-left whitespace-nowrap bg-[#11458b] ${idx < 4 ? "sticky z-30" : ""}`}
                  style={idx < 4 ? { left: `${idx * COL_W}px` } : undefined}
                >{h}</th>
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
                <tr key={i}>
                  {r.map((cell, idx) =>
                    spans[i][idx] === 0 ? null : (
                      <td
                        key={idx}
                        rowSpan={spans[i][idx]}
                        className={`px-2 py-1 border border-white/10 align-top ${isSticky(i, idx) ? "sticky z-10 bg-[#0a1f3d]" : "hover:bg-[#13325c]"}`}
                        style={isSticky(i, idx) ? { left: `${idx * COL_W}px`, top: `${HEADER_H}px` } : undefined}
                      >
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
