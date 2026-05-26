import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { getLineUnitPlant, getLineWiseDetails, getCumulative, getPoDetails, getIssueDetails } from '../../apis/api';

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
    poDetails: [],
    issueDetails: []
  });

  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const requestIdRef = useRef(0);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const data = await getLineUnitPlant();
        if (!data) return;
        const uniquePlants = [...new Map(data.map(item => [item.factoryId, { id: item.factoryId, name: item.factoryName }])).values()];
        const uniqueUnits = [...new Map(data.map(item => [item.unitId, { id: item.unitId, name: item.unitName, factoryId: item.factoryId }])).values()];
        const uniqueLines = [...new Map(data.map(item => [item.sewingLineId, { id: item.sewingLineId, name: item.sewingLineName, unitId: item.unitId, factoryId: item.factoryId }])).values()];

        setFilterOptions({
          plants: uniquePlants,
          units: uniqueUnits,
          sewingLines: uniqueLines
        });
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchDashboardData = useCallback(async () => {
    const current = filtersRef.current;
    const reqId = ++requestIdRef.current;
    setDataLoading(true);

    try {
      const baseParams = {
        FromDate: current.dateFrom,
        ToDate: current.dateTo,
      };
      if (current.plant.length > 0) baseParams.FactoryIds = current.plant.map(Number);
      if (current.unit.length > 0) baseParams.UnitIds = current.unit.map(Number);
      if (current.sewingLine.length > 0) baseParams.SewingLineIds = current.sewingLine.map(Number);

      const [cumulativeRes, lineWiseRes, poRes, issueRes] = await Promise.allSettled([
        getCumulative(baseParams),
        getLineWiseDetails(baseParams),
        getPoDetails(baseParams),
        getIssueDetails(baseParams)
      ]);

      if (requestIdRef.current !== reqId) return;

      setDashboardData({
        cumulative: cumulativeRes.status === 'fulfilled' ? cumulativeRes.value : null,
        lineWiseDetails: lineWiseRes.status === 'fulfilled' ? (lineWiseRes.value || []) : [],
        poDetails: poRes.status === 'fulfilled' ? (poRes.value || []) : [],
        issueDetails: issueRes.status === 'fulfilled' ? (issueRes.value || []) : []
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      if (requestIdRef.current === reqId) {
        setDataLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchDashboardData();
    }
  }, [filters, loading, fetchDashboardData]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, filterOptions, loading, dataLoading, dashboardData, fetchDashboardData }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
