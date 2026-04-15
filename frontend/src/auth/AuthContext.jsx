import { createContext, useContext, useEffect, useState } from "react";
import {
  clearAccessToken,
  getProfile,
  loginWithPassword,
  setAccessToken,
} from "../api/storeApi.js";

const STORAGE_KEY = "book-store-session";

const AuthContext = createContext(null);

function readStoredSession() {
  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function persistSession(session) {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function parseJwtPayload(token) {
  try {
    const [, payload] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [isBooting, setIsBooting] = useState(() => Boolean(readStoredSession()?.accessToken));

  useEffect(() => {
    const storedSession = readStoredSession();
    if (!storedSession?.accessToken) {
      return;
    }

    setAccessToken(storedSession.accessToken);
    getProfile()
      .then((profile) => {
        const nextSession = {
          ...storedSession,
          profile,
        };
        setSession(nextSession);
        persistSession(nextSession);
      })
      .catch(() => {
        clearAccessToken();
        persistSession(null);
        setSession(null);
      })
      .finally(() => {
        setIsBooting(false);
      });
  }, []);

  async function login(username, password) {
    const tokenSet = await loginWithPassword({ username, password });
    setAccessToken(tokenSet.access_token);

    const payload = parseJwtPayload(tokenSet.access_token);
    const profile = await getProfile();
    const nextSession = {
      accessToken: tokenSet.access_token,
      refreshToken: tokenSet.refresh_token,
      expiresAt: payload.exp ? payload.exp * 1000 : null,
      roles: profile.roles || payload?.realm_access?.roles || [],
      profile,
    };

    persistSession(nextSession);
    setSession(nextSession);
    return nextSession;
  }

  function logout() {
    clearAccessToken();
    persistSession(null);
    setSession(null);
  }

  const value = {
    session,
    isBooting,
    isAuthenticated: Boolean(session?.accessToken),
    isAdmin: Boolean(session?.roles?.includes("admin")),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
