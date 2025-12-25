import axios from 'axios';

// Default to VITE_API_URL if provided, otherwise use localhost:3000 during dev
const fallbackApi = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? 'http://localhost:3000/api'
  : '/api';

const baseURL = import.meta.env.VITE_API_URL || fallbackApi;

const api = axios.create({
  baseURL,
  timeout: 7000
});

export default api;
