const poData = [
  { poNo: '2031159046', buyer: 'Uniqlo', style: 'SH-5522', target: 80000, output: 62451, shadeOk: 59380, dhu: 2.48, rework: 2.38, rewash: 48, status: 'On Track' },
  { poNo: '2031162231', buyer: 'H&M', style: 'HM-7721', target: 60000, output: 45210, shadeOk: 43620, dhu: 2.72, rework: 2.26, rewash: 65, status: 'On Track' },
  { poNo: '2031167781', buyer: 'M&S', style: 'MS-3310', target: 70000, output: 50665, shadeOk: 48932, dhu: 2.19, rework: 2.18, rewash: 926, status: 'On Track' },
  { poNo: '2031174450', buyer: 'Zara', style: 'ZA-8210', target: 45000, output: 24420, shadeOk: 23890, dhu: 2.91, rework: 2.32, rewash: 385, status: 'At Risk' },
  // { poNo: '2031178890', buyer: 'Next', style: 'NX-4410', target: 40000, output: 0, shadeOk: 0, dhu: 0, rework: 0, rewash: 0, status: 'Not Started' },
];

const getStatusBadge = (status) => {
  const statusConfig = {
    'On Track': 'bg-status-green/20 text-status-green',
    'At Risk': 'bg-status-amber/20 text-status-amber',
    'Not Started': 'bg-status-red/20 text-status-red',
  };
  return statusConfig[status] || 'bg-slate-500/20 text-slate-400';
};

const POWiseSummary = () => {
  const totalTarget = poData.reduce((sum, row) => sum + row.target, 0);
  const totalOutput = poData.reduce((sum, row) => sum + row.output, 0);
  const totalShadeOk = poData.reduce((sum, row) => sum + row.shadeOk, 0);
  const avgDhu = (poData.reduce((sum, row) => sum + row.dhu, 0) / poData.filter(r => r.dhu > 0).length).toFixed(2);
  const avgRework = (poData.reduce((sum, row) => sum + row.rework, 0) / poData.filter(r => r.rework > 0).length).toFixed(2);
  const avgRewash = (poData.reduce((sum, row) => sum + row.rewash, 0) / poData.filter(r => r.rewash > 0).length).toFixed(2);

  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="px-4 py-3 border-b border-neon-cyan/20">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">PO Wise Running Summary</h3>
      </div>
      <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead className="sticky top-0 z-10">
            <tr className="bg-table-header border-b border-neon-cyan/20">
              <th className="px-2 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider">PO No.</th>
              <th className="px-2 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider">Buyer</th>
              <th className="px-2 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider">Style</th>
              <th className="px-2 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Target</th>
              <th className="px-2 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Output</th>
              <th className="px-2 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Shade OK</th>
              <th className="px-2 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">DHU%</th> 
              <th className="px-2 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Rewash</th>
            </tr>
          </thead>
          <tbody>
            {poData.map((row, idx) => (
              <tr key={idx} className="border-b border-neon-cyan/10 hover:bg-neon-cyan/5 transition-colors">
                <td className="px-2 py-2 text-white font-medium">{row.poNo}</td>
                <td className="px-2 py-2 text-slate-300">{row.buyer}</td>
                <td className="px-2 py-2 text-slate-300">{row.style}</td>
                <td className="px-2 py-2 text-right text-slate-300">{row.target.toLocaleString()}</td>
                <td className="px-2 py-2 text-right text-white font-semibold">{row.output > 0 ? row.output.toLocaleString() : '—'}</td>
                <td className="px-2 py-2 text-right text-status-green font-semibold">{row.shadeOk > 0 ? row.shadeOk.toLocaleString() : '—'}</td>
                <td className="px-2 py-2 text-right font-semibold text-slate-300">{row.dhu > 0 ? row.dhu.toFixed(2) + '%' : '—'}</td>
                <td className="px-2 py-2 text-right font-semibold text-slate-300">{row.rewash}</td>
               
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-table-header border-t border-neon-cyan/20 font-semibold">
              <td className="px-2 py-2 text-white" colSpan="3">Total</td>
              <td className="px-2 py-2 text-right text-slate-300">{totalTarget.toLocaleString()}</td>
              <td className="px-2 py-2 text-right text-white">{totalOutput.toLocaleString()}</td>
              <td className="px-2 py-2 text-right text-status-green">{totalShadeOk.toLocaleString()}</td>
              <td className="px-2 py-2 text-right text-slate-300">{avgDhu}%</td> 
              <td className="px-2 py-2 text-right text-slate-300">{avgRewash}</td>
              <td className="px-2 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default POWiseSummary;