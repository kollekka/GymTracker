import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null, ready: false });

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const storedToken = sessionStorage.getItem('token');
      if (storedUser && storedToken) {
        setAuth({ user: JSON.parse(storedUser), token: storedToken, ready: true });
      } else {
        setAuth(a => ({ ...a, ready: true }));
      }
    } catch {
      setAuth(a => ({ ...a, ready: true }));
    }
  }, []);

  const login = useCallback((user, token) => {
    // If you later move away from sessionStorage remove these lines
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    setAuth({ user, token, ready: true });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setAuth({ user: null, token: null, ready: true });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
