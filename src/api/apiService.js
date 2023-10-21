import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchApiData = (endpoint) => {
  return api.get(endpoint);
};
