import axios from 'axios';
export const userRequest = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || 'http://localhost:9527/',
});
