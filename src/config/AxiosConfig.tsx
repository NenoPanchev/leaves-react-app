import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('SavedToken');
    config.headers.Authorization =  token ? `${token}` : '';
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
    if (error.response.status === 401 || 
        (error.response.data.path == '/authenticate/refresh' && error.response.status === 500)) {
        localStorage.setItem('Authenticated', 'false');       
    }   
    return Promise.reject(error);
  }
);