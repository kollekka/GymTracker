import axios from 'axios';

// Single place to adjust API base URL
export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
