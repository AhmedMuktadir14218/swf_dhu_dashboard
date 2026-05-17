const rows = [
  ["LINE-A", "7,169", "7,326", "102.19%", "156", "15.12%", "59.28%", "8.20%", "601", "99", "45.75", "green"],
  ["Line-A1", "1,668", "1,670", "100.12%", "2", "63.58%", "63.51%", "11.74%", "196", "87", "12.75", "yellow"],
  ["Line-A2", "1,574", "1,574", "100.00%", "0", "70.07%", "70.07%", "17.09%", "269", "69", "12.75", "red"],
  ["LINE-B", "5,290", "4,872", "92.10%", "-418", "13.79%", "60.93%", "10.84%", "528", "97", "43.75", "yellow"],
  ["Line-B1", "1,949", "1,950", "100.05%", "1", "66.34%", "65.99%", "9.90%", "193", "81", "11.00", "green"],
  ["Line-B2", "1,350", "1,134", "84.00%", "-216", "61.18%", "72.84%", "12.96%", "147", "102", "12.75", "yellow"], 
];

const getStatusColor = (color) => {
  if (color === 'green') return 'bg-green-500 shadow-[0_0_8px_#22c55e]';
  if (color === 'yellow') return 'bg-yellow-400 shadow-[0_0_8px_#facc15]';
  return 'bg-red-500 shadow-[0_0_8px_#ef4444]';
};

const getTextColor = (val) => {
  const num = parseFloat(val);
  if (num >= 100) return "text-lime-400";
  if (num >= 85) return "text-yellow-400";
  return "text-red-400";
};

export default function LinePerformanceTable() {
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-white/10 text-lg font-extrabold uppercase text-white">
        Line Performance Matrix
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-xs xl:text-sm min-w-[950px] text-white">
          <thead className="bg-[#11458b]">
            <tr>
              {["Sewing Line", "Day Target", "Actual Qty", "Achv %", "Deviation", "Eff %", "Target Eff", "DHU %", "Defect", "Man Power", "Working Hours", "Status", "Trend"].map((head) => (
                <th key={head} className="px-3 py-2.5 border border-white/10 text-left whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c] transition-colors">
                <td className="px-3 py-2 border border-white/10 font-bold">{r[0]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[1]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[2]}</td>
                <td className={`px-3 py-2 border border-white/10 text-right font-bold ${getTextColor(r[3])}`}>{r[3]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[4]}</td>
                <td className={`px-3 py-2 border border-white/10 text-right font-bold ${getTextColor(r[5])}`}>{r[5]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[6]}</td>
                <td className="px-3 py-2 border border-white/10 text-right text-orange-400 font-bold">{r[7]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[8]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[9]}</td>
                <td className="px-3 py-2 border border-white/10 text-right">{r[10]}</td>
                <td className="px-3 py-2 border border-white/10 text-center">
                  <span className={`inline-block w-3.5 h-3.5 rounded-full ${getStatusColor(r[11])}`} />
                </td>
                <td className="px-3 py-2 border border-white/10 w-24">
                  <svg viewBox="0 0 100 24" className="w-full h-5">
                    <polyline fill="none" stroke="#4db3ff" strokeWidth="1.5" points="0,18 15,15 30,7 45,11 60,9 75,14 90,5 100,10" />
                    {[0, 15, 30, 45, 60, 75, 90, 100].map((x, idx) => (
                      <circle key={idx} cx={x} cy={[18, 15, 7, 11, 9, 14, 5, 10][idx]} r="1.5" fill="#fff" />
                    ))}
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}