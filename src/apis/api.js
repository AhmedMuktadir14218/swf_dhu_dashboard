const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.136.53:9000';

const buildQueryParams = (params, arrayFormat = 'repeat') => {
  const parts = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      const sanitized = value.filter(v => v !== undefined && v !== null && v !== '');
      if (sanitized.length > 0) {
        if (arrayFormat === 'comma') {
          parts.push(`${key}=${encodeURIComponent(sanitized.join(','))}`);
        } else {
          sanitized.forEach(v => parts.push(`${key}=${encodeURIComponent(v)}`));
        }
      }
    } else {
      parts.push(`${key}=${encodeURIComponent(value)}`);
    }
  });
  return parts.length > 0 ? `?${parts.join('&')}` : '';
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const apiGet = async (endpoint, params = {}, retries = 2, skipAuth = false, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}${buildQueryParams(params, options.arrayFormat)}`;
  const headers = { 'accept': '*/*' };
  if (!skipAuth) Object.assign(headers, getAuthHeaders());
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
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

const apiRequest = async (endpoint, method, body = null, retries = 1) => {
  const url = `${API_BASE_URL}${endpoint}`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const options = {
        method,
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      };
      if (body) options.body = JSON.stringify(body);
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt < retries) {
        await sleep(1000 * (attempt + 1));
        continue;
      }
      console.error(`Error ${method} ${endpoint} after ${retries + 1} attempts:`, error.message);
      return null;
    }
  }
};

export const getLineUnitPlant = () => apiGet('/User/get-line-unit-plant', {}, 2, true);

const dashboardArrayOptions = { arrayFormat: 'repeat' };

export const getLineWiseDetails = (params) => apiGet('/api/dashboard/line-wise-details', params, 2, false, dashboardArrayOptions);

export const getCumulative = (params) => apiGet('/api/dashboard/cumulative', params, 2, false, dashboardArrayOptions);

export const getPoDetails = (params) => apiGet('/api/dashboard/po-details', params, 2, false, dashboardArrayOptions);

export const getIssueDetails = (params) => apiGet('/api/dashboard/issue-details', params, 2, false, dashboardArrayOptions);

export const getHourlyLineDetails = (params) => apiGet('/api/dashboard/get-hourly-Line-details', params, 2, false, dashboardArrayOptions);

export const login = (body) => apiRequest('/User/Login', 'POST', body);

export const getUsers = (params) => apiGet('/User/users', params);

export const getUserAssigns = (userId) => apiGet(`/User/get-user-assigns/${userId}`);

export const createUser = (body) => apiRequest('/User/CreateUser', 'POST', body);

export const updateUser = (body) => apiRequest('/User/update-user', 'PUT', body);

export const deleteUser = (userId) => apiRequest(`/User/delete-user/${userId}`, 'DELETE');

export const createUserType = (body) => apiRequest('/User/CreateUserType', 'POST', body);

export const createUserAssign = (body) => apiRequest('/User/CreateUserAssign', 'POST', body);

export const updateUserAssign = (body) => apiRequest('/User/UpdateUserAssign', 'POST', body);
