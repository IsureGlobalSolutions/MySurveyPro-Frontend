// src/axios/axios.js
import axios from 'axios';
import { store } from '../Redux/store'; // Import your Redux store

const baseURL = 'https://isureglobals-001-site1.gtempurl.com/';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const FormData = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/form-data',
  },
});

const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const setupAxiosInterceptors = (refreshTokenFunction) => {
  axiosPrivate.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.user?.userData?.accessToken;
      if (token && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;

      if (!error.response) {
        console.error('Network error or CORS issue:', error);
        return Promise.reject({ message: 'Network Error or CORS issue', error });
      }

      if (error.response.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newAccessToken = await refreshTokenFunction();
            isRefreshing = false;
            onRrefreshed(newAccessToken?.accessToken);
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken?.accessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            isRefreshing = false;
            return Promise.reject(refreshError);
          }
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber((token) => {
              prevRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(axiosPrivate(prevRequest));
            });
          });
        }
      }

      console.error('API response error:', error.response);
      console.error('Error config:', error.config);

      return Promise.reject(error);
    }
  );
};

export { instance, baseURL, FormData, axiosPrivate, setupAxiosInterceptors };