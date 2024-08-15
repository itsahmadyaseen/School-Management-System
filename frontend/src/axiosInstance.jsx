import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4001/api/v1",
  withCredentials: true, // Send cookies along with requests
});

// Interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response);

    return Promise.reject(error);
  }
);

export default axiosInstance;
