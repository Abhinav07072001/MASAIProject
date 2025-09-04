import axios from 'axios';
import { auth } from '../lib/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_DB_URL, // ends without trailing slash
});

// Append idToken & .json automatically
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.params = { ...(config.params || {}), auth: token };
  }
  if (config.url && !config.url.endsWith('.json')) {
    config.url = `${config.url}.json`;
  }
  return config;
});

export default api;
