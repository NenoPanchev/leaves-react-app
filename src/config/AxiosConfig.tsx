import axios from "axios";
import { BASE_URL } from "../constants/GlobalConstants";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,

});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.url !== BASE_URL + '/authenticate') {
      const token = localStorage.getItem('SavedToken');
      config.headers.Authorization = token ? `${token}` : '';
      config.headers["Content-Type"] = 'application/json';
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401 ||
        (error.response.data.path == '/authenticate/refresh' && error.response.status === 500)) {
        localStorage.setItem('Authenticated', 'false');
      }
    }
    return Promise.reject(error);
  }
);