import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);
const storageKey = "pranalens-auth";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: "", user: null };
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(authState));
  }, [authState]);

  const signup = async (payload) => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setAuthState(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setAuthState(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => setAuthState({ token: "", user: null });

  const refreshProfile = async () => {
    if (!authState.token) return null;
    const data = await apiRequest("/auth/me", {
      token: authState.token
    });
    setAuthState((current) => ({ ...current, user: data.user }));
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        user: authState.user,
        isAuthenticated: Boolean(authState.token),
        isLoading,
        signup,
        login,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
