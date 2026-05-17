const data = [
  ["LINE-A", "Bella 14\" Low Rise Flare Jeans - AW26", "BACK POCKET 1/4 STITCH", "Open Stitch", "6", "66.7%"],
  ["", "", "", "Uneven Stitch", "1", "11.1%"],
  ["", "", "BACK POCKET JOINT", "", "9", "100.0%"],
  ["", "", "BACK POCKET ROLLING", "", "2", "100.0%"],
  ["", "", "BACK RISE", "", "13", "100.0%"],
  ["", "", "BACK YOKE", "", "2", "100.0%"],
  ["", "", "INSEAM", "", "3", "100.0%"],
];

export default function DefectAnalysisTable() {
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-white/10 text-lg font-extrabold uppercase text-white">
        Defect Analysis Details
      </div>
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs min-w-[600px] text-white">
          <thead className="bg-[#11458b] sticky top-0">
            <tr>
              {["Sewing Line", "Style", "Operation", "Issue", "Defects", "% of Line Defects"].map((h) => (
                <th key={h} className="px-3 py-2 border border-white/10 text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c]">
                {r.map((cell, idx) => (
                  <td key={idx} className="px-3 py-2 border border-white/10 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}