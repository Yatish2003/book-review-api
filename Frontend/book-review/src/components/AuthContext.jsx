import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUser({ username: storedUsername });
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await API.post('/login', { username, password });
      const { token: receivedToken, username: loggedInUsername } = response.data;
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('username', loggedInUsername);
      setToken(receivedToken);
      setUser({ username: loggedInUsername });
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return false;
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await API.post('/signup', { username, password });
      const { token: receivedToken, username: signedUpUsername } = response.data;
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('username', signedUpUsername);
      setToken(receivedToken);
      setUser({ username: signedUpUsername });
      return true;
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);