import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
const Axios = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || 'http://localhost:9527/',
});
export const userRequest = setupCache(Axios);
