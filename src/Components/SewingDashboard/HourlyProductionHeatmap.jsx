import { useMemo } from 'react';
import { useFilter } from './FilterContext';

const getEffBg = (actualEff, planEff) => {
  if (actualEff >= planEff) return 'bg-green-500/25';
  if (actualEff >= planEff - 10) return 'bg-yellow-400/25';
  return 'bg-red-500/25';
};

export default function HourlyProductionHeatmap() {
  const { dashboardData } = useFilter();
  const { hourlyLineDetails } = dashboardData;

  const { rows, activeHours } = useMemo(() => {
    if (!hourlyLineDetails || hourlyLineDetails.length === 0) return { rows: [], activeHours: [] };

    const lineMap = {};
    const hourSet = new Set();

    hourlyLineDetails.forEach((item) => {
      if (item.passQty > 0 || item.defectQty > 0 || item.actualEff > 0) {
        hourSet.add(item.hourSlot);
      }
      if (!lineMap[item.sewingLineName]) {
        lineMap[item.sewingLineName] = {
          name: item.sewingLineName,
          planEff: item.planEff,
          hours: {}
        };
      }
      lineMap[item.sewingLineName].hours[item.hourSlot] = item;
    });

    const sortedHours = [...hourSet].sort((a, b) => a - b);

    const result = Object.values(lineMap).map((line) => {
      const hourEntries = sortedHours.map((h) => line.hours[h]).filter(Boolean);
      const avgEff = hourEntries.length > 0
        ? hourEntries.reduce((s, h) => s + h.actualEff, 0) / hourEntries.length
        : 0;
      const totalOutput = hourEntries.reduce((s, h) => s + h.passQty, 0);

      let bestHour = null;
      let lowestHour = null;
      let bestEff = -Infinity;
      let lowestEff = Infinity;

      hourEntries.forEach((h) => {
        if (h.actualEff > bestEff) { bestEff = h.actualEff; bestHour = h; }
        if (h.actualEff < lowestEff) { lowestEff = h.actualEff; lowestHour = h; }
      });

      const cells = [
        line.name,
        ...sortedHours.map((h) => {
          const c = line.hours[h];
          if (!c) return '';
          return `${c.passQty}/${c.hourlyTarget}\n${c.actualEff.toFixed(1)}% / ${c.planEff.toFixed(1)}% \n${c.dhu.toFixed(1)}%`;
        }),
        `${avgEff.toFixed(1)}%`,
        bestHour ? `${bestHour.hourSlot} (${bestHour.actualEff.toFixed(1)}%)` : '-',
        lowestHour ? `${lowestHour.hourSlot} (${lowestHour.actualEff.toFixed(1)}%)` : '-',
        totalOutput.toLocaleString()
      ];

      const cellData = sortedHours.map((h) => line.hours[h] || null);

      return { cells, cellData, planEff: line.planEff };
    });

    return { rows: result, activeHours: sortedHours };
  }, [hourlyLineDetails]);

  const headers = [
    'Sewing Line',
    ...activeHours.map(String),
    'Avg Eff %',
    'Best Hour',
    'Lowest Hour',
    'Total Output'
  ];

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden shrink-0">
        <div className="px-3 py-1.5 border-b border-white/10 text-sm font-extrabold uppercase text-white">
          Hourly Production Tracker
        </div>
        <div className="flex items-center justify-center h-32 text-white/40 text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden shrink-0 flex flex-col h-full">
      <div className="px-3 py-1.5 border-b border-white/10 text-sm font-extrabold uppercase text-white shrink-0">
        Hourly Production Tracker
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-[11px] text-white">
          <thead className="bg-[#11458b] sticky top-0 z-10">
            <tr>
              {headers.map((head) => (
                <th key={head} className="px-2 py-1 border border-white/10 text-center whitespace-nowrap">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c]">
                {row.cells.map((cell, i) => {
                  if (i === 0) {
                    return (
                      <td key={i} className="px-2 py-1 border border-white/10 whitespace-nowrap text-center align-middle leading-tight font-bold text-left">
                        {cell}
                      </td>
                    );
                  }
                  const hourIndex = i - 1;
                  const hourCell = hourIndex < activeHours.length ? row.cellData[hourIndex] : null;
                  const bgClass = hourCell ? getEffBg(hourCell.actualEff, row.planEff) : '';
                  return (
                    <td key={i} className={`px-2 py-1 border border-white/10 whitespace-pre-line text-center align-middle leading-tight ${bgClass}`}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-4 px-3 py-1 text-[10px] border-t border-white/10 text-white/80 bg-[#061830] shrink-0">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-green-500 rounded-sm"></span>Eff ≥ Target</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm"></span>Eff within -10%</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-sm"></span>Eff &lt; Target -10%</div>
        <div className="ml-auto font-semibold">passQty / hourlyTarget | actualEff / planEff |  DHU
           
        </div>
      </div>
    </div>
  );
}

{/* <table headers> - <api parameters> 
Buyer - buyerName
Style - styleName
Po  - poNumber
Line In Qty - lineInQty
Check_Front - if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "Front Side",}]){"checkQty": 1492}
Check_Back -if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "Back Side",}]){"checkQty": 1492}
Check_Output- if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "Output Side",}]){"checkQty": 1492}
Check_Inside - if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "Inside Side",}]){"checkQty": 1492}
Check_Top - if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "Top Side",}]){"checkQty": 1492}
Check_WaistBand- if(qcStationDetails[{"qcStationId": 1,
        "qcStation": "WaistBand",}]){"checkQty": 1492}
Final QcStation- finalQcStationName
Pass Qnt - pass */}
  






 