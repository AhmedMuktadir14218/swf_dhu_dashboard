// import { useFilter } from './FilterContext';

// const HEADER_H = 28;
// const COL_W = 80;

// function buildRowSpans(rows) {
//   const spans = rows.map(() => [1, 1, 1, 1]);
//   const mergeCount = 4;
//   for (let col = 0; col < mergeCount; col++) {
//     let i = 0;
//     while (i < rows.length) {
//       let j = i + 1;
//       while (j < rows.length && rows[j][col] === rows[i][col]) {
//         spans[j][col] = 0;
//         j++;
//       }
//       spans[i][col] = j - i;
//       i = j;
//     }
//   }
//   return spans;
// }

// export default function DefectAnalysisTable() {
//   const { dashboardData, dataLoading } = useFilter();
//   const issues = dashboardData.issueDetails;

//   const lineDefectTotals = {};
//   issues.forEach(item => {
//     const key = `${item.sewingLineId}`;
//     lineDefectTotals[key] = (lineDefectTotals[key] || 0) + item.defectQty;
//   });

//   const rows = issues.map(item => {
//     const lineTotal = lineDefectTotals[String(item.sewingLineId)] || 1;
//     const pct = ((item.defectQty / lineTotal) * 100).toFixed(1) + '%';
//     return [item.sewingLineName, item.buyerStyleName || '', item.operationName, item.issueName, String(item.defectQty), pct];
//   });

//   const spans = buildRowSpans(rows);

//   const isSticky = (rowIdx, colIdx) => colIdx < 4 && spans[rowIdx][colIdx] > 1;

//   return (
//     <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
//       <div className="px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
//         Defect Analysis Details
//       </div>
//       <div className="overflow-auto flex-1 scroll-smooth snap-y snap-mandatory">
//         <table className="w-full text-[11px] min-w-[600px] text-white">
//           <thead className="bg-[#11458b] sticky top-0 z-30">
//             <tr>
//               {["Sewing Line", "Style", "Operation", "Issue", "Defects", "% of Line Defects"].map((h, idx) => (
//                 <th
//                   key={h}
//                   className={`px-2 py-1 border border-white/10 text-left whitespace-nowrap bg-[#11458b] ${idx < 4 ? "sticky z-30" : ""}`}
//                   style={idx < 4 ? { left: `${idx * COL_W}px` } : undefined}
//                 >{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {dataLoading && rows.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="px-4 py-6 text-center text-white/50">Loading data...</td>
//               </tr>
//             ) : rows.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="px-4 py-6 text-center text-white/50">No defect data available</td>
//               </tr>
//             ) : (
//               rows.map((r, i) => (
//                 <tr key={i}>
//                   {r.map((cell, idx) =>
//                     spans[i][idx] === 0 ? null : (
//                       <td
//                         key={idx}
//                         rowSpan={spans[i][idx]}
//                         className={`px-2 py-1 border border-white/10 align-top ${isSticky(i, idx) ? "sticky z-10 bg-[#0a1f3d]" : "hover:bg-[#13325c]"}`}
//                         style={isSticky(i, idx) ? { left: `${idx * COL_W}px`, top: `${HEADER_H}px` } : undefined}
//                       >
//                         {cell}
//                       </td>
//                     )
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



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

const stickyLeft = idx =>
  `calc(${idx} * var(--defect-sticky-col-w, ${COL_W}px))`;

const stickyHeaderStyle = idx => ({
  left: stickyLeft(idx),
  top: 0,
  width: `var(--defect-sticky-col-w, ${COL_W}px)`,
  minWidth: `var(--defect-sticky-col-w, ${COL_W}px)`,
  maxWidth: `var(--defect-sticky-col-w, ${COL_W}px)`
});

const stickyCellStyle = (idx, shouldStickUnderHeader) => ({
  left: stickyLeft(idx),
  width: `var(--defect-sticky-col-w, ${COL_W}px)`,
  minWidth: `var(--defect-sticky-col-w, ${COL_W}px)`,
  maxWidth: `var(--defect-sticky-col-w, ${COL_W}px)`,
  ...(shouldStickUnderHeader
    ? { top: `var(--defect-header-h, ${HEADER_H}px)` }
    : {})
});
const metricCellStyle = idx => {
  if (idx === 4) {
    return {
      width: 'var(--defect-defects-col-w, 70px)',
      minWidth: 'var(--defect-defects-col-w, 70px)',
      maxWidth: 'var(--defect-defects-col-w, 70px)'
    };
  }

  if (idx === 5) {
    return {
      width: 'var(--defect-pct-col-w, 130px)',
      minWidth: 'var(--defect-pct-col-w, 130px)',
      maxWidth: 'var(--defect-pct-col-w, 130px)'
    };
  }

  return undefined;
};

export default function DefectAnalysisTable() {
  const { dashboardData, dataLoading } = useFilter();
  const issues = dashboardData?.issueDetails || [];

  const lineDefectTotals = {};

  issues.forEach(item => {
    const key = `${item.sewingLineId}`;
    lineDefectTotals[key] = (lineDefectTotals[key] || 0) + item.defectQty;
  });

  const rows = issues.map(item => {
    const lineTotal = lineDefectTotals[String(item.sewingLineId)] || 1;
    const pct = ((item.defectQty / lineTotal) * 100).toFixed(1) + '%';

    return [
      item.sewingLineName,
      item.buyerStyleName || '',
      item.operationName,
      item.issueName,
      String(item.defectQty),
      pct
    ];
  });

  const spans = buildRowSpans(rows);

  return (
    <div className="defect-analysis-card rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full min-h-0">
      <div className="defect-analysis-title px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
        Defect Analysis Details
      </div>

      <div className="defect-analysis-scroll overflow-auto flex-1 min-h-0 scroll-smooth snap-y snap-mandatory">
        <table className="defect-analysis-table w-full table-fixed text-[11px] min-w-[600px] text-white border-collapse">
          <thead className="bg-[#11458b] sticky top-0 z-30">
            <tr>
              {[
                'Sewing Line',
                'Style',
                'Operation',
                'Issue',
                'Defects',
                '% of Line Defects'
              ].map((h, idx) => (
                <th
                  key={h}
                  className={`defect-th px-2 py-1 border border-white/20 text-left whitespace-normal break-words bg-[#11458b] ${
  idx < 4 ? 'sticky z-30' : ''
}`}
                  style={idx < 4 ? stickyHeaderStyle(idx) : metricCellStyle(idx)}
                  title={h}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataLoading && rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="defect-empty px-4 py-6 text-center text-white/50"
                >
                  Loading data...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="defect-empty px-4 py-6 text-center text-white/50"
                >
                  No defect data available
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, idx) => {
                    const span = idx < 4 ? spans[i][idx] : 1;

                    if (span === 0) return null;

                    const isLeftSticky = idx < 4;
                    const shouldStickUnderHeader = isLeftSticky && span > 1;

                    return (
                      <td
                        key={idx}
                        rowSpan={idx < 4 ? span : undefined}
                        className={`defect-td px-2 py-1 border border-white/20 align-top whitespace-normal break-words leading-tight ${
  isLeftSticky
    ? 'sticky z-10 bg-[#0a1f3d]'
    : 'hover:bg-[#13325c]'
}`}
                        style={
                          isLeftSticky
                            ? stickyCellStyle(idx, shouldStickUnderHeader)
                            : metricCellStyle(idx)
                        }
                        title={String(cell)}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}