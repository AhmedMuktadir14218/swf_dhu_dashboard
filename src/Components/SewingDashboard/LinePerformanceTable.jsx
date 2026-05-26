import { useFilter } from './FilterContext';

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
  const { dashboardData, dataLoading } = useFilter();
  const rows = dashboardData.lineWiseDetails;

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-3 py-1.5 border-b border-white/10 text-sm font-extrabold uppercase text-white">
        Line Performance Matrix
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs min-w-[950px] text-white">
          <thead className="bg-[#11458b]">
            <tr>
              {["Sewing Line", "Day Target", "IE Target", "Actual Qty", "Pass", "Defect", "Reject", "Target Eff", "Actual Eff", "DHU %", "Man Power", "Status"].map((head) => (
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
                    <td className="px-2 py-1 border border-white/10 text-right">{formatNum(r.dayTarget)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{formatNum(r.ieTargetQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{formatNum(totalOutput)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{formatNum(r.pass)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right text-yellow-400 font-bold">{formatNum(r.defectQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{formatNum(r.rejectQty)}</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{r.targetEff.toFixed(2)}%</td>
                    <td className={`px-2 py-1 border border-white/10 text-right font-bold ${getTextColor(r.actualEff)}`}>{r.actualEff.toFixed(2)}%</td>
                    <td className="px-2 py-1 border border-white/10 text-right text-orange-400 font-bold">{r.dhu.toFixed(2)}%</td>
                    <td className="px-2 py-1 border border-white/10 text-right">{r.manPower}</td>
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
    </div>
  );
}
