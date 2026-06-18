import { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { FilterProvider, useFilter } from '../../Components/SewingDashboard/FilterContext';
import FilterBar from '../../Components/SewingDashboard/FilterBar';
import { getPoDetails } from '../../apis/api';
import { Factory, ChevronLeft, ChevronRight } from 'lucide-react';

const formatNum = (val) => {
  if (val === null || val === undefined || val === '') return '0';
  return Number(val).toLocaleString();
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-CA');
};

const STATION_SUB_COLS = [
//   { key: 'defectQty', label: 'Defect' },
//   { key: 'rejectQty', label: 'Reject' },
//   { key: 'rectifiedQty', label: 'Rectified' },
  { key: 'checkQty', label: 'Check' },
  { key: 'wholeCheckQty', label: 'Total Check' },
//   { key: 'wip', label: 'WIP' },
];

const STATIC_HEADERS = [
  { label: '#', id: 'idx' },
  { label: 'Factory', id: 'factory' },
  { label: 'Unit', id: 'unit' },
  { label: 'Line', id: 'line' },
  { label: 'Buyer / Style', id: 'buyer' },
//   { label: 'Style', id: 'style' },
  { label: 'PO', id: 'po' },
  { label: 'Line In Qty', id: 'lineInQty' },
];

const FINAL_HEADERS = [
  { label: 'Final QC', id: 'finalQc' },
  { label: 'Output Qty', id: 'passQty' },
  { label: 'Check Qty', id: 'checkQty' },
  { label: 'Total Check', id: 'totalCheck' },
  { label: 'WIP', id: 'wip' },
];

const PoDetailsContent = () => {
  const { filters, filterOptions, fetchTrigger } = useFilter();
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const [data, setData] = useState([]);
  const [poLoading, setPoLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 20;
  const pageRef = useRef(1);

  const doFetch = async (pageNum) => {
    const current = filtersRef.current;
    if (!current.dateFrom || !current.dateTo) return;
    setPoLoading(true);
    const params = {
      FromDate: current.dateFrom,
      ToDate: current.dateTo,
      PageNumber: pageNum,
      PageSize: pageSize,
    };
    if (current.plant.length > 0) params.FactoryIds = current.plant.map(Number);
    if (current.unit.length > 0) params.UnitIds = current.unit.map(Number);
    if (current.sewingLine.length > 0) params.SewingLineIds = current.sewingLine.map(Number);

    const res = await getPoDetails(params);
    if (res) {
      setData(res.data || []);
      setTotalPages(res.totalPages || 0);
      setTotalRecords(res.totalRecords || 0);
    } else {
      setData([]);
      setTotalPages(0);
      setTotalRecords(0);
    }
    setPoLoading(false);
  };

  useEffect(() => {
    if (fetchTrigger === 0) return;
    pageRef.current = 1;
    setPage(1);
    doFetch(1);
  }, [fetchTrigger]);

  const handlePageChange = (newPage) => {
    pageRef.current = newPage;
    setPage(newPage);
    doFetch(newPage);
  };

  const allStations = useMemo(() => {
    const stationSet = new Set();
    data.forEach(row => {
      (row.qcStationDetails || []).forEach(s => {
        if (s.qcStation) stationSet.add(s.qcStation);
      });
    });
    return Array.from(stationSet).sort();
  }, [data]);

  const getStationValue = (row, stationName, key) => {
    const station = (row.qcStationDetails || []).find(s => s.qcStation === stationName);
    return station ? station[key] : 0;
  };

  const getFinalStationValue = (row, key) => {
    const station = (row.qcStationDetails || []).find(
      s => s.qcStationId === row.finalSewingQcStationId
    );
    return station ? station[key] : 0;
  };

  const pivotData = useMemo(() => {
    if (!selectedRow) return { dates: [], stations: [], matrix: {} };
    const details = Array.isArray(selectedRow.qcDetails) ? selectedRow.qcDetails : [];
    const dateSet = new Set();
    const stationMap = new Map();
    const matrix = {};

    details.forEach(d => {
      dateSet.add(d.qcDate);
      stationMap.set(d.qcStationId, d.qcStation);
      if (!matrix[d.qcDate]) matrix[d.qcDate] = {};
      matrix[d.qcDate][d.qcStation] = d.checkQty;
    });

    const dates = Array.from(dateSet).sort();
    const stations = Array.from(stationMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, name]) => name);

    return { dates, stations, matrix };
  }, [selectedRow]);

  const lineInDetails = Array.isArray(selectedRow?.lineInDetails) ? selectedRow.lineInDetails : [];

  const pageNumbers = [];
  const maxVisible = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="h-screen overflow-hidden bg-[#071a33] text-white font-sans relative">

      <div className="h-[7%] shrink-0 max-w-[1800px] mx-auto w-full px-1 pt-1 mb-1">
        <div className="rounded-lg border border-white/15 bg-[#0a1f3d] px-3 py-1 shadow-md overflow-hidden h-full">
          <div className="flex items-center justify-center w-full h-full">
            <FilterBar />
          </div>
        </div>
      </div>

      <div className="relative max-w-[1800px] mx-auto w-full flex-1 px-1 pb-1">
        <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-[calc(100vh-6vh)]">

          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#071A33] shrink-0">
            <div className="flex items-center gap-2">
              <Factory className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold uppercase text-white">PO Details</h2>
              {!selectedRow && totalRecords > 0 && (
                <span className="text-[11px] text-white/50 ml-2">Total: {totalRecords.toLocaleString()} records</span>
              )}
            </div>
            {selectedRow && (
              <button
                onClick={() => setSelectedRow(null)}
                className="flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
              >
                <ChevronLeft className="w-3 h-3" />
                Back to Summary
              </button>
            )}
          </div>

          <div className="overflow-auto flex-1">
            {poLoading ? (
              <div className="flex items-center justify-center py-20 text-white/50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-[3px] border-white/20 border-t-sky-400 rounded-full animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              </div>
            ) : selectedRow ? (
              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    ['Factory', selectedRow.plantName],
                    ['Unit', selectedRow.plantUnitName],
                    ['Line', selectedRow.sewingLineName],
                    ['Buyer', selectedRow.buyerName],
                    ['Style', selectedRow.styleName],
                    ['PO', selectedRow.poNumber],
                  ].map(([label, value]) => (
                    <span key={label} className="px-2 py-1 rounded bg-[#0c2647] border border-white/10">
                      <span className="text-white/50">{label}:</span> {value}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

                  <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/10 bg-[#071A33]">
                      <h3 className="text-xs font-bold uppercase text-white/80">Line In Details</h3>
                    </div>
                    <div className="overflow-auto max-h-[calc(100vh-25vh)]">
                      <table className="w-full text-xs text-white">
                        <thead className="bg-[#11458b] sticky top-0 z-10">
                          <tr>
                            <th className="px-3 py-1.5 border border-white/10 text-left">Line In Date</th>
                            <th className="px-3 py-1.5 border border-white/10 text-right">Line In Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lineInDetails.length === 0 ? (
                            <tr>
                              <td colSpan="2" className="px-3 py-4 text-center text-white/40 border border-white/10">No data</td>
                            </tr>
                          ) : (
                            <>
                              {lineInDetails.map((item, i) => (
                                <tr key={i} className="odd:bg-[#0c2647] even:bg-[#0a203c]">
                                  <td className="px-3 py-1.5 border border-white/10">{formatDate(item.lineInDate)}</td>
                                  <td className="px-3 py-1.5 border border-white/10 text-right font-semibold">{formatNum(item.lineInQty)}</td>
                                </tr>
                              ))}
                              <tr className="bg-[#0f2d5a] font-bold">
                                <td className="px-3 py-1.5 border border-white/10">Total</td>
                                <td className="px-3 py-1.5 border border-white/10 text-right">{formatNum(selectedRow.lineInQty)}</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/10 bg-[#071A33]">
                      <h3 className="text-xs font-bold uppercase text-white/80">QC Date wise Breakdown</h3>
                    </div>
                    <div className="overflow-auto max-h-[calc(100vh-25vh)]">
                      <table className="w-full text-xs text-white">
                        <thead className="bg-[#11458b] sticky top-0 z-10">
                          <tr>
                            <th className="px-3 py-1.5 border border-white/10 text-left">QC Date</th>
                            {pivotData.stations.map(station => (
                              <th key={station} className="px-3 py-1.5 border border-white/10 text-right whitespace-nowrap">{station}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {pivotData.dates.length === 0 ? (
                            <tr>
                              <td colSpan={pivotData.stations.length + 1} className="px-3 py-4 text-center text-white/40 border border-white/10">No data</td>
                            </tr>
                          ) : (
                            pivotData.dates.map(date => (
                              <tr key={date} className="odd:bg-[#0c2647] even:bg-[#0a203c]">
                                <td className="px-3 py-1.5 border border-white/10">{formatDate(date)}</td>
                                {pivotData.stations.map(station => (
                                  <td key={station} className="px-3 py-1.5 border border-white/10 text-right">
                                    {pivotData.matrix[date]?.[station] != null
                                      ? formatNum(pivotData.matrix[date][station])
                                      : '-'}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-white/50">No data found</div>
            ) : (
              <table className="w-full text-xs text-white min-w-[1400px]" >
                <thead className="bg-[#11458b] sticky top-0 z-10">
                  <tr>
                    {STATIC_HEADERS.map(col => (
                      <th key={col.id} rowSpan={allStations.length > 0 ? 2 : 1} className="px-2 py-1.5 border border-white/10 text-left whitespace-nowrap">{col.label}</th>
                    ))}
                    {allStations.map(station => (
                      <th key={station} colSpan={STATION_SUB_COLS.length} className="px-2 py-1.5 border border-white/10 text-center whitespace-nowrap">{station}</th>
                    ))}
                    {FINAL_HEADERS.map(col => (
                      <th key={col.id} rowSpan={allStations.length > 0 ? 2 : 1} className="px-2 py-1.5 border border-white/10 text-center whitespace-nowrap">{col.label}</th>
                    ))}
                  </tr>
                  {allStations.length > 0 && (
                    <tr>
                      {allStations.map(station => (
                        <Fragment key={`sub-${station}`}>
                          {STATION_SUB_COLS.map(sub => (
                            <th key={`${station}-${sub.key}`} className="px-2 py-1 border border-white/10 text-center whitespace-nowrap text-[10px] text-white/80">{sub.label}</th>
                          ))}
                        </Fragment>
                      ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {data.map((row, i) => {
                    const wip = getFinalStationValue(row, 'wip');
                    return (
                      <tr
                        key={i}
                        onClick={() => setSelectedRow(row)}
                        className="odd:bg-[#0c2647] even:bg-[#0a203c] hover:bg-[#13325c] cursor-pointer transition-colors"
                      >
                        <td className="px-2 py-1 border border-white/10 text-center text-white/40">{(page - 1) * pageSize + i + 1}</td>
                        <td className="px-2 py-1 border border-white/10">{row.plantName}</td>
                        <td className="px-2 py-1 border border-white/10">{row.plantUnitName}</td>
                        <td className="px-2 py-1 border border-white/10">{row.sewingLineName}</td>
                        <td className="px-2 py-1 border border-white/10">
                        <div>
{row.buyerName}
                        </div>
                    <br />
                        <div>
                            {row.styleName}
                        </div>
                        </td>
                        {/* <td className="px-2 py-1 border border-white/10">{row.styleName}</td> */}
                        <td className="px-2 py-1 border border-white/10">{row.poNumber}</td>
                        <td className="px-2 py-1 border border-white/10 text-center font-semibold">{formatNum(row.lineInQty)}</td>
                        {allStations.map(station => (
                          <Fragment key={`data-${station}`}>
                            {STATION_SUB_COLS.map(sub => {
                              const val = getStationValue(row, station, sub.key);
                              return (
                                <td key={`${station}-${sub.key}`} className="px-2 py-1 border border-white/10 text-center">
                                  {sub.key === 'wip' && val > 0 ? (
                                    <span className="text-amber-400">{formatNum(val)}</span>
                                  ) : (
                                    formatNum(val)
                                  )}
                                </td>
                              );
                            })}
                          </Fragment>
                        ))}
                        <td className="px-2 py-1 border border-white/10 text-center">{row.finalQcStationName || '-'}</td>
                        <td className="px-2 py-1 border border-white/10 text-center font-semibold text-green-400">{formatNum(row.passQty)}</td>
                        <td className="px-2 py-1 border border-white/10 text-center font-semibold text-sky-300">
                          {formatNum(getFinalStationValue(row, 'checkQty'))}
                        </td>
                        <td className="px-2 py-1 border border-white/10 text-center font-semibold text-sky-300">
                          {formatNum(getFinalStationValue(row, 'wholeCheckQty'))}
                        </td>
                        <td className="px-2 py-1 border border-white/10 text-center">
                          <span className={wip > 0 ? 'text-amber-400' : ''}>{formatNum(wip)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {!selectedRow && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-[#071A33] shrink-0">
              <span className="text-[11px] text-white/50">
                Page {page} of {totalPages} ({totalRecords} records)
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className="px-2 py-1 rounded border border-white/10 text-[11px] text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >First</button>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-1.5 py-1 rounded border border-white/10 text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                ><ChevronLeft className="w-3 h-3" /></button>
                {pageNumbers.map(num => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-7 h-7 rounded border text-[11px] transition-colors ${
                      num === page
                        ? 'bg-sky-500/20 border-sky-500/30 text-sky-400'
                        : 'border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >{num}</button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-1.5 py-1 rounded border border-white/10 text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                ><ChevronRight className="w-3 h-3" /></button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page === totalPages}
                  className="px-2 py-1 rounded border border-white/10 text-[11px] text-white/60 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >Last</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const PoDetailsSewing = () => {
  return (
    <FilterProvider>
      <PoDetailsContent />
    </FilterProvider>
  );
};

export default PoDetailsSewing;
