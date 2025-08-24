import axios from "axios";
import Cookies from "js-cookie";

const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Add request interceptor to include token
protectedApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;

      // Handle JSON vs FormData
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      Cookies.remove("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default protectedApi;
