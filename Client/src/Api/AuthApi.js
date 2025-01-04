import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (optional)
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default authApi;
