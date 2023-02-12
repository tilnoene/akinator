import axios from 'axios';

const api = axios.create({
  baseURL: 'https://akinator.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
