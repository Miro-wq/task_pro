import React, { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

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

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};