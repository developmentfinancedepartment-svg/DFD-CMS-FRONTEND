import axios from "axios";
import router from "./router";

axios.defaults.withCredentials = true;

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      document.cookie = "accessToken=; Path=/; Max-Age=0; SameSite=Lax";
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      delete axios.defaults.headers.common["Authorization"];
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default instance;
