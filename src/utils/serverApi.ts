import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const serverApi = axios.create({
  baseURL: `${serverUrl}/api`,
});
