import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";
import ROLE_ROUTES from "../config/roleRoutes";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const init = async () => {
      try {
        const raw = localStorage.getItem("auth");
        const token = localStorage.getItem("access_token");
        if (token) {
          setAuthToken(token);
          if (raw) {
            const parsed = JSON.parse(raw);
            setUser(parsed.user || null);
            setRole(parsed.role || null);
            setIsAuthenticated(!!parsed.isAuthenticated);
          }
          // Try to refresh profile to validate token
          try {
            const resp = await api.get("/me/");
            const profile = resp.data;
            setUser(profile);
            setRole(profile?.role || null);
            setIsAuthenticated(true);
            localStorage.setItem(
              "auth",
              JSON.stringify({
                isAuthenticated: true,
                user: profile,
                role: profile?.role || null,
              }),
            );
          } catch {
            // token might be invalid, clear
            clearAuthState();
          }
        } else {
          clearAuthState();
        }
      } catch (e) {
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearAuthState() {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth");
    } catch (e) {}
  }

  // credentials: { phone_email, password }
  async function login(credentials) {
    setLoading(true);
    try {
      // آدرس درست بک‌اند برای ورود با رمز عبور
      const res = await api.post("/verify-password/", credentials);

      // شکل واقعی پاسخ بک‌اند: { status, tokens: { access, refresh }, role }
      const token = res?.data?.tokens?.access;
      if (!token) throw new Error("توکنی از سرور دریافت نشد");

      localStorage.setItem("access_token", token);
      setAuthToken(token);

      // گرفتن پروفایل کامل کاربر از endpoint جدید /me/
      const me = await api.get("/me/");
      const profile = me.data;
      setUser(profile);
      const resolvedRole = profile?.role || res?.data?.role || null;
      setRole(resolvedRole);
      setIsAuthenticated(true);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: profile,
          role: resolvedRole,
        }),
      );

      // هدایت بر اساس نقش کاربر
      const dest = ROLE_ROUTES[resolvedRole] || "/unauthorized";
      navigate(dest, { replace: true });
      return profile;
    } catch (err) {
      clearAuthState();
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // credentials: { phone_email, otp, action, role, first_name?, last_name? }
  async function verifyOtp(payload) {
    setLoading(true);
    try {
      const res = await api.post("/verify-otp/", payload);

      const token = res?.data?.tokens?.access;
      if (!token) throw new Error("توکنی از سرور دریافت نشد");

      localStorage.setItem("access_token", token);
      const refreshToken = res?.data?.tokens?.refresh;
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      setAuthToken(token);

      const me = await api.get("/me/");
      const profile = me.data;
      setUser(profile);
      const resolvedRole = profile?.role || res?.data?.role || null;
      setRole(resolvedRole);
      setIsAuthenticated(true);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: profile,
          role: resolvedRole,
        }),
      );

      const dest = ROLE_ROUTES[resolvedRole] || "/unauthorized";
      navigate(dest, { replace: true });
      return profile;
    } catch (err) {
      clearAuthState();
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAuthState();
    navigate("/login", { replace: true });
  }

  async function getCurrentUser() {
    if (!isAuthenticated) return null;
    try {
      const resp = await api.get("/me/");
      setUser(resp.data);
      return resp.data;
    } catch (e) {
      return null;
    }
  }

  const value = {
    isAuthenticated,
    user,
    role,
    loading,
    login,
    verifyOtp,
    logout,
    getCurrentUser,
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
