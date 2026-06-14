const runningPOData = {
  poNo: '20311598044',
  style: 'SH-5520',
  buyer: 'H&M Group',
  delivery: '25 Jun 2026',
  sizes: ['Size-1', 'Size-2', 'Size-3', 'Size-4', 'Size-5', 'Size-6', 'Size-7', 'Size-8', 'Total'],
  orderQty: [300, 320, 400, 200, 250, 250, 250, 100, 2070],
  shadeOk: [250, 270, 150, 150, 250, 250, 250, 75, 1815],
  finishingOut: [45, 50, 250, 250, 250, 50, 895, '-', 1840],
  progress: [15, 15.8, 25, 25, 0, 0, 0, 50, 43],
};

const RunningPO = () => {
  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="px-4 py-3 border-b border-neon-cyan/20 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Running PO's</h3>
        <div className="text-xxs text-slate-400 uppercase">
          <span className="text-neon-cyan">PO No:</span> {runningPOData.poNo} | 
          <span className="ml-2 text-neon-cyan">Style:</span> {runningPOData.style} | 
          <span className="ml-2 text-neon-cyan">Buyer:</span> {runningPOData.buyer}   
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-table-header border-b border-neon-cyan/20">
            <tr>
              <th className="px-3 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider border-r border-neon-cyan/10">Size Name</th>
              {runningPOData.sizes.map((size, idx) => (
                <th key={idx} className="px-3 py-2 text-center text-slate-400 font-semibold uppercase tracking-wider border-r border-neon-cyan/10">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neon-cyan/10">
              <td className="px-3 py-2 text-white font-semibold bg-neon-cyan/10 border-r border-neon-cyan/10">Order Qty</td>
              {runningPOData.orderQty.map((qty, idx) => (
                <td key={idx} className="px-3 py-2 text-center text-slate-300 border-r border-neon-cyan/10">
                  {typeof qty === 'number' ? qty.toLocaleString() : qty}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neon-cyan/10">
              <td className="px-3 py-2 text-status-green font-semibold bg-neon-cyan/10 border-r border-neon-cyan/10">Shade OK</td>
              {runningPOData.shadeOk.map((qty, idx) => (
                <td key={idx} className="px-3 py-2 text-center text-slate-300 border-r border-neon-cyan/10">
                  {typeof qty === 'number' ? qty.toLocaleString() : qty}
                </td>
              ))}
            </tr>
            <tr className="border-b border-neon-cyan/10">
              <td className="px-3 py-2 text-neon-cyan font-semibold bg-neon-cyan/10 border-r border-neon-cyan/10">Finishing Out</td>
              {runningPOData.finishingOut.map((qty, idx) => (
                <td key={idx} className="px-3 py-2 text-center text-slate-300 border-r border-neon-cyan/10">
                  {typeof qty === 'number' ? qty.toLocaleString() : qty}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-3 py-3 text-white font-semibold bg-neon-cyan/10 border-r border-neon-cyan/10">Progress</td>
              {runningPOData.progress.map((prog, idx) => (
                <td key={idx} className="px-3 py-3 text-center border-r border-neon-cyan/10">
                  {prog > 0 ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            prog >= 25 ? 'bg-status-green' : prog >= 15 ? 'bg-status-amber' : 'bg-status-red'
                          }`}
                          style={{ width: `${prog}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white">{prog}%</span>
                    </div>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunningPO;