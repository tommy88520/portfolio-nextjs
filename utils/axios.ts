import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
const Axios = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
});
export const userRequest = setupCache(Axios);
