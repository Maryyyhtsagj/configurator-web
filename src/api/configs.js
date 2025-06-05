import axios from 'axios';
import LocalStorageServices from '../services/LocalStorageServices';
import { SERVER_URL } from '../constants';
import store from '../atoms';
import { tokenAtom } from '../atoms/accountAtoms';

export const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10 * 1000, // 10 seconds
});

api.interceptors.request.use(
  (params) => {
    const token = LocalStorageServices.getToken();
    if (token) {
      params.headers.Authorization = `Bearer ${token}`;
    }

    return params;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === 401) {
      LocalStorageServices.removeToken();
      store.set(tokenAtom, '');
    }
    return Promise.reject(error);
  },
);
