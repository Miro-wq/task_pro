import React, { createContext, useState, useEffect } from "react";
import { getUserProfile, updateUserName } from "../services/api"; // updateUserName din api.js

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
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
                localStorage.setItem("user", JSON.stringify(res.data)); // Salvăm în localStorage
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Could not fetch user data. Please log in again.");
            } finally {
                setLoading(false);
            }
        };

        setTimeout(fetchUser, 1000);
    }, []);

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

    // trebuie sa actualizam numele userului in context si in localStorage dacxa tot e
    const updateName = async (newName) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No token found, user not logged in');
          }
          // apel endpoint
          const response = await updateUserName(token, newName);
          // raspuns cu user actualizat
          const updatedUser = response.data.user;
    
          // actualizare user in context
          setUser(updatedUser);
          // daca tot pastram userul în localStorage, atunci :
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (err) {
          console.error(err);
          setError('Could not update user name');
        }
      };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading, error, updateName }}>
            {children}
        </UserContext.Provider>
    );
};