
import axios, { InternalAxiosRequestConfig } from 'axios';
import { store } from '../redux/store/store';
import { loginTheUser,logoutTheUser } from '../redux/slice/userSlice';
import toast from 'react-hot-toast';

const BaseUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (value: string | null) => void; reject: (reason: Error) => void }[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url === '/auth/login') {
      return Promise.reject(error);
    }
    if (error.response?.data?.message === 'User is blocked') {
      toast.error('Your account is blocked. Please contact support.', { duration: 3000 });
      setTimeout(() => {
        store.dispatch(logoutTheUser());
        window.location.href = '/login';
      }, 3000);
      return Promise.reject(error);
    }
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const state = store.getState();
        const refreshResponse = await axiosInstance.post(
          '/auth/refresh-token',
          { refreshToken: state.user.refreshToken },
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.data.accessToken;
        store.dispatch(
          loginTheUser({
            userId: state.user.userId || '',
            name: state.user.name || '',
            email: state.user.email || '',
            accessToken: newAccessToken,
            refreshToken: state.user.refreshToken || '',
          })
        );
        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError instanceof Error ? refreshError : new Error(String(refreshError)), null);
        isRefreshing = false;
        store.dispatch(logoutTheUser());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;