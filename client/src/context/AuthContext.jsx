import React, { createContext, useState, useEffect } from 'react';
import { getUser, isAuthenticated } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on load
    const initializeAuth = () => {
      if (isAuthenticated()) {
        setUser(getUser());
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};