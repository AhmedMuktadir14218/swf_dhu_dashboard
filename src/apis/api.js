const API_BASE_URL = '';

const buildQueryParams = (params) => {
  const parts = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      if (value.length > 0) {
        value.forEach(v => parts.push(`${key}=${encodeURIComponent(v)}`));
      }
    } else {
      parts.push(`${key}=${encodeURIComponent(value)}`);
    }
  });
  return parts.length > 0 ? `?${parts.join('&')}` : '';
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const apiGet = async (endpoint, params = {}, retries = 2) => {
  const url = `${API_BASE_URL}${endpoint}${buildQueryParams(params)}`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'accept': '*/*' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt < retries) {
        await sleep(1000 * (attempt + 1));
        continue;
      }
      console.error(`Error fetching ${endpoint} after ${retries + 1} attempts:`, error.message);
      return null;
    }
  }
};

export const getLineUnitPlant = () => apiGet('/User/get-line-unit-plant');

export const getLineWiseDetails = (params) => apiGet('/api/dashboard/line-wise-details', params);

export const getCumulative = (params) => apiGet('/api/dashboard/cumulative', params);

export const getPoDetails = (params) => apiGet('/api/dashboard/po-details', params);

export const getIssueDetails = (params) => apiGet('/api/dashboard/issue-details', params);
