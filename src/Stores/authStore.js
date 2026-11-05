import { defineStore } from "pinia";
import axios from "axios";
import baseURL from "../Services/baseURL";

axios.defaults.withCredentials = true;

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

function parseJwtPayload(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function clearLegacyLocalStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    clearLegacyLocalStorage();

    const accessToken = getCookie("accessToken");
    const payload = parseJwtPayload(accessToken);

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    return {
      accessToken: accessToken || "",
      role:
        payload?.role ||
        (Array.isArray(payload?.roles) && payload.roles.length > 0
          ? payload.roles[0]
          : ""),
      username: payload?.sub || "",
      status: "",
    };
  },

  getters: {
    isAuthenticated: (state) => !!(state.accessToken || getCookie("accessToken")),
    isSuperAdmin: (state) => state.role === "ROLE_SUPERADMIN",
  },

  actions: {
    async login(credentials) {
      try {
        clearLegacyLocalStorage();

        const response = await baseURL.post("/api/auth/login", credentials, {
          withCredentials: true,
        });
        const { accessToken, roles, username } = response.data;

        const cookieToken = getCookie("accessToken") || accessToken || "";
        this.accessToken = cookieToken;
        this.role = roles && roles.length > 0 ? roles[0] : "";
        this.username = username || "";

        if (this.accessToken) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;
        }
        this.status = "success";
      } catch (error) {
        this.status = "error";
        throw error;
      }
    },

    async logout() {
      try {
        await baseURL.post("/api/auth/logout", {}, { withCredentials: true });
      } catch {
        // Ignore network/401 errors during logout cleanup
      }

      document.cookie = "accessToken=; Path=/; Max-Age=0; SameSite=Lax";
      this.accessToken = "";
      this.role = "";
      this.username = "";
      clearLegacyLocalStorage();
      delete axios.defaults.headers.common["Authorization"];
      this.status = "";
    },
  },
});
