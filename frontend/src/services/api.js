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
  } catch (e) {
    // ignore
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
      } catch (e) {}
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
  try {
    const res = await api.get("/student/dashboard");
    return res;
  } catch (err) {
    // Return lightweight mock data for beta stability
    return {
      data: {
        xp: 1200,
        tasksCount: 7,
        coursesCount: 3,
      },
    };
  }
}

export async function getTeacherDashboard() {
  try {
    const res = await api.get("/teacher/dashboard");
    return res;
  } catch (err) {
    return {
      data: {
        xp: 3400,
        tasksCount: 12,
        coursesCount: 8,
      },
    };
  }
}
