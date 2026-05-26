const rows = [
  ["LINE-A", "445/620\n46.6% / 8.3%", "576/620\n59.5% / 12.0%", "591/620\n60.6% / 9.8%", "612/620\n56.2% / 7.5%", "543/620\n49.2% / 9.4%", "641/620\n59.3% / 6.9%", "666/620\n62.2% / 5.6%", "653/620\n62.8% / 5.1%", "665/620\n63.6% / 8.6%", "627/620\n60.3% / 18.7%", "822/620\n79.2% / 3.2%", "213/620\n31.5% / 3.0%", "58.7%", "11 (79.2%)", "12 (31.5%)", "7,326"],
  ["Line-A1", "123/131\n59.7% / 16.3%", "132/131\n64.1% / 13.6%", "145/131\n70.4% / 12.4%", "111/131\n53.9% / 7.2%", "135/131\n65.5% / 13.3%", "143/131\n69.4% / 11.2%", "112/131\n54.4% / 11.6%", "147/131\n71.4% / 11.6%", "128/131\n62.1% / 9.4%", "122/131\n59.2% / 12.3%", "145/131\n70.4% / 11.7%", "109/131\n52.9% / 10.1%", "61.0%", "8 (71.4%)", "12 (52.9%)", "1,670"],
  ["Line-A2", "82/124\n46.5% / 22.0%", "110/124\n62.4% / 17.3%", "121/124\n68.7% / 20.7%", "99/124\n56.2% / 19.2%", "136/124\n77.2% / 21.3%", "112/124\n63.6% / 33.0%", "119/124\n67.5% / 30.3%", "154/124\n87.4% / 26.0%", "135/124\n76.6% / 20.7%", "112/124\n63.6% / 8.0%", "141/124\n80.0% / 0.0%", "121/124\n68.7% / 2.5%", "69.2%", "8 (87.4%)", "1 (46.5%)", "1,574"],
  ["LINE-B", "343/482\n42.6% / 14.0%", "405/482\n50.7% / 13.6%", "392/482\n50.4% / 16.6%", "346/482\n41.7% / 11.6%", "431/482\n51.5% / 14.8%", "365/482\n45.4% / 7.7%", "386/482\n47.9% / 14.0%", "446/482\n52.2% / 9.9%", "491/482\n57.8% / 13.4%", "368/482\n43.1% / 7.3%", "447/482\n57.0% / 1.8%", "180/482\n71.1% / 1.1%", "49.9%", "9 (57.8%)", "1 (42.6%)", "4,872"],
];

export default function HourlyProductionHeatmap() {
  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden shrink-0">
      <div className="px-3 py-1.5 border-b border-white/10 text-sm font-extrabold uppercase text-white">
        Hourly Production Tracker
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] text-[11px] text-white">
          <thead className="bg-[#11458b]">
            <tr>
              {["Sewing Line","1","2","3","4","5","6","7","8","9","10","11","12","Avg Eff %","Best Hour","Lowest Hour","Total Output"].map((head) => (
                <th key={head} className="px-2 py-1 border border-white/10 text-center whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c]">
                {row.map((cell, i) => (
                  <td key={i} className={`px-2 py-1 border border-white/10 whitespace-pre-line text-center align-middle leading-tight ${i === 0 ? 'font-bold text-left' : ''}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-4 px-3 py-1 text-[10px] border-t border-white/10 text-white/80 bg-[#061830]">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-green-500 rounded-sm"></span>Eff ≥ Target</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm"></span>Eff within -10%</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-sm"></span>Eff &lt; Target -10%</div>
        <div className="ml-auto font-semibold">Actual / Target | Top %: Eff | Bottom %: DHU</div>
      </div>
    </div>
  );
}
