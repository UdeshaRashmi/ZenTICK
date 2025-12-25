import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxies to backend when dev server configured or same origin in production
  timeout: 5000
});

export default api;
