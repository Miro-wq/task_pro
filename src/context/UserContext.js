import React, { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getUserProfile(token);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching boards:", err);
        setError("Could not fetch boards");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchUser, 1000);
  }, []);

  // pentru login (nu sterge, este pentru token)
  const login = (accessToken, userData) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
