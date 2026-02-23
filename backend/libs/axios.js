import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // proxy orqali backendga ulanish
  withCredentials: true,
});

export default axiosInstance;