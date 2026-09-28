import { defineStore } from "pinia";
import axios from "axios";
import baseURL from "../Services/baseURL";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return {
      accessToken,
      role: localStorage.getItem("role"),
      username: localStorage.getItem("username"),
      status: "",
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isSuperAdmin: (state) => state.role === "ROLE_SUPERADMIN",
  },

  actions: {
    async login(credentials) {
      try {
        const response = await baseURL.post("/api/auth/login", credentials);
        // response.data is JwtResponse. getAccessToken() serializes to 'accessToken'
        const { accessToken, roles, username } = response.data;
        
        this.accessToken = accessToken;
        // For simplicity, we take the first role
        this.role = roles && roles.length > 0 ? roles[0] : "";
        this.username = username;

        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("role", this.role);
        localStorage.setItem("username", this.username);

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.accessToken}`;
        this.status = "success";

      } catch (error) {
        this.status = "error";
        throw error;
      }
    },
    

    logout() {
      this.accessToken = "";
      this.role = "";
      this.username = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      delete axios.defaults.headers.common["Authorization"];
      this.status = "";
    },
  },
});
