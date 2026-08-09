import axios from "axios";

const DEFAULT_BASE =
  import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: DEFAULT_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper to set/remove token from axios defaults
export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

// Attach token from localStorage (if present) on each request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // ignore malformed/missing token
  }
  return config;
});

// Global response handling: if unauthorized, clear auth and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth");
      } catch {
        // ignore storage errors
      }
      // hard redirect to ensure app state resets
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

// Minimal API helpers for the beta
export async function login(credentials) {
  return api.post("/login", credentials);
}

export async function getMe() {
  return api.get("/me");
}

export async function getStudentDashboard() {
  return api.get("/dashboard/");
}

export async function getTeacherDashboard() {
  return api.get("/dashboard/");
}
