import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const hasWindow = () => typeof window === "object";
const axiosClient = axios.create({
  // baseURL:"https://www.kaitoshop.tk/api/",
  // baseURL:"/api",
  baseURL: hasWindow() ? "/api/" : publicRuntimeConfig.API_URL + "/api/",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosClient;
