import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        getUserProfile(token)
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Could not fetch user data. Please log in again.');
                setLoading(false);
            });
    }, []);

    // pentru login (nu sterge, este pentru token)
    const login = (accessToken, userData) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};