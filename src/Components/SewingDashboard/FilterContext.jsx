import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { getUserAssigns, getLineWiseDetails, getCumulative, getIssueDetails, getHourlyLineDetails } from '../../apis/api';

const FilterContext = createContext();

const toLocalISOString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const FilterProvider = ({ children }) => {
  const today = toLocalISOString(new Date());

  const [filters, setFilters] = useState({
    dateFrom: today,
    dateTo: today,
    plant: [],
    unit: [],
    sewingLine: []
  });

  const [filterOptions, setFilterOptions] = useState({
    plants: [],
    units: [],
    sewingLines: []
  });

  const [dashboardData, setDashboardData] = useState({
    cumulative: null,
    lineWiseDetails: [],
    issueDetails: [],
    hourlyLineDetails: []
  });

  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const requestIdRef = useRef(0);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) { setLoading(false); return; }
        const user = JSON.parse(storedUser);
        const userId = user.id || user.userId;
        if (!userId) { setLoading(false); return; }

        let assignments = [];
        const assignData = await getUserAssigns(userId);
        if (assignData && Array.isArray(assignData)) {
          assignments = assignData;
          localStorage.setItem('assignments', JSON.stringify(assignData));
        }

        if (assignments.length === 0) { setLoading(false); return; }

        const uniquePlants = [...new Map(assignments.map(a => [a.factoryId, { id: a.factoryId, name: a.factoryName }])).values()];
        const uniqueUnits = [...new Map(assignments.map(a => [a.unitId, { id: a.unitId, name: a.unitName, factoryId: a.factoryId }])).values()];
        const uniqueLines = [...new Map(assignments.map(a => [a.sewingLineId, { id: a.sewingLineId, name: a.sewingLineName, unitId: a.unitId, factoryId: a.factoryId }])).values()];

        setFilterOptions({
          plants: uniquePlants,
          units: uniqueUnits,
          sewingLines: uniqueLines
        });

        setFilters({
          dateFrom: today,
          dateTo: today,
          plant: uniquePlants.map(p => String(p.id)),
          unit: uniqueUnits.map(u => String(u.id)),
          sewingLine: uniqueLines.map(l => String(l.id))
        });
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchDashboardData = useCallback(async (silent = false) => {
    const current = filtersRef.current;
    const reqId = ++requestIdRef.current;
    if (!silent) setDataLoading(true);

    try {
      const baseParams = {
        FromDate: current.dateFrom,
        ToDate: current.dateTo,
      };
      if (current.plant.length > 0) baseParams.FactoryIds = current.plant.map(Number);
      if (current.unit.length > 0) baseParams.UnitIds = current.unit.map(Number);
      if (current.sewingLine.length > 0) baseParams.SewingLineIds = current.sewingLine.map(Number);

      const [cumulativeRes, lineWiseRes, issueRes, hourlyRes] = await Promise.allSettled([
        getCumulative(baseParams),
        getLineWiseDetails(baseParams),
        getIssueDetails(baseParams),
        getHourlyLineDetails(baseParams)
      ]);

      if (requestIdRef.current !== reqId) return;

      setDashboardData({
        cumulative: cumulativeRes.status === 'fulfilled' ? cumulativeRes.value : null,
        lineWiseDetails: lineWiseRes.status === 'fulfilled' ? (lineWiseRes.value || []) : [],
        issueDetails: issueRes.status === 'fulfilled' ? (issueRes.value || []) : [],
        hourlyLineDetails: hourlyRes.status === 'fulfilled' ? (hourlyRes.value || []) : []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      if (requestIdRef.current === reqId && !silent) {
        setDataLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && !initialLoadRef.current) {
      initialLoadRef.current = true;
      setFetchTrigger(t => t + 1);
    }
  }, [loading]);

  const handleApply = useCallback(() => {
    setFetchTrigger(t => t + 1);
  }, []);

  return (
    <FilterContext.Provider value={{ filters, setFilters, filterOptions, loading, dataLoading, dashboardData, fetchDashboardData, fetchTrigger, handleApply }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
