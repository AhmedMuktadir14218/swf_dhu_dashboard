import { useEffect, useState } from 'react';
import { getPoDetails } from '../../apis/api';

const STATIONS = [
  { key: 'Front Side', label: 'Check_Front' },
  { key: 'Back Side', label: 'Check_Back' },
  { key: 'Output Side', label: 'Check_Output' },
  { key: 'Inside Side', label: 'Check_Inside' },
  { key: 'Top Side', label: 'Check_Top' },
  { key: 'WaistBand', label: 'Check_WaistBand' },
];

const getCheckQty = (qcStationDetails, stationName) => {
  const found = qcStationDetails.find(s => s.qcStation === stationName);
  return found ? found.checkQty : 0;
};

export default function PoDetailsModal({ filters, onClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoData = async () => {
      setLoading(true);
      const params = {
        FromDate: filters.dateFrom,
        ToDate: filters.dateTo,
      };
      if (filters.plant.length > 0) params.FactoryIds = filters.plant.map(Number);
      if (filters.unit.length > 0) params.UnitIds = filters.unit.map(Number);
      if (filters.sewingLine.length > 0) params.SewingLineIds = filters.sewingLine.map(Number);

      const res = await getPoDetails(params);
      setData(res || []);
      setLoading(false);
    };
    fetchPoData();
  }, [filters]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="bg-[#0a1f3d] border border-white/15 rounded-lg w-[95vw] max-w-[1700px] max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#071A33]">
          <h2 className="text-sm font-bold uppercase text-white">PO Details</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">&times;</button>
        </div>

        <div className="overflow-auto flex-1 ">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-white/50">Loading...</div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-white/50">No data found</div>
          ) : (
            <table className="w-full text-xs text-white min-w-[1000px]">
              <thead className="bg-[#11458b] sticky top-0 z-10">
                <tr>
                  {[
                    'Buyer', 'Style', 'PO', 'Line In Qty',
                    ...STATIONS.map(s => s.label),
                    'Final QcStation', 'Pass Qnt',
                  ].map(head => (
                    <th key={head} className="px-2 py-1.5 border border-white/10 text-left whitespace-nowrap">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c] transition-colors">
                    <td className="px-2 py-1 border border-white/10">{row.buyerName}</td>
                    <td className="px-2 py-1 border border-white/10">{row.styleName}</td>
                    <td className="px-2 py-1 border border-white/10">{row.poNumber}</td>
                    <td className="px-2 py-1 border border-white/10 text-center">{row.lineInQty}</td>
                    {STATIONS.map(s => (
                      <td key={s.key} className="px-2 py-1 border border-white/10 text-center">
                        {getCheckQty(row.qcStationDetails, s.key)}
                      </td>
                    ))}
                    <td className="px-2 py-1 border border-white/10 text-center">{row.finalQcStationName}</td>
                    <td className="px-2 py-1 border border-white/10 text-center font-bold text-green-400">{row.passQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
