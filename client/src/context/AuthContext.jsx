// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from '../axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, try to load user & token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // parse user from string
      // Optionally, verify token on the backend or fetch fresh user profile
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // document.cookie = `refreshToken=${res.data.refreshToken}; HttpOnly; Secure; SameSite=Strict`;
    setUser(user);
  };

  const registerUser = async (name, email, password) => {
    const res = await axios.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
