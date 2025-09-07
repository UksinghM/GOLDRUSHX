'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
const AdminAuthContext = createContext();

// Helper to decode JWT and get user info
function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded._id,
      email: decoded.email,
      type: 'user',
    };
  } catch (e) {
    return null;
  }
}

// Helper to decode JWT and get admin info
function getAdminFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id, // assuming admin token has 'id'
      email: decoded.email,
      type: 'admin',
    };
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setToken(storedToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      setUser(getUserFromToken(token));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    setToken(storedToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      setAdmin(getAdminFromToken(token));
      setIsAuthenticated(true);
    } else {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = useCallback((token) => {
    localStorage.setItem('adminToken', token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  }, []);

  if (loading) return null;

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, isAuthenticated, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAdminAuth = () => useContext(AdminAuthContext); 