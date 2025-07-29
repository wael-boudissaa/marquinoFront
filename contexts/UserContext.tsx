'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Profile } from '../types';
import { getCurrentUser, logout as authLogout, isAuthenticated } from '../services/auth';

interface UserContextType {
  user: Profile | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (user: Profile) => void;
  logout: () => void;
  updateUser: (userData: Partial<Profile>) => void;
  authVersion: number; // Force re-renders when auth state changes
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authVersion, setAuthVersion] = useState(0);

  useEffect(() => {
    const initializeUser = () => {
      try {
        console.log('=== UserContext: Initializing user ===');
        
        // Check localStorage contents
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        console.log('UserContext: localStorage contents:');
        console.log('  - authToken:', !!token ? 'exists' : 'missing');
        console.log('  - user string:', userStr);
        
        const isAuth = isAuthenticated();
        console.log('UserContext: isAuthenticated result =', isAuth);
        
        if (isAuth) {
          const currentUser = getCurrentUser();
          console.log('UserContext: getCurrentUser result =', currentUser);
          setUser(currentUser);
        } else {
          console.log('UserContext: Not authenticated, setting user to null');
          setUser(null);
        }
      } catch (error) {
        console.error('UserContext: Error initializing user:', error);
        authLogout();
        setUser(null);
      } finally {
        setLoading(false);
        console.log('UserContext: Initialization complete');
        console.log('====================================');
      }
    };

    // Initialize immediately if window is available, otherwise wait briefly
    if (typeof window !== 'undefined') {
      initializeUser();
    } else {
      const timer = setTimeout(initializeUser, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const login = useCallback((userData: Profile) => {
    console.log('UserContext: Logging in user:', userData);
    // Update React state
    setUser(userData);
    // Force re-render of all consuming components
    setAuthVersion(prev => prev + 1);
    // Ensure localStorage is also updated (should already be done by auth service, but double-check)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    console.log('UserContext: User logged in successfully, state updated');
  }, []);

  const logout = useCallback(() => {
    console.log('UserContext: Logging out user');
    authLogout();
    setUser(null);
    // Force re-render of all consuming components
    setAuthVersion(prev => prev + 1);
  }, []);

  const updateUser = useCallback((userData: Partial<Profile>) => {
    setUser(prev => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const isLoggedIn = !!user;
  
  // Reduced debug logging - only log state changes, not every render
  useEffect(() => {
    console.log('UserContext: State changed:', { user: !!user, loading, isLoggedIn });
  }, [user, loading, isLoggedIn]);

  const value: UserContextType = {
    user,
    loading,
    isLoggedIn,
    login,
    logout,
    updateUser,
    authVersion,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};