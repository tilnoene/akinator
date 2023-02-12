import axios from 'axios';

const api = axios.create({
  baseURL: 'https://akinator-five.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
